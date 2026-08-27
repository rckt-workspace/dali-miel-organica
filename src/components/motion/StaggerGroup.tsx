import { motion } from "motion/react";
import { ReactNode } from "react";

interface StaggerGroupProps {
  children: ReactNode | ReactNode[];
  staggerDelay?: number;
  delay?: number;
}

export function StaggerGroup({
  children,
  staggerDelay = 0.08,
  delay = 0,
}: StaggerGroupProps) {
  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay,
          },
        },
      }}
    >
      {childrenArray.map((child, idx) => (
        <motion.div
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.4 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
