import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  name: string;
  accent: string;
};

export function ProductGallery({ images, name, accent }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const bg = { backgroundColor: `color-mix(in srgb, ${accent} 15%, var(--color-crema))` };

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openAt = useCallback((i: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setOpen(i);
  }, []);

  const close = useCallback(() => {
    setOpen(null);
    triggerRef.current?.focus();
  }, []);

  const move = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
      if (e.key === "Tab") {
        // Focus trap: cycle only through the lightbox controls.
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!nodes || nodes.length === 0) return;
        const list = Array.from(nodes);
        const first = list[0];
        const last = list[list.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, move]);


  const [main, ...rest] = images;

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={(e) => openAt(0, e)}
          aria-label={`Ampliar imagen principal de ${name}`}
          className="card-soft flex aspect-[4/5] w-full max-w-[560px] items-center justify-center overflow-hidden p-6 transition-transform hover:scale-[1.02]"
          style={bg}
        >
          <img
            src={main}
            alt={`Miel ${name} de Dalí`}
            width={1024}
            height={1280}
            className="size-full object-contain"
          />
        </button>

        {rest.length > 0 && (
          <div className="grid max-w-[560px] grid-cols-2 gap-4">
            {rest.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={(e) => openAt(i + 1, e)}
                aria-label={`Ampliar imagen ${i + 2} de ${name}`}
                className="aspect-square w-full overflow-hidden rounded-2xl p-3 transition-transform hover:scale-[1.02]"
                style={bg}
              >
                <img
                  src={src}
                  alt={`Miel ${name}, vista ${i + 2}`}
                  loading="lazy"
                  className="size-full object-contain"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {open !== null && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${name}`}
          onClick={close}
          className="on-jade fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ backgroundColor: "rgba(35,91,78,0.85)" }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Cerrar galería"
            className="absolute right-5 top-5 grid min-h-11 min-w-11 place-items-center rounded-full bg-crema/15 p-3 text-crema transition-colors hover:bg-crema/30"
          >
            <X className="size-6" strokeWidth={1.5} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Imagen anterior"
                onClick={(e) => {
                  e.stopPropagation();
                  move(-1);
                }}
                className="absolute left-4 grid min-h-11 min-w-11 place-items-center rounded-full bg-crema/15 p-3 text-crema transition-colors hover:bg-crema/30 md:left-10"
              >
                <ChevronLeft className="size-6" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Imagen siguiente"
                onClick={(e) => {
                  e.stopPropagation();
                  move(1);
                }}
                className="absolute right-4 grid min-h-11 min-w-11 place-items-center rounded-full bg-crema/15 p-3 text-crema transition-colors hover:bg-crema/30 md:right-10"
              >
                <ChevronRight className="size-6" strokeWidth={1.5} />
              </button>
            </>
          )}

          <p className="sr-only" aria-live="polite">
            Imagen {open + 1} de {images.length}
          </p>


          <img
            src={images[open]}
            alt={`Miel ${name}, vista ampliada ${open + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain"
          />
        </div>
      )}
    </>
  );
}
