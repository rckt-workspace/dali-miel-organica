import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/tienda")({
  head: () => ({
    meta: [
      { title: "Tienda — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Nuestra colección de miel cruda orgánica: Acacia, Multifloral y Caucho, con denominación de origen colombiana.",
      },
      { property: "og:title", content: "Tienda — Dalí Miel Orgánica" },
      {
        property: "og:description",
        content: "Compra miel cruda orgánica Acacia, Multifloral y Caucho.",
      },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  return (
    <section className="px-6 py-[60px] md:px-[120px] md:py-[96px]">
      <div className="mx-auto max-w-[1200px]">
        <p className="eyebrow text-verde">Tienda</p>
        <h1 className="h2-display mt-3 text-verde">Nuestra colección de miel</h1>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} shop />
          ))}
        </div>
      </div>
    </section>
  );
}
