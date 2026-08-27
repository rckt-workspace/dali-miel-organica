import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
}

export function SectionReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
}: SectionRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    left: { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } },
    up: { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 } },
  };

  return (
    <motion.div
      ref={ref}
      initial={variants[direction].initial}
      animate={isInView ? variants[direction].animate : variants[direction].initial}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
}
