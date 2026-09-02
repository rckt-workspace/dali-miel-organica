import { motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { ProductBadges } from "./ProductBadges";
import { useCart } from "@/lib/cart";
import { TiltCard } from "./motion/TiltCard";

interface EditorialProductCardProps {
  product: Product;
  index: number;
}

export function EditorialProductCard({
  product,
  index,
}: EditorialProductCardProps) {
  const { add } = useCart();
  const navigate = useNavigate();
  const picante = product.line === "picante";
  const cover = product.gallery?.[0] ?? product.image;

  const addToCart = () =>
    add({
      slug: product.slug,
      name: product.name,
      size: product.sizes[0],
      image: cover,
      price: product.price,
    });


  const offsets = [0, 24, 12];
  const yOffset = offsets[index] || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ y: yOffset }}
      className="h-full"
    >
      <TiltCard
        className="overflow-hidden h-full"
        style={{ borderTop: `4px solid ${product.accent}` }}
      >
        <div className="relative bg-crema rounded-xl shadow-md overflow-hidden p-6 md:p-7 h-full flex flex-col">
          {/* Product Index */}
          <div className="text-xs font-semibold text-verde/40 tracking-wider mb-3">
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Product Image - Contained */}
          <Link
            to="/producto/$slug"
            params={{ slug: product.slug }}
            className="block mb-4 transition-transform duration-300 h-[200px] md:h-[240px] flex items-center justify-center"
          >
            <img
              src={cover}
              alt={`Frasco de miel ${product.name} de Dalí`}
              loading="lazy"
              className="w-full h-full object-contain drop-shadow-sm hover:scale-[1.03] transition-transform duration-300"
            />
          </Link>

          {/* Content */}
          <div className="flex flex-col gap-2 flex-1">
            <Link
              to="/producto/$slug"
              params={{ slug: product.slug }}
              className="h3-display text-verde hover:opacity-70 transition-opacity leading-tight"
            >
              {product.name}
            </Link>

            <p className="text-sm text-verde/75 leading-relaxed">
              {product.tasting}
            </p>

            <p className="caption text-verde/50 mt-1">{product.sizes[0]}</p>

            <div className="mt-auto pt-3">
              <ProductBadges badges={product.badges} accent={product.accent} />
            </div>

            <div className="mt-3 pt-3 border-t border-verde/10">
              <span className="text-sm font-semibold text-verde">
                {product.price}
              </span>
              <span className="caption block text-verde/40 text-xs">
                Precio de referencia
              </span>
            </div>

            <div
              className="relative z-10 flex flex-col gap-2 mt-3"
              data-no-tilt
            >
              <button
                type="button"
                aria-label={`Comprar ahora ${product.name}`}
                className={`pointer-events-auto w-full ${picante ? "btn-picante" : "btn-primary"} btn-sm transition-all hover:shadow-md`}
                onClick={(event) => {
                  event.stopPropagation();
                  console.info(
                    "[checkout] click en comprar ahora",
                    product.slug,
                  );
                  navigate({
                    to: "/checkout",
                    search: {
                      producto: product.slug,
                      cantidad: 1,
                      modo: "directo",
                      presentacion: product.sizes[0],
                    },
                  });
                }}
              >
                Comprar ahora
              </button>
              <button
                type="button"
                aria-label={`Añadir ${product.name} al carrito`}
                className="btn-secondary btn-sm pointer-events-auto w-full transition-all hover:shadow-md"
                onClick={(event) => {
                  event.stopPropagation();
                  console.info(
                    "[carrito] click en añadir al carrito",
                    product.slug,
                  );
                  addToCart();
                }}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
