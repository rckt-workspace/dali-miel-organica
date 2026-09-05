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
  direct?: unknown;
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
    const config =
      getWompiCheckoutConfig();

    if (!config.ok) {
      return jsonError(
        config.error,
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
      body.items.length === 0
    ) {
      return jsonError(
        "El carrito está vacío.",
        400,
      );
    }

    if (
      body.items.length > 30
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
      const raw of
        body.items as CheckoutItem[]
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
        getProduct(
          slug,
        );

      if (!product) {
        return jsonError(
          `Producto no válido: ${slug}`,
          400,
        );
      }

      if (
        !product.available
      ) {
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

      if (
        nextQty > 10
      ) {
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
          qty:
            nextQty,
        },
      );
    }

    /*
     * El servidor es la única
     * autoridad sobre precios.
     */
    let totalCop =
      0;

    const summary:
      string[] = [];

    for (
      const item of
        merged.values()
    ) {
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
        product
          .priceAmountCop *
        item.qty;

      summary.push(
        `${item.qty}× ${product.name} ${item.size}`,
      );
    }

    if (
      totalCop <= 0 ||
      !Number.isSafeInteger(
        totalCop,
      )
    ) {
      return jsonError(
        "El total del pedido no es válido.",
        409,
      );
    }

    /*
     * Wompi usa centavos.
     *
     * $38.000 COP
     * =
     * 3.800.000 centavos
     */
    const amountInCents =
      totalCop * 100;

    if (
      !Number.isSafeInteger(
        amountInCents,
      )
    ) {
      return jsonError(
        "El total del pedido excede el límite permitido.",
        400,
      );
    }

    /*
     * Referencia única.
     */
    const randomPart =
      crypto
        .randomUUID()
        .replace(
          /-/g,
          "",
        )
        .slice(
          0,
          12,
        )
        .toUpperCase();

    const reference =
      `DALI-${Date.now()
        .toString(36)
        .toUpperCase()}-${randomPart}`;

    const currency =
      "COP";

    /*
     * Firma oficial de integridad:
     *
     * reference
     * + amountInCents
     * + currency
     * + integritySecret
     */
    const integrityString =
      `${reference}${amountInCents}${currency}${config.integritySecret}`;

    const integritySignature =
      await sha256Hex(
        integrityString,
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
      normalizeAppUrl(
        configuredUrl ??
          requestOrigin,
      );

    if (!appUrl) {
      return jsonError(
        "APP_PUBLIC_URL no es válida.",
        503,
      );
    }

    const redirect =
      new URL(
        "/pedido-confirmado",
        appUrl,
      );

    if (
      body.direct === true
    ) {
      redirect.searchParams.set(
        "modo",
        "directo",
      );
    }

    /*
     * Wompi rechaza redirectUrl
     * con localhost/http.
     * En dev local, omitimos.
     */
    const isLocalhost =
      appUrl.includes(
        "localhost",
      ) ||
      appUrl.includes(
        "127.0.0.1",
      );

    return Response.json(
      {
        publicKey:
          config.publicKey,

        reference,

        amountInCents,

        currency,

        description:
          summary
            .join(", ")
            .slice(
              0,
              240,
            ),

        integritySignature,

        redirectUrl:
          isLocalhost
            ? undefined
            : redirect.toString(),

        environment:
          config.environment,
      },
      {
        headers: {
          "Cache-Control":
            "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "[Wompi Checkout]",
      error instanceof Error
        ? error.message
        : "Unknown error",
    );

    return jsonError(
      "No pudimos iniciar el pago. Intenta de nuevo.",
      500,
    );
  }
}

function getWompiCheckoutConfig():
  | {
      ok: true;
      publicKey: string;
      integritySecret: string;
      environment:
        | "sandbox"
        | "production";
    }
  | {
      ok: false;
      error: string;
    } {
  const environment =
    process.env[
      "WOMPI_ENV"
    ]?.trim() ===
    "production"
      ? "production"
      : "sandbox";

  const publicKey =
    process.env[
      "WOMPI_PUBLIC_KEY"
    ]?.trim();

  const integritySecret =
    process.env[
      "WOMPI_INTEGRITY_SECRET"
    ]?.trim();

  if (
    !publicKey ||
    !integritySecret
  ) {
    return {
      ok: false,

      error:
        "Wompi no está configurado correctamente.",
    };
  }

  if (
    environment ===
      "sandbox" &&
    !publicKey.startsWith(
      "pub_test_",
    )
  ) {
    return {
      ok: false,

      error:
        "La llave pública de Wompi no corresponde al ambiente Sandbox.",
    };
  }

  if (
    environment ===
      "production" &&
    !publicKey.startsWith(
      "pub_prod_",
    )
  ) {
    return {
      ok: false,

      error:
        "La llave pública de Wompi no corresponde al ambiente de producción.",
    };
  }

  return {
    ok: true,
    publicKey,
    integritySecret,
    environment,
  };
}

function normalizeAppUrl(
  value: string,
): string | null {
  try {
    const url =
      new URL(value);

    if (
      url.protocol !==
        "http:" &&
      url.protocol !==
        "https:"
    ) {
      return null;
    }

    return url
      .toString()
      .replace(
        /\/+$/,
        "",
      );
  } catch {
    return null;
  }
}

async function sha256Hex(
  value: string,
): Promise<string> {
  const encoded =
    new TextEncoder().encode(
      value,
    );

  const digest =
    await crypto.subtle.digest(
      "SHA-256",
      encoded,
    );

  return Array.from(
    new Uint8Array(
      digest,
    ),
  )
    .map((byte) =>
      byte
        .toString(16)
        .padStart(
          2,
          "0",
        ),
    )
    .join("");
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

      headers: {
        "Cache-Control":
          "no-store",
      },
    },
  );
}