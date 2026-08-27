import { type ReactNode } from "react";
import type { RevealVariant } from "./useReveal";
import { useReveal } from "./useReveal";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  as?: "div" | "span" | "section" | "article" | "h1" | "h2" | "h3" | "p";
}

export function Reveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = "",
  as: Component = "div",
}: RevealProps) {
  const { ref, style, isVisible } = useReveal({
    variant,
    delay,
    duration,
    threshold,
  });

  const dynamicProps = {
    ref,
    style,
    className: `${className} ${isVisible ? "motion-visible" : ""}`,
  };

  return <Component {...(dynamicProps as Record<string, unknown>)}>{children}</Component>;
}
