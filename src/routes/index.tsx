import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, Star } from "lucide-react";
import { motion } from "motion/react";
import { ProductCard } from "@/components/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pureProducts, spicyProducts } from "@/lib/products";
import { SectionReveal, StaggerGroup, HoneyThread } from "@/components/motion";

import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";
import colibries from "@/assets/colibries.png.asset.json";

import heroFoto from "@/assets/hero-banner-dali.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dalí — Miel cruda orgánica de la altillanura colombiana" },
      {
        name: "description",
        content:
          "Miel 100% orgánica con denominación de origen, cosechada en los bosques tropicales de la Orinoquia. Acacia, Multifloral y Caucho.",
      },
      { property: "og:title", content: "Dalí — Miel cruda orgánica de Colombia" },
      {
        property: "og:description",
        content: "Vida, sabiduría y bienestar en cada cosecha. Miel cruda orgánica colombiana.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-crema">
        {/* Mobile */}
        <motion.div
          className="relative h-[540px] w-full overflow-hidden bg-crema md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={heroFoto.url}
            alt="Pan con mantequilla y miel Dalí Caucho cayendo, junto al frasco de miel Caucho"
            className="absolute inset-0 h-full w-full object-cover object-[88%_center]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backgroundColor: "rgba(35,91,78,0.12)" }}
          />

          <div className="absolute inset-x-0 top-0 flex w-full max-w-full flex-col px-6 pt-4">
            <motion.p
              className="eyebrow text-verde"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              De los bosques tropicales de Colombia
            </motion.p>
            <motion.h1
              className="h1-display mt-8 max-w-full text-verde"
              style={{ fontSize: "31px", lineHeight: "105%" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Miel que nace donde
              <br />
              Colombia respira
            </motion.h1>
            <motion.p
              className="body-text mt-10 max-w-[68%] text-verde/90"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Miel 100% orgánica de la altillanura colombiana, con denominación de origen.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/tienda" className="btn-primary btn-sm mt-10 self-start">
                Descubre nuestra miel
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Desktop */}
        <motion.div
          className="relative hidden min-h-[640px] md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={heroFoto.url}
            alt="Pan con mantequilla y miel Dalí Caucho cayendo, junto al frasco"
            className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-crema) 0%, rgba(249,246,228,0.85) 32%, rgba(249,246,228,0.35) 55%, rgba(249,246,228,0) 72%)",
            }}
          />
          <div className="relative mx-auto flex min-h-[640px] max-w-[1440px] items-start px-8 pb-[110px] pt-[92px] lg:px-[72px]">
            <div className="flex max-w-[560px] flex-col">
              <motion.p
                className="eyebrow text-verde"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                De los bosques tropicales de Colombia
              </motion.p>
              <motion.h1
                className="h1-display mt-10 whitespace-nowrap text-verde"
                style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: "105%" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Miel que nace donde
                <br />
                Colombia respira
              </motion.h1>
              <motion.p
                className="body-text mt-12 max-w-[440px] text-verde/85"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
                sabiduría y bienestar en cada cosecha — sin atajos y sin pedir permiso.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <Link to="/tienda" className="btn-primary btn-base mt-12 self-start">
                  Descubre nuestra miel
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION — PRESERVED STRUCTURE */}
      <section className="relative overflow-hidden px-6 py-12 md:px-[120px] md:py-[120px]">
        <motion.div
          className="deco-bg absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${formas.url})` }}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.08 }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <SectionReveal direction="up" delay={0.2}>
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="eyebrow text-verde">Nuestra miel</p>
              <h2 className="h2-display text-verde">Tres variedades, un mismo origen</h2>
            </div>
          </SectionReveal>

          {/* Product Grid — EXACT ORIGINAL STRUCTURE */}
          <motion.div
            className="mt-8 grid gap-8 md:mt-14 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 0.2,
                },
              },
            }}
          >
            {pureProducts.map((product) => (
              <motion.div
                key={product.slug}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="group relative rounded-3xl bg-crema p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                  style={{ borderTop: `4px solid ${product.accent}` }}
                >
                  {/* Editorial Number */}
                  <div className="text-xs font-semibold text-verde/30 mb-4 tracking-wider">
                    {String(pureProducts.indexOf(product) + 1).padStart(2, "0")}
                  </div>

                  {/* Product Image */}
                  <Link
                    to="/producto/$slug"
                    params={{ slug: product.slug }}
                    className="block mb-6 transition-transform duration-300 h-[240px] flex items-center justify-center"
                  >
                    <img
                      src={product.gallery?.[0] ?? product.image}
                      alt={`Frasco de miel ${product.name} de Dalí`}
                      loading="lazy"
                      className="w-full h-full object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Name */}
                  <Link
                    to="/producto/$slug"
                    params={{ slug: product.slug }}
                    className="h3-display text-verde hover:opacity-70 transition-opacity mb-2"
                  >
                    {product.name}
                  </Link>

                  {/* Tasting Notes */}
                  <p className="text-sm text-verde/75 mb-2">{product.tasting}</p>

                  {/* Size */}
                  <p className="caption text-verde/50 mb-4">{product.sizes[0]}</p>

                  {/* Badges */}
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {product.badges.map((badge) => (
                      <span
                        key={badge.label}
                        className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                        style={{
                          backgroundColor: `${product.accent}20`,
                          color: product.accent,
                        }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  {/* Price Section */}
                  <div className="border-t border-verde/10 pt-4 mb-4">
                    <span className="text-sm font-semibold text-verde">{product.price}</span>
                    <p className="caption text-verde/40 text-xs mt-1">
                      PRECIO DE REFERENCIA — PRÓXIMAMENTE
                    </p>
                  </div>

                  {/* CTA */}
                  <motion.button
                    className="w-full py-3 px-4 rounded-full font-medium text-sm text-crema transition-all"
                    style={{ backgroundColor: product.accent }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      window.location.href = `/producto/${product.slug}`;
                    }}
                  >
                    Comprar
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DALI PICANTE */}
      <section className="relative overflow-hidden bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        <motion.div
          className="deco-bg absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${formas.url})` }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <SectionReveal direction="up">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="eyebrow text-picante-naranja">Dalí Picante</p>
              <h2 className="h2-display text-verde">
                Miel con carácter, para quien le gusta que las cosas piquen
              </h2>
            </div>
          </SectionReveal>

          <motion.div
            className="mt-8 grid gap-8 md:mt-14 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
          >
            {spicyProducts.map((product) => (
              <motion.div
                key={product.slug}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="rounded-3xl bg-crema p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
                style={{ borderTop: `4px solid ${product.accent}` }}
              >
                <Link
                  to="/producto/$slug"
                  params={{ slug: product.slug }}
                  className="block mb-6 h-[240px] flex items-center justify-center"
                >
                  <img
                    src={product.gallery?.[0] ?? product.image}
                    alt={`Frasco de miel ${product.name} de Dalí`}
                    loading="lazy"
                    className="w-full h-full object-contain drop-shadow-md hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <Link
                  to="/producto/$slug"
                  params={{ slug: product.slug }}
                  className="h3-display text-verde hover:opacity-70 transition-opacity mb-2"
                >
                  {product.name}
                </Link>

                <p className="text-sm text-verde/75 mb-2">{product.tasting}</p>
                <p className="caption text-verde/50 mb-4">{product.sizes[0]}</p>

                <div className="flex gap-2 mb-6 flex-wrap">
                  {product.badges.map((badge) => (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs"
                      style={{
                        backgroundColor: `${product.accent}20`,
                        color: product.accent,
                      }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                <div className="border-t border-verde/10 pt-4 mb-4">
                  <span className="text-sm font-semibold text-verde">{product.price}</span>
                  <p className="caption text-verde/40 text-xs mt-1">
                    PRECIO DE REFERENCIA — PRÓXIMAMENTE
                  </p>
                </div>

                <motion.button
                  className="w-full py-3 px-4 rounded-full font-medium text-sm text-crema transition-all"
                  style={{ backgroundColor: product.accent }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    window.location.href = `/producto/${product.slug}`;
                  }}
                >
                  Comprar
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <SectionReveal direction="up" delay={0.4}>
            <div className="mt-8 flex justify-center md:mt-12">
              <Link to="/tienda" search={{ linea: "picante" }} className="btn-picante">
                Ver la línea picante
              </Link>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* WHOLESALE */}
      <section className="bg-verde px-6 py-12 md:px-[120px] md:py-[80px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
          <SectionReveal direction="left">
            <div className="flex items-start gap-4 md:items-center md:gap-5">
              <Store
                className="size-9 shrink-0 text-salvia md:size-12"
                strokeWidth={1.4}
                aria-hidden="true"
              />
              <div className="min-w-0 max-w-[640px]">
                <h3 className="font-display text-[22px] leading-tight text-crema md:text-[28px]">
                  ¿Tienes un negocio?
                </h3>
                <p className="body-text mt-2 text-crema/85 md:mt-3">
                  Lleva Dalí a tu restaurante, tienda o empresa con condiciones especiales para
                  compras al por mayor.
                </p>
              </div>
            </div>
          </SectionReveal>
          <SectionReveal direction="right">
            <Link
              to="/mayoristas"
              className="w-full shrink-0 rounded-full bg-salvia px-8 py-4 text-center text-[15px] font-semibold text-verde transition-colors hover:bg-salvia-dark sm:w-auto md:text-[16px]"
            >
              Conoce nuestras condiciones
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="relative grid overflow-hidden bg-verde md:grid-cols-2">
        <motion.div
          className="deco-bg absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url(${ocelote.url})` }}
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.12 }}
          transition={{ duration: 0.8 }}
        />

        <div className="relative">
          <motion.img
            src={bosque.url}
            alt="Apicultores de Dalí revisando un panal en los bosques de la hacienda La Sonora"
            loading="lazy"
            width={1024}
            height={1400}
            className="h-[300px] w-full object-cover object-[center_25%] sm:h-[420px] md:h-full md:max-h-[640px]"
            style={{ boxShadow: "0 15px 40px rgba(35,91,78,0.35)" }}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          />

          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(to top right, rgba(35,91,78,0.25) 0%, rgba(35,91,78,0.12) 35%, rgba(35,91,78,0) 60%)",
            }}
          />
          <span className="absolute bottom-5 left-5 inline-flex rounded-lg bg-crema p-2">
            <img src={logo.url} alt="" className="h-6 w-auto" />
          </span>
        </div>

        <div className="relative flex flex-col justify-center gap-5 px-6 py-12 md:px-[100px] md:py-20">
          <SectionReveal direction="right" delay={0.1}>
            <p className="eyebrow text-salvia">Nuestra filosofía</p>
          </SectionReveal>
          <SectionReveal direction="right" delay={0.2}>
            <h2 className="h2-display text-crema">
              Parte del respeto, la humildad
              <br className="hidden md:block" /> y la conservación de la tierra
            </h2>
          </SectionReveal>
          <SectionReveal direction="right" delay={0.3}>
            <p className="body-text text-crema/85">
              Nuestros apiarios están en tres bosques que hoy forman parte de un sistema
              silvopastoril en la hacienda La Sonora. Animales como el oso de palma, el tigrillo y el
              oso perezoso han vuelto a habitar estos bosques gracias a nuestro modelo sostenible de
              conservación y reforestación.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <SectionReveal direction="up">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="eyebrow text-verde">Lo que dicen</p>
              <h2 className="h2-display text-verde">Miel que se recomienda sola</h2>
            </div>
          </SectionReveal>

          <motion.div
            className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
          >
            {[
              "La mejor miel que he probado, se nota que es 100% natural.",
              "Me encanta que puedo saber exactamente de dónde viene mi miel.",
              "Calidad excepcional, ya es parte de mi desayuno todos los días.",
            ].map((quote) => (
              <motion.figure
                key={quote}
                className="card-soft flex flex-col gap-4 bg-crema p-7"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <div className="flex gap-1" aria-label="5 de 5 estrellas">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className="size-4"
                      style={{ color: "var(--color-honey)", fill: "var(--color-honey)" }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="body-text text-verde">"{quote}"</blockquote>
                <figcaption className="caption text-verde/60">Cliente verificado</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-12 md:px-[120px] md:py-[100px]">
        <div className="mx-auto max-w-[820px]">
          <SectionReveal direction="up">
            <div className="flex flex-col items-center gap-3 text-center">
              <p className="eyebrow text-verde">Preguntas frecuentes</p>
              <h2 className="h2-display text-verde">Lo que nos preguntan seguido</h2>
            </div>
          </SectionReveal>

          <Accordion type="single" collapsible className="mt-8 md:mt-12">
            {[
              {
                q: "¿La miel de Dalí es orgánica?",
                a: "Sí, es 100% orgánica — sin químicos ni procesos industriales, del panal a la mesa.",
              },
              {
                q: "¿La miel es procesada o cruda?",
                a: "Es miel cruda, no procesada — así aparece certificado directamente en la etiqueta de cada producto.",
              },
              {
                q: "¿Cómo debo almacenar la miel?",
                a: "Mantener en un lugar fresco, alejado de la luz solar — instrucción que viene impresa en la etiqueta del producto.",
              },
              {
                q: "¿De dónde viene la miel Dalí?",
                a: "De los bosques tropicales de Colombia, en la Orinoquia, específicamente de la hacienda La Sonora — con denominación de origen colombiana.",
              },
            ].map((item) => (
              <AccordionItem key={item.q} value={item.q} className="border-verde/15">
                <AccordionTrigger className="text-left font-display text-[18px] text-verde md:text-[20px]">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="body-text text-verde/85">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="flex flex-col items-center gap-6 px-6 py-14 text-center md:py-[100px]">
        <SectionReveal direction="up">
          <h2 className="h2-display text-verde">Lleva Dalí a tu mesa</h2>
        </SectionReveal>
        <SectionReveal direction="up" delay={0.1}>
          <Link to="/tienda" className="btn-primary">
            Ir a la tienda
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
