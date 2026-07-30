import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, longDescription } from "@/lib/products";
import { useCart } from "@/lib/cart";

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
  const accent = picante ? "text-picante-naranja" : "text-verde";

  return (
    <section
      className={`px-6 py-[60px] md:px-[120px] md:py-[96px] ${picante ? "bg-picante-arena" : ""}`}
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <img
            src={product.image}
            alt={`Miel ${product.name} de Dalí`}
            width={1024}
            height={832}
            className="aspect-square w-full rounded-2xl object-cover"
          />
          <div className="flex gap-4">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`Miel ${product.name}, vista ${i + 1}`}
                loading="lazy"
                width={120}
                height={120}
                className="size-[120px] rounded-xl object-cover"
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 md:py-4">
          <p className={`eyebrow ${accent}`}>{picante ? "Dalí Picante" : "Miel orgánica"}</p>
          <h1 className="h2-display text-verde">{product.name}</h1>
          <p className="text-[16px] text-verde">{product.tasting}</p>
          <p className={`text-[24px] font-semibold ${accent}`}>{product.price}</p>


          <div>
            <span className="field-label">Presentación</span>
            <div className="flex gap-3">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${
                    size === s
                      ? "border-verde bg-verde text-crema"
                      : "border-verde/25 text-verde hover:border-verde"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            className="btn-primary self-start"
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

          <ul className="flex flex-wrap gap-2 pt-2">
            {product.benefits.map((b: string) => (
              <li
                key={b}
                className="rounded-full bg-salvia px-4 py-2 text-[14px] text-verde"
              >
                {b}
              </li>
            ))}
          </ul>

          <p className="body-light border-t border-verde/15 pt-6 text-[15px] text-verde/85">
            {longDescription}
          </p>
        </div>
      </div>
    </section>
  );
}
