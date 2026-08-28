import {
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";

import {
  type ReactNode,
  useRef,
} from "react";

interface SectionRevealProps {
  children: ReactNode;

  direction?:
    | "left"
    | "right"
    | "up"
    | "down";

  delay?: number;

  duration?: number;

  className?: string;
}

export function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.58,
  className = "",
}: SectionRevealProps) {
  const ref =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion();

  /*
   * Umbral pequeño para que funcione
   * correctamente también en móviles
   * con viewport corto.
   *
   * Al usar useInView sin once:true,
   * el movimiento sigue siendo
   * bidireccional:
   *
   * entra -> visible
   * sale  -> vuelve al estado inicial
   * entra de nuevo -> anima otra vez
   */
  const isInView =
    useInView(
      ref,
      {
        amount: 0.04,

        margin:
          "0px 0px -4% 0px",
      },
    );

  const hidden = {
    left: {
      opacity: 0,
      x: -32,
      y: 0,
    },

    right: {
      opacity: 0,
      x: 32,
      y: 0,
    },

    up: {
      opacity: 0,
      x: 0,
      y: 26,
    },

    down: {
      opacity: 0,
      x: 0,
      y: -26,
    },
  };

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={
        reducedMotion
          ? visible
          : isInView
            ? visible
            : hidden[
                direction
              ]
      }
      transition={{
        duration,

        delay:

          isInView
            ? delay
            : 0,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      style={{
        minWidth: 0,
      }}
    >
      {children}
    </motion.div>
  );
}