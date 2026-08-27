import { useEffect, useRef, useState } from "react";

interface UseParallaxProps {
  speed?: number;
  maxOffset?: number;
  direction?: "up" | "down";
}

export function useParallax({
  speed = 0.5,
  maxOffset = 50,
  direction = "up",
}: UseParallaxProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReduced || !ref.current) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;
      const distance = (viewportCenter - elementCenter) / window.innerHeight;

      const newOffset = Math.max(-maxOffset, Math.min(maxOffset, distance * 100 * speed));
      setOffset(direction === "down" ? -newOffset : newOffset);
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [speed, maxOffset, direction, prefersReduced]);

  return {
    ref,
    style: {
      transform: `translateY(${offset}px)`,
      transition: "transform 0.1s linear",
    },
  };
}
