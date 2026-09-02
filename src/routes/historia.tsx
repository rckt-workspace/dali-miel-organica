import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  HeartHandshake,
  Leaf,
} from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type ReactNode,
  useRef,
} from "react";

import {
  StoryExoticCarousel,
  type StoryCarouselImage,
} from "@/components/StoryExoticCarousel";

import bosque from "@/assets/apicultores.png.asset.json";
import panalApicultor from "@/assets/panal-apicultor.png.asset.json";
import panalAbejas from "@/assets/panal-abejas.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";

export const Route =
  createFileRoute("/historia")({
    head: () => ({
      meta: [
        {
          title:
            "Nuestra Historia — Dalí Miel Orgánica",
        },
        {
          name: "description",
          content:
            "Dalí nace en la hacienda La Sonora: conservación, reforestación y miel cruda con denominación de origen en la Orinoquia colombiana.",
        },
        {
          property: "og:title",
          content: "Nuestra Historia — Dalí",
        },
        {
          property: "og:description",
          content:
            "Vida, regeneración, educación y santuario de la llanura colombiana.",
        },
      ],
    }),
    component: Historia,
  });

const gallery: StoryCarouselImage[] = [
  {
    src: bosque.url,
    alt:
      "Apicultores de Dalí revisando un panal en el bosque tropical de la hacienda La Sonora",
  },
  {
    src: panalApicultor.url,
    alt:
      "Apicultor sosteniendo un marco de panal lleno de miel",
  },
  {
    src: panalAbejas.url,
    alt:
      "Primer plano de abejas trabajando sobre un panal",
  },
];

const principios = [
  {
    number: "01",
    Icon: HeartHandshake,
    title:
      "Honesta y transparente",
    text:
      "Hablamos claro y directo sobre nuestros productos. Nuestra miel es orgánica, directamente de los bosques tropicales de Colombia, sin químicos ni procesos industriales, del panal a la mesa.",
    direction: "left" as const,
  },
  {
    number: "02",
    Icon: Leaf,
    title:
      "Apicultura responsable",
    text:
      "Contamos con apiarios sostenibles y procesos 100% orgánicos, sin sobrecargar la tierra ni usar métodos agresivos de producción. Generamos vida y empleo, anteponiendo el bienestar de nuestro ecosistema.",
    direction: "up" as const,
  },
  {
    number: "03",
    Icon: Award,
    title:
      "Calidad excepcional",
    text:
      "Nuestros apicultores tienen experiencia y se capacitan día a día para brindar lo mejor, porque la única forma de tener un producto de calidad es con compromiso.",
    direction: "right" as const,
  },
];

type RevealProps = {
  children: ReactNode;
  className?: string;
  direction?:
    | "left"
    | "right"
    | "up";
  delay?: number;
};

function StoryReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
}: RevealProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const inView = useInView(
    ref,
    {
      amount: 0.16,
      margin: "-8% 0px -8% 0px",
    },
  );

  const reducedMotion =
    useReducedMotion();

  const hidden =
    reducedMotion
      ? {
          opacity: 1,
          x: 0,
          y: 0,
        }
      : {
          opacity: 0,
          x:
            direction === "left"
              ? -38
              : direction ===
                  "right"
                ? 38
                : 0,
          y:
            direction === "up"
              ? 30
              : 0,
        };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={hidden}
      animate={
        inView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : hidden
      }
      transition={{
        duration: 0.68,
        delay,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      {children}
    </motion.div>
  );
}

