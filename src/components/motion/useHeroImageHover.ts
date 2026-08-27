import { useRef, useEffect } from "react";
import { useMotionValue, useTransform, useSpring, useReducedMotion } from "motion/react";

interface UseHeroImageHoverReturn {
  x: any;
  y: any;
  scale: any;
  transformX: any;
  transformY: any;
  transformScale: any;
}

export function useHeroImageHover(
  containerRef: any
): UseHeroImageHoverReturn {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const scale = useMotionValue(1);

  const transformX = useTransform(mouseX, (x) => x * 0.5);
  const transformY = useTransform(mouseY, (y) => y * 0.5);
  const transformScale = useSpring(scale, {
    stiffness: 200,
    damping: 25,
    mass: 1,
  });

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;

      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = Math.max(rect.width, rect.height) * 0.6;

      if (distance < maxDistance) {
        const strength = 1 - distance / maxDistance;
        mouseX.set((x / rect.width) * 10 * strength);
        mouseY.set((y / rect.height) * 10 * strength);
        scale.set(1 + strength * 0.04);
      }
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
      scale.set(1);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, mouseX, mouseY, scale, prefersReducedMotion]);

  return {
    x: mouseX,
    y: mouseY,
    scale,
    transformX,
    transformY,
    transformScale,
  };
}
