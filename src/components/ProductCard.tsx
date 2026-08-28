import {
  Link,
} from "@tanstack/react-router";

import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  useRef,
  useState,
} from "react";

import type {
  Product,
} from "@/lib/products";

import {
  useCart,
} from "@/lib/cart";

import {
  ProductBadges,
} from "@/components/ProductBadges";

import {
  TiltCard,
} from "@/components/motion";

export function ProductCard({
  product,
}: {
  product: Product;
}) {
  const {
    add,
  } =
    useCart();

  const picante =
    product.line ===
    "picante";

  const cover =
    product.gallery?.[
      0
    ] ??
    product.image;

  const [
    isHovering,
    setIsHovering,
  ] =
    useState(false);

  const articleRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion();

  /*
   * Se activa ligeramente antes
   * de que la tarjeta llegue al
   * centro de la pantalla.
   */
  const isInView =
    useInView(
      articleRef,
      {
        amount:
          0.02,

        margin:
          "0px 0px 12% 0px",
      },
    );

  return (
    <motion.article
      ref={articleRef}
      className="
        min-w-0
        w-full
      "
      initial={
        false
      }

      /*
       * CRÍTICO:
       *
       * opacity SIEMPRE es 1.
       *
       * Así un IntersectionObserver
       * nunca puede dejar el producto
       * invisible en dispositivos
       * móviles.
       */
      animate={{
        opacity: 1,

        y:
          reducedMotion
            ? 0
            : isInView
              ? 0
              : 18,
      }}
      transition={{
        duration:
          0.5,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      <TiltCard
        className="
          card-soft
          flex
          min-w-0
          w-full
          flex-col
          gap-4
          overflow-visible
          bg-crema

          p-5
          pt-5

          sm:p-6
          sm:pt-6

          lg:p-8
          lg:pt-7
        "
        style={{
          borderTop:
            `6px solid ${product.accent}`,
        }}
      >
        <div
          className="
            flex
            min-w-0
            flex-col
            gap-4
          "
          onPointerEnter={(
            event,
          ) => {
            if (
              event.pointerType ===
              "mouse"
            ) {
              setIsHovering(
                true,
              );
            }
          }}
          onPointerLeave={() => {
            setIsHovering(
              false,
            );
          }}
        >
          {/* PRODUCT IMAGE */}
          <Link
            to="/producto/$slug"
            params={{
              slug:
                product.slug,
            }}
            className="
              block
              w-full
              overflow-hidden
              rounded-2xl
              bg-crema

              h-[220px]

              min-[420px]:h-[250px]

              sm:h-[280px]

              md:h-[235px]

              lg:h-[260px]

              xl:h-[280px]
            "
          >
            <img
              src={cover}
              alt={`Frasco de miel ${product.name} de Dalí`}
              loading="lazy"
              decoding="async"
              width={
                1024
              }
              height={
                1280
              }
              className="
                size-full
                object-cover
                object-center

                transition-transform
                duration-500
              "
              style={{
                transform:
                  isHovering &&
                  !reducedMotion
                    ? "scale(1.055)"
                    : "scale(1)",
              }}
            />
          </Link>

          {/* NAME */}
          <Link
            to="/producto/$slug"
            params={{
              slug:
                product.slug,
            }}
            className="
              h3-display
              break-words
              text-verde
            "
          >
            {
              product.name
            }
          </Link>

          {/* TASTING */}
          <p
            className="
              body-text
              text-verde
            "
          >
            {
              product.tasting
            }
          </p>

          {/* SIZE */}
          <p
            className="
              caption
              text-verde/60
            "
          >
            {
              product
                .sizes[0]
            }
          </p>

          {/* BADGES */}
          <ProductBadges
            badges={
              product.badges
            }
            accent={
              product.accent
            }
          />

          {/* PRICE + BUY */}
          <div
            className="
              mt-auto
              flex
              flex-col
              gap-3
              pt-2
            "
          >
            <div>
              <span
                className="
                  body-text
                  font-semibold
                  text-verde
                "
              >
                {
                  product.price
                }
              </span>

              <span
                className="
                  caption
                  mt-1
                  block
                  text-verde/50
                "
              >
                Precio de referencia
                — próximamente
              </span>
            </div>

            <button
              type="button"
              className={`
                w-full

                ${
                  picante
                    ? "btn-picante"
                    : "btn-primary"
                }

                btn-sm
              `}
              onClick={() =>
                add({
                  slug:
                    product.slug,

                  name:
                    product.name,

                  size:
                    product
                      .sizes[0],

                  image:
                    cover,

                  price:
                    product.price,
                })
              }
            >
              Comprar
            </button>
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}