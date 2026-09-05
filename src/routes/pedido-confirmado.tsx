import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Check,
  Clock,
  LoaderCircle,
  ShoppingBag,
  TriangleAlert,
} from "lucide-react";

import {
  motion,
} from "motion/react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useCart,
} from "@/lib/cart";

export const Route =
  createFileRoute(
    "/pedido-confirmado",
  )({
    validateSearch: (
      search:
        Record<
          string,
          unknown
        >,
    ) => ({
      id:
        typeof search.id ===
        "string"
          ? search.id
          : "",

      modo:
        typeof search.modo ===
        "string"
          ? search.modo
          : undefined,
    }),

    head: () => ({
      meta: [
        {
          title:
            "Pedido confirmado — Dalí Miel Orgánica",
        },

        {
          name:
            "description",

          content:
            "Estado de tu pago con Wompi en Dalí Miel Orgánica.",
        },
      ],
    }),

    component:
      PedidoConfirmado,
  });

type TransactionStatus =
  | "APPROVED"
  | "PENDING"
  | "DECLINED"
  | "VOIDED"
  | "ERROR";

type VerificationState =
  | "loading"
  | TransactionStatus
  | "fetch-error";

type StatusResponse = {
  id?: string;
  reference?: string | null;
  status?: TransactionStatus;
  amountInCents?: number | null;
  currency?: string | null;
  paymentMethodType?: string | null;
  statusMessage?: string | null;
  error?: string;
};

