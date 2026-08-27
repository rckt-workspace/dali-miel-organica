import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Check,
  LoaderCircle,
  ShoppingBag,
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
    "/checkout/exito",
  )({
    validateSearch: (
      search:
        Record<
          string,
          unknown
        >,
    ) => ({
      session_id:
        typeof search.session_id ===
        "string"
          ? search.session_id
          : "",
    }),

    head: () => ({
      meta: [
        {
          title:
            "Gracias por tu compra — Dalí",
        },
      ],
    }),

    component:
      CheckoutSuccess,
  });

type VerificationState =
  | "loading"
  | "paid"
  | "not-paid"
  | "error";

function CheckoutSuccess() {
  const {
    session_id,
  } = Route.useSearch();

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
    customerName,
    setCustomerName,
  ] =
    useState<
      string | null
    >(null);

  useEffect(() => {
    if (!session_id) {
      setState(
        "error",
      );
      return;
    }

    let active =
      true;

    async function verify() {
      try {
        const response =
          await fetch(
            `/api/checkout-session?session_id=${encodeURIComponent(session_id)}`,
          );

        const data =
          (await response.json()) as {
            paymentStatus?: string;
            customerName?: string | null;
            error?: string;
          };

        if (
          !active
        ) {
          return;
        }

        if (
          !response.ok
        ) {
          throw new Error(
            data.error ??
              "No pudimos verificar el pago.",
          );
        }

        if (
          data.paymentStatus ===
          "paid"
        ) {
          setCustomerName(
            data.customerName ??
              null,
          );

          setState(
            "paid",
          );

          if (
            !cleared.current
          ) {
            clear();
            cleared.current =
              true;
          }

          return;
        }

        setState(
          "not-paid",
        );
      } catch {
        if (
          active
        ) {
          setState(
            "error",
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
    session_id,
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
    "paid"
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
          Gracias
          {customerName
            ? `, ${customerName}`
            : ""}
          .
        </h1>

        <p className="body-text mt-6 max-w-[600px] text-verde/68">
          Tu pago fue
          confirmado
          correctamente.
          Gracias por llevar
          un pedacito de DALI
          a tu mesa.
        </p>

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

  return (
    <StatusLayout>
      <div className="grid size-16 place-items-center rounded-full border border-verde/15 text-verde">
        <ShoppingBag className="size-6" />
      </div>

      <p className="eyebrow mt-8 text-verde/50">
        Estado del pago
      </p>

      <h1 className="mt-3 max-w-[760px] font-display text-[clamp(48px,6vw,78px)] leading-[0.96] text-verde">
        No pudimos confirmar
        el pago.
      </h1>

      <p className="body-text mt-6 max-w-[580px] text-verde/68">
        Tu carrito sigue
        intacto. Puedes volver
        y comprobar el pedido
        antes de intentarlo
        nuevamente.
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