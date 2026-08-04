type Section = { title?: string; body: string };

export function LegalPage({
  eyebrow = "Legal",
  title,
  intro,
  sections,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  sections: Section[];
}) {
  return (
    <>
      {/* Header */}
      <section className="relative overflow-hidden bg-verde">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            d="M1440,700 L1440,210 C1230,250 1160,430 940,540 C790,615 620,620 430,700 Z"
            fill="var(--color-crema)"
          />
        </svg>

        <div className="relative mx-auto max-w-[1440px] px-6 py-12 md:px-[120px] md:py-[110px]">
          <div className="flex flex-col gap-6 md:max-w-[720px]">
            <p className="eyebrow text-salvia">{eyebrow}</p>
            <h1 className="h1-display text-crema">{title}</h1>
          </div>
        </div>
      </section>

      {/* Cuerpo */}
      <section className="bg-crema px-6 py-12 md:px-[120px] md:py-[80px]">
        <div className="mx-auto w-full max-w-[720px]">
          {intro && <p className="body-text text-verde/80">{intro}</p>}

          <div className="mt-8 flex flex-col gap-8">
            {sections.map((s, i) => (
              <div key={s.title ?? i}>
                {s.title && <h2 className="h3-display mb-3 text-verde">{s.title}</h2>}
                <p className="body-text text-verde/80">{s.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-12 border-t border-verde/15 pt-6 text-[13px] text-verde/55">
            Este contenido es un borrador informativo y puede actualizarse.
          </p>
        </div>
      </section>
    </>
  );
}
