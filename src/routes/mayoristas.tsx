import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Tag, Leaf } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import formas from "@/assets/formas-organicas.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";

export const Route = createFileRoute("/mayoristas")({
  head: () => ({
    meta: [
      { title: "Aliados y Mayoristas — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Miel orgánica al por mayor para restaurantes, tiendas y empresas de alimentos, con trazabilidad y denominación de origen.",
      },
      { property: "og:title", content: "Lleva Dalí a tu negocio — Mayoristas" },
      {
        property: "og:description",
        content: "Compras al por mayor de miel orgánica Dalí: volúmenes, precios preferenciales y trazabilidad.",
      },
    ],
  }),
  component: Mayoristas,
});

const beneficios = [
  {
    Icon: Package,
    title: "Volúmenes al por mayor",
    text: "Presentaciones y cantidades adaptadas a lo que tu negocio necesita.",
  },
  {
    Icon: Tag,
    title: "Precios preferenciales",
    text: "Condiciones especiales para compras recurrentes.",
  },
  {
    Icon: Leaf,
    title: "Producto 100% trazable y orgánico",
    text: "Del panal a tu mesa, con el respaldo de nuestra denominación de origen.",
  },
];

function Mayoristas() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const { error: dbError } = await supabase.from("leads_b2b").insert({
      empresa: String(fd.get("empresa") ?? "").trim(),
      contacto: String(fd.get("contacto") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      tipo_negocio: String(fd.get("tipo_negocio") ?? "").trim(),
      volumen: String(fd.get("volumen") ?? "").trim() || null,
      mensaje: String(fd.get("mensaje") ?? "").trim() || null,
    });

    setSending(false);
    if (dbError) {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en un momento.");
      return;
    }
    setSent(true);
  }

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
            <p className="eyebrow text-salvia">Para empresas</p>
            <h1 className="h1-display text-crema">Lleva Dalí a tu negocio</h1>
            <p className="body-text max-w-[620px] text-crema/85">
              Miel orgánica al por mayor para restaurantes, tiendas y empresas de alimentos — con la
              misma calidad y trazabilidad de siempre.
            </p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="relative overflow-hidden bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url(${formas.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />
        <img
          src={osoHormiguero.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -bottom-2 right-4 hidden w-[190px] opacity-90 mix-blend-multiply lg:block"
        />
        <div className="relative mx-auto grid max-w-[1100px] gap-10 md:grid-cols-3 md:gap-16">
          {beneficios.map(({ Icon, title, text }) => (
            <div key={title} className="flex flex-col gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-salvia text-verde">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <h2 className="h3-display text-verde">{title}</h2>
              <p className="body-text text-verde/75">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formulario */}
      <section
        className="bg-verde px-6 py-12 md:px-[120px] md:py-[100px]"
        style={{ borderBottom: "1px solid rgb(183 216 170 / 0.4)" }}
      >
        <div className="mx-auto w-full max-w-[560px] rounded-2xl bg-crema p-6 md:p-10">
          <h2 className="h3-display text-verde">Cuéntanos sobre tu negocio</h2>

          {sent ? (
            <p className="body-text mt-6 text-verde">
              ¡Gracias! Nos pondremos en contacto contigo pronto.
            </p>
          ) : (
            <form className="mt-8 flex flex-col gap-6" onSubmit={handleSubmit}>
              <div>
                <label className="field-label caption text-verde" htmlFor="empresa">
                  Nombre de la empresa
                </label>
                <input id="empresa" name="empresa" required className="field" placeholder="Tu empresa" />
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="contacto">
                  Nombre de contacto
                </label>
                <input id="contacto" name="contacto" required className="field" placeholder="Tu nombre" />
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="field"
                  placeholder="tu@empresa.com"
                />
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="telefono">
                  Teléfono
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  required
                  className="field"
                  placeholder="+57 300 000 0000"
                />
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="tipo_negocio">
                  Tipo de negocio
                </label>
                <select id="tipo_negocio" name="tipo_negocio" required defaultValue="" className="field">
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Tienda">Tienda</option>
                  <option value="Distribuidor">Distribuidor</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="volumen">
                  Volumen aproximado que necesitan
                </label>
                <input id="volumen" name="volumen" className="field" placeholder="Ej. 50 kg/mes" />
              </div>

              <div>
                <label className="field-label caption text-verde" htmlFor="mensaje">
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="field"
                  placeholder="Cuéntanos en qué podemos ayudarte"
                />
              </div>

              {error && <p className="text-[14px] text-verde">{error}</p>}

              <button type="submit" disabled={sending} className="btn-primary self-start">
                {sending ? "Enviando…" : "Enviar solicitud"}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
