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
    </section>
  );
}