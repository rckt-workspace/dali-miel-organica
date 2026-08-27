import {
  createFileRoute,
} from "@tanstack/react-router";

export const Route =
  createFileRoute(
    "/api/stripe-webhook",
  )({
    server: {
      handlers: {
        POST: async (
          event,
        ) => {
          return handleWebhook(
            event.request,
          );
        },
      },
    },
  });

async function handleWebhook(
  request: Request,
): Promise<Response> {
  const secretKey =
    process.env[
      "STRIPE_SECRET_KEY"
    ];

  const webhookSecret =
    process.env[
      "STRIPE_WEBHOOK_SECRET"
    ];

  if (
    !secretKey ||
    !webhookSecret
  ) {
    return Response.json(
      {
        error:
          "Stripe webhook no configurado.",
      },
      {
        status: 503,
      },
    );
  }

  const signature =
    request.headers.get(
      "stripe-signature",
    );

  if (!signature) {
    return Response.json(
      {
        error:
          "Falta Stripe-Signature.",
      },
      {
        status: 400,
      },
    );
  }

  /*
   * MUY IMPORTANTE:
   *
   * request.text()
   * debe ejecutarse antes de
   * cualquier JSON.parse.
   *
   * Stripe necesita el body
   * CRUDO para validar firma.
   */
  const payload =
    await request.text();

  try {
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

    const stripeEvent =
      stripe.webhooks.constructEvent(
        payload,
        signature,
        webhookSecret,
      );

    switch (
      stripeEvent.type
    ) {
      case "checkout.session.completed": {
        const session =
          stripeEvent.data
            .object;

        console.info(
          "[Stripe] Checkout completed",
          {
            sessionId:
              session.id,

            paymentStatus:
              session.payment_status,

            customerEmail:
              session.customer_details
                ?.email ??
              null,

            amountTotal:
              session.amount_total,

            currency:
              session.currency,
          },
        );

        /*
         * Aquí puedes agregar
         * posteriormente envío
         * de correo, ERP,
         * logística, etc.
         *
         * Stripe ya conserva
         * esta Session en su
         * Dashboard.
         */

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session =
          stripeEvent.data
            .object;

        console.info(
          "[Stripe] Async payment succeeded",
          {
            sessionId:
              session.id,
          },
        );

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session =
          stripeEvent.data
            .object;

        console.warn(
          "[Stripe] Async payment failed",
          {
            sessionId:
              session.id,
          },
        );

        break;
      }

      default:
        break;
    }

    return Response.json(
      {
        received: true,
      },
    );
  } catch (error) {
    console.error(
      "[Stripe webhook verification]",
      error,
    );

    return Response.json(
      {
        error:
          "Firma Stripe inválida.",
      },
      {
        status: 400,
      },
    );
  }
}