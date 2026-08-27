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
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  let diff =
    itemIndex - activeIndex;

  const half =
    length / 2;

  if (diff > half) {
    diff -= length;
  }

  if (diff < -half) {
    diff += length;
  }

  return diff;
}

export function StoryExoticCarousel({
  images,
  interval = 4200,
  autoPlay = true,
}: StoryExoticCarouselProps) {
  const [
    activeIndex,
    setActiveIndex,
  ] = useState(0);

  const [
    dragging,
    setDragging,
  ] = useState(false);

  const reducedMotion =
    useReducedMotion();

  const pointerStartX =
    useRef<number | null>(null);

  const pointerLastX =
    useRef<number | null>(null);

  const pointerLastTime =
    useRef<number | null>(null);

  const pointerVelocity =
    useRef(0);

  /*
   * Esto evita que un drag termine
   * disparando accidentalmente el
   * click de una fotografía.
   */
  const suppressClick =
    useRef(false);

  const dragX =
    useMotionValue(0);

  const smoothDragX =
    useSpring(
      dragX,
      {
        stiffness: 280,
        damping: 30,
        mass: 0.68,
      },
    );

  const length =
    images.length;

  const go =
    useCallback(
      (delta: number) => {
        if (
          length <= 1
        ) {
          return;
        }

        setActiveIndex(
          (current) =>
            (
              current +
              delta +
              length
            ) %
            length,
        );
      },
      [length],
    );

  /*
   * AUTOPLAY
   *
   * No se pausa simplemente
   * porque el mouse esté encima.
   *
   * Solo se pausa durante
   * un drag real.
   */
  useEffect(() => {
    if (
      !autoPlay ||
      dragging ||
      reducedMotion ||
      length <= 1
    ) {
      return;
    }

    const timer =
      window.setInterval(
        () => {
          go(1);
        },
        interval,
      );

    return () =>
      window.clearInterval(
        timer,
      );
  }, [
    autoPlay,
    dragging,
    go,
    interval,
    length,
    reducedMotion,
  ]);

  function handleKeyDown(
    event:
      React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (
      event.key ===
      "ArrowLeft"
    ) {
      event.preventDefault();
      go(-1);
    }

    if (
      event.key ===
      "ArrowRight"
    ) {
      event.preventDefault();
      go(1);
    }
  }

  function handlePointerDown(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      event.pointerType ===
        "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    pointerStartX.current =
      event.clientX;

    pointerLastX.current =
      event.clientX;

    pointerLastTime.current =
      performance.now();

    pointerVelocity.current =
      0;

    suppressClick.current =
      false;

    setDragging(true);

    dragX.set(0);

    event.currentTarget
      .setPointerCapture(
        event.pointerId,
      );
  }

  function handlePointerMove(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      pointerStartX.current ===
      null
    ) {
      return;
    }

    const delta =
      event.clientX -
      pointerStartX.current;

    if (
      Math.abs(delta) >
      7
    ) {
      suppressClick.current =
        true;
    }

    /*
     * El carrusel acompaña al
     * puntero, pero con resistencia.
     */
    const resistance =
      0.5;

    const translated =
      Math.max(
        -115,
        Math.min(
          115,
          delta *
            resistance,
        ),
      );

    dragX.set(
      translated,
    );

    const now =
      performance.now();

    if (
      pointerLastX.current !==
        null &&
      pointerLastTime.current !==
        null
    ) {
      const dx =
        event.clientX -
        pointerLastX.current;

      const dt =
        now -
        pointerLastTime.current;

      if (
        dt >
        0
      ) {
        pointerVelocity.current =
          dx / dt;
      }
    }

    pointerLastX.current =
      event.clientX;

    pointerLastTime.current =
      now;
  }

  function finishPointer(
    event:
      ReactPointerEvent<HTMLDivElement>,
  ) {
    if (
      pointerStartX.current ===
      null
    ) {
      setDragging(false);

      dragX.set(0);

      return;
    }

    const delta =
      event.clientX -
      pointerStartX.current;

    const velocity =
      pointerVelocity.current;

    /*
     * Swipe izquierda
     * -> siguiente
     *
     * Swipe derecha
     * -> anterior
     */
    if (
      delta < -45 ||
      velocity < -0.42
    ) {
      go(1);
    } else if (
      delta > 45 ||
      velocity > 0.42
    ) {
      go(-1);
    }

    dragX.set(0);

    pointerStartX.current =
      null;

    pointerLastX.current =
      null;

    pointerLastTime.current =
      null;

    pointerVelocity.current =
      0;

    setDragging(false);

    try {
      event.currentTarget
        .releasePointerCapture(
          event.pointerId,
        );
    } catch {
      //
    }
  }

  function handleSlideClick(
    index: number,
    active: boolean,
  ) {
    if (
      suppressClick.current
    ) {
      suppressClick.current =
        false;

      return;
    }

    if (active) {
      return;
    }

    setActiveIndex(index);
  }

  if (
    length === 0
  ) {
    return null;
  }

  return (
    <div
      className={
        styles.outer
      }
    >
      {/* Ambient glow */}
      <span
        className={
          styles.glowLeft
        }
        aria-hidden="true"
      />

      <span
        className={
          styles.glowRight
        }
        aria-hidden="true"
      />

      <span
        className={
          styles.orbit
        }
        aria-hidden="true"
      />

      {/* ==========================
          STAGE
      ========================== */}

      <motion.div
        className={`${styles.stage} ${
          dragging
            ? styles.stageDragging
            : ""
        }`}
        role="group"
        aria-roledescription="carrusel"
        aria-label="Los bosques de La Sonora"
        tabIndex={0}
        style={{
          x:
            reducedMotion
              ? 0
              : smoothDragX,
        }}
        onKeyDown={
          handleKeyDown
        }
        onPointerDown={
          handlePointerDown
        }
        onPointerMove={
          handlePointerMove
        }
        onPointerUp={
          finishPointer
        }
        onPointerCancel={
          finishPointer
        }
      >
        {images.map(
          (
            image,
            index,
          ) => {
            const offset =
              shortestOffset(
                index,
                activeIndex,
                length,
              );

            const abs =
              Math.abs(
                offset,
              );

            const active =
              offset === 0;

            const style = {
              "--offset":
                offset,
              "--abs": abs,
              zIndex:
                active
                  ? 30
                  : 20 -
                    abs,
            } as CSSProperties;

            return (
              <button
                key={
                  image.src
                }
                type="button"
                className={`${styles.slide} ${
                  active
                    ? styles.slideActive
                    : ""
                }`}
                style={
                  style
                }
                onClick={() =>
                  handleSlideClick(
                    index,
                    active,
                  )
                }
                aria-label={
                  active
                    ? `Imagen ${index + 1} de ${length}: ${image.alt}`
                    : `Mostrar imagen ${index + 1}: ${image.alt}`
                }
                aria-current={
                  active
                    ? "true"
                    : undefined
                }
                tabIndex={
                  active
                    ? 0
                    : -1
                }
              >
                <span
                  className={
                    styles.slideInner
                  }
                >
                  <img
                    src={
                      image.src
                    }
                    alt={
                      image.alt
                    }
                    loading={
                      index ===
                      0
                        ? "eager"
                        : "lazy"
                    }
                    draggable={
                      false
                    }
                  />

                  <span
                    aria-hidden="true"
                    className={
                      styles.imageSheen
                    }
                  />
                </span>
              </button>
            );
          },
        )}
      </motion.div>

      {/* ==========================
          CONTROLS

          AHORA ESTÁN FUERA DEL
          STAGE QUE CAPTURA DRAG.
      ========================== */}

      {length > 1 && (
        <div
          className={
            styles.controls
          }
        >
          <button
            type="button"
            className={
              styles.arrow
            }
            onClick={() =>
              go(-1)
            }
            aria-label="Fotografía anterior"
          >
            <ChevronLeft
              className={
                styles.arrowIcon
              }
              strokeWidth={
                1.7
              }
            />
          </button>

          <div
            className={
              styles.dots
            }
            aria-label="Seleccionar fotografía"
          >
            {images.map(
              (
                image,
                index,
              ) => (
                <button
                  key={
                    image.src
                  }
                  type="button"
                  aria-label={`Ir a fotografía ${index + 1}`}
                  aria-current={
                    index ===
                    activeIndex
                      ? "true"
                      : undefined
                  }
                  className={`${styles.dot} ${
                    index ===
                    activeIndex
                      ? styles.dotActive
                      : ""
                  }`}
                  onClick={() =>
                    setActiveIndex(
                      index,
                    )
                  }
                />
              ),
            )}
          </div>

          <button
            type="button"
            className={
              styles.arrow
            }
            onClick={() =>
              go(1)
            }
            aria-label="Fotografía siguiente"
          >
            <ChevronRight
              className={
                styles.arrowIcon
              }
              strokeWidth={
                1.7
              }
            />
          </button>
        </div>
      )}

      <div
        className={
          styles.counter
        }
        aria-hidden="true"
      >
        <span>
          {String(
            activeIndex +
              1,
          ).padStart(
            2,
            "0",
          )}
        </span>

        <span
          className={
            styles.counterLine
          }
        />

        <span>
          {String(
            length,
          ).padStart(
            2,
            "0",
          )}
        </span>
      </div>
    </div>
  );
}