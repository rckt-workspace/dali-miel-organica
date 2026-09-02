import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import {
  AnimatePresence,
  motion,
} from "motion/react";

import {
  useCart,
} from "@/lib/cart";

import {
  formatCop,
  getProductPriceCop,
} from "@/lib/products";

export const Route =
  createFileRoute(
    "/carrito",
  )({
    head: () => ({
      meta: [
        {
          title:
            "Tu carrito — Dalí Miel Orgánica",
        },
        {
          name:
            "description",
          content:
            "Revisa los productos de miel Dalí en tu carrito.",
        },
      ],
    }),

    component:
      Carrito,
  });

function Carrito() {
  const {
    items,
    setQty,
    remove,
    subtotalCop,
    pricesConfigured,
  } = useCart();

  if (
    items.length === 0
  ) {
    return (
      <section className="relative min-h-[70vh] overflow-hidden bg-crema px-6 py-20 md:px-[120px] md:py-[120px]">
        <div className="pointer-events-none absolute -right-20 top-10 font-display text-[180px] leading-none text-verde/[0.025] md:text-[300px]">
          DALI
        </div>

        <motion.div
          className="relative mx-auto flex max-w-[900px] flex-col items-start"
          initial={{
            opacity: 0,
            y: 24,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="grid size-16 place-items-center rounded-full bg-salvia/45 text-verde">
            <ShoppingBag
              className="size-7"
              strokeWidth={
                1.4
              }
            />
          </div>

          <p className="eyebrow mt-8 text-verde/55">
            Tu selección
          </p>

          <h1 className="mt-3 font-display text-[clamp(50px,7vw,92px)] leading-[0.95] tracking-[-0.05em] text-verde">
            Tu carrito
            <br />
            está vacío.
          </h1>

          <p className="body-text mt-6 max-w-[500px] text-verde/70">
            Explora nuestras
            mieles y encuentra
            la cosecha que
            quieres llevar a
            tu mesa.
          </p>

          <Link
            to="/tienda"
            className="btn-primary mt-8"
          >
            Ir a la tienda

            <ArrowRight className="ml-2 size-4" />
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-crema px-6 py-14 md:px-[120px] md:py-[90px]">
      <div className="relative mx-auto max-w-[1200px]">
        <p className="eyebrow text-verde/55">
          Tu selección
        </p>

        <h1 className="mt-3 font-display text-[clamp(50px,6vw,82px)] leading-none tracking-[-0.045em] text-verde">
          Tu carrito
        </h1>

        <p className="body-text mt-5 text-verde/65">
          {items.length}{" "}
          {items.length ===
          1
            ? "producto"
            : "productos"}{" "}
          en tu selección.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_370px] lg:items-start">
          <ul className="space-y-1">
            <AnimatePresence mode="popLayout">
              {items.map(
                (item) => {
                  const unitPrice =
                    getProductPriceCop(
                      item.slug,
                      item.size,
                    );

                  const lineTotal =
                    unitPrice
                      ? unitPrice *
                        item.qty
                      : null;

                  return (
                    <motion.li
                      layout
                      key={`${item.slug}-${item.size}`}
                      initial={{
                        opacity:
                          0,
                        x: -20,
                      }}
                      animate={{
                        opacity:
                          1,
                        x: 0,
                      }}
                      exit={{
                        opacity:
                          0,
                        x: 24,
                        height:
                          0,
                      }}
                      className="grid gap-5 border-b border-verde/10 py-6 sm:grid-cols-[110px_1fr_auto] sm:items-center"
                    >
                      <Link
                        to="/producto/$slug"
                        params={{
                          slug:
                            item.slug,
                        }}
                        className="block overflow-hidden rounded-[20px] bg-salvia/20"
                      >
                        <img
                          src={
                            item.image
                          }
                          alt={`Miel ${item.name}`}
                          className="aspect-square size-full object-cover"
                        />
                      </Link>

                      <div>
                        <Link
                          to="/producto/$slug"
                          params={{
                            slug:
                              item.slug,
                          }}
                          className="font-display text-[26px] text-verde"
                        >
                          {
                            item.name
                          }
                        </Link>

                        <p className="caption mt-1 text-verde/50">
                          {
                            item.size
                          }
                        </p>

                        <p className="mt-3 text-[14px] font-semibold text-verde/75">
                          {unitPrice
                            ? formatCop(
                                unitPrice,
                              )
                            : "Precio pendiente"}
                        </p>

                        <div className="mt-5 inline-flex items-center rounded-full border border-verde/15 bg-white/30 p-1">
                          <motion.button
                            type="button"
                            aria-label="Quitar uno"
                            onClick={() =>
                              setQty(
                                item.slug,
                                item.size,
                                item.qty -
                                  1,
                              )
                            }
                            whileTap={{
                              scale:
                                0.9,
                            }}
                            className="grid size-9 place-items-center rounded-full text-verde transition-colors hover:bg-verde hover:text-crema"
                          >
                            <Minus className="size-4" />
                          </motion.button>

                          <span className="min-w-10 text-center text-[14px] font-semibold text-verde">
                            {
                              item.qty
                            }
                          </span>

                          <motion.button
                            type="button"
                            aria-label="Añadir uno"
                            disabled={
                              item.qty >=
                              10
                            }
                            onClick={() =>
                              setQty(
                                item.slug,
                                item.size,
                                item.qty +
                                  1,
                              )
                            }
                            whileTap={{
                              scale:
                                0.9,
                            }}
                            className="grid size-9 place-items-center rounded-full text-verde transition-colors hover:bg-verde hover:text-crema disabled:cursor-not-allowed disabled:opacity-30"
                          >
                            <Plus className="size-4" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:flex-col sm:items-end">
                        <p className="font-display text-[22px] text-verde">
                          {lineTotal
                            ? formatCop(
                                lineTotal,
                              )
                            : "$XX.XXX COP"}
                        </p>

                        <motion.button
                          type="button"
                          onClick={() =>
                            remove(
                              item.slug,
                              item.size,
                            )
                          }
                          whileHover={{
                            scale:
                              1.06,
                          }}
                          whileTap={{
                            scale:
                              0.94,
                          }}
                          aria-label={`Eliminar ${item.name}`}
                          className="grid size-10 place-items-center rounded-full border border-verde/10 text-verde/45 transition-colors hover:border-red-300 hover:text-red-500"
                        >
                          <Trash2 className="size-4" />
                        </motion.button>
                      </div>
                    </motion.li>
                  );
                },
              )}
            </AnimatePresence>
          </ul>

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="sticky top-[125px] overflow-hidden rounded-[28px] border border-verde/10 bg-salvia/40 p-7 shadow-[0_24px_70px_rgba(35,91,78,0.08)] md:p-8"
          >
            <p className="eyebrow text-verde/55">
              Resumen
            </p>

            <div className="mt-7 flex items-center justify-between border-b border-verde/10 pb-5">
              <span className="text-[15px] text-verde/65">
                Productos
              </span>

              <span className="font-semibold text-verde">
                {
                  items.reduce(
                    (
                      total,
                      item,
                    ) =>
                      total +
                      item.qty,
                    0,
                  )
                }
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-5">
              <span className="text-[16px] font-semibold text-verde">
                Subtotal
              </span>

              <span className="font-display text-[27px] leading-none text-verde">
                {pricesConfigured
                  ? formatCop(
                      subtotalCop,
                    )
                  : "$XX.XXX COP"}
              </span>
            </div>

            <p className="mt-4 text-[13px] leading-relaxed text-verde/55">
              Los datos de
              entrega se
              completan durante
              el proceso de
              pago seguro.
            </p>

            {!pricesConfigured && (
              <div className="mt-5 rounded-2xl border border-amber-500/25 bg-amber-50/60 p-4 text-[13px] leading-relaxed text-amber-900">
                Los precios
                comerciales
                todavía no han
                sido configurados.
              </div>
            )}

            {pricesConfigured ? (
              <Link
                to="/checkout"
                className="btn-primary mt-7 flex w-full items-center justify-center"
              >
                Continuar a pago

                <ArrowRight className="ml-2 size-4" />
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="btn-primary mt-7 flex w-full cursor-not-allowed items-center justify-center opacity-45"
              >
                Continuar a pago
              </button>
            )}

            <div className="mt-6 flex items-center gap-3 text-verde/50">
              <ShieldCheck
                className="size-5 shrink-0"
                strokeWidth={
                  1.4
                }
              />

              <p className="text-[11px] leading-relaxed">
                Pago procesado
                de forma segura
                por Stripe.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}