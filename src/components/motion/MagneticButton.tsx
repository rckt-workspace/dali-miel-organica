import { motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const x = e.clientX - rect.left - centerX;
    const y = e.clientY - rect.top - centerY;

    const distance = Math.sqrt(x * x + y * y);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const pull = (1 - distance / maxDistance) * 15;
      const angle = Math.atan2(y, x);

      setOffset({
        x: Math.cos(angle) * pull,
        y: Math.sin(angle) * pull,
      });
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: offset.x,
        y: offset.y,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
    >
      {children}
    </motion.button>
  );
}
