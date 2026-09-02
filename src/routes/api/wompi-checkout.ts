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
    "/api/wompi-checkout",
  )({
    server: {
      handlers: {
        POST: async (
          event,
        ) => {
          return createWompiCheckout(
            event.request,
          );
        },
      },
    },
  });

async function createWompiCheckout(
  request: Request,
): Promise<Response> {
  try {
    /*
     * Llave pública de Wompi.
     *
     * Modo pruebas (Sandbox):
     * pub_test_*
     *
     * Cuando Wompi apruebe la
     * cuenta, basta reemplazar
     * el valor de WOMPI_PUBLIC_KEY
     * por la llave pub_prod_*
     * (o editar el fallback aquí).
     * Nada más cambia.
     */
    const publicKey =
      process.env[
        "WOMPI_PUBLIC_KEY"
      ]?.trim() ??
      "pub_test_5DJjXHhA7bZzAEuymUyQIr3986NFJpTX";

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

    /*
     * Autoridad de precios:
     * el total se calcula aquí,
     * en el servidor, desde el
     * catálogo oficial. El
     * cliente jamás envía
     * precios.
     */
    let totalCop = 0;

    const summary: string[] =
      [];

    for (const item of merged.values()) {
      const product =
        getProduct(
          item.slug,
        );

      if (!product) {
        throw new Error(
          "Producto desapareció del catálogo.",
        );
      }

      totalCop +=
        product.priceAmountCop *
        item.qty;

      summary.push(
        `${item.qty}× ${product.name} ${item.size}`,
      );
    }

    /*
     * Wompi espera el monto en
     * centavos: $45.000 COP ->
     * 4.500.000.
     */
    const amountInCents =
      totalCop * 100;

    const reference =
      `DALI-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`;

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

    return Response.json(
      {
        publicKey,
        reference,
        amountInCents,
        currency: "COP",
        description:
          summary
            .join(", ")
            .slice(0, 240),
        redirectUrl:
          `${appUrl}/pedido-confirmado`,
      },
    );
  } catch (error) {
    console.error(
      "[Wompi Checkout]",
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
