import {
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import styles from "./StoryExoticCarousel.module.css";

export type StoryCarouselImage = {
  src: string;
  alt: string;
};

type StoryExoticCarouselProps = {
  images: StoryCarouselImage[];
  interval?: number;
  autoPlay?: boolean;
};

function shortestOffset(
  itemIndex: number,
  activeIndex: number,
  length: number,
) {
  let diff = itemIndex - activeIndex;
  const half = length / 2;

  if (diff > half) diff -= length;
  if (diff < -half) diff += length;

  return diff;
}

export function StoryExoticCarousel({
  images,
  interval = 5400,
  autoPlay = true,
}: StoryExoticCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);

  const reducedMotion = useReducedMotion();

  const pointerStartX = useRef<number | null>(null);
  const pointerLastX = useRef<number | null>(null);
  const pointerLastTime = useRef<number | null>(null);
  const pointerVelocity = useRef(0);

  const dragX = useMotionValue(0);

  const smoothDragX = useSpring(dragX, {
    stiffness: 320,
    damping: 32,
    mass: 0.65,
  });

  const length = images.length;

  const go = useCallback(
    (delta: number) => {
      if (length <= 1) return;

      setActiveIndex(
        (current) => (current + delta + length) % length,
      );
    },
    [length],
  );

  useEffect(() => {
    if (
      !autoPlay ||
      paused ||
      dragging ||
      reducedMotion ||
      length <= 1
    ) {
      return;
    }

    const timer = window.setInterval(() => {
      go(1);
    }, interval);

    return () => window.clearInterval(timer);
  }, [
    autoPlay,
    dragging,
    go,
    interval,
    length,
    paused,
    reducedMotion,
  ]);

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  }

  function handlePointerDown(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pointerStartX.current = event.clientX;
    pointerLastX.current = event.clientX;
    pointerLastTime.current = performance.now();
    pointerVelocity.current = 0;

    setDragging(true);
    setPaused(true);

    dragX.set(0);

    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (pointerStartX.current === null) return;

    const delta = event.clientX - pointerStartX.current;

    /*
     * Seguimos al mouse/dedo, pero limitamos la amplitud para que
     * la composición nunca se vaya violentamente de pantalla.
     */
    const resistance = 0.54;
    const translated = Math.max(
      -110,
      Math.min(110, delta * resistance),
    );

    dragX.set(translated);

    const now = performance.now();

    if (
      pointerLastX.current !== null &&
      pointerLastTime.current !== null
    ) {
      const dx = event.clientX - pointerLastX.current;
      const dt = now - pointerLastTime.current;

      if (dt > 0) {
        pointerVelocity.current = dx / dt;
      }
    }

    pointerLastX.current = event.clientX;
    pointerLastTime.current = now;
  }

  function finishPointer(
    event: ReactPointerEvent<HTMLDivElement>,
  ) {
    if (pointerStartX.current === null) {
      setDragging(false);
      dragX.set(0);
      return;
    }

    const delta = event.clientX - pointerStartX.current;
    const velocity = pointerVelocity.current;

    /*
     * Swipe normal:
     * izquierda = siguiente
     * derecha   = anterior
     */
    if (delta < -45 || velocity < -0.42) {
      go(1);
    } else if (delta > 45 || velocity > 0.42) {
      go(-1);
    }

    dragX.set(0);

    pointerStartX.current = null;
    pointerLastX.current = null;
    pointerLastTime.current = null;
    pointerVelocity.current = 0;

    setDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // El navegador puede haber liberado el pointer previamente.
    }
  }

  function handleSlideClick(
    index: number,
    active: boolean,
  ) {
    if (dragging) return;
    if (active) return;

    setActiveIndex(index);
  }

  if (length === 0) return null;

  return (
    <div
      className={styles.outer}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        if (!dragging) setPaused(false);
      }}
    >
      {/* Ambient DALI glow */}
      <span
        className={styles.glowLeft}
        aria-hidden="true"
      />
      <span
        className={styles.glowRight}
        aria-hidden="true"
      />

      {/* Línea/orbita orgánica */}
      <span
        className={styles.orbit}
        aria-hidden="true"
      />

      <motion.div
        className={`${styles.stage} ${
          dragging ? styles.stageDragging : ""
        }`}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Los bosques de La Sonora"
        tabIndex={0}
        style={{
          x: reducedMotion ? 0 : smoothDragX,
        }}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishPointer}
        onPointerCancel={finishPointer}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {images.map((image, index) => {
          const offset = shortestOffset(
            index,
            activeIndex,
            length,
          );

          const abs = Math.abs(offset);
          const active = offset === 0;

          const cssVariables = {
            "--offset": offset,
            "--abs": abs,
            zIndex: 20 - abs,
          } as CSSProperties;

          return (
            <button
              key={image.src}
              type="button"
              className={`${styles.slide} ${
                active ? styles.slideActive : ""
              }`}
              style={cssVariables}
              onClick={() =>
                handleSlideClick(index, active)
              }
              aria-label={
                active
                  ? `Imagen ${index + 1} de ${length}: ${image.alt}`
                  : `Mostrar imagen ${index + 1}: ${image.alt}`
              }
              aria-current={active ? "true" : undefined}
              tabIndex={active ? 0 : -1}
            >
              <span className={styles.slideInner}>
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  draggable={false}
                />

                <span
                  className={styles.imageSheen}
                  aria-hidden="true"
                />
              </span>
            </button>
          );
        })}

        {length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              aria-label="Imagen anterior"
            >
              <ChevronLeft
                className={styles.arrowIcon}
                strokeWidth={1.6}
              />
            </button>

            <button
              type="button"
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              aria-label="Imagen siguiente"
            >
              <ChevronRight
                className={styles.arrowIcon}
                strokeWidth={1.6}
              />
            </button>
          </>
        )}
      </motion.div>

      {length > 1 && (
        <div
          className={styles.dots}
          aria-label="Seleccionar fotografía"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              aria-label={`Ir a fotografía ${index + 1}`}
              aria-current={
                index === activeIndex
                  ? "true"
                  : undefined
              }
              className={`${styles.dot} ${
                index === activeIndex
                  ? styles.dotActive
                  : ""
              }`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      )}

      <div className={styles.helper}>
        <span>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>

        <span className={styles.helperLine} />

        <span>
          {String(length).padStart(2, "0")}
        </span>

        <span className={styles.helperText}>
          Arrastra para explorar
        </span>
      </div>
    </div>
  );
}