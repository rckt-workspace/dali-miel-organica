import {
  Link,
  useNavigate,
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

interface ProductCardProps {
  product: Product;

  /*
   * Permite stagger sin envolver
   * toda la grid en opacity: 0.
   */
  delay?: number;
}

export function ProductCard({
  product,
  delay = 0,
}: ProductCardProps) {
  const {
    add,
  } = useCart();

  const navigate =
    useNavigate();

  const picante =
    product.line ===
    "picante";

  const cover =
    product.gallery?.[0] ??
    product.image;

  const addToCart = () =>
    add({
      slug: product.slug,
      name: product.name,
      size: product.sizes[0],
      image: cover,
      price: product.price,
    });

  const [
    isHovering,
    setIsHovering,
  ] = useState(false);

  const articleRef =
    useRef<HTMLElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion();

  const isInView =
    useInView(
      articleRef,
      {
        amount: 0.035,

        /*
         * Activa antes de que llegue
         * completamente al viewport.
         */
        margin:
          "0px 0px 10% 0px",
      },
    );

  return (
    <motion.article
      ref={articleRef}
      className="
        min-w-0
        w-full
        h-full
      "
      initial={false}
      animate={
        reducedMotion
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              rotateZ: 0,
            }
          : isInView
            ? {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateZ: 0,
              }
            : {
                /*
                 * No usamos opacity 0.
                 *
                 * Si el observer falla,
                 * todavía hay contenido.
                 */
                opacity: 0.28,
                y: 42,
                scale: 0.965,
                rotateZ: -0.35,
              }
      }
      transition={{
        type:
          "spring",

        stiffness:
          105,

        damping:
          18,

        mass:
          0.8,

        delay:
          isInView
            ? delay
            : 0,
      }}
      style={{
        willChange:
          "transform, opacity",
      }}
    >
      <TiltCard
        className="
          card-soft

          flex
          min-w-0
          w-full
          h-full
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
            flex-1
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
          <Link
            to="/producto/$slug"
            params={{
              slug:
                product.slug,
            }}
            className="
              relative

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
            <motion.img
              src={cover}
              alt={`Frasco de miel ${product.name} de Dalí`}
              loading="lazy"
              decoding="async"
              width={1024}
              height={1280}
              className="
                size-full

                object-cover
                object-center
              "
              animate={{
                scale:
                  isHovering &&
                  !reducedMotion
                    ? 1.075
                    : 1,

                x:
                  isHovering &&
                  !reducedMotion
                    ? 3
                    : 0,
              }}
              transition={{
                type:
                  "spring",

                stiffness:
                  125,

                damping:
                  18,
              }}
            />

            {/* halo de producto */}
            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute
                inset-0
              "
              animate={{
                opacity:
                  isHovering
                    ? 0.17
                    : 0,
              }}
              transition={{
                duration:
                  0.3,
              }}
              style={{
                background:
                  `radial-gradient(circle at 50% 75%, ${product.accent}, transparent 65%)`,
              }}
            />
          </Link>

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
            {product.name}
          </Link>

          <p
            className="
              body-text
              text-verde
            "
          >
            {product.tasting}
          </p>

          <p
            className="
              caption
              text-verde/60
            "
          >
            {product.sizes[0]}
          </p>

          <ProductBadges
            badges={
              product.badges
            }
            accent={
              product.accent
            }
          />

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
                {product.price}
              </span>

              <span
                className="
                  caption

                  mt-1
                  block

                  text-verde/50
                "
              >
                Precio de
                referencia —
                próximamente
              </span>
            </div>

            {product.available ? (
              <div
                className="relative z-10 flex flex-col gap-2"
                data-no-tilt
              >
                <motion.button
                  type="button"
                  aria-label={`Comprar ahora ${product.name}`}
                  className={`
                    w-full

                    pointer-events-auto

                    ${
                      picante
                        ? "btn-picante"
                        : "btn-primary"
                    }

                    btn-sm
                  `}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    console.info(
                      "[checkout] click en comprar ahora",
                      product.slug,
                    );
                    navigate({
                      to: "/checkout",
                      search: {
                        producto:
                          product.slug,
                        cantidad: 1,
                        modo: "directo",
                        presentacion:
                          product.sizes[0],
                      },
                    });
                  }}
                >
                  Comprar ahora
                </motion.button>

                <motion.button
                  type="button"
                  aria-label={`Añadir ${product.name} al carrito`}
                  className="
                    btn-secondary
                    btn-sm

                    w-full

                    pointer-events-auto
                  "
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();
                    console.info(
                      "[carrito] click en añadir al carrito",
                      product.slug,
                    );
                    addToCart();
                  }}
                >
                  Añadir al carrito
                </motion.button>
              </div>
            ) : (
              <p
                className="
                  caption
                  rounded-full
                  border
                  border-verde/25
                  px-4
                  py-2
                  text-center
                  text-verde/60
                "
              >
                Próximamente
              </p>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.article>
  );
}