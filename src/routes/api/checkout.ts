import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  getProduct,
} from "@/lib/products";

type CheckoutItem = {
  slug?: unknown;
  size?: unknown;
  qty?: unknown;
};

type CheckoutRequest = {
  items?: unknown;
};

export const Route =
  createFileRoute(
    "/api/checkout",
  )({
    server: {
      handlers: {
        POST: async (
          event,
        ) => {
          return createCheckout(
            event.request,
          );
        },
      },
    },
  });

async function createCheckout(
  request: Request,
): Promise<Response> {
  try {
    const secretKey =
      process.env[
        "STRIPE_SECRET_KEY"
      ];

    if (!secretKey) {
      return jsonError(
        "Stripe no está configurado.",
        503,
      );
    }

    let body:
      CheckoutRequest;

    try {
      body =
        (await request.json()) as CheckoutRequest;
    } catch {
      return jsonError(
        "JSON inválido.",
        400,
      );
    }

    if (
      !Array.isArray(
        body.items,
      ) ||
      body.items.length ===
        0
    ) {
      return jsonError(
        "El carrito está vacío.",
        400,
      );
    }

    if (
      body.items.length >
      30
    ) {
      return jsonError(
        "Demasiados productos en el carrito.",
        400,
      );
    }

    /*
     * Consolidamos líneas iguales.
     *
     * Esto también evita que
     * un cliente intente enviar
     * cientos de líneas duplicadas.
     */
    const merged =
      new Map<
        string,
        {
          slug: string;
          size: string;
          qty: number;
        }
      >();

    for (
      const raw of body.items as CheckoutItem[]
    ) {
      if (
        typeof raw.slug !==
          "string" ||
        typeof raw.size !==
          "string" ||
        typeof raw.qty !==
          "number"
      ) {
        return jsonError(
          "Producto inválido.",
          400,
        );
      }

      const slug =
        raw.slug.trim();

      const size =
        raw.size.trim();

      const qty =
        Math.trunc(
          raw.qty,
        );

      if (
        qty < 1 ||
        qty > 10
      ) {
        return jsonError(
          "Cantidad inválida.",
          400,
        );
      }

      const product =
        getProduct(slug);

      if (!product) {
        return jsonError(
          `Producto no válido: ${slug}`,
          400,
        );
      }

      if (!product.available) {
        return jsonError(
          `${product.name} no está disponible por ahora.`,
          409,
        );
      }

      if (
        !product.sizes.includes(
          size,
        )
      ) {
        return jsonError(
          `Presentación no válida para ${product.name}.`,
          400,
        );
      }

      if (
        !Number.isInteger(
          product.priceAmountCop,
        ) ||
        product.priceAmountCop <=
          0
      ) {
        return jsonError(
          `El precio de ${product.name} todavía no está configurado.`,
          409,
        );
      }

      const key =
        `${slug}::${size}`;

      const previous =
        merged.get(key);

      const nextQty =
        (previous?.qty ??
          0) + qty;

      if (nextQty > 10) {
        return jsonError(
          `Máximo 10 unidades de ${product.name}.`,
          400,
        );
      }

      merged.set(
        key,
        {
          slug,
          size,
          qty: nextQty,
        },
      );
    }

    const validated =
      Array.from(
        merged.values(),
      ).map(
        (item) => {
          const product =
            getProduct(
              item.slug,
            );

          if (!product) {
            throw new Error(
              "Producto desapareció del catálogo.",
            );
          }

          return {
            product,
            size:
              item.size,
            qty:
              item.qty,
          };
        },
      );

    const {
      default: Stripe,
    } =
      await import(
        "stripe"
      );

    const stripe =
      new Stripe(
        secretKey,
      );

    const requestOrigin =
      new URL(
        request.url,
      ).origin;

    const configuredUrl =
      process.env[
        "APP_PUBLIC_URL"
      ]?.trim();

    const appUrl =
      configuredUrl
        ? configuredUrl.replace(
            /\/+$/,
            "",
          )
        : requestOrigin;

    const session =
      await stripe.checkout.sessions.create(
        {
          mode: "payment",

          locale:
            "es-419",

          /*
           * Stripe recopila email.
           */
          customer_creation:
            "always",

          /*
           * Datos para entrega.
           */
          billing_address_collection:
            "required",

          shipping_address_collection:
            {
              allowed_countries:
                ["CO"],
            },

          phone_number_collection:
            {
              enabled:
                true,
            },

          /*
           * Stripe Checkout hospedado.
           */
          success_url:
            `${appUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,

          cancel_url:
            `${appUrl}/carrito?payment=cancelled`,

          line_items:
            validated.map(
              ({
                product,
                size,
                qty,
              }) => ({
                /*
                 * COP se envía a Stripe
                 * en su unidad menor.
                 *
                 * COP es una moneda de
                 * dos decimales para
                 * solicitudes Stripe,
                 * por eso:
                 *
                 * $45.000 COP
                 * -> 4.500.000
                 */
                price_data:
                  {
                    currency:
                      "cop",

                    unit_amount:
                      product.priceAmountCop *
                      100,

                    product_data:
                      {
                        name:
                          `${product.name} — ${size}`,

                        description:
                          product.tasting,

                        metadata:
                          {
                            dali_slug:
                              product.slug,

                            dali_size:
                              size,
                          },
                      },
                  },

                quantity:
                  qty,
              }),
            ),

          metadata: {
            source:
              "dali-web",

            items:
              JSON.stringify(
                validated.map(
                  ({
                    product,
                    size,
                    qty,
                  }) => ({
                    slug:
                      product.slug,
                    size,
                    qty,
                  }),
                ),
              ),
          },
        },
      );

    if (
      !session.url
    ) {
      return jsonError(
        "Stripe no devolvió una URL de pago.",
        502,
      );
    }

    return Response.json(
      {
        url:
          session.url,

        sessionId:
          session.id,
      },
    );
  } catch (error) {
    console.error(
      "[Stripe Checkout]",
      error,
    );

    return jsonError(
      "No pudimos iniciar el pago. Intenta de nuevo.",
      500,
    );
  }
}

function jsonError(
  message: string,
  status: number,
) {
  return Response.json(
    {
      error:
        message,
    },
    {
      status,
    },
  );
}