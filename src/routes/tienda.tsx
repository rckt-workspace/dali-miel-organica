import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { pureProducts, spicyProducts } from "@/lib/products";
import formas from "@/assets/formas-organicas.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";

const searchSchema = z.object({
  linea: z.enum(["pura", "picante"]).catch("pura"),
});

export const Route = createFileRoute("/tienda")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Tienda — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Miel pura Acacia, Multifloral y Caucho, y la línea Dalí Picante infusionada con chile morita y chile de árbol.",
      },
      { property: "og:title", content: "Tienda — Dalí Miel Orgánica" },
      {
        property: "og:description",
        content: "Compra miel cruda orgánica y la nueva línea Dalí Picante.",
      },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const { linea } = Route.useSearch();
  const navigate = Route.useNavigate();
  const picante = linea === "picante";
  const list = picante ? spicyProducts : pureProducts;

  return (
    <section className="relative overflow-hidden px-6 py-[60px] md:px-[120px] md:py-[96px]">
      <div
        className="deco-bg absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: `url(${formas.url})` }}
        aria-hidden="true"
      />
      <img
        src={perezoso.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute left-2 top-10 hidden w-[150px] mix-blend-multiply lg:block"
      />
      <img
        src={osoHormiguero.url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute bottom-8 right-2 hidden w-[180px] mix-blend-multiply lg:block"
      />

      <div className="relative mx-auto max-w-[1200px]">
        <p className={`eyebrow ${picante ? "text-picante-naranja" : "text-verde"}`}>Tienda</p>
        <h1 className="h1-display mt-3 text-verde">
          {picante ? "Dalí Picante" : "Nuestra colección de miel"}
        </h1>
        <p className="body-text mt-4 max-w-[640px] text-verde/80">
          {picante
            ? "Miel orgánica infusionada con chile: el mismo origen, con carácter."
            : "Tres variedades de miel cruda, cosechadas en los bosques de la altillanura colombiana."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {(
            [
              { key: "pura", label: "Miel Pura" },
              { key: "picante", label: "Miel Picante" },
            ] as const
          ).map((t) => {
            const active = linea === t.key;
            return (
              <button
                key={t.key}
                onClick={() => navigate({ search: { linea: t.key } })}
                className={`rounded-full border px-6 py-2 text-[15px] transition-colors ${
                  active
                    ? picante
                      ? "border-picante-naranja bg-picante-naranja text-crema"
                      : "border-verde bg-verde text-crema"
                    : "border-verde/25 text-verde hover:border-verde"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} shop />
          ))}
        </div>
      </div>
    </section>
  );
}
