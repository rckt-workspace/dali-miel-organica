import { useEffect, useRef, useState } from "react";

export type RevealVariant = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale";

interface UseRevealProps {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  rootMargin?: string;
}

export function useReveal({
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
}: UseRevealProps = {}) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const getTransform = (): string => {
    if (isVisible) return "none";

    switch (variant) {
      case "fade-up":
        return "translateY(30px)";
      case "fade-down":
        return "translateY(-30px)";
      case "fade-left":
        return "translateX(-30px)";
      case "fade-right":
        return "translateX(30px)";
      case "scale":
        return "scale(0.95)";
      default:
        return "none";
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: getTransform(),
    transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
  };

  return { ref, style, isVisible };
}
