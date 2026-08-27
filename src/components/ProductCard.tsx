import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";
import { Reveal, TiltCard } from "@/components/motion";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const picante = product.line === "picante";
  const cover = product.gallery?.[0] ?? product.image;
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Reveal variant="fade-up" as="article">
      <TiltCard className="card-soft flex flex-col gap-4 overflow-visible bg-crema p-8 pt-7 transition-all duration-300" style={{ borderTop: `6px solid ${product.accent}` }}>
        <div
          ref={cardRef}
          className="flex flex-col gap-4"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="block h-[260px] w-full overflow-hidden rounded-2xl bg-crema"
        >
          <img
            src={cover}
            alt={`Frasco de miel ${product.name} de Dalí`}
            loading="lazy"
            width={1024}
            height={1280}
            className="size-full object-cover object-center transition-transform duration-300"
            style={{
              transform: isHovering ? "scale(1.08)" : "scale(1)",
            }}
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
                image: cover,
                price: product.price,
              })
            }
          >
            Comprar
          </button>
        </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}