function PedidoConfirmado() {
  const {
    id,
    modo,
  } =
    Route.useSearch();

  const isDirect =
    modo ===
    "directo";

  const {
    clear,
  } =
    useCart();

  const cleared =
    useRef(false);

  const [
    state,
    setState,
  ] =
    useState<VerificationState>(
      "loading",
    );

  const [
    reference,
    setReference,
  ] =
    useState<
      string | null
    >(null);

  useEffect(() => {
    if (!id) {
      setState(
        "fetch-error",
      );
      return;
    }

    let active =
      true;

    let timer:
      ReturnType<
        typeof setTimeout
      > | null =
      null;

    let attempts =
      0;

    const maxAttempts =
      15;

    async function verify() {
      attempts +=
        1;

      try {
        const response =
          await fetch(
            `/api/wompi-status?id=${encodeURIComponent(
              id,
            )}`,
            {
              method:
                "GET",

              headers: {
                Accept:
                  "application/json",
              },

              cache:
                "no-store",
            },
          );

        const data =
          (await response.json()) as StatusResponse;

        if (
          !response.ok
        ) {
          throw new Error(
            data.error ??
              "No pudimos consultar la transacción.",
          );
        }

        if (!active) {
          return;
        }

        setReference(
          data.reference ??
            null,
        );

        const status =
          data.status;

        if (!status) {
          throw new Error(
            "Estado de pago inválido.",
          );
        }

        setState(
          status,
        );

        if (
          status ===
            "APPROVED" &&
          !isDirect &&
          !cleared.current
        ) {
          clear();

          cleared.current =
            true;
        }

        /*
         * Algunos medios como
         * PSE pueden permanecer
         * PENDING algunos
         * segundos.
         */
        if (
          status ===
            "PENDING" &&
          attempts <
            maxAttempts &&
          active
        ) {
          timer =
            setTimeout(
              () => {
                void verify();
              },
              4000,
            );
        }
      } catch {
        if (!active) {
          return;
        }

        if (
          attempts <
          maxAttempts
        ) {
          timer =
            setTimeout(
              () => {
                void verify();
              },
              4000,
            );

          return;
        }

        setState(
          "fetch-error",
        );
      }
    }

    void verify();

    return () => {
      active =
        false;

      if (timer) {
        clearTimeout(
          timer,
        );
      }
    };
  }, [
    clear,
    id,
    isDirect,
  ]);

  if (
    state ===
    "loading"
  ) {
    return (
      <StatusLayout>
        <motion.div
          animate={{
            rotate:
              360,
          }}
          transition={{
            duration:
              1,

            repeat:
              Infinity,

            ease:
              "linear",
          }}
          className="grid size-16 place-items-center rounded-full bg-salvia/50 text-verde"
        >
          <LoaderCircle className="size-7" />
        </motion.div>

        <p className="eyebrow mt-8 text-verde/50">
          Verificando pago
        </p>

        <h1 className="mt-3 font-display text-[clamp(50px,7vw,86px)] leading-[0.95] text-verde">
          Un momento…
        </h1>

        <p className="body-text mt-5 max-w-[560px] text-verde/60">
          Estamos consultando
          directamente a Wompi
          para confirmar el
          estado de tu
          transacción.
        </p>
      </StatusLayout>
    );
  }

  if (
    state ===
    "APPROVED"
  ) {
    return (
      <StatusLayout>
        <motion.div
          initial={{
            scale:
              0.45,

            rotate:
              -12,
          }}
          animate={{
            scale:
              1,

            rotate:
              0,
          }}
          transition={{
            type:
              "spring",

            stiffness:
              240,

            damping:
              16,
          }}
          className="grid size-20 place-items-center rounded-full bg-salvia/60 text-verde shadow-[0_18px_50px_rgba(35,91,78,.12)]"
        >
          <Check className="size-9" />
        </motion.div>

        <p className="eyebrow mt-8 text-verde/50">
          Pago confirmado
        </p>

        <h1 className="mt-3 max-w-[800px] font-display text-[clamp(50px,7vw,88px)] leading-[0.94] tracking-[-0.045em] text-verde">
          ¡Gracias por tu
          compra!
        </h1>

        <p className="body-text mt-6 max-w-[600px] text-verde/68">
          Tu pago fue aprobado
          por Wompi. Gracias por
          llevar un pedacito de
          DALI a tu mesa.
        </p>

        {reference && (
          <p className="mt-5 break-all text-[12px] uppercase tracking-[0.14em] text-verde/45">
            Referencia:{" "}
            {reference}
          </p>
        )}

        <Link
          to="/tienda"
          className="btn-primary mt-9"
        >
          <ShoppingBag className="mr-2 size-4" />

          Seguir explorando
        </Link>
      </StatusLayout>
    );
  }

  if (
    state ===
    "PENDING"
  ) {
    return (
      <StatusLayout>
        <div className="grid size-16 place-items-center rounded-full bg-salvia/50 text-verde">
          <Clock className="size-7" />
        </div>

        <p className="eyebrow mt-8 text-verde/50">
          Pago pendiente
        </p>

        <h1 className="mt-3 max-w-[760px] font-display text-[clamp(48px,6vw,78px)] leading-[0.96] text-verde">
          Tu pago está en
          proceso.
        </h1>

        <p className="body-text mt-6 max-w-[580px] text-verde/68">
          Algunos medios de
          pago, como PSE,
          pueden tardar unos
          minutos en
          confirmarse. Estamos
          consultando el estado
          automáticamente.
        </p>

        {reference && (
          <p className="mt-5 break-all text-[12px] uppercase tracking-[0.14em] text-verde/45">
            Referencia:{" "}
            {reference}
          </p>
        )}

        <Link
          to="/tienda"
          className="btn-primary mt-8"
        >
          Volver a la tienda
        </Link>
      </StatusLayout>
    );
  }

  return (
    <StatusLayout>
      <div className="grid size-16 place-items-center rounded-full border border-verde/15 text-verde">
        <TriangleAlert className="size-6" />
      </div>

      <p className="eyebrow mt-8 text-verde/50">
        Estado del pago
      </p>

      <h1 className="mt-3 max-w-[760px] font-display text-[clamp(48px,6vw,78px)] leading-[0.96] text-verde">
        No pudimos confirmar
        el pago.
      </h1>

      <p className="body-text mt-6 max-w-[580px] text-verde/68">
        {state ===
        "DECLINED"
          ? "Wompi rechazó la transacción. Tu carrito sigue intacto y puedes intentarlo nuevamente."
          : state ===
              "VOIDED"
            ? "La transacción fue anulada. Tu carrito sigue intacto."
            : state ===
                "ERROR"
              ? "Wompi reportó un error procesando la transacción. Tu carrito sigue intacto."
              : "No pudimos verificar el estado definitivo del pago. Tu carrito sigue intacto."}
      </p>

      <Link
        to="/carrito"
        className="btn-primary mt-8"
      >
        Volver al carrito
      </Link>
    </StatusLayout>
  );
}

function StatusLayout({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <section className="page-gutter relative flex min-h-[70vh] items-center overflow-hidden bg-crema py-16 md:py-20 lg:py-[100px]">
      <motion.div
        initial={{
          opacity:
            0,

          y:
            24,
        }}
        animate={{
          opacity:
            1,

          y:
            0,
        }}
        transition={{
          duration:
            0.5,
        }}
        className="relative mx-auto w-full max-w-[1100px]"
      >
        {children}
      </motion.div>
    </section>
  );
}