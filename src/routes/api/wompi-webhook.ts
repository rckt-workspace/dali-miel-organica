import {
  createFileRoute,
} from "@tanstack/react-router";

type WompiEventBody = {
  event?: unknown;

  data?: unknown;

  environment?: unknown;

  signature?: {
    properties?: unknown;
    checksum?: unknown;
  };

  timestamp?: unknown;

  sent_at?: unknown;
};

export const Route =
  createFileRoute(
    "/api/wompi-webhook",
  )({
    server: {
      handlers: {
        POST: async (
          event,
        ) => {
          return handleWompiWebhook(
            event.request,
          );
        },
      },
    },
  });

async function handleWompiWebhook(
  request: Request,
): Promise<Response> {
  try {
    const eventsSecret =
      process.env[
        "WOMPI_EVENTS_SECRET"
      ]?.trim();

    if (!eventsSecret) {
      console.error(
        "[Wompi Webhook] WOMPI_EVENTS_SECRET missing",
      );

      return Response.json(
        {
          error:
            "Webhook no configurado.",
        },
        {
          status:
            503,
        },
      );
    }

    let body:
      WompiEventBody;

    try {
      body =
        (await request.json()) as WompiEventBody;
    } catch {
      return Response.json(
        {
          error:
            "Payload inválido.",
        },
        {
          status:
            400,
        },
      );
    }

    if (
      !body.signature ||
      !Array.isArray(
        body.signature
          .properties,
      ) ||
      typeof body.signature
        .checksum !==
        "string" ||
      (
        typeof body.timestamp !==
          "number" &&
        typeof body.timestamp !==
          "string"
      )
    ) {
      return Response.json(
        {
          error:
            "Firma de evento inválida.",
        },
        {
          status:
            400,
        },
      );
    }

    const properties =
      body.signature
        .properties;

    if (
      properties.length ===
        0 ||
      properties.some(
        (property) =>
          typeof property !==
          "string",
      )
    ) {
      return Response.json(
        {
          error:
            "Propiedades de firma inválidas.",
        },
        {
          status:
            400,
        },
      );
    }

    if (
      !body.data ||
      typeof body.data !==
        "object"
    ) {
      return Response.json(
        {
          error:
            "Datos del evento inválidos.",
        },
        {
          status:
            400,
        },
      );
    }

    let signedValues =
      "";

    for (
      const property of
        properties as string[]
    ) {
      const value =
        getPropertyByPath(
          body.data,
          property,
        );

      if (
        value ===
        undefined ||
        value ===
        null
      ) {
        console.error(
          "[Wompi Webhook] Missing signed property",
          property,
        );

        return Response.json(
          {
            error:
              "No se pudo validar la firma.",
          },
          {
            status:
              400,
          },
        );
      }

      signedValues +=
        String(value);
    }

    const payloadToSign =
      `${signedValues}${String(
        body.timestamp,
      )}${eventsSecret}`;

    const expectedChecksum =
      await sha256Hex(
        payloadToSign,
      );

    const bodyChecksum =
      body.signature
        .checksum
        .trim()
        .toLowerCase();

    const headerChecksum =
      request.headers
        .get(
          "x-event-checksum",
        )
        ?.trim()
        .toLowerCase();

    /*
     * Si vienen ambos,
     * ambos deben coincidir.
     */
    if (
      !constantTimeEqual(
        expectedChecksum,
        bodyChecksum,
      ) ||
      (
        headerChecksum &&
        !constantTimeEqual(
          expectedChecksum,
          headerChecksum,
        )
      )
    ) {
      console.warn(
        "[Wompi Webhook] Invalid checksum",
      );

      return Response.json(
        {
          error:
            "Firma inválida.",
        },
        {
          status:
            401,
        },
      );
    }

    /*
     * Evita mezclar Sandbox
     * con Producción.
     */
    const configuredEnvironment =
      process.env[
        "WOMPI_ENV"
      ]?.trim() ===
      "production"
        ? "prod"
        : "test";

    if (
      typeof body.environment ===
        "string" &&
      body.environment !==
        configuredEnvironment
    ) {
      console.warn(
        "[Wompi Webhook] Environment mismatch",
        {
          received:
            body.environment,
          expected:
            configuredEnvironment,
        },
      );

      return Response.json(
        {
          error:
            "Ambiente Wompi incorrecto.",
        },
        {
          status:
            409,
        },
      );
    }

    /*
     * Por ahora solo nos interesa
     * transaction.updated.
     *
     * Otros eventos firmados se
     * aceptan pero no se procesan.
     */
    if (
      body.event !==
      "transaction.updated"
    ) {
      return Response.json(
        {
          received:
            true,
          ignored:
            true,
        },
      );
    }

    const transaction =
      getPropertyByPath(
        body.data,
        "transaction",
      );

    if (
      !transaction ||
      typeof transaction !==
        "object"
    ) {
      return Response.json(
        {
          error:
            "Transacción inválida.",
        },
        {
          status:
            400,
        },
      );
    }

    const record =
      transaction as Record<
        string,
        unknown
      >;

    const transactionId =
      typeof record.id ===
        "string"
        ? record.id
        : null;

    const status =
      typeof record.status ===
        "string"
        ? record.status
        : null;

    const reference =
      typeof record.reference ===
        "string"
        ? record.reference
        : null;

    /*
     * Importante:
     * NO registramos payload
     * completo ni secretos.
     */
    console.info(
      "[Wompi Webhook] transaction.updated",
      {
        transactionId,
        reference,
        status,
      },
    );

    /*
     * Más adelante aquí podemos
     * actualizar orders en
     * Supabase de manera
     * idempotente.
     */

    return Response.json(
      {
        received:
          true,
      },
      {
        status:
          200,
      },
    );
  } catch (error) {
    console.error(
      "[Wompi Webhook]",
      error instanceof Error
        ? error.message
        : "Unknown error",
    );

    return Response.json(
      {
        error:
          "Error procesando evento.",
      },
      {
        status:
          500,
      },
    );
  }
}

function getPropertyByPath(
  root: unknown,
  path: string,
): unknown {
  const parts =
    path.split(".");

  let current:
    unknown = root;

  for (
    const part of parts
  ) {
    if (
      !current ||
      typeof current !==
        "object" ||
      !Object.prototype
        .hasOwnProperty.call(
          current,
          part,
        )
    ) {
      return undefined;
    }

    current =
      (
        current as Record<
          string,
          unknown
        >
      )[part];
  }

  return current;
}

async function sha256Hex(
  value: string,
): Promise<string> {
  const bytes =
    new TextEncoder().encode(
      value,
    );

  const digest =
    await crypto.subtle.digest(
      "SHA-256",
      bytes,
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

function constantTimeEqual(
  left: string,
  right: string,
): boolean {
  if (
    left.length !==
    right.length
  ) {
    return false;
  }

  let difference =
    0;

  for (
    let i = 0;
    i < left.length;
    i += 1
  ) {
    difference |=
      left.charCodeAt(i) ^
      right.charCodeAt(i);
  }

  return difference ===
    0;
}