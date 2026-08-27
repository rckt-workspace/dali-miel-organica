import { useMotionValue, useTransform, useSpring, useReducedMotion, useScroll } from "motion/react";
import { useRef } from "react";

interface UseFloatingDecorativeReturn {
  y: any;
  rotate: any;
  opacity: any;
}

export function useFloatingDecorative(): UseFloatingDecorativeReturn {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  if (prefersReducedMotion) {
    return {
      y: 0,
      rotate: 0,
      opacity: 1,
    };
  }

  // Parallax effect based on scroll
  const parallaxY = useTransform(scrollY, [0, 1000], [0, 100]);

  // Subtle rotation based on scroll for organic feel
  const scrollRotate = useTransform(scrollY, [0, 500, 1000], [0, 2, 0]);

  // Spring smooth the parallax
  const smoothY = useSpring(parallaxY, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  });

  return {
    y: smoothY,
    rotate: scrollRotate,
    opacity: 0.08,
  };
}
