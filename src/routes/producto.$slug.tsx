import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sun } from "lucide-react";
import { getProduct, pureProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Miel"} — Dalí Miel Orgánica` },
      {
        name: "description",
        content: `${loaderData?.name ?? "Miel"}: ${loaderData?.tasting ?? ""} Miel cruda orgánica con denominación de origen.`,
      },
      { property: "og:title", content: `${loaderData?.name ?? "Miel"} — Dalí` },
      { property: "og:description", content: loaderData?.tasting ?? "Miel cruda orgánica." },
    ],
  }),
  component: Producto,
});

function Producto() {
  const product = Route.useLoaderData();
  const { add } = useCart();
  const [size, setSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const picante = product.line === "picante";
  const accentText = picante ? "text-picante-naranja" : "text-verde";

  return (
    <section
      className="px-6 py-12 md:px-[120px] md:py-[96px]"
      style={{ borderTop: `6px solid ${product.accent}` }}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2">
        <ProductGallery
          images={product.gallery?.length ? product.gallery : [product.image]}
          name={product.name}
          accent={product.accent}
        />


        <div className="flex flex-col gap-5 md:py-4">
          <p className={`eyebrow ${accentText}`}>{picante ? "Dalí Picante" : "Miel orgánica"}</p>
          <h1 className="h1-display text-verde">{product.name}</h1>
          <p className="body-text text-verde">{product.tasting}</p>
          <p className={`h3-display ${accentText}`}>{product.price}</p>


          <div>
            <span className="field-label caption">Presentación</span>
            <div className="flex gap-3">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${
                    size === s
                      ? picante
                        ? "border-picante-naranja bg-picante-naranja text-crema"
                        : "border-verde bg-verde text-crema"
                      : "border-verde/25 text-verde hover:border-verde"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className={`self-start ${picante ? "btn-picante" : "btn-primary"}`}
            onClick={() => {
              add({
                slug: product.slug,
                name: product.name,
                size,
                image: product.image,
                price: product.price,
              });
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
          >
            {added ? "Añadido ✓" : "Añadir al carrito"}
          </button>

          <div className="max-w-[460px] pt-2">
            <ProductBadges badges={product.badges} accent={product.accent} size="md" />
          </div>

          <div className="border-t border-verde/15 pt-6">
            <h2 className="h3-display text-verde">Beneficios</h2>
            <p className="body-text mt-3 text-verde/85">{product.detailedBenefits}</p>
          </div>

          <div className="border-t border-verde/15 pt-6">
            <h2 className="h3-display text-verde">Ficha técnica</h2>
            <dl className="mt-4 divide-y divide-verde/10">
              {[
                ["Presentación", product.sizes.join(" · ")],
                ["Origen", "Bosques tropicales de Colombia — Orinoquía (Hacienda La Sonora)"],
                ["Tipo", "Miel cruda, no procesada"],
                ["Certificación", "100% Colombiana — denominación de origen"],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                  <dt className="caption text-verde/60">{k}</dt>
                  <dd className="text-[15px] leading-snug text-verde">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div
            className="flex items-start gap-3 rounded-2xl p-5"
            style={{ backgroundColor: `color-mix(in srgb, ${product.accent} 20%, var(--color-crema))` }}
          >
            <Sun className="mt-0.5 size-5 shrink-0 text-verde" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <h3 className="text-[15px] font-medium text-verde">Cuidado y conservación</h3>
              <p className="mt-1 text-[14px] leading-snug text-verde/80">
                Mantener en un lugar fresco, alejado de la luz solar directa.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1200px] border-t border-verde/15 pt-10 md:mt-24">
        <h2 className="h3-display text-verde">¿Cuál llevar?</h2>
        <p className="body-text mt-2 text-verde/70">
          Compara nuestras tres variedades puras y elige la que más te acompañe.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pureProducts.map((p) => (
            <Link
              key={p.slug}
              to="/producto/$slug"
              params={{ slug: p.slug }}
              className="card-soft flex flex-col gap-2 p-6 transition-transform hover:scale-[1.02]"
              style={{ borderTop: `6px solid ${p.accent}` }}
            >
              <span className="h3-display text-verde">{p.name}</span>
              <span className="text-[14px] leading-snug text-verde/80">{p.tasting}</span>
              <span className="caption mt-2 text-verde/60">Beneficio principal</span>
              <span className="text-[15px] leading-snug text-verde">{p.badges[1]?.label}</span>
              <span className="mt-3 text-[14px] underline text-verde/70">
                {p.slug === product.slug ? "Estás viendo esta" : "Ver esta miel"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
