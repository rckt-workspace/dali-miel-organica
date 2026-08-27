import { motion } from "motion/react";

interface HoneyDropletProps {
  size?: "sm" | "md" | "lg";
  x?: number;
  y?: number;
  delay?: number;
}

export function HoneyDroplet({ size = "md", x = 0, y = 0, delay = 0 }: HoneyDropletProps) {
  const sizeMap = {
    sm: 8,
    md: 12,
    lg: 16,
  };

  const diameter = sizeMap[size];

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${diameter}px`,
        height: `${diameter}px`,
      }}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(252,214,114,0.6), rgba(252,214,114,0.2))",
        }}
      />
    </motion.div>
  );
}
