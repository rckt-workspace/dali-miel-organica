import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";

export function ProductCard({ product, shop = false }: { product: Product; shop?: boolean }) {
  const { add } = useCart();
  const picante = product.line === "picante";

  return (
    <article
      className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-verde/10 bg-crema p-8 pt-7"
      style={{ borderTop: `6px solid ${product.accent}` }}
    >
      <Link to="/producto/$slug" params={{ slug: product.slug }}>
        <img
          src={product.image}
          alt={`Frasco de miel ${product.name} de Dalí`}
          loading="lazy"
          width={1024}
          height={832}
          className="h-[260px] w-full rounded-xl object-contain"
          style={{ backgroundColor: `${product.accent}26` }}
        />
      </Link>

      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="h3-display text-verde"
      >
        {product.name}
      </Link>

      <p className="text-[15px] text-verde">{product.tasting}</p>
      <p className="caption text-verde/60">{product.sizes[0]}</p>

      <ProductBadges badges={product.badges} accent={product.accent} />

      {shop && (
        <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[15px] font-semibold text-verde">{product.price}</span>
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
