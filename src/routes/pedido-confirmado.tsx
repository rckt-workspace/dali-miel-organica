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
    </section>
  );
}
