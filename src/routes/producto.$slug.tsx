import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, longDescription } from "@/lib/products";
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
        <div className="flex flex-col gap-4">
          <div
            className="card-soft flex aspect-[4/5] w-full max-w-[560px] items-center justify-center overflow-hidden p-6"
            style={{
              backgroundColor: `color-mix(in srgb, ${product.accent} 15%, var(--color-crema))`,
            }}
          >
            <img
              src={product.image}
              alt={`Miel ${product.name} de Dalí`}
              width={1024}
              height={1280}
              className="size-full object-contain"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-square w-full overflow-hidden rounded-2xl p-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${product.accent} 15%, var(--color-crema))`,
                }}
              >
                <img
                  src={product.image}
                  alt={`Miel ${product.name}, vista ${i + 1}`}
                  loading="lazy"
                  width={120}
                  height={150}
                  className="size-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

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

          <div className="max-w-[420px] pt-2">
            <ProductBadges badges={product.badges} accent={product.accent} size="md" />
          </div>


          <p className="body-text border-t border-verde/15 pt-6 text-verde/85">
            {longDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