function Historia() {
  const reducedMotion =
    useReducedMotion();

  const heroRef =
    useRef<HTMLElement>(null);

  const philosophyRef =
    useRef<HTMLElement>(null);

  const {
    scrollYProgress:
      heroScroll,
  } = useScroll({
    target: heroRef,
    offset: [
      "start start",
      "end start",
    ],
  });

  const {
    scrollYProgress:
      philosophyScroll,
  } = useScroll({
    target: philosophyRef,
    offset: [
      "start end",
      "end start",
    ],
  });

  const heroImageY =
    useTransform(
      heroScroll,
      [0, 1],
      [0, 34],
    );

  const heroWordX =
    useTransform(
      heroScroll,
      [0, 1],
      [-20, 28],
    );

  const philosophyImageY =
    useTransform(
      philosophyScroll,
      [0, 1],
      [-20, 24],
    );

  const philosophyWordX =
    useTransform(
      philosophyScroll,
      [0, 1],
      [-30, 28],
    );

  const animalY =
    useTransform(
      philosophyScroll,
      [0, 1],
      [32, -28],
    );

  return (
    <div className="overflow-hidden bg-crema">

      {/* ==================================================
          HERO
      =================================================== */}

      <section
        ref={heroRef}
        className="relative overflow-hidden bg-verde"
      >
        {/* Luz cálida */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-36 top-[15%] size-[440px] rounded-full opacity-[0.11] blur-[105px]"
          style={{
            background:
              "radial-gradient(circle, #FCD672 0%, transparent 70%)",
          }}
        />

        {/* Palabra editorial */}
        {/* curvas botánicas */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-100px] top-[-50px] hidden h-[600px] w-[600px] opacity-[0.09] lg:block"
          viewBox="0 0 600 600"
          fill="none"
        >
          <path
            d="M92 548C126 410 201 292 310 201C392 132 480 91 563 53"
            stroke="#B7D8AA"
            strokeWidth="1.2"
          />

          <path
            d="M228 285C260 250 276 209 278 162"
            stroke="#FCD672"
            strokeWidth="1"
          />

          <path
            d="M313 198C345 227 383 241 429 237"
            stroke="#B7D8AA"
            strokeWidth="1"
          />
        </svg>

        <div className="relative mx-auto grid min-h-[680px] max-w-[1440px] items-center gap-10 px-6 pb-24 pt-14 md:px-[120px] md:pb-[135px] md:pt-[95px] lg:grid-cols-[0.98fr_1.02fr] lg:gap-16">

          {/* texto */}
          <div className="relative z-20">
            <motion.p
              className="eyebrow text-salvia"
              initial={{
                opacity: 0,
                y: -16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.55,
              }}
            >
              Nuestra historia
            </motion.p>

            <motion.h1
              className="mt-4 max-w-[760px] font-display text-[clamp(54px,6.2vw,92px)] leading-[0.94] tracking-[-0.045em] text-crema"
              initial={{
                opacity: 0,
                x: -34,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.75,
                delay: 0.06,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              Del panal
              <br />
              a tu mesa
            </motion.h1>

            <motion.p
              className="body-text mt-7 max-w-[650px] text-crema/84"
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.68,
                delay: 0.16,
              }}
            >
              El hogar de nuestros
              apiarios son los bosques
              tropicales de Colombia,
              en la Orinoquia.
              Nuestra misión es llevar
              miel y otros productos a
              todo el país y a
              diferentes partes del
              mundo. La idea es que
              estos, además de
              representar a Colombia,
              a su fauna y flora,
              también brinden los
              beneficios y propiedades
              que solo podrán conocer
              mediante la experiencia
              Dalí. Al ser una marca
              con denominación de
              origen expresamos vida,
              sabiduría y bienestar en
              cada cosecha, pilares de
              la comunidad y la región
              donde trabajamos. Dalí
              es una marca
              orgullosamente
              colombiana y llanera,
              miel cultivada y
              cosechada en nuestro
              país, pulmón del mundo.
            </motion.p>

            <motion.div
              className="mt-9 flex items-center gap-4"
              initial={{
                opacity: 0,
                y: 16,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.28,
                duration: 0.6,
              }}
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-salvia/70">
                La Sonora
              </span>

              <span className="h-px w-10 bg-miel/55" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-crema/45">
                Colombia
              </span>
            </motion.div>
          </div>

          {/* fotografía hero */}
          <motion.div
            style={{
              y:
                reducedMotion
                  ? 0
                  : heroImageY,
            }}
            initial={{
              opacity: 0,
              x: 42,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.85,
              delay: 0.12,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="relative z-10 hidden lg:block"
          >
            <div
              aria-hidden="true"
              className="absolute -inset-10 rounded-[44%_56%_59%_41%/43%_39%_61%_57%] border border-salvia/15"
            />

            <div
              aria-hidden="true"
              className="absolute -inset-16 rounded-full opacity-[0.18] blur-[70px]"
              style={{
                background:
                  "radial-gradient(circle, #FCD672, transparent 68%)",
              }}
            />

            <motion.div
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.022,
                      x: -4,
                      y: -3,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 22,
              }}
              className="relative overflow-hidden rounded-[34px] shadow-[0_40px_90px_rgba(7,36,29,0.34)]"
            >
              <img
                src={bosque.url}
                alt="Apicultores de Dalí revisando un panal en el bosque tropical"
                className="aspect-[4/5] w-full object-cover"
              />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-verde/20 via-transparent to-transparent"
              />

              <div className="absolute bottom-5 left-5 rounded-full border border-crema/15 bg-verde/60 px-4 py-2 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-[0.17em] text-crema/80">
                  Hacienda La Sonora
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* móvil */}
          <motion.div
            className="relative z-10 lg:hidden"
            initial={{
              opacity: 0,
              y: 24,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.22,
            }}
          >
            <img
              src={bosque.url}
              alt="Apicultores de Dalí revisando un panal en el bosque tropical"
              className="aspect-[4/3] w-full rounded-[26px] object-cover shadow-[0_24px_55px_rgba(8,40,32,0.3)]"
            />
          </motion.div>
        </div>

        {/* transición orgánica */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[-1px] left-0 h-[70px] w-full md:h-[110px]"
        >
          <path
            d="M0 54C205 10 395 91 616 55C865 15 1090 18 1440 72V120H0Z"
            fill="var(--color-crema)"
          />
        </svg>
      </section>

      {/* ==================================================
          FILOSOFÍA
      =================================================== */}

      <section
        ref={philosophyRef}
        className="relative overflow-hidden bg-crema px-6 py-20 md:px-[120px] md:py-[125px]"
      >
        {/* patrón muy tenue */}
        <div
          aria-hidden="true"
          className="deco-bg pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              `url(${formas.url})`,
          }}
        />

        <div className="relative mx-auto grid max-w-[1220px] items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* imagen */}
          <StoryReveal
            direction="left"
          >
            <motion.div
              style={{
                y:
                  reducedMotion
                    ? 0
                    : philosophyImageY,
              }}
              className="relative"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-8 -left-8 size-40 rounded-full bg-salvia/20 blur-[48px]"
              />

              <div className="relative overflow-hidden rounded-[30px] shadow-[0_30px_75px_rgba(35,91,78,0.16)]">
                <img
                  src={panalApicultor.url}
                  alt="Apicultor sosteniendo un marco de panal lleno de miel"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-verde/25 via-transparent to-transparent"
                />
              </div>

              {/* imagen flotante */}
              <motion.div
                className="absolute -bottom-12 -right-5 hidden w-[42%] overflow-hidden rounded-[22px] border-[5px] border-crema shadow-[0_24px_55px_rgba(35,91,78,.18)] md:block"
                whileHover={
                  reducedMotion
                    ? undefined
                    : {
                        y: -5,
                        rotate: 1,
                      }
                }
              >
                <img
                  src={panalAbejas.url}
                  alt="Primer plano de abejas trabajando sobre un panal"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </motion.div>
            </motion.div>
          </StoryReveal>

          {/* copy */}
          <StoryReveal
            direction="right"
            className="relative z-10"
          >
            <p className="eyebrow text-verde">
              Nuestra filosofía
            </p>

            <h2 className="mt-4 max-w-[620px] font-display text-[clamp(42px,4.5vw,68px)] leading-[0.99] tracking-[-0.04em] text-verde">
              Parte del respeto,
              la humildad y la
              conservación de la
              tierra
            </h2>

            <p className="body-text mt-7 max-w-[610px] text-verde/82">
              Donde nos es posible
              realizar este proyecto.
              Esta marca nace en la
              hacienda La Sonora, en
              la que hace más de diez
              años nos alejamos de las
              prácticas comunes de
              ganadería para regenerar
              la vida y ser ejemplo de
              coexistencia con la
              naturaleza, agradeciendo
              a nuestro hábitat lo que
              nos proveen. Es por esto
              que nuestros apiarios
              están ubicados en tres
              bosques que hoy en día
              forman parte de un
              sistema silvopastoril.
              Allí, la ganadería es
              amigable con el ambiente,
              pero también nosotros,
              que formamos parte de
              proyectos de conservación
              y reforestación, los
              cuales están dando
              resultados positivos en
              las zonas donde los
              desarrollamos. Nuestra
              finca es el hogar de un
              sistema en el que
              prevalece el trabajo
              comunitario, la
              reforestación y la
              conservación de la fauna
              y flora. Gracias a este
              modelo sostenible y
              amigable con el
              medioambiente, animales
              como el oso de palma, el
              tigrillo y el oso
              perezoso, que habían
              abandonado sus tierras
              por la huella humana,
              hoy vuelven a habitar
              nuestros bosques. Dalí
              es vida, regeneración,
              educación y santuario
              de la llanura
              colombiana.
            </p>

            <div className="mt-9 flex items-center gap-4">
              <span className="size-2 rounded-full bg-miel shadow-[0_0_18px_rgba(252,214,114,.8)]" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.17em] text-verde/55">
                Vida · Regeneración · Santuario
              </span>
            </div>
          </StoryReveal>
        </div>

        {/* perezoso como descubrimiento */}
        <motion.img
          src={perezoso.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          style={{
            y:
              reducedMotion
                ? 0
                : animalY,
          }}
          className="pointer-events-none absolute -bottom-5 right-[-28px] hidden w-[145px] opacity-[0.72] mix-blend-multiply xl:block"
        />
      </section>

      {/* ==================================================
          PRINCIPIOS
      =================================================== */}

      <section className="relative overflow-hidden bg-verde px-6 py-20 md:px-[120px] md:py-[115px]">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[150px] top-[-140px] size-[430px] rounded-full opacity-[0.11] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #FCD672, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px]">

          <StoryReveal>
            <p className="eyebrow text-salvia">
              Lo que nos mueve
            </p>

            <h2 className="mt-4 font-display text-[clamp(44px,5vw,72px)] leading-none tracking-[-0.04em] text-crema">
              Nuestros Principios
            </h2>
          </StoryReveal>

          <div className="relative mt-14 grid gap-12 md:grid-cols-3 md:gap-10">

            {/* línea conectora */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[8%] right-[8%] top-[41px] hidden h-px bg-gradient-to-r from-miel/0 via-miel/30 to-miel/0 md:block"
            />

            {principios.map(
              (
                {
                  number,
                  Icon,
                  title,
                  text,
                  direction,
                },
                index,
              ) => (
                <StoryReveal
                  key={title}
                  direction={direction}
                  delay={index * 0.07}
                >
                  <motion.article
                    className="group relative"
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 250,
                      damping: 22,
                    }}
                  >
                    <div className="mb-7 flex items-center justify-between">
                      <motion.span
                        className="relative z-10 grid size-[82px] place-items-center rounded-full border border-salvia/25 bg-verde text-salvia shadow-[0_12px_30px_rgba(6,36,29,.18)] transition-colors duration-300 group-hover:border-miel/45"
                        whileHover={
                          reducedMotion
                            ? undefined
                            : {
                                scale:
                                  1.045,
                            }
                        }
                      >
                        <Icon
                          className="size-8"
                          strokeWidth={1.35}
                          aria-hidden="true"
                        />
                      </motion.span>

                      <span className="font-display text-[46px] leading-none text-crema/[0.09] transition-colors duration-300 group-hover:text-miel/[0.18]">
                        {number}
                      </span>
                    </div>

                    <h3 className="max-w-[310px] font-display text-[26px] leading-[1.08] text-crema">
                      {title}
                    </h3>

                    <p className="body-text mt-4 max-w-[340px] text-crema/76">
                      {text}
                    </p>

                    <motion.div
                      aria-hidden="true"
                      className="mt-7 h-px w-14 origin-left bg-miel/40"
                      whileHover={
                        reducedMotion
                          ? undefined
                          : {
                              scaleX:
                                1.7,
                          }
                      }
                    />
                  </motion.article>
                </StoryReveal>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ==================================================
          GALERÍA / CARRUSEL 3D
      =================================================== */}

      <section className="relative overflow-hidden bg-crema px-6 pb-20 pt-20 md:px-[120px] md:pb-[125px] md:pt-[110px]">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[45%] size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, #B7D8AA, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-[1200px]">

          <StoryReveal className="text-center">
            <p className="eyebrow text-verde">
              El origen
            </p>

            <h2 className="mt-4 font-display text-[clamp(42px,5vw,72px)] leading-[0.98] tracking-[-0.04em] text-verde">
              Los bosques de
              <br className="hidden sm:block" />
              {" "}
              La Sonora
            </h2>

            <p className="body-text mx-auto mt-5 max-w-[620px] text-verde/68">
              Tres miradas al lugar
              donde la conservación,
              las abejas y quienes
              trabajan con ellas se
              encuentran.
            </p>
          </StoryReveal>

          <div className="mt-5 md:mt-7">
            <StoryExoticCarousel
              images={gallery}
              autoPlay
              interval={5400}
            />
          </div>
        </div>
      </section>
    </div>
  );
}