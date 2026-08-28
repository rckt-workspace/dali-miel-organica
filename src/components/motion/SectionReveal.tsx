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

  distance?: number;
}

export function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  distance = 52,
}: SectionRevealProps) {
  const ref =
    useRef<HTMLDivElement>(null);

  const reducedMotion =
    useReducedMotion();

  /*
   * Sigue siendo BIDIRECCIONAL.
   *
   * El threshold es bajo para no volver
   * a tener elementos congelados en móvil.
   */
  const isInView =
    useInView(ref, {
      amount: 0.04,
      margin: "0px 0px -3% 0px",
    });

  const hidden = {
    left: {
      opacity: 0.18,
      x: -distance,
      y: 0,
      scale: 0.985,
    },

    right: {
      opacity: 0.18,
      x: distance,
      y: 0,
      scale: 0.985,
    },

    up: {
      opacity: 0.18,
      x: 0,
      y: distance * 0.75,
      scale: 0.985,
    },

    down: {
      opacity: 0.18,
      x: 0,
      y: -(distance * 0.75),
      scale: 0.985,
    },
  };

  const visible = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
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
            : hidden[direction]
      }
      transition={{
        type: "spring",
        stiffness: 92,
        damping: 18,
        mass: 0.85,

        duration,

        delay:
          isInView
            ? delay
            : 0,
      }}
      style={{
        minWidth: 0,
        willChange:
          "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
}