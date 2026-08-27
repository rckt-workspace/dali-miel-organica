import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Mail,
  MessageCircle,
  Send,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  type ReactNode,
  useRef,
  useState,
} from "react";

import colibries from "@/assets/colibries.png.asset.json";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Escríbenos para pedidos, distribución o alianzas con Dalí Miel Orgánica.",
      },
      { property: "og:title", content: "Contacto — Dalí" },
      {
        property: "og:description",
        content: "Escríbenos: pedidos, distribución y alianzas.",
      },
    ],
  }),
  component: Contacto,
});

type ScrollDirection = "up" | "down";

function useScrollDirection(): ScrollDirection {
  const { scrollY } = useScroll();
  const lastY = useRef(0);
  const [direction, setDirection] = useState<ScrollDirection>("down");

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastY.current;
    const difference = latest - previous;

    if (Math.abs(difference) < 6) return;

    const nextDirection: ScrollDirection =
      difference > 0 ? "down" : "up";

    setDirection((current) =>
      current === nextDirection ? current : nextDirection,
    );

    lastY.current = latest;
  });

  return direction;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  from?: "left" | "right" | "up";
  delay?: number;
};

function Reveal({
  children,
  className = "",
  from = "up",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.18 });
  const direction = useScrollDirection();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const hiddenX =
    from === "left"
      ? direction === "down"
        ? -36
        : 36
      : from === "right"
        ? direction === "down"
          ? 36
          : -36
        : 0;

  const hiddenY =
    from === "up"
      ? direction === "down"
        ? 28
        : -28
      : 0;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x: hiddenX,
        y: hiddenY,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
            }
          : {
              opacity: 0,
              x: hiddenX,
              y: hiddenY,
            }
      }
      transition={{
        duration: 0.62,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

function Contacto() {
  const [sent, setSent] = useState(false);
  const reducedMotion = useReducedMotion();

  const pageRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"],
  });

  const backgroundWordX = useTransform(
    scrollYProgress,
    [0, 1],
    [-24, 28],
  );

  const birdsY = useTransform(
    scrollYProgress,
    [0, 0.6],
    [0, reducedMotion ? 0 : 34],
  );

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 22,
    mass: 0.6,
  });

  const birdX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const birdPointerY = useTransform(smoothY, [-1, 1], [-7, 7]);

  function handlePointerMove(
    event: React.PointerEvent<HTMLDivElement>,
  ) {
    if (reducedMotion) return;

    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const normalizedX =
      ((event.clientX - rect.left) / rect.width) * 2 - 1;

    const normalizedY =
      ((event.clientY - rect.top) / rect.height) * 2 - 1;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  }

  function resetPointer() {
    pointerX.set(0);
    pointerY.set(0);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <div ref={pageRef} className="overflow-hidden bg-crema">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section
        className="relative overflow-hidden bg-verde px-6 pb-20 pt-14 md:px-[120px] md:pb-28 md:pt-24"
        onPointerMove={handlePointerMove}
        onPointerLeave={resetPointer}
      >
        {/* Honey glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-[10%] size-[430px] rounded-full opacity-[0.12] blur-[90px]"
          style={{
            background:
              "radial-gradient(circle, #FCD672 0%, transparent 70%)",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-[-180px] size-[520px] rounded-full opacity-[0.12] blur-[110px]"
          style={{
            background:
              "radial-gradient(circle, #B7D8AA 0%, transparent 70%)",
          }}
        />

        {/* Giant editorial typography */}
        <motion.div
          aria-hidden="true"
          style={{
            x: reducedMotion ? 0 : backgroundWordX,
          }}
          className="pointer-events-none absolute left-[-3vw] top-[8%] select-none whitespace-nowrap font-display text-[clamp(110px,18vw,280px)] leading-none tracking-[-0.06em] text-crema/[0.035]"
        >
          CONTACTO
        </motion.div>

        {/* Fine botanical lines */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-[-70px] top-[10%] hidden h-[420px] w-[420px] opacity-[0.1] lg:block"
          viewBox="0 0 420 420"
          fill="none"
        >
          <path
            d="M44 370C92 258 119 189 209 113C275 58 338 53 394 31"
            stroke="#B7D8AA"
            strokeWidth="1.2"
          />
          <path
            d="M132 247C166 220 188 181 197 134"
            stroke="#FCD672"
            strokeWidth="1"
          />
          <path
            d="M204 116C220 145 248 164 283 170"
            stroke="#B7D8AA"
            strokeWidth="1"
          />
          <ellipse
            cx="131"
            cy="248"
            rx="6"
            ry="11"
            transform="rotate(32 131 248)"
            stroke="#FCD672"
            strokeWidth="1"
          />
          <ellipse
            cx="284"
            cy="169"
            rx="6"
            ry="11"
            transform="rotate(75 284 169)"
            stroke="#B7D8AA"
            strokeWidth="1"
          />
        </svg>

        <div className="relative mx-auto grid max-w-[1240px] items-center gap-14 lg:grid-cols-[0.93fr_1.07fr] lg:gap-16">
          {/* Hero copy */}
          <div className="relative z-20">
            <motion.p
              className="eyebrow text-salvia"
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Contacto
            </motion.p>

            <motion.h1
              className="mt-4 max-w-[680px] font-display text-[clamp(52px,6.2vw,92px)] leading-[0.93] tracking-[-0.045em] text-crema"
              initial={{ opacity: 0, x: -34 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.72,
                delay: 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Escríbenos
            </motion.h1>

            <motion.p
              className="body-text mt-7 max-w-[590px] text-crema/85"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.65,
                delay: 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              Pedidos, distribución, alianzas o simplemente curiosidad
              por la miel de la altillanura: respondemos todos los
              mensajes.
            </motion.p>

            {/* Conversation topics */}
            <motion.div
              className="mt-8 flex flex-wrap gap-2.5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.24,
              }}
            >
              {["Pedidos", "Distribución", "Alianzas"].map(
                (item, index) => (
                  <motion.span
                    key={item}
                    whileHover={
                      reducedMotion
                        ? undefined
                        : {
                            y: -2,
                          }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 22,
                    }}
                    className="rounded-full border border-crema/15 bg-crema/[0.055] px-4 py-2 text-[12px] font-medium uppercase tracking-[0.14em] text-crema/80 backdrop-blur-sm"
                  >
                    <span className="mr-2 text-miel">
                      0{index + 1}
                    </span>
                    {item}
                  </motion.span>
                ),
              )}
            </motion.div>

            <motion.button
              type="button"
              onClick={scrollToForm}
              className="group mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-miel px-6 py-3 text-[14px] font-semibold text-verde shadow-[0_15px_45px_rgba(252,214,114,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crema focus-visible:ring-offset-2 focus-visible:ring-offset-verde"
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      y: -3,
                      scale: 1.01,
                    }
              }
              whileTap={
                reducedMotion
                  ? undefined
                  : {
                      scale: 0.985,
                    }
              }
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                type: "spring",
                stiffness: 250,
                damping: 21,
              }}
            >
              Cuéntanos qué tienes en mente

              <motion.span
                className="inline-flex"
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, 3, 0],
                      }
                }
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown
                  className="size-4"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </motion.span>
            </motion.button>

            {/* Social links */}
            <motion.div
              className="mt-10 flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.42,
              }}
            >
              <span className="mr-2 text-[11px] uppercase tracking-[0.17em] text-crema/45">
                Encuéntranos
              </span>

              {[
                {
                  label: "Instagram",
                  Icon: Instagram,
                },
                {
                  label: "Facebook",
                  Icon: Facebook,
                },
                {
                  label: "Email",
                  Icon: Mail,
                },
              ].map(({ label, Icon }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-crema/15 text-crema/80 transition-colors hover:border-miel/60 hover:bg-crema/[0.06] hover:text-miel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-miel"
                  whileHover={
                    reducedMotion
                      ? undefined
                      : {
                          y: -3,
                          scale: 1.04,
                        }
                  }
                  whileTap={
                    reducedMotion
                      ? undefined
                      : {
                          scale: 0.95,
                        }
                  }
                >
                  <Icon
                    className="size-[18px]"
                    strokeWidth={1.5}
                  />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            className="relative hidden min-h-[520px] items-center justify-center lg:flex"
            initial={{ opacity: 0, x: 40, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* halo */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(252,214,114,.18), rgba(183,216,170,.08) 48%, transparent 72%)",
              }}
            />

            {/* organic orbit */}
            <motion.div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_61%_39%/42%_39%_61%_58%] border border-salvia/20"
              animate={
                reducedMotion
                  ? undefined
                  : {
                      rotate: [0, 4, 0],
                      scale: [1, 1.015, 1],
                    }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <motion.img
              src={colibries.url}
              alt=""
              aria-hidden="true"
              draggable={false}
              style={{
                x: reducedMotion ? 0 : birdX,
                y: reducedMotion ? 0 : birdsY,
              }}
              whileHover={
                reducedMotion
                  ? undefined
                  : {
                      scale: 1.025,
                    }
              }
              transition={{
                scale: {
                  type: "spring",
                  stiffness: 170,
                  damping: 20,
                },
              }}
              className="relative z-10 w-full max-w-[560px] select-none object-contain drop-shadow-[0_28px_40px_rgba(9,43,35,0.26)]"
            />

            {/* cursor-follow depth layer */}
            <motion.div
              aria-hidden="true"
              style={{
                y: reducedMotion ? 0 : birdPointerY,
                x: reducedMotion ? 0 : birdX,
              }}
              className="pointer-events-none absolute bottom-[12%] right-[10%] size-3 rounded-full bg-miel shadow-[0_0_26px_rgba(252,214,114,0.65)]"
            />

            <div className="absolute bottom-8 right-6 z-20 text-right">
              <p className="text-[10px] uppercase tracking-[0.22em] text-salvia/70">
                DALI
              </p>
              <p className="mt-1 font-display text-[18px] text-crema/65">
                Orinoquia colombiana
              </p>
            </div>
          </motion.div>
        </div>

        {/* organic bottom transition */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="pointer-events-none absolute bottom-[-1px] left-0 h-[55px] w-full md:h-[80px]"
        >
          <path
            d="M0 48C210 8 390 77 610 50C840 21 1020 6 1440 55V90H0Z"
            fill="var(--color-crema)"
          />
        </svg>
      </section>

      {/* =====================================================
          CONTACT / FORM
      ====================================================== */}
      <section
        ref={formRef}
        className="relative scroll-mt-28 overflow-hidden bg-crema px-6 pb-24 pt-16 md:px-[120px] md:pb-32 md:pt-24"
      >
        {/* subtle honey line */}
        <motion.div
          aria-hidden="true"
          className="absolute left-[8%] top-14 hidden h-px w-[34%] origin-left bg-gradient-to-r from-miel/0 via-miel/70 to-miel/0 lg:block"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ amount: 0.4 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[180px] -left-[150px] h-[430px] w-[430px] rounded-full opacity-[0.1] blur-[100px]"
          style={{
            background:
              "radial-gradient(circle, #B7D8AA 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-20">
          {/* Left editorial column */}
          <Reveal from="left" className="lg:sticky lg:top-36">
            <p className="eyebrow text-verde">
              Conversemos
            </p>

            <h2 className="mt-4 max-w-[470px] font-display text-[clamp(42px,4.8vw,70px)] leading-[0.98] tracking-[-0.04em] text-verde">
              Queremos saber de ti.
            </h2>

            <p className="body-text mt-6 max-w-[460px] text-verde/75">
              Cuéntanos en qué podemos ayudarte y déjanos tus datos.
              Estamos aquí para escucharte.
            </p>

            <div className="mt-10 border-t border-verde/10 pt-6">
              <div className="flex items-start gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-salvia/45 text-verde">
                  <MessageCircle
                    className="size-5"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-verde/45">
                    DALI / CONTACTO
                  </p>

                  <p className="mt-2 max-w-[330px] font-display text-[20px] leading-snug text-verde">
                    Pedidos, distribución, alianzas y todo lo que
                    quieras saber sobre nuestra miel.
                  </p>
                </div>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="relative mt-12 hidden h-24 lg:block"
            >
              <span className="absolute left-2 top-0 font-display text-[78px] leading-none text-verde/[0.045]">
                DALI
              </span>

              <span className="absolute bottom-3 left-3 size-2.5 rounded-full bg-miel shadow-[0_0_24px_rgba(252,214,114,.65)]" />

              <svg
                className="absolute bottom-2 left-7 h-12 w-36"
                viewBox="0 0 144 48"
                fill="none"
              >
                <path
                  d="M0 34C32 3 72 54 144 10"
                  stroke="#235B4E"
                  strokeOpacity="0.18"
                  strokeWidth="1.2"
                />
              </svg>
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal from="right">
            <div className="relative overflow-hidden rounded-[28px] border border-verde/[0.09] bg-[#fffdf1] p-6 shadow-[0_28px_80px_rgba(35,91,78,0.09)] md:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-24 size-[250px] rounded-full opacity-[0.15] blur-[70px]"
                style={{
                  background:
                    "radial-gradient(circle, #FCD672 0%, transparent 72%)",
                }}
              />

              <div className="relative">
                <div className="mb-9 flex items-end justify-between gap-4 border-b border-verde/10 pb-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-verde/45">
                      Mensaje
                    </p>

                    <h3 className="mt-2 font-display text-[30px] leading-tight text-verde md:text-[34px]">
                      Escríbenos
                    </h3>
                  </div>

                  <span className="font-display text-[42px] leading-none text-verde/[0.08]">
                    01
                  </span>
                </div>

                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{
                        opacity: 0,
                        y: 22,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -15,
                      }}
                      transition={{
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex min-h-[390px] flex-col items-start justify-center"
                    >
                      <motion.div
                        initial={
                          reducedMotion
                            ? undefined
                            : {
                                scale: 0.65,
                                rotate: -8,
                              }
                        }
                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 17,
                        }}
                        className="grid size-16 place-items-center rounded-full bg-salvia/55 text-verde shadow-[0_14px_40px_rgba(35,91,78,0.10)]"
                      >
                        <Check
                          className="size-7"
                          strokeWidth={1.7}
                          aria-hidden="true"
                        />
                      </motion.div>

                      <p className="eyebrow mt-7 text-verde/55">
                        Recibido
                      </p>

                      <h3 className="mt-3 max-w-[430px] font-display text-[38px] leading-[1.05] text-verde md:text-[44px]">
                        Mensaje enviado.
                      </h3>

                      <p className="body-text mt-5 max-w-[430px] text-verde/70">
                        Gracias por escribirnos. Nos pondremos en contacto
                        contigo.
                      </p>

                      <motion.button
                        type="button"
                        onClick={() => setSent(false)}
                        className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-verde underline decoration-verde/20 underline-offset-4"
                        whileHover={
                          reducedMotion
                            ? undefined
                            : {
                                x: 3,
                              }
                        }
                      >
                        Enviar otro mensaje
                        <ArrowRight
                          className="size-4"
                          strokeWidth={1.6}
                        />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        y: -12,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-6"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSent(true);
                      }}
                    >
                      {/* Nombre */}
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 16,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{ amount: 0.4 }}
                        transition={{
                          delay: 0.03,
                          duration: 0.48,
                        }}
                        className="group"
                      >
                        <label
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-verde/55 transition-colors group-focus-within:text-verde"
                          htmlFor="nombre"
                        >
                          Nombre
                        </label>

                        <input
                          id="nombre"
                          name="nombre"
                          required
                          autoComplete="name"
                          className="w-full rounded-2xl border border-verde/[0.12] bg-crema px-4 py-3.5 text-[15px] text-verde outline-none transition-all duration-300 placeholder:text-verde/30 focus:-translate-y-[1px] focus:border-verde/40 focus:shadow-[0_12px_32px_rgba(35,91,78,0.08),0_0_0_3px_rgba(252,214,114,0.13)]"
                          placeholder="Tu nombre"
                        />
                      </motion.div>

                      {/* Email */}
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 16,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{ amount: 0.4 }}
                        transition={{
                          delay: 0.09,
                          duration: 0.48,
                        }}
                        className="group"
                      >
                        <label
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-verde/55 transition-colors group-focus-within:text-verde"
                          htmlFor="email"
                        >
                          Email
                        </label>

                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          autoComplete="email"
                          className="w-full rounded-2xl border border-verde/[0.12] bg-crema px-4 py-3.5 text-[15px] text-verde outline-none transition-all duration-300 placeholder:text-verde/30 focus:-translate-y-[1px] focus:border-verde/40 focus:shadow-[0_12px_32px_rgba(35,91,78,0.08),0_0_0_3px_rgba(252,214,114,0.13)]"
                          placeholder="tu@correo.com"
                        />
                      </motion.div>

                      {/* Mensaje */}
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 16,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{ amount: 0.3 }}
                        transition={{
                          delay: 0.15,
                          duration: 0.48,
                        }}
                        className="group"
                      >
                        <label
                          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.13em] text-verde/55 transition-colors group-focus-within:text-verde"
                          htmlFor="mensaje"
                        >
                          Mensaje
                        </label>

                        <textarea
                          id="mensaje"
                          name="mensaje"
                          required
                          rows={5}
                          className="w-full resize-none rounded-2xl border border-verde/[0.12] bg-crema px-4 py-3.5 text-[15px] leading-relaxed text-verde outline-none transition-all duration-300 placeholder:text-verde/30 focus:-translate-y-[1px] focus:border-verde/40 focus:shadow-[0_12px_32px_rgba(35,91,78,0.08),0_0_0_3px_rgba(252,214,114,0.13)]"
                          placeholder="Cuéntanos en qué podemos ayudarte"
                        />
                      </motion.div>

                      <motion.button
                        type="submit"
                        className="group mt-1 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-verde px-6 py-3.5 text-[14px] font-semibold text-crema shadow-[0_16px_35px_rgba(35,91,78,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-verde/40 focus-visible:ring-offset-2 sm:w-auto sm:self-start"
                        whileHover={
                          reducedMotion
                            ? undefined
                            : {
                                y: -3,
                                scale: 1.01,
                              }
                        }
                        whileTap={
                          reducedMotion
                            ? undefined
                            : {
                                scale: 0.985,
                              }
                        }
                        transition={{
                          type: "spring",
                          stiffness: 320,
                          damping: 23,
                        }}
                      >
                        <Send
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-[1px] group-hover:translate-x-[2px]"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />

                        Enviar mensaje

                        <ArrowRight
                          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}