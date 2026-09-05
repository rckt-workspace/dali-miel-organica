import {
  createFileRoute,
} from "@tanstack/react-router";

type WompiStatus =
  | "APPROVED"
  | "PENDING"
  | "DECLINED"
  | "VOIDED"
  | "ERROR";

type WompiTransactionResponse = {
  data?: {
    id?: unknown;
    reference?: unknown;
    status?: unknown;
    amount_in_cents?: unknown;
    currency?: unknown;
    payment_method_type?: unknown;
    status_message?: unknown;
  };
};

export const Route =
  createFileRoute(
    "/api/wompi-status",
  )({
    server: {
      handlers: {
        GET: async (
          event,
        ) => {
          return getWompiStatus(
            event.request,
          );
        },
      },
    },
  });

async function getWompiStatus(
  request: Request,
): Promise<Response> {
  try {
    const url =
      new URL(
        request.url,
      );

    const transactionId =
      url.searchParams
        .get("id")
        ?.trim();

    if (
      !transactionId ||
      transactionId.length >
        160
    ) {
      return jsonError(
        "ID de transacción inválido.",
        400,
      );
    }

    const config =
      getWompiApiConfig();

    if (!config.ok) {
      return jsonError(
        config.error,
        503,
      );
    }

    const response =
      await fetch(
        `${config.apiBase}/transactions/${encodeURIComponent(
          transactionId,
        )}`,
        {
          method:
            "GET",

          headers: {
            Accept:
              "application/json",

            Authorization:
              `Bearer ${config.privateKey}`,
          },

          cache:
            "no-store",
        },
      );

    if (
      response.status ===
      404
    ) {
      return jsonError(
        "La transacción no fue encontrada.",
        404,
      );
    }

    if (
      !response.ok
    ) {
      console.error(
        "[Wompi Status] HTTP",
        response.status,
      );

      return jsonError(
        "No pudimos consultar el estado del pago.",
        502,
      );
    }

    const payload =
      (await response.json()) as WompiTransactionResponse;

    const transaction =
      payload.data;

    if (
      !transaction ||
      typeof transaction.id !==
        "string" ||
      typeof transaction.status !==
        "string"
    ) {
      return jsonError(
        "Wompi devolvió una respuesta inválida.",
        502,
      );
    }

    const status =
      normalizeStatus(
        transaction.status,
      );

    if (!status) {
      return jsonError(
        "Wompi devolvió un estado desconocido.",
        502,
      );
    }

    return Response.json(
      {
        id:
          transaction.id,

        reference:
          typeof transaction.reference ===
          "string"
            ? transaction.reference
            : null,

        status,

        amountInCents:
          typeof transaction.amount_in_cents ===
          "number"
            ? transaction.amount_in_cents
            : null,

        currency:
          typeof transaction.currency ===
          "string"
            ? transaction.currency
            : null,

        paymentMethodType:
          typeof transaction.payment_method_type ===
          "string"
            ? transaction.payment_method_type
            : null,

        statusMessage:
          typeof transaction.status_message ===
          "string"
            ? transaction.status_message
            : null,
      },
      {
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      },
    );
  } catch (error) {
    console.error(
      "[Wompi Status]",
      error instanceof Error
        ? error.message
        : "Unknown error",
    );

    return jsonError(
      "No pudimos verificar el pago.",
      500,
    );
  }
}

function getWompiApiConfig():
  | {
      ok: true;
      apiBase: string;
      privateKey: string;
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

  const privateKey =
    process.env[
      "WOMPI_PRIVATE_KEY"
    ]?.trim();

  if (!privateKey) {
    return {
      ok: false,
      error:
        "Wompi no está configurado correctamente.",
    };
  }

  if (
    environment ===
      "sandbox" &&
    !privateKey.startsWith(
      "prv_test_",
    )
  ) {
    return {
      ok: false,
      error:
        "La llave privada no corresponde a Sandbox.",
    };
  }

  if (
    environment ===
      "production" &&
    !privateKey.startsWith(
      "prv_prod_",
    )
  ) {
    return {
      ok: false,
      error:
        "La llave privada no corresponde a producción.",
    };
  }

  return {
    ok: true,

    privateKey,

    apiBase:
      environment ===
      "production"
        ? "https://production.wompi.co/v1"
        : "https://sandbox.wompi.co/v1",
  };
}

function normalizeStatus(
  value: string,
): WompiStatus | null {
  switch (value) {
    case "APPROVED":
    case "PENDING":
    case "DECLINED":
    case "VOIDED":
    case "ERROR":
      return value;

    default:
      return null;
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

      headers: {
        "Cache-Control":
          "no-store",
      },
    },
  );
}