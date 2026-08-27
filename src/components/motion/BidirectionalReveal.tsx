import { motion, useInView } from "motion/react";
import { useRef, ReactNode } from "react";

type Direction = "left" | "right" | "up" | "down";

interface BidirectionalRevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
}

export function BidirectionalReveal({
  children,
  direction = "up",
  delay = 0,
  distance = 40,
  duration = 0.5,
}: BidirectionalRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-80px", amount: 0.2 });

  const getInitial = (scrollingDown: boolean) => {
    const variants = {
      left: scrollingDown
        ? { opacity: 0, x: -distance }
        : { opacity: 0, x: distance },
      right: scrollingDown
        ? { opacity: 0, x: distance }
        : { opacity: 0, x: -distance },
      up: scrollingDown ? { opacity: 0, y: distance } : { opacity: 0, y: -distance },
      down: scrollingDown
        ? { opacity: 0, y: -distance }
        : { opacity: 0, y: distance },
    };
    return variants[direction];
  };

  const animate = isInView
    ? { opacity: 1, x: 0, y: 0 }
    : getInitial(true);

  return (
    <motion.div
      ref={ref}
      initial={getInitial(true)}
      animate={animate}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
