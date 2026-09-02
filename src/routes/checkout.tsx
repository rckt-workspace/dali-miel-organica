import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";

import {
  motion,
} from "motion/react";

import {
  useMemo,
  useState,
} from "react";

import {
  useCart,
} from "@/lib/cart";

import {
  formatCop,
  getProduct,
  getProductPriceCop,
} from "@/lib/products";

export const Route =
  createFileRoute(
    "/checkout",
  )({
    validateSearch: (
      search: Record<string, unknown>,
    ) => ({
      producto:
        typeof search.producto === "string"
          ? search.producto
          : undefined,
      cantidad:
        typeof search.cantidad === "number"
          ? search.cantidad
          : undefined,
      modo:
        typeof search.modo === "string"
          ? search.modo
          : undefined,
      presentacion:
        typeof search.presentacion === "string"
          ? search.presentacion
          : undefined,
    }),

    head: () => ({
      meta: [
        {
          title:
            "Pago seguro — Dalí Miel Orgánica",
        },
        {
          name:
            "description",
          content:
            "Revisa tu pedido y paga de forma segura con Wompi: tarjeta, PSE o Nequi.",
        },
        {
          property:
            "og:title",
          content:
            "Pago seguro — Dalí Miel Orgánica",
        },
        {
          property:
            "og:description",
          content:
            "Revisa tu pedido y paga de forma segura con Wompi: tarjeta, PSE o Nequi.",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
      ],
    }),

    component:
      Checkout,
  });

function Checkout() {
  const {
    items: cartItems,
    subtotalCop: cartSubtotalCop,
    pricesConfigured: cartPricesConfigured,
  } = useCart();

  const {
    producto,
    cantidad,
    modo,
    presentacion,
  } = Route.useSearch();

  const isDirect =
    modo === "directo";

  const directItem =
    useMemo(() => {
      if (!isDirect) {
        return null;
      }

      const product =
        getProduct(
          producto ?? "",
        );

      const qty =
        typeof cantidad === "number"
          ? Math.trunc(cantidad)
          : 0;

      if (
        !product ||
        !product.available ||
        !presentacion ||
        !product.sizes.includes(
          presentacion,
        ) ||
        qty < 1 ||
        qty > 10
      ) {
        return null;
      }

      return {
        slug: product.slug,
        name: product.name,
        size: presentacion,
        image:
          product.gallery?.[0] ??
          product.image,
        price: product.price,
        qty,
      };
    }, [
      cantidad,
      isDirect,
      presentacion,
      producto,
    ]);

  const items =
    isDirect
      ? directItem
        ? [directItem]
        : []
      : cartItems;

  const directUnitPrice =
    directItem
      ? getProductPriceCop(
          directItem.slug,
          directItem.size,
        )
      : null;

  const subtotalCop =
    isDirect
      ? (directUnitPrice ?? 0) *
        (directItem?.qty ?? 0)
      : cartSubtotalCop;

  const pricesConfigured =
    isDirect
      ? directUnitPrice !== null
      : cartPricesConfigured;

  const [
    loading,
    setLoading,
  ] =
    useState(false);

  const [
    error,
    setError,
  ] =
    useState<
      string | null
    >(null);

  async function
  beginCheckout() {
    if (
      loading ||
      items.length === 0 ||
      !pricesConfigured
    ) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      /*
       * El servidor valida el
       * carrito y calcula el
       * total desde el catálogo
       * oficial. Nunca enviamos
       * precios desde el
       * cliente.
       */
      const response =
        await fetch(
          "/api/wompi-checkout",
          {
            method:
              "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                {
                   direct:
                     isDirect,
                  items:
                    items.map(
                      (
                        item,
                      ) => ({
                        slug:
                          item.slug,

                        size:
                          item.size,

                        qty:
                          item.qty,
                      }),
                    ),
                },
              ),
          },
        );

      const data =
        (await response.json()) as {
          publicKey?: string;
          reference?: string;
          amountInCents?: number;
          currency?: string;
          redirectUrl?: string;
          error?: string;
        };

      if (
        !response.ok
      ) {
        throw new Error(
          data.error ??
            "No pudimos iniciar el pago.",
        );
      }

      if (
        !data.publicKey ||
        !data.reference ||
        !data.amountInCents ||
        !data.redirectUrl
      ) {
        throw new Error(
          "Wompi no devolvió los datos del pago.",
        );
      }

      const WidgetCheckout =
        await loadWompiWidget();

      const checkout =
        new WidgetCheckout(
          {
            currency:
              data.currency ??
              "COP",

            amountInCents:
              data.amountInCents,

            reference:
              data.reference,

            publicKey:
              data.publicKey,

            redirectUrl:
              data.redirectUrl,
          },
        );

      checkout.open(
        (result: unknown) => {
          /*
           * Wompi redirige a
           * /pedido-confirmado?id=...
           * al cerrar el widget.
           * Si el usuario cierra
           * sin pagar, simplemente
           * habilitamos el botón
           * de nuevo.
           */
          setLoading(
            false,
          );

          void result;
        },
      );

      /*
       * Dejamos el botón activo
       * por si el usuario cierra
       * el widget sin pagar.
       */
      setLoading(false);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof
          Error
          ? checkoutError.message
          : "No pudimos iniciar el pago.",
      );

      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <section className="min-h-[65vh] bg-crema px-6 py-20 md:px-[120px]">
        <div className="mx-auto max-w-[850px]">
          <p className="eyebrow text-verde/55">
            Pago seguro
          </p>

          <h1 className="mt-4 font-display text-[clamp(48px,6vw,78px)] leading-none text-verde">
            {isDirect
              ? "La compra directa no es válida."
              : "No hay productos en tu carrito."}
          </h1>

          <Link
            to="/tienda"
            className="btn-primary mt-8"
          >
            Volver a la tienda
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-crema px-6 py-14 md:px-[120px] md:py-[90px]">
      <div className="relative mx-auto max-w-[1120px]">
        <Link
          to="/carrito"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-verde/55 transition-colors hover:text-verde"
        >
          <ArrowLeft className="size-4" />

          Volver al carrito
        </Link>

        <div className="mt-9 grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start">
          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
          >
            <p className="eyebrow text-verde/55">
              Checkout
            </p>

            <h1 className="mt-4 max-w-[650px] font-display text-[clamp(52px,6vw,82px)] leading-[0.94] tracking-[-0.045em] text-verde">
              Tu pedido,
              <br />
              listo para pagar.
            </h1>

            <p className="body-text mt-6 max-w-[560px] text-verde/68">
              Al continuar se
              abrirá el widget
              seguro de Wompi,
              donde podrás pagar
              con tarjeta, PSE o
              Nequi.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <TrustItem
                icon={
                  LockKeyhole
                }
                title="Pago seguro"
                text="Tus datos de tarjeta no pasan por nuestros servidores."
              />

              <TrustItem
                icon={
                  CreditCard
                }
                title="Wompi"
                text="Tarjeta, PSE o Nequi en la plataforma segura de Wompi."
              />

              <TrustItem
                icon={
                  ShieldCheck
                }
                title="Verificación"
                text="Confirmamos el estado del pago antes de cerrar el pedido."
              />
            </div>
          </motion.div>

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="overflow-hidden rounded-[28px] border border-verde/10 bg-salvia/40 p-7 shadow-[0_25px_75px_rgba(35,91,78,0.09)] md:p-8"
          >
            <div className="flex items-center justify-between">
              <p className="eyebrow text-verde/55">
                Tu pedido
              </p>

              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-verde/35">
                DALI
              </span>
            </div>

            <ul className="mt-7 space-y-5">
              {items.map(
                (item) => {
                  const unit =
                    getProductPriceCop(
                      item.slug,
                      item.size,
                    );

                  return (
                    <li
                      key={`${item.slug}-${item.size}`}
                      className="flex items-center gap-4 border-b border-verde/10 pb-5"
                    >
                      <img
                        src={
                          item.image
                        }
                        alt=""
                        className="size-16 rounded-[14px] object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="font-display text-[18px] text-verde">
                          {
                            item.name
                          }
                        </p>

                        <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-verde/45">
                          {
                            item.size
                          }{" "}
                          ×{" "}
                          {
                            item.qty
                          }
                        </p>
                      </div>

                      <span className="text-right text-[13px] font-semibold text-verde">
                        {unit
                          ? formatCop(
                              unit *
                                item.qty,
                            )
                          : "$XX.XXX"}
                      </span>
                    </li>
                  );
                },
              )}
            </ul>

            <div className="mt-7 flex items-end justify-between gap-5">
              <span className="text-[15px] font-semibold text-verde">
                Total productos
              </span>

              <span className="font-display text-[29px] leading-none text-verde">
                {pricesConfigured
                  ? formatCop(
                      subtotalCop,
                    )
                  : "$XX.XXX COP"}
              </span>
            </div>

            <p className="mt-3 text-[11px] leading-relaxed text-verde/50">
              Cualquier valor
              adicional de
              envío deberá
              definirse antes
              de producción si
              aplica.
            </p>

            {error && (
              <motion.div
                initial={{
                  opacity:
                    0,
                  y: 8,
                }}
                animate={{
                  opacity:
                    1,
                  y: 0,
                }}
                role="alert"
                className="mt-5 rounded-2xl border border-red-300/40 bg-red-50 p-4 text-[13px] leading-relaxed text-red-800"
              >
                {error}
              </motion.div>
            )}

            {!pricesConfigured && (
              <div className="mt-5 rounded-2xl border border-amber-500/30 bg-amber-50/70 p-4 text-[13px] leading-relaxed text-amber-900">
                Debes configurar
                los cinco precios
                comerciales en
                products.ts antes
                de poder cobrar.
              </div>
            )}

            <motion.button
              type="button"
              disabled={
                loading ||
                !pricesConfigured
              }
              onClick={
                beginCheckout
              }
              whileHover={
                !loading &&
                pricesConfigured
                  ? {
                      y: -3,
                    }
                  : undefined
              }
              whileTap={
                !loading &&
                pricesConfigured
                  ? {
                      scale:
                        0.985,
                    }
                  : undefined
              }
              className="btn-primary mt-7 flex w-full items-center justify-center disabled:cursor-not-allowed disabled:opacity-45"
            >
              {loading
                ? "Conectando con Wompi…"
                : "Pagar con Wompi"}

              {!loading && (
                <ArrowRight className="ml-2 size-4" />
              )}
            </motion.button>

            <div className="mt-5 flex items-center justify-center gap-2 text-verde/42">
              <LockKeyhole className="size-3.5" />

              <span className="text-[10px] uppercase tracking-[0.12em]">
                Procesado por
                Wompi — Tarjeta,
                PSE, Nequi
              </span>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

