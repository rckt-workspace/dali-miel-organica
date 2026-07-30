import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product, shop = false }: { product: Product; shop?: boolean }) {
  const { add } = useCart();
  const picante = product.line === "picante";

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl p-8 ${
        picante ? "bg-picante-arena" : "bg-salvia"
      }`}
    >
      <Link to="/producto/$slug" params={{ slug: product.slug }}>
        <img
          src={product.image}
          alt={`Frasco de miel ${product.name} de Dalí`}
          loading="lazy"
          width={1024}
          height={832}
          className="h-[240px] w-full rounded-xl object-cover"
        />
      </Link>

      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className={`h3-display ${picante ? "text-picante-naranja" : "text-verde"}`}
      >
        {product.name}
      </Link>

      <p className="text-[15px] text-verde">{product.tasting}</p>

      <p className="text-[12px] font-semibold leading-relaxed text-verde/75">
        {product.benefits.join(" · ")}
      </p>

      {shop && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <span
            className={`text-[15px] font-semibold ${
              picante ? "text-picante-naranja" : "text-verde"
            }`}
          >
            {product.price}
          </span>
          <button
            className={`btn-sm ${picante ? "btn-picante" : "btn-primary"}`}
            onClick={() =>
              add({
                slug: product.slug,
                name: product.name,
                size: product.sizes[0],
                image: product.image,
                price: product.price,
              })
            }
          >
            Añadir al carrito
          </button>
        </div>
      )}
    </article>
  );
}
