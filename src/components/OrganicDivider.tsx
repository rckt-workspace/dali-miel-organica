import { motion } from "motion/react";

interface OrganicDividerProps {
  variant?: "wave" | "drop" | "curve";
  height?: number;
}

export function OrganicDivider({ variant = "wave", height = 60 }: OrganicDividerProps) {
  const paths = {
    wave: "M 0,30 Q 300,0 600,30 T 1200,30 L 1200,60 L 0,60 Z",
    drop: "M 0,60 Q 150,20 300,40 T 600,30 T 900,40 T 1200,30 L 1200,60 L 0,60 Z",
    curve: "M 0,50 Q 300,10 600,50 T 1200,50 L 1200,60 L 0,60 Z",
  };

  return (
    <motion.svg
      viewBox="0 0 1200 60"
      className="w-full"
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false, margin: "-50px" }}
    >
      <path
        d={paths[variant]}
        fill="rgba(252, 214, 114, 0.08)"
      />
    </motion.svg>
  );
}
