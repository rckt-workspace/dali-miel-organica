import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { TiendaCategorySelector } from "@/components/TiendaCategorySelector";
import { pureProducts, spicyProducts } from "@/lib/products";
import { HoneyThread } from "@/components/motion";
import formas from "@/assets/formas-organicas.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";

const searchSchema = z.object({
  linea: z.enum(["pura", "picante"]).catch("pura"),
});

export const Route = createFileRoute("/tienda")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Tienda — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Miel pura Acacia, Multifloral y Caucho, y la línea Dalí Picante infusionada con chile morita y chile de árbol.",
      },
      { property: "og:title", content: "Tienda — Dalí Miel Orgánica" },
      {
        property: "og:description",
        content: "Compra miel cruda orgánica y la nueva línea Dalí Picante.",
      },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const { linea } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [displayCategory, setDisplayCategory] = useState<"pura" | "picante">(
    linea as "pura" | "picante"
  );

  const picante = displayCategory === "picante";
  const list = picante ? spicyProducts : pureProducts;

  const handleCategoryChange = (category: "pura" | "picante") => {
    setDisplayCategory(category);
    navigate({ search: { linea: category } });
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Scroll-linked background word movement
  const backgroundWordX = useTransform(scrollY, [0, 800], [-50, 50]);

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden px-6 py-12 md:px-[120px] md:pt-[64px] md:pb-[40px] bg-crema">
        {/* Editorial background typography */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="text-crema font-display text-[140px] md:text-[220px] leading-none opacity-[0.035] whitespace-nowrap select-none">
            {picante ? "PICANTE" : "MIEL"}
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-[1200px] z-10">
          <motion.p
            className="eyebrow text-verde"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nuestra miel
          </motion.p>

          <motion.h1
            className="h1-display mt-3 text-verde"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Cosechas con carácter propio
          </motion.h1>

          <motion.p
            className="body-text mt-4 max-w-[640px] text-verde/80"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {picante
              ? "Miel orgánica infusionada con chile: el mismo origen, con carácter."
              : "Tres variedades de miel cruda, cosechadas en los bosques de la altillanura colombiana."}
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring", stiffness: 300 }}
          >
            <TiendaCategorySelector active={displayCategory} onChange={handleCategoryChange} />
          </motion.div>
        </div>
      </section>

      {/* HONEY THREAD SEGMENT — DECORATIVE BRIDGE */}
      <div className="relative h-[40px] pointer-events-none">
        <HoneyThread length={40} />
      </div>

      {/* PRODUCTS SECTION */}
      <section
        ref={containerRef}
        className="relative overflow-hidden px-6 py-12 md:px-[120px] md:pt-[48px] md:pb-[96px]"
        style={{
          backgroundColor: picante ? "rgba(249, 246, 228, 0.95)" : "rgba(249, 246, 228, 1)",
        }}
      >
        {/* Decorative background */}
        <motion.div
          className="deco-bg absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url(${formas.url})`,
            backgroundPosition: "center",
          }}
          animate={{
            y: [0, 4, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Scroll-linked background word */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-end pr-12"
          style={{
            x: backgroundWordX,
          }}
          aria-hidden="true"
        >
          <div className="text-verde font-display text-[120px] md:text-[180px] leading-none opacity-[0.045] whitespace-nowrap">
            {picante ? "PICANTE" : "COSECHA"}
          </div>
        </motion.div>

        {/* Animals decorations */}
        <motion.img
          src={perezoso.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -left-6 top-[20%] hidden w-[140px] opacity-70 mix-blend-multiply lg:block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ margin: "-100px", amount: 0.15 }}
          animate={{
            y: [0, 8, 0],
            rotate: [0, 1, 0],
          }}
        />

        <motion.img
          src={osoHormiguero.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute bottom-12 right-2 hidden w-[180px] mix-blend-multiply lg:block"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ margin: "-100px", amount: 0.15 }}
          animate={{
            y: [0, -6, 0],
            rotate: [0, -0.8, 0],
          }}
        />

        <div className="relative mx-auto max-w-[1200px] z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={displayCategory}
              className="grid items-stretch gap-8 md:grid-cols-3"
              initial={{ opacity: 0, x: displayCategory === "picante" ? 30 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: displayCategory === "picante" ? -30 : 30 }}
              transition={{ duration: 0.4 }}
            >
              {list.map((product, index) => (
                <motion.div
                  key={product.slug}
                  className="h-full"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  viewport={{ margin: "-100px", amount: 0.15 }}
                >
                  {/* Editorial product index */}
                  <div className="relative h-full">
                    <motion.div
                      className="absolute -top-8 left-0 opacity-50"
                      animate={{ x: [0, 2, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.1 }}
                    >
                      <span className="text-[12px] font-semibold text-verde/40 font-display tracking-wider">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </motion.div>
                    <ProductCard product={product} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
