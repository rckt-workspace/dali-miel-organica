import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/ProductCard";
import { pureProducts, spicyProducts } from "@/lib/products";

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
    <section
      className={`px-6 py-[60px] md:px-[120px] md:py-[96px] ${picante ? "bg-picante-arena" : ""}`}
    >
      <div className="mx-auto max-w-[1200px]">
        <p className={`eyebrow ${picante ? "text-picante-naranja" : "text-verde"}`}>Tienda</p>
        <h1 className="h2-display mt-3 text-verde">
          {picante ? "Dalí Picante" : "Nuestra colección de miel"}
        </h1>

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
