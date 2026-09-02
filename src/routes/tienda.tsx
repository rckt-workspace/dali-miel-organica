import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { motion } from "motion/react";
import { FeaturedProductBlock } from "@/components/FeaturedProductBlock";
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
          "Miel Multifloral cruda y Dalí Picante Chile Morita: dos cosechas orgánicas de la altillanura colombiana.",
      },
      { property: "og:title", content: "Tienda — Dalí Miel Orgánica" },
      {
        property: "og:description",
        content:
          "Compra miel cruda orgánica Multifloral y la línea Dalí Picante Chile Morita.",
      },
    ],
  }),
  component: Tienda,
});

function Tienda() {
  const activos = [...pureProducts, ...spicyProducts];

  return (
    <>
      {/* HEADER */}
      <section className="relative overflow-hidden px-6 py-12 md:px-[120px] md:pt-[64px] md:pb-[40px] bg-crema">
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
            Dos cosechas disponibles hoy: miel Multifloral cruda y Dalí Picante
            Chile Morita, ambas de los bosques de la altillanura colombiana.
          </motion.p>
        </div>
      </section>

      {/* HONEY THREAD SEGMENT — DECORATIVE BRIDGE */}
      <div className="relative h-[40px] pointer-events-none">
        <HoneyThread length={40} />
      </div>

      {/* PRODUCTS SECTION */}
      <section className="relative overflow-hidden bg-crema px-6 py-12 md:px-[120px] md:pt-[48px] md:pb-[96px]">
        {/* Decorative background */}
        <motion.div
          className="deco-bg absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url(${formas.url})`,
            backgroundPosition: "center",
          }}
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          aria-hidden="true"
        />

        {/* Animals decorations */}
        <motion.img
          src={perezoso.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute -left-6 top-[20%] hidden w-[140px] opacity-70 mix-blend-multiply lg:block"
          animate={{ y: [0, 8, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.img
          src={osoHormiguero.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute bottom-12 right-2 hidden w-[180px] mix-blend-multiply lg:block"
          animate={{ y: [0, -6, 0], rotate: [0, -0.8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col gap-10 md:gap-16">
          {activos.map((product, index) => (
            <FeaturedProductBlock
              key={product.slug}
              product={product}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </section>
    </>
  );
}
