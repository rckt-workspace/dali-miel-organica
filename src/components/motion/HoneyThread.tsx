import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface HoneyThreadProps {
  startOffset?: number;
  length?: number;
}

export function HoneyThread({ startOffset = 0, length = 200 }: HoneyThreadProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.8, 0.8, 0]);

  return (
    <div
      ref={ref}
      className="pointer-events-none relative w-full"
      style={{ height: length }}
    >
      <svg
        className="absolute left-1/2 top-0 w-1 overflow-visible"
        style={{ transform: "translateX(-50%)" }}
        viewBox="0 0 2 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d={`M 1 0 Q 0 50, 1 100 Q 2 150, 1 200`}
          stroke="#FCD672"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          style={{ pathLength, opacity }}
        />
      </svg>
    </div>
  );
}
