import { useEffect, useRef } from "react";
import { useMotionValue } from "motion/react";

type ScrollDirection = "up" | "down";

export function useScrollDirection(threshold: number = 8) {
  const scrollY = useRef(0);
  const direction = useMotionValue<ScrollDirection>("down");

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - scrollY.current;

      if (Math.abs(delta) >= threshold) {
        const newDirection = delta > 0 ? "down" : "up";
        if (newDirection !== direction.get()) {
          direction.set(newDirection);
        }
        scrollY.current = currentY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [direction, threshold]);

  return direction;
}
