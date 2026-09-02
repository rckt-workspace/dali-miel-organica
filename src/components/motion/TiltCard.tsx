import {
  motion,
  useReducedMotion,
} from "motion/react";

import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface TiltCardProps {
  children:
    ReactNode;

  className?:
    string;

  style?:
    React.CSSProperties;
}

export function TiltCard({
  children,
  className = "",
  style,
}: TiltCardProps) {
  const ref =
    useRef<HTMLDivElement>(
      null,
    );

  const reducedMotion =
    useReducedMotion();

  const [
    canHover,
    setCanHover,
  ] =
    useState(false);

  const [
    rotation,
    setRotation,
  ] =
    useState({
      x: 0,
      y: 0,
    });

  const [
    isHovering,
    setIsHovering,
  ] =
    useState(false);

  useEffect(() => {
    const media =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      );

    const update =
      () => {
        setCanHover(
          media.matches,
        );
      };

    update();

    media.addEventListener(
      "change",
      update,
    );

    return () => {
      media.removeEventListener(
        "change",
        update,
      );
    };
  }, []);

  function handleMouseMove(
    event:
      React.MouseEvent<HTMLDivElement>,
  ) {
    const target =
      event.target;

    if (
      target instanceof
        Element &&
      target.closest(
        "button, a, input, select, textarea, [data-no-tilt]",
      )
    ) {
      setRotation({
        x: 0,
        y: 0,
      });

      setIsHovering(
        false,
      );

      return;
    }

    if (
      !canHover ||
      reducedMotion ||
      !ref.current
    ) {
      return;
    }

    const rect =
      ref.current
        .getBoundingClientRect();

    const centerX =
      rect.width / 2;

    const centerY =
      rect.height / 2;

    if (
      centerX <= 0 ||
      centerY <= 0
    ) {
      return;
    }

    const x =
      event.clientX -
      rect.left -
      centerX;

    const y =
      event.clientY -
      rect.top -
      centerY;

    const rotationX =
      Math.max(
        -1.25,
        Math.min(
          1.25,
          (
            y /
            centerY
          ) *
            1.1,
        ),
      );

    const rotationY =
      Math.max(
        -1.25,
        Math.min(
          1.25,
          (
            -x /
            centerX
          ) *
            1.1,
        ),
      );

    setRotation({
      x:
        rotationX,

      y:
        rotationY,
    });
  }

  function reset() {
    setRotation({
      x: 0,
      y: 0,
    });

    setIsHovering(
      false,
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={
        handleMouseMove
      }
      onMouseLeave={
        reset
      }
      onMouseEnter={() => {
        if (
          canHover &&
          !reducedMotion
        ) {
          setIsHovering(
            true,
          );
        }
      }}
      style={{
        minWidth: 0,

        perspective:
          "900px",

        transformStyle:
          "preserve-3d",

        ...style,
      }}
      animate={{
        rotateX:
          canHover &&
          !reducedMotion
            ? rotation.x
            : 0,

        rotateY:
          canHover &&
          !reducedMotion
            ? rotation.y
            : 0,

        boxShadow:
          canHover &&
          isHovering &&
          !reducedMotion
            ? "0 22px 46px rgba(35,91,78,0.13)"
            : "0 8px 22px rgba(35,91,78,0.07)",
      }}
      transition={{
        type:
          "spring",

        stiffness:
          240,

        damping:
          22,

        mass:
          0.75,
      }}
    >
      {children}
    </motion.div>
  );
}