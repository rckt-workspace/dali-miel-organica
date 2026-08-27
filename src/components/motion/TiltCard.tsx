import { motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TiltCard({ children, className = "", style }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const rotationX = (y / centerY) * 1.2;
    const rotationY = (-x / centerX) * 1.2;

    setRotation({ x: rotationX, y: rotationY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  return (
    <motion.div
      ref={ref}
      className={`${className} transition-all duration-300`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        perspective: "800px",
        ...style,
      }}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y,
        y: isHovering ? -8 : 0,
        boxShadow: isHovering
          ? "0 24px 48px rgba(35,91,78,0.12)"
          : "0 6px 16px rgba(35,91,78,0.06)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