type WompiWidgetConstructor =
  new (config: {
    currency: string;
    amountInCents: number;
    reference: string;
    publicKey: string;
    redirectUrl: string;
    signature?: {
      integrity: string;
    };
  }) => {
    open: (
      onResult?: (
        result: unknown,
      ) => void,
    ) => void;
  };

declare global {
  interface Window {
    WidgetCheckout?: WompiWidgetConstructor;
  }
}

let wompiScriptPromise:
  | Promise<WompiWidgetConstructor>
  | null = null;

function loadWompiWidget(): Promise<WompiWidgetConstructor> {
  if (
    typeof window !==
      "undefined" &&
    window.WidgetCheckout
  ) {
    return Promise.resolve(
      window.WidgetCheckout,
    );
  }

  wompiScriptPromise ??=
    new Promise(
      (
        resolve,
        reject,
      ) => {
        if (
          typeof document ===
          "undefined"
        ) {
          reject(
            new Error(
              "El widget de Wompi solo está disponible en el navegador.",
            ),
          );
          return;
        }

        const script =
          document.createElement(
            "script",
          );

        script.src =
          "https://checkout.wompi.co/widget.js";

        script.async =
          true;

        script.onload =
          () => {
            if (
              window.WidgetCheckout
            ) {
              resolve(
                window.WidgetCheckout,
              );
            } else {
              reject(
                new Error(
                  "Wompi cargó pero no expuso su widget.",
                ),
              );
            }
          };

        script.onerror =
          () => {
            wompiScriptPromise =
              null;

            reject(
              new Error(
                "No pudimos cargar el widget de Wompi.",
              ),
            );
          };

        document.head.appendChild(
          script,
        );
      },
    );

  return wompiScriptPromise;
}

function TrustItem({
  icon: Icon,
  title,
  text,
}: {
  icon:
    typeof ShieldCheck;
  title: string;
  text: string;
}) {
  return (
    <div className="border-t border-verde/12 pt-5">
      <Icon
        className="size-5 text-verde"
        strokeWidth={
          1.4
        }
      />

      <p className="mt-4 font-display text-[19px] text-verde">
        {title}
      </p>

      <p className="mt-2 text-[12px] leading-relaxed text-verde/55">
        {text}
      </p>
    </div>
  );
}