import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Star,
  Store,
} from "lucide-react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  useRef,
} from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  ProductCard,
} from "@/components/ProductCard";

import {
  pureProducts,
  spicyProducts,
} from "@/lib/products";

import {
  HoneyThread,
  SectionReveal,
  useHeroImageHover,
} from "@/components/motion";

import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";
import heroFoto from "@/assets/hero-banner-dali.png.asset.json";

export const Route =
  createFileRoute("/")({
    head: () => ({
      meta: [
        {
          title:
            "Dalí — Miel cruda orgánica de la altillanura colombiana",
        },
        {
          name:
            "description",
          content:
            "Miel 100% orgánica con denominación de origen, cosechada en los bosques tropicales de la Orinoquia. Multifloral y Dalí Picante Chile Morita.",
        },
        {
          property:
            "og:title",
          content:
            "Dalí — Miel cruda orgánica de Colombia",
        },
        {
          property:
            "og:description",
          content:
            "Vida, sabiduría y bienestar en cada cosecha. Miel cruda orgánica colombiana.",
        },
      ],
    }),

    component: Index,
  });

function Index() {
  const heroRef =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion();

  const {
    transformX,
    transformY,
    transformScale,
  } =
    useHeroImageHover(
      heroRef,
    );

  return (
    <>
      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          bg-crema
        "
      >
        {/* =================================================
            MOBILE HERO
        ================================================== */}

        <motion.div
          className="
            relative
            w-full
            overflow-hidden
            bg-crema

            h-[540px]

            min-[420px]:h-[590px]

            sm:h-[640px]

            md:hidden
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <motion.img
            src={
              heroFoto.url
            }
            alt="Pan con mantequilla y miel Dalí Caucho cayendo, junto al frasco de miel Caucho"
            className="
              absolute
              inset-0

              h-full
              w-full

              object-cover

              object-[82%_center]

              min-[420px]:object-[85%_center]
            "
            initial={false}
            animate={{
              scale:
                reducedMotion
                  ? 1
                  : 1.015,
            }}
            transition={{
              duration: 1.1,
            }}
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(90deg, rgba(249,246,228,.93) 0%, rgba(249,246,228,.74) 42%, rgba(249,246,228,.15) 75%, transparent 100%)",
            }}
          />

          <div
            className="
              absolute
              inset-x-0
              top-0

              flex
              w-full
              max-w-full
              flex-col

              px-5
              pt-5

              min-[420px]:px-6
              min-[420px]:pt-7

              sm:px-8
            "
          >
            <motion.p
              className="
                eyebrow
                max-w-[82%]
                text-verde
              "
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.3,
              }}
            >
              De los bosques
              tropicales de
              Colombia
            </motion.p>

            <motion.h1
              className="
                h1-display
                mt-7

                max-w-[94%]

                text-verde

                sm:max-w-[75%]
              "
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.3,
              }}
            >
              Miel que nace donde
              <br />
              Colombia respira
            </motion.h1>

            <motion.p
              className="
                body-text
                mt-8

                max-w-[70%]

                text-verde/90

                min-[420px]:max-w-[64%]

                sm:max-w-[52%]
              "
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.35,
                duration: 0.3,
              }}
            >
              Miel 100% orgánica
              de la altillanura
              colombiana, con
              denominación de
              origen.
            </motion.p>

            <motion.div
              className="
                mt-8
                self-start

                sm:mt-10
              "
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
                duration: 0.3,
              }}
            >
              <Link
                to="/tienda"
                className="
                  btn-primary
                  btn-sm
                "
              >
                Descubre nuestra miel
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* =================================================
            TABLET / DESKTOP HERO
        ================================================== */}

        <motion.div
          ref={heroRef}
          className="
            relative
            hidden

            min-h-[620px]

            md:block

            lg:min-h-[640px]
          "
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.5,
          }}
        >
          <motion.img
            src={
              heroFoto.url
            }
            alt="Pan con mantequilla y miel Dalí Caucho cayendo, junto al frasco"
            className="
              absolute
              inset-0

              h-full
              w-full

              object-cover

              object-[72%_center]

              lg:object-[70%_center]
            "
            style={{
              scale:
                transformScale,

              x:
                transformX,

              y:
                transformY,
            }}
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(90deg, var(--color-crema) 0%, rgba(249,246,228,0.88) 33%, rgba(249,246,228,0.42) 57%, rgba(249,246,228,0) 76%)",
            }}
          />

          {/* ORINOQUIA */}

          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0

              flex
              items-center
              justify-start

              overflow-hidden

              pl-8

              lg:pl-12
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
          >
            <div
              className="
                whitespace-nowrap

                font-display

                text-[100px]
                leading-none

                text-crema

                opacity-[0.08]

                lg:text-[150px]

                xl:text-[180px]
              "
            >
              ORINOQUIA
            </div>
          </motion.div>

          <div
            className="
              relative

              mx-auto

              flex

              min-h-[620px]
              max-w-[1440px]

              items-start

              px-10

              pb-[90px]
              pt-[82px]

              lg:min-h-[640px]
              lg:px-[72px]
              lg:pb-[110px]
              lg:pt-[92px]

              xl:px-[120px]
            "
          >
            <div
              className="
                flex
                min-w-0

                max-w-[520px]
                flex-col

                lg:max-w-[560px]
              "
            >
              <motion.p
                className="
                  eyebrow
                  text-verde
                "
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                }}
              >
                De los bosques
                tropicales de
                Colombia
              </motion.p>

              <motion.h1
                className="
                  h1-display
                  mt-9

                  max-w-[620px]

                  text-verde

                  lg:mt-10
                "
                style={{
                  fontSize:
                    "clamp(34px, 4vw, 56px)",

                  lineHeight:
                    "105%",
                }}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 0.4,
                }}
              >
                Miel que nace donde
                <br />
                Colombia respira
              </motion.h1>

              <motion.p
                className="
                  body-text

                  mt-10

                  max-w-[420px]

                  text-verde/85

                  lg:mt-12
                  lg:max-w-[440px]
                "
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                }}
              >
                Miel 100% orgánica
                de la altillanura
                colombiana, con
                denominación de
                origen. Vida,
                sabiduría y bienestar
                en cada cosecha — sin
                atajos y sin pedir
                permiso.
              </motion.p>

              <motion.div
                className="
                  mt-10
                  self-start

                  lg:mt-12
                "
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.65,
                  duration: 0.4,
                }}
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
              >
                <Link
                  to="/tienda"
                  className="
                    btn-primary
                    hover:shadow-lg
                  "
                  style={{
                    boxShadow:
                      "0 0 30px 15px rgba(252,214,114,0.08)",
                  }}
                >
                  Descubre nuestra miel
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          HONEY THREAD
      ====================================================== */}

      <HoneyThread
        length={120}
      />

      {/* =====================================================
          PURE PRODUCTS
      ====================================================== */}

      <section
        className="
          page-gutter

          relative
          overflow-hidden

          py-14

          sm:py-16

          md:py-20

          lg:py-[110px]

          xl:py-[120px]
        "
      >
        <motion.div
          className="
            deco-bg

            absolute
            inset-0

            opacity-[0.04]
          "
          style={{
            backgroundImage:
              `url(${formas.url})`,

            backgroundPosition:
              "center",
          }}
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    0,
                    -6,
                    0,
                  ],
                }
          }
          transition={{
            duration: 9,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <motion.img
          src={
            perezoso.url
          }
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="
            pointer-events-none

            absolute

            left-2
            top-6

            hidden

            w-[145px]

            mix-blend-multiply

            lg:block

            xl:w-[160px]
          "
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    0,
                    8,
                    0,
                  ],

                  rotate: [
                    0,
                    1,
                    0,
                  ],
                }
          }
          transition={{
            duration: 7,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <motion.img
          src={
            osoHormiguero.url
          }
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="
            pointer-events-none

            absolute

            bottom-6
            right-2

            hidden

            w-[175px]

            mix-blend-multiply

            lg:block

            xl:w-[200px]
          "
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    0,
                    -6,
                    0,
                  ],

                  rotate: [
                    0,
                    -0.8,
                    0,
                  ],
                }
          }
          transition={{
            duration: 8,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1200px]
          "
        >
          <SectionReveal
            direction="up"
            delay={0.05}
          >
            <div
              className="
                flex
                flex-col
                items-center

                gap-3

                text-center
              "
            >
              <p
                className="
                  eyebrow
                  text-verde
                "
              >
                Nuestra miel
              </p>

              <h2
                className="
                  h2-display

                  max-w-[720px]

                  text-verde
                "
              >
                Nuestra cosecha
                disponible
              </h2>
            </div>
          </SectionReveal>

          {/*
           * IMPORTANTE:
           *
           * NO hay opacity:0 en toda la grid.
           * Cada ProductCard maneja su propia
           * entrada y su propio stagger.
           */}

          <div
            className="
              mt-9

              grid
              grid-cols-1

              gap-7

              sm:mt-11

              md:mt-14
              md:grid-cols-2

              lg:grid-cols-3
              lg:gap-8
            "
          >
            {pureProducts.map(
              (
                product,
                index,
              ) => (
                <ProductCard
                  key={
                    product.slug
                  }
                  product={
                    product
                  }
                  delay={
                    index *
                    0.09
                  }
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          DALI PICANTE
      ====================================================== */}

      <section
        className="
          page-gutter

          relative
          overflow-hidden

          bg-crema

          py-14

          sm:py-16

          md:py-20

          lg:py-[100px]
        "
      >
        <motion.div
          className="
            deco-bg

            absolute
            inset-0

            opacity-[0.04]
          "
          style={{
            backgroundImage:
              `url(${formas.url})`,

            backgroundPosition:
              "center",
          }}
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    0,
                    4,
                    0,
                  ],
                }
          }
          transition={{
            duration: 10,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1200px]
          "
        >
          <SectionReveal
            direction="up"
          >
            <div
              className="
                flex
                flex-col
                items-center

                gap-3

                text-center
              "
            >
              <p
                className="
                  eyebrow
                  text-picante-naranja
                "
              >
                Dalí Picante
              </p>

              <h2
                className="
                  h2-display

                  max-w-[800px]

                  text-verde
                "
              >
                Miel con carácter,
                para quien le gusta
                que las cosas piquen
              </h2>
            </div>
          </SectionReveal>

          <div
            className="
              mx-auto

              mt-9

              grid

              max-w-[880px]

              grid-cols-1

              gap-7

              sm:mt-11

              md:mt-14
              md:grid-cols-2

              lg:gap-8
            "
          >
            {spicyProducts.map(
              (
                product,
                index,
              ) => (
                <ProductCard
                  key={
                    product.slug
                  }
                  product={
                    product
                  }
                  delay={
                    index *
                    0.11
                  }
                />
              ),
            )}
          </div>

          <SectionReveal
            direction="up"
            delay={0.1}
          >
            <div
              className="
                mt-9

                flex
                justify-center

                md:mt-12
              "
            >
              <Link
                to="/tienda"
                search={{
                  linea:
                    "picante",
                }}
                className="
                  btn-picante
                  max-w-full
                "
              >
                Ver la línea picante
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* =====================================================
          WHOLESALE
      ====================================================== */}

      <section
        className="
          page-gutter

          bg-verde

          py-12

          md:py-16

          lg:py-20
        "
      >
        <div
          className="
            mx-auto

            flex

            max-w-[1200px]

            flex-col

            items-stretch

            gap-7

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:gap-10
          "
        >
          <SectionReveal
            direction="left"
            className="
              min-w-0
              flex-1
            "
          >
            <div
              className="
                flex

                min-w-0

                items-start

                gap-4

                sm:gap-5

                lg:items-center
              "
            >
              <Store
                className="
                  size-9

                  shrink-0

                  text-salvia

                  sm:size-10

                  lg:size-12
                "
                strokeWidth={1.4}
                aria-hidden="true"
              />

              <div
                className="
                  min-w-0
                  max-w-[640px]
                "
              >
                <h3
                  className="
                    font-display

                    text-[22px]

                    leading-tight

                    text-crema

                    md:text-[26px]

                    lg:text-[28px]
                  "
                >
                  ¿Tienes un negocio?
                </h3>

                <p
                  className="
                    body-text

                    mt-2

                    text-crema/85

                    md:mt-3
                  "
                >
                  Lleva Dalí a tu
                  restaurante, tienda
                  o empresa con
                  condiciones
                  especiales para
                  compras al por mayor.
                </p>
              </div>
            </div>
          </SectionReveal>

          <SectionReveal
            direction="right"
            className="
              w-full

              lg:w-auto
              lg:shrink-0
            "
          >
            <Link
              to="/mayoristas"
              className="
                flex

                min-h-12

                w-full

                items-center
                justify-center

                rounded-full

                bg-salvia

                px-6
                py-3.5

                text-center

                text-[14px]

                font-semibold

                leading-[1.25]

                text-verde

                transition-colors

                hover:bg-salvia-dark

                sm:px-8
                sm:text-[15px]

                lg:w-auto
                lg:whitespace-nowrap
                lg:text-[16px]
              "
            >
              Conoce nuestras
              condiciones
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* =====================================================
          PHILOSOPHY
      ====================================================== */}

      <section
        className="
          relative

          grid

          overflow-hidden

          bg-verde

          md:grid-cols-2
        "
      >
        <motion.div
          className="
            deco-bg

            absolute
            inset-0

            opacity-[0.08]
          "
          style={{
            backgroundImage:
              `url(${ocelote.url})`,

            backgroundPosition:
              "center",
          }}
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [
                    0,
                    -8,
                    0,
                  ],

                  rotate: [
                    0,
                    0.5,
                    0,
                  ],
                }
          }
          transition={{
            duration: 11,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <div
          className="
            relative
            min-w-0
          "
        >
          <motion.img
            src={
              bosque.url
            }
            alt="Apicultores de Dalí revisando un panal en los bosques de la hacienda La Sonora"
            loading="lazy"
            decoding="async"
            width={1024}
            height={1400}
            className="
              h-[300px]

              w-full

              object-cover

              object-[center_25%]

              sm:h-[420px]

              md:h-full
              md:min-h-[520px]

              lg:max-h-[640px]
            "
            initial={false}
            whileInView={
              reducedMotion
                ? undefined
                : {
                    scale:
                      1.015,
                  }
            }
            viewport={{
              amount: 0.05,
            }}
            transition={{
              duration: 0.8,

              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            style={{
              boxShadow:
                "0 15px 40px rgba(35,91,78,0.35)",
            }}
          />

          <div
            className="
              pointer-events-none

              absolute
              inset-0
            "
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to top right, rgba(35,91,78,0.25) 0%, rgba(35,91,78,0.12) 35%, rgba(35,91,78,0) 60%)",
            }}
          />

          <span
            className="
              absolute

              bottom-5
              left-5

              inline-flex

              rounded-lg

              bg-crema

              p-2
            "
          >
            <img
              src={
                logo.url
              }
              alt=""
              className="
                h-6
                w-auto
              "
            />
          </span>
        </div>

        <div
          className="
            relative

            flex

            min-w-0

            flex-col

            justify-center

            gap-5

            px-5
            py-12

            sm:px-6
            sm:py-14

            md:px-10
            md:py-16

            lg:px-[72px]
            lg:py-20

            xl:px-[100px]
          "
        >
          <SectionReveal
            direction="right"
            delay={0.05}
          >
            <p
              className="
                eyebrow
                text-salvia
              "
            >
              Nuestra filosofía
            </p>
          </SectionReveal>

          <SectionReveal
            direction="right"
            delay={0.1}
          >
            <h2
              className="
                h2-display
                text-crema
              "
            >
              Parte del respeto,
              la humildad

              <br
                className="
                  hidden
                  lg:block
                "
              />

              {" "}
              y la conservación
              de la tierra
            </h2>
          </SectionReveal>

          <SectionReveal
            direction="right"
            delay={0.15}
          >
            <p
              className="
                body-text

                max-w-[620px]

                text-crema/85
              "
            >
              Nuestros apiarios
              están en tres bosques
              que hoy forman parte
              de un sistema
              silvopastoril en la
              hacienda La Sonora.
              Animales como el oso
              de palma, el tigrillo
              y el oso perezoso han
              vuelto a habitar estos
              bosques gracias a
              nuestro modelo
              sostenible de
              conservación y
              reforestación.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}

      <section
        className="
          page-gutter

          bg-crema

          py-14

          md:py-20

          lg:py-[100px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[1200px]
          "
        >
          <SectionReveal
            direction="up"
          >
            <div
              className="
                flex
                flex-col
                items-center

                gap-3

                text-center
              "
            >
              <p
                className="
                  eyebrow
                  text-verde
                "
              >
                Lo que dicen
              </p>

              <h2
                className="
                  h2-display
                  text-verde
                "
              >
                Miel que se
                recomienda sola
              </h2>
            </div>
          </SectionReveal>

          <div
            className="
              mt-9

              grid
              grid-cols-1

              gap-6

              md:mt-12
              md:grid-cols-2

              lg:grid-cols-3
            "
          >
            {[
              "La mejor miel que he probado, se nota que es 100% natural.",

              "Me encanta que puedo saber exactamente de dónde viene mi miel.",

              "Calidad excepcional, ya es parte de mi desayuno todos los días.",
            ].map(
              (
                quote,
                index,
              ) => (
                <SectionReveal
                  key={
                    quote
                  }
                  direction="up"
                  delay={
                    index *
                    0.05
                  }
                  className="
                    h-full
                  "
                >
                  <figure
                    className="
                      card-soft

                      flex
                      h-full
                      min-w-0
                      flex-col

                      gap-4

                      bg-crema

                      p-6

                      lg:p-7
                    "
                  >
                    <div
                      className="
                        flex
                        gap-1
                      "
                      aria-label="5 de 5 estrellas"
                    >
                      {[
                        0,
                        1,
                        2,
                        3,
                        4,
                      ].map(
                        (
                          i,
                        ) => (
                          <Star
                            key={
                              i
                            }
                            className="
                              size-4
                            "
                            style={{
                              color:
                                "var(--color-honey)",

                              fill:
                                "var(--color-honey)",
                            }}
                            aria-hidden="true"
                          />
                        ),
                      )}
                    </div>

                    <blockquote
                      className="
                        body-text
                        flex-1
                        text-verde
                      "
                    >
                      “{quote}”
                    </blockquote>

                    <figcaption
                      className="
                        caption
                        text-verde/60
                      "
                    >
                      Cliente verificado
                    </figcaption>
                  </figure>
                </SectionReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section
        className="
          page-gutter

          py-14

          md:py-20

          lg:py-[100px]
        "
      >
        <div
          className="
            mx-auto
            max-w-[820px]
          "
        >
          <SectionReveal
            direction="up"
          >
            <div
              className="
                flex
                flex-col
                items-center

                gap-3

                text-center
              "
            >
              <p
                className="
                  eyebrow
                  text-verde
                "
              >
                Preguntas frecuentes
              </p>

              <h2
                className="
                  h2-display
                  text-verde
                "
              >
                Lo que nos
                preguntan seguido
              </h2>
            </div>
          </SectionReveal>

          <Accordion
            type="single"
            collapsible
            className="
              mt-8
              md:mt-12
            "
          >
            {[
              {
                q:
                  "¿La miel de Dalí es orgánica?",

                a:
                  "Sí, es 100% orgánica — sin químicos ni procesos industriales, del panal a la mesa.",
              },
              {
                q:
                  "¿La miel es procesada o cruda?",

                a:
                  "Es miel cruda, no procesada — así aparece certificado directamente en la etiqueta de cada producto.",
              },
              {
                q:
                  "¿Cómo debo almacenar la miel?",

                a:
                  "Mantener en un lugar fresco, alejado de la luz solar — instrucción que viene impresa en la etiqueta del producto.",
              },
              {
                q:
                  "¿De dónde viene la miel Dalí?",

                a:
                  "De los bosques tropicales de Colombia, en la Orinoquia, específicamente de la hacienda La Sonora — con denominación de origen colombiana.",
              },
            ].map(
              (
                item,
              ) => (
                <AccordionItem
                  key={
                    item.q
                  }
                  value={
                    item.q
                  }
                  className="
                    border-verde/15
                  "
                >
                  <AccordionTrigger
                    className="
                      text-left

                      font-display

                      text-[17px]

                      leading-[1.25]

                      text-verde

                      sm:text-[18px]

                      md:text-[20px]
                    "
                  >
                    {item.q}
                  </AccordionTrigger>

                  <AccordionContent
                    className="
                      body-text
                      text-verde/85
                    "
                  >
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ),
            )}
          </Accordion>
        </div>
      </section>

      {/* =====================================================
          CLOSING
      ====================================================== */}

      <section
        className="
          page-gutter

          flex
          flex-col
          items-center

          gap-6

          py-16

          text-center

          md:py-[100px]
        "
      >
        <SectionReveal
          direction="up"
        >
          <h2
            className="
              h2-display
              text-verde
            "
          >
            Lleva Dalí a tu mesa
          </h2>
        </SectionReveal>

        <SectionReveal
          direction="up"
          delay={0.05}
        >
          <Link
            to="/tienda"
            className="
              btn-primary
            "
          >
            Ir a la tienda
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}