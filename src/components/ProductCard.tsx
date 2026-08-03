import { Link } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";

export function ProductCard({ product, shop = false }: { product: Product; shop?: boolean }) {
  const { add } = useCart();
  const picante = product.line === "picante";

  return (
    <article
      className="card-soft flex flex-col gap-4 overflow-hidden bg-crema p-8 pt-7"
      style={{ borderTop: `6px solid ${product.accent}` }}
    >
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="block aspect-[4/5] w-full overflow-hidden bg-crema"
      >
        <img
          src={product.image}
          alt={`Frasco de miel ${product.name} de Dalí`}
          loading="lazy"
          width={1024}
          height={1280}
          className="size-full object-contain"
        />
      </Link>

      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className="h3-display text-verde"
      >
        {product.name}
      </Link>

      <p className="body-text text-verde">{product.tasting}</p>
      <p className="caption text-verde/60">{product.sizes[0]}</p>

      <ProductBadges badges={product.badges} accent={product.accent} />

      <div className="mt-auto flex flex-col gap-3 pt-2">
        <div>
          <span className="body-text font-semibold text-verde">{product.price}</span>
          <span className="caption block text-verde/50">Precio de referencia — próximamente</span>
        </div>
        <button
          className={`w-full ${picante ? "btn-picante" : "btn-primary"} btn-sm`}
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
          Comprar
        </button>
      </div>

    </article>
  );
}
