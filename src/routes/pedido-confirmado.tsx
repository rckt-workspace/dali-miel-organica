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
      /*
       * Wompi añade ?id=<transaction_id>
       * a la URL de redirección.
       */
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

/*
 * La llave pub_test_* usa el
 * ambiente Sandbox de Wompi;
 * la pub_prod_* usará
 * production. Se detecta por
 * prefijo.
 */
const WOMPI_API_BASE =
  "https://sandbox.wompi.co/v1";

function PedidoConfirmado() {
  const {
    id,
    modo,
  } = Route.useSearch();

  const isDirect =
    modo === "directo";

  const {
    clear,
  } = useCart();

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

    async function verify() {
      try {
        const response =
          await fetch(
            `${WOMPI_API_BASE}/transactions/${encodeURIComponent(id)}`,
          );

        if (
          !response.ok
        ) {
          throw new Error(
            "Wompi no encontró la transacción.",
          );
        }

        const data =
          (await response.json()) as {
            data?: {
              status?: string;
              reference?: string;
            };
          };

        if (
          !active
        ) {
          return;
        }

        const status =
          data.data
            ?.status;

        setReference(
          data.data
            ?.reference ??
            null,
        );

        if (
          status ===
            "APPROVED" ||
          status ===
            "PENDING" ||
          status ===
            "DECLINED" ||
          status ===
            "VOIDED" ||
          status ===
            "ERROR"
        ) {
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

          return;
        }

        setState(
          "fetch-error",
        );
      } catch {
        if (
          active
        ) {
          setState(
            "fetch-error",
          );
        }
      }
    }

    void verify();

    return () => {
      active =
        false;
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
            rotate: 360,
          }}
          transition={{
            duration: 1,
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
          ¡Gracias por tu compra!
        </h1>

        <p className="body-text mt-6 max-w-[600px] text-verde/68">
          Tu pago fue aprobado
          por Wompi. Gracias por
          llevar un pedacito de
          DALI a tu mesa.
        </p>

        {reference && (
          <p className="mt-5 text-[12px] uppercase tracking-[0.14em] text-verde/45">
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
          Algunos medios de pago
          (como PSE) tardan unos
          minutos en confirmarse.
          Te notificaremos cuando
          Wompi confirme la
          transacción.
        </p>

        {reference && (
          <p className="mt-5 text-[12px] uppercase tracking-[0.14em] text-verde/45">
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
          ? "Wompi rechazó la transacción. Tu carrito sigue intacto, puedes intentarlo de nuevo."
          : "Tu carrito sigue intacto. Puedes volver y comprobar el pedido antes de intentarlo nuevamente."}
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
    <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-crema px-6 py-20 md:px-[120px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[5vw] top-[8%] font-display text-[190px] leading-none text-verde/[0.025] md:text-[310px]"
      >
        DALI
      </div>

      <motion.div
        initial={{
          opacity: 0,
          y: 24,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="relative mx-auto w-full max-w-[1100px]"
      >
        {children}
      </motion.div>
    </section>
  );
}
