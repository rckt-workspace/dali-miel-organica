import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";

interface FeaturedProductBlockProps {
  product: Product;

  /*
   * reverse: invierte el orden
   * (imagen a la derecha) para
   * alternar bloques.
   */
  reverse?: boolean;
}

/*
 * Bloque destacado a todo el ancho.
 *
 * Reemplaza a la card pequeña cuando
 * el catálogo activo es corto y una
 * grid de 3 columnas se ve vacía.
 */
export function FeaturedProductBlock({
  product,
  reverse = false,
}: FeaturedProductBlockProps) {
  const { add } = useCart();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const [isHovering, setIsHovering] = useState(false);

  const picante = product.line === "picante";
  const cover = product.gallery?.[0] ?? product.image;

  return (
    <motion.article
      className="
        card-soft

        grid
        min-w-0
        items-center

        gap-8

        overflow-hidden

        bg-crema

        p-5

        sm:p-7

        lg:grid-cols-2
        lg:gap-14
        lg:p-10
      "
      style={{ borderTop: `6px solid ${product.accent}` }}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
      transition={{ type: "spring", stiffness: 100, damping: 19 }}
    >
      {/* IMAGEN */}
      <Link
        to="/producto/$slug"
        params={{ slug: product.slug }}
        className={`
          relative

          block

          min-w-0

          overflow-hidden

          rounded-2xl

          bg-crema

          aspect-[4/5]

          max-h-[420px]

          sm:max-h-[480px]

          lg:max-h-[560px]

          ${reverse ? "lg:order-2" : ""}
        `}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") {
            setIsHovering(true);
          }
        }}
        onPointerLeave={() => setIsHovering(false)}
      >
        <motion.img
          src={cover}
          alt={`Frasco de miel ${product.name} de Dalí`}
          loading="lazy"
          decoding="async"
          width={1024}
          height={1280}
          className="size-full rounded-2xl object-contain object-center"
          animate={{
            scale: isHovering && !reducedMotion ? 1.04 : 1,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          animate={{ opacity: isHovering ? 0.16 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            background: `radial-gradient(circle at 50% 78%, ${product.accent}, transparent 65%)`,
          }}
        />
      </Link>

      {/* INFO */}
      <div className="flex min-w-0 flex-col gap-4">
        <p
          className="eyebrow"
          style={{ color: picante ? "#D98C6B" : "#235B4E" }}
        >
          {picante ? "Dalí Picante" : "Miel pura"}
        </p>

        <Link
          to="/producto/$slug"
          params={{ slug: product.slug }}
          className="h2-display break-words text-verde"
        >
          {product.name}
        </Link>

        <p className="body-text text-verde/80">{product.tasting}</p>

        <p className="body-text max-w-[560px] text-verde/70">
          {product.detailedBenefits}
        </p>

        <ProductBadges badges={product.badges} accent={product.accent} />

        <p className="caption text-verde/60">{product.sizes[0]}</p>

        <div className="mt-2 flex flex-col gap-1">
          <span className="font-display text-[30px] leading-none text-verde">
            {product.price}
          </span>

          <span className="caption text-verde/50">
            Precio de referencia — próximamente
          </span>
        </div>

        {product.available ? (
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <motion.button
              type="button"
              aria-label={`Comprar ahora ${product.name}`}
              className={`${picante ? "btn-picante" : "btn-primary"} w-full sm:w-auto`}
              whileTap={{ scale: 0.98 }}
              onClick={() =>
                navigate({
                  to: "/checkout",
                  search: {
                    producto: product.slug,
                    cantidad: 1,
                    modo: "directo",
                    presentacion: product.sizes[0],
                  },
                })
              }
            >
              Comprar ahora
            </motion.button>

            <motion.button
              type="button"
              aria-label={`Añadir ${product.name} al carrito`}
              className="btn-secondary w-full sm:w-auto"
              whileTap={{ scale: 0.98 }}
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
              Añadir al carrito
            </motion.button>
          </div>
        ) : (
          <p className="caption mt-2 w-fit rounded-full border border-verde/25 px-4 py-2 text-verde/60">
            Próximamente
          </p>
        )}
      </div>
    </motion.article>
  );
}
