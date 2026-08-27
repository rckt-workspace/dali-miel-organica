import {
  createFileRoute,
} from "@tanstack/react-router";

export const Route =
  createFileRoute(
    "/api/checkout-session",
  )({
    server: {
      handlers: {
        GET: async (
          event,
        ) => {
          return getSession(
            event.request,
          );
        },
      },
    },
  });

async function getSession(
  request: Request,
): Promise<Response> {
  try {
    const secretKey =
      process.env[
        "STRIPE_SECRET_KEY"
      ];

    if (!secretKey) {
      return Response.json(
        {
          error:
            "Stripe no está configurado.",
        },
        {
          status: 503,
        },
      );
    }

    const requestUrl =
      new URL(
        request.url,
      );

    const sessionId =
      requestUrl.searchParams.get(
        "session_id",
      );

    if (
      !sessionId ||
      !sessionId.startsWith(
        "cs_",
      ) ||
      sessionId.length >
        200
    ) {
      return Response.json(
        {
          error:
            "Session ID inválido.",
        },
        {
          status: 400,
        },
      );
    }

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

    const session =
      await stripe.checkout.sessions.retrieve(
        sessionId,
      );

    return Response.json(
      {
        id:
          session.id,

        status:
          session.status,

        paymentStatus:
          session.payment_status,

        amountTotal:
          session.amount_total,

        currency:
          session.currency,

        customerName:
          session.customer_details
            ?.name ??
          null,

        customerEmail:
          session.customer_details
            ?.email ??
          null,
      },
    );
  } catch (error) {
    console.error(
      "[Stripe Session]",
      error,
    );

    return Response.json(
      {
        error:
          "No pudimos verificar el pago.",
      },
      {
        status: 500,
      },
    );
  }
}