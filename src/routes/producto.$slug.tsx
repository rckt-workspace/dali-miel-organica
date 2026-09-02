import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Sun, ChevronDown } from "lucide-react";
import { getProduct, pureProducts } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductBadges } from "@/components/ProductBadges";
import { ProductGallery } from "@/components/ProductGallery";
import { HoneyThread, SectionReveal } from "@/components/motion";

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
  const [showMore, setShowMore] = useState(false);
  const picante = product.line === "picante";
  const accentText = picante ? "text-picante-naranja" : "text-verde";
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const productIndex = pureProducts.findIndex((p) => p.slug === product.slug) + 1;
  const backgroundWordX = useTransform(scrollY, [300, 1200], [-40, 40]);

  return (
    <>
      {/* HERO SECTION */}
      <section
        ref={containerRef}
        className="relative overflow-hidden px-6 py-12 md:px-[120px] md:py-[80px]"
        style={{ backgroundColor: "rgba(249, 246, 228, 0.5)" }}
      >
        {/* Scroll-linked background word */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ x: backgroundWordX }}
          aria-hidden="true"
        >
          <div className="text-verde font-display text-[140px] md:text-[220px] leading-none opacity-[0.03] whitespace-nowrap">
            {product.name.toUpperCase()}
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-12 md:gap-16 md:grid-cols-[55%_45%]">
            {/* GALLERY — Sticky desktop */}
            <motion.div
              className="sticky top-[150px] h-fit"
              initial={{ opacity: 0, x: -35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProductGallery
                images={product.gallery?.length ? product.gallery : [product.image]}
                name={product.name}
                accent={product.accent}
              />
            </motion.div>

            {/* PURCHASE PANEL */}
            <motion.div
              className="flex flex-col gap-6 md:py-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Product identity */}
              <div>
                <motion.p
                  className={`eyebrow ${accentText}`}
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {picante ? "Dalí Picante" : "Miel orgánica"}
                </motion.p>

                {!picante && (
                  <motion.div
                    className="mt-1 text-[13px] font-semibold text-verde/40 font-display tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                  >
                    {String(productIndex).padStart(2, "0")}
                  </motion.div>
                )}

                <motion.h1
                  className="h1-display mt-2 text-verde"
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  style={{ fontSize: "clamp(48px, 5vw, 76px)" }}
                >
                  {product.name}
                </motion.h1>
              </div>

              {/* Tasting */}
              <motion.p
                className="body-text text-verde/85 max-w-[460px]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                {product.tasting}
              </motion.p>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-baseline gap-2"
              >
                <p className={`h3-display ${accentText}`}>{product.price}</p>
                <span className="caption text-verde/50">Precio de referencia</span>
              </motion.div>

              {/* Presentation selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <span className="field-label caption">Presentación</span>
                <div className="flex gap-3 mt-2">
                  {product.sizes.map((s: string, i: number) => (
                    <motion.button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-full border px-5 py-2 text-[15px] transition-colors ${
                        size === s
                          ? picante
                            ? "border-picante-naranja bg-picante-naranja text-crema"
                            : "border-verde bg-verde text-crema"
                          : "border-verde/25 text-verde hover:border-verde"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Add to cart + Buy now */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <motion.button
                  type="button"
                  className={`${picante ? "btn-picante" : "btn-primary"} py-3 px-8`}
                  onClick={() => {
                    add({
                      slug: product.slug,
                      name: product.name,
                      size,
                      image: product.image,
                      price: product.price,
                    });
                    navigate({ to: "/checkout" });
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.985 }}
                >
                  Comprar ahora
                </motion.button>

                <motion.button
                  type="button"
                  className="btn-secondary py-3 px-8"
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
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.985 }}
                >
                  {added ? "Añadido ✓" : "Añadir al carrito"}
                </motion.button>
              </motion.div>

              {/* Badges */}
              <motion.div
                className="max-w-[460px] pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <ProductBadges badges={product.badges} accent={product.accent} size="md" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HONEY THREAD */}
      <div className="relative h-[40px] pointer-events-none">
        <HoneyThread length={40} />
      </div>

      {/* BENEFITS SECTION */}
      <SectionReveal direction="up">
        <section className="relative px-6 py-12 md:px-[120px] md:py-[80px]">
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-end pr-12"
            aria-hidden="true"
          >
            <div className="text-verde font-display text-[120px] md:text-[160px] leading-none opacity-[0.04] whitespace-nowrap">
              {product.name.split(" ")[0].toUpperCase()}
            </div>
          </motion.div>

          <div className="relative mx-auto max-w-[1200px]">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <motion.h2
                  className="h3-display text-verde"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ margin: "-100px", amount: 0.15 }}
                >
                  Beneficios
                </motion.h2>
                <motion.p
                  className="body-text mt-4 text-verde/85 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ margin: "-100px", amount: 0.15 }}
                >
                  {product.detailedBenefits}
                </motion.p>
              </div>

              <motion.div
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: `color-mix(in srgb, ${product.accent} 15%, var(--color-crema))`,
                  borderLeft: `3px solid ${product.accent}`,
                }}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ margin: "-100px", amount: 0.15 }}
              >
                <div className="space-y-3">
                  {product.badges.map((badge, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ margin: "-100px", amount: 0.15 }}
                      className="flex gap-3 items-start"
                    >
                      <div
                        className="size-2 rounded-full mt-2 shrink-0"
                        style={{ backgroundColor: product.accent }}
                      />
                      <div>
                        <p className="text-[15px] font-semibold text-verde">{badge.label}</p>
                        {badge.description && (
                          <p className="text-[14px] text-verde/70 mt-1">{badge.description}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* VER MÁS — Technical Info */}
      <section className="px-6 md:px-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <button
            type="button"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-3 text-[15px] font-medium text-verde hover:opacity-70 transition-opacity"
          >
            {showMore ? "Ver menos información" : "Ver más información"}
            <motion.div
              animate={{ rotate: showMore ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden mt-8 pb-12 md:pb-20"
              >
                <div className="space-y-8">
                  {/* Technical specs */}
                  <div>
                    <h3 className="h3-display text-verde mb-6">Ficha técnica</h3>
                    <div className="space-y-4">
                      {[
                        ["Presentación", product.sizes.join(" · ")],
                        ["Origen", "Bosques tropicales de Colombia — Orinoquía (Hacienda La Sonora)"],
                        ["Tipo", "Miel cruda, no procesada"],
                        ["Certificación", "100% Colombiana — denominación de origen"],
                      ].map(([label, value], i) => (
                        <motion.div
                          key={label}
                          className="grid grid-cols-[140px_1fr] gap-4 pb-4 border-b border-verde/10"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                        >
                          <dt className="caption font-semibold text-verde/60">{label}</dt>
                          <dd className="text-[15px] text-verde">{value}</dd>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Care */}
                  <motion.div
                    className="flex items-start gap-4 rounded-2xl p-6"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${product.accent} 10%, var(--color-crema))`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Sun
                      className="mt-1 size-5 shrink-0"
                      style={{ color: product.accent }}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-[15px] font-semibold text-verde">Cuidado y conservación</h4>
                      <p className="mt-2 text-[14px] text-verde/80 leading-snug">
                        Mantener en un lugar fresco, alejado de la luz solar directa. La miel cristaliza naturalmente con el tiempo.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* COMPARISON — ¿CUÁL LLEVAR? */}
      <section className="px-6 md:px-[120px] py-12 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionReveal direction="up">
            <h2 className="h3-display text-verde">¿Cuál llevar?</h2>
            <p className="body-text mt-2 text-verde/70">
              Compara nuestras tres variedades puras y elige la que más te acompañe.
            </p>
          </SectionReveal>

          <motion.div
            className="mt-8 grid gap-6 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px", amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {pureProducts.map((p, i) => {
              const isCurrent = p.slug === product.slug;
              return (
                <motion.div
                  key={p.slug}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to="/producto/$slug"
                    params={{ slug: p.slug }}
                    className="card-soft flex flex-col h-full p-6 group hover:shadow-lg transition-all"
                    style={{
                      borderTop: `6px solid ${p.accent}`,
                      backgroundColor: isCurrent ? `color-mix(in srgb, ${p.accent} 8%, var(--color-crema))` : undefined,
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[13px] font-semibold text-verde/40 font-display tracking-wider">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {isCurrent && (
                        <span
                          className="text-[11px] px-2 py-1 rounded-full font-semibold"
                          style={{
                            color: p.accent,
                            backgroundColor: `color-mix(in srgb, ${p.accent} 20%, var(--color-crema))`,
                          }}
                        >
                          VIENDO
                        </span>
                      )}
                    </div>

                    <h3 className="h3-display text-verde">{p.name}</h3>
                    <p className="text-[14px] leading-snug text-verde/80 mt-2">{p.tasting}</p>

                    <div className="mt-auto pt-4 border-t border-verde/10">
                      <p className="caption text-verde/60 mb-1">Beneficio principal</p>
                      <p className="text-[15px] font-medium text-verde">{p.badges[0]?.label}</p>
                    </div>

                    <motion.div
                      className="mt-3 text-[14px] font-medium"
                      style={{ color: p.accent }}
                      whileHover={{ x: 4 }}
                    >
                      {isCurrent ? "Estás viendo esta →" : "Ver esta miel →"}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </>
  );
}
