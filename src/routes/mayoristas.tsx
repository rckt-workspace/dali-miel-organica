import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Package, Tag, Leaf, Check, ArrowDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { BidirectionalReveal } from "@/components/motion/BidirectionalReveal";
import { HoneyThread } from "@/components/motion/HoneyThread";
import formas from "@/assets/formas-organicas.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";

export const Route = createFileRoute("/mayoristas")({
  head: () => ({
    meta: [
      { title: "Aliados y Mayoristas — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Miel orgánica al por mayor para restaurantes, tiendas y empresas de alimentos, con trazabilidad y denominación de origen.",
      },
      { property: "og:title", content: "Lleva Dalí a tu negocio — Mayoristas" },
      {
        property: "og:description",
        content: "Compras al por mayor de miel orgánica Dalí: volúmenes, precios preferenciales y trazabilidad.",
      },
    ],
  }),
  component: Mayoristas,
});

const beneficios = [
  {
    Icon: Package,
    number: "01",
    title: "Volúmenes al por mayor",
    text: "Presentaciones y cantidades adaptadas a lo que tu negocio necesita.",
  },
  {
    Icon: Tag,
    number: "02",
    title: "Precios preferenciales",
    text: "Condiciones especiales para compras recurrentes.",
  },
  {
    Icon: Leaf,
    number: "03",
    title: "Producto trazable y orgánico",
    text: "Del panal a tu mesa, con el respaldo de nuestra denominación de origen.",
  },
];

function Mayoristas() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const { error: dbError } = await supabase.from("leads_b2b").insert({
      empresa: String(fd.get("empresa") ?? "").trim(),
      contacto: String(fd.get("contacto") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
      tipo_negocio: String(fd.get("tipo_negocio") ?? "").trim(),
      volumen: String(fd.get("volumen") ?? "").trim() || null,
      mensaje: String(fd.get("mensaje") ?? "").trim() || null,
    });

    setSending(false);
    if (dbError) {
      setError("No pudimos enviar tu solicitud. Intenta de nuevo en un momento.");
      return;
    }
    setSent(true);
  }

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <>
      {/* HERO — PREMIUM COMPOSITION */}
      <section className="relative overflow-hidden bg-verde min-h-screen md:min-h-[800px] flex items-center">
        {/* Background Word */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-end opacity-[0.08]"
          initial={reducedMotion ? {} : { x: 40 }}
          animate={reducedMotion ? {} : { x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="h3-display font-display text-crema/50 pr-12 md:pr-[120px] whitespace-nowrap">
            ALIADOS
          </div>
        </motion.div>

        {/* Organic Curve */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M1440,700 L1440,210 C1230,250 1160,430 940,540 C790,615 620,620 430,700 Z"
            fill="var(--color-crema)"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </svg>

        {/* Content Grid */}
        <div className="relative mx-auto max-w-[1440px] px-6 py-12 md:px-[120px] md:py-[110px] w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT: Business Message */}
            <div className="flex flex-col gap-6">
              <motion.p
                className="eyebrow text-salvia"
                initial={reducedMotion ? {} : { y: -15, opacity: 0 }}
                animate={reducedMotion ? {} : { y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Para empresas
              </motion.p>

              <motion.h1
                className="h1-display text-crema"
                initial={reducedMotion ? {} : { x: -30, opacity: 0 }}
                animate={reducedMotion ? {} : { x: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              >
                Lleva Dalí a tu negocio
              </motion.h1>

              <motion.p
                className="body-text max-w-[620px] text-crema/85"
                initial={reducedMotion ? {} : { y: 15, opacity: 0 }}
                animate={reducedMotion ? {} : { y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              >
                Miel orgánica al por mayor para restaurantes, tiendas y empresas de alimentos — con la
                misma calidad y trazabilidad de siempre.
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={reducedMotion ? {} : { scale: 0.97, opacity: 0 }}
                animate={reducedMotion ? {} : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="pt-4"
              >
                <motion.button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-3 btn-primary relative overflow-hidden"
                  whileHover={reducedMotion ? {} : { y: -2 }}
                  whileTap={reducedMotion ? {} : { scale: 0.98 }}
                >
                  <span>Hablemos de tu negocio</span>
                  <motion.div
                    animate={reducedMotion ? {} : { y: [0, 4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ArrowDown className="size-4" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

            {/* RIGHT: Visual Composition */}
            <motion.div
              className="hidden md:flex items-center justify-center"
              initial={reducedMotion ? {} : { x: 35, opacity: 0, scale: 0.97 }}
              animate={reducedMotion ? {} : { x: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            >
              {/* Decorative honey droplet shape */}
              <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* Outer glow */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-20"
                  style={{
                    background: "radial-gradient(circle, #FCD672, transparent 70%)",
                  }}
                  animate={reducedMotion ? {} : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                {/* Main shape */}
                <motion.div
                  className="absolute inset-0 pointer-events-none md:pointer-events-auto"
                  whileHover={reducedMotion ? {} : { scale: 1.025, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    viewBox="0 0 200 240"
                    className="w-full h-full"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    {/* Organic honey-like shape */}
                    <defs>
                      <linearGradient
                        id="honeyGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" style={{ stopColor: "#FCD672", stopOpacity: 0.9 }} />
                        <stop offset="100%" style={{ stopColor: "#FCD672", stopOpacity: 0.6 }} />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 100 10 C 130 20, 150 50, 150 90 C 150 140, 130 180, 100 200 C 70 180, 50 140, 50 90 C 50 50, 70 20, 100 10 Z"
                      fill="url(#honeyGrad)"
                      opacity="0.85"
                    />
                    {/* Highlight accent */}
                    <ellipse cx="90" cy="60" rx="25" ry="40" fill="#FCD672" opacity="0.4" />
                  </svg>
                </motion.div>

                {/* Decorative botanical line */}
                <svg
                  className="absolute -top-12 -right-8 w-32 h-32 opacity-40"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M 50 0 Q 70 20, 60 50 Q 50 80, 80 100"
                    stroke="var(--color-crema)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BENEFITS — PREMIUM EDITORIAL SEQUENCE */}
      <section className="relative overflow-hidden bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        {/* Background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url(${formas.url})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          aria-hidden="true"
        />

        {/* Fauna — Integrated with intentional placement */}
        {!reducedMotion && (
          <motion.img
            src={osoHormiguero.url}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none absolute -bottom-8 right-6 hidden w-[160px] opacity-70 mix-blend-multiply lg:block"
            initial={{ y: 0 }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div className="relative mx-auto max-w-[1100px]">
          {/* Connecting organic line */}
          <svg
            className="absolute left-1/2 top-0 bottom-0 w-1 overflow-visible pointer-events-none hidden md:block"
            style={{ transform: "translateX(-50%)", height: "100%" }}
            viewBox="0 0 2 600"
            preserveAspectRatio="none"
          >
            <path
              d="M 1 0 Q 0 100, 1 200 Q 2 300, 1 400 Q 0 500, 1 600"
              stroke="var(--color-verde)"
              strokeWidth="1"
              fill="none"
              opacity="0.15"
              strokeDasharray="4 4"
            />
          </svg>

          {/* Benefits Grid with stagger */}
          <div className="grid md:grid-cols-3 gap-10 md:gap-16">
            {beneficios.map((benefit, idx) => (
              <BidirectionalReveal
                key={benefit.number}
                direction={idx === 0 ? "left" : idx === 1 ? "up" : "right"}
                distance={30}
                delay={idx * 0.1}
              >
                <motion.div
                  className="flex flex-col gap-4 group cursor-default"
                  whileHover={reducedMotion ? {} : { y: -4 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Number */}
                  <div className="text-5xl font-display text-verde/15 font-light">
                    {benefit.number}
                  </div>

                  {/* Icon */}
                  <motion.span
                    className="flex size-12 items-center justify-center rounded-full bg-salvia text-verde"
                    whileHover={reducedMotion ? {} : { scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <benefit.Icon className="size-6" strokeWidth={1.6} />
                  </motion.span>

                  {/* Content */}
                  <h2 className="h3-display text-verde">{benefit.title}</h2>
                  <p className="body-text text-verde/75">{benefit.text}</p>

                  {/* Hover accent line */}
                  <motion.div
                    className="h-0.5 bg-gradient-to-r from-honey via-honey to-transparent rounded-full"
                    initial={{ scaleX: 0 }}
                    whileHover={reducedMotion ? {} : { scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  />
                </motion.div>
              </BidirectionalReveal>
            ))}
          </div>
        </div>
      </section>

      {/* HONEY THREAD TRANSITION */}
      {!reducedMotion && <HoneyThread startOffset={0} length={140} />}

      {/* FORM SECTION — PREMIUM TWO-COLUMN LAYOUT */}
      <section
        ref={formRef}
        className="relative overflow-hidden bg-verde px-6 py-12 md:px-[120px] md:py-[100px]"
        style={{ borderBottom: "1px solid rgb(183 216 170 / 0.4)" }}
      >
        {/* Background word */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-start opacity-[0.06]"
          initial={reducedMotion ? {} : { x: -40 }}
          animate={reducedMotion ? {} : { x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        >
          <div className="h2-display font-display text-crema/50 pl-12 md:pl-[120px] whitespace-nowrap">
            NEGOCIOS
          </div>
        </motion.div>

        <div className="relative mx-auto max-w-[1200px]">
          <div className="grid md:grid-cols-2 gap-12">
            {/* LEFT: Editorial Content */}
            <motion.div
              className="flex flex-col justify-start gap-8 py-6"
              initial={reducedMotion ? {} : { x: -30, opacity: 0 }}
              whileInView={reducedMotion ? {} : { x: 0, opacity: 1 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div>
                <p className="eyebrow text-salvia mb-4">Hablemos</p>
                <h2 className="h2-display text-crema">Cuéntanos sobre tu negocio</h2>
              </div>

              <div className="flex flex-col gap-4">
                <p className="body-text text-crema/80">
                  En Dalí entendemos que cada negocio es único. Por eso ofrecemos soluciones personalizadas
                  que se adapten a tus necesidades.
                </p>
                <p className="body-text text-crema/70">
                  Completar este formulario nos ayuda a conocer mejor tu proyecto y poder brindarte la
                  mejor asesoría.
                </p>
              </div>

              {/* Decorative element */}
              <div className="hidden md:block pt-6">
                <svg
                  viewBox="0 0 40 60"
                  className="w-16 h-24 opacity-30"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    d="M 20 0 Q 25 10, 20 20 Q 15 30, 20 40 Q 25 50, 20 60"
                    stroke="var(--color-crema)"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="30" r="2" fill="var(--color-crema)" opacity="0.4" />
                  <circle cx="30" cy="30" r="2" fill="var(--color-crema)" opacity="0.4" />
                </svg>
              </div>
            </motion.div>

            {/* RIGHT: Form Surface */}
            <motion.div
              className="rounded-3xl bg-crema/95 p-8 md:p-10 border border-salvia/20 backdrop-blur-sm"
              initial={reducedMotion ? {} : { x: 30, opacity: 0 }}
              whileInView={reducedMotion ? {} : { x: 0, opacity: 1 }}
              viewport={{ margin: "-80px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
                    animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                    exit={reducedMotion ? {} : { opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center gap-6 py-12"
                  >
                    <motion.div
                      animate={reducedMotion ? {} : { scale: [0.8, 1.1, 1] }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="flex size-16 items-center justify-center rounded-full bg-green-100"
                    >
                      <Check className="size-8 text-green-600" />
                    </motion.div>
                    <div className="text-center">
                      <h3 className="h3-display text-verde mb-2">¡Gracias!</h3>
                      <p className="body-text text-verde/75">
                        Nos pondremos en contacto contigo pronto.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={reducedMotion ? {} : { opacity: 0 }}
                    animate={reducedMotion ? {} : { opacity: 1 }}
                    exit={reducedMotion ? {} : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                    onSubmit={handleSubmit}
                  >
                    {/* Form Fields with Stagger */}
                    {[
                      { id: "empresa", label: "Nombre de la empresa", placeholder: "Tu empresa", type: "text", required: true },
                      { id: "contacto", label: "Nombre de contacto", placeholder: "Tu nombre", type: "text", required: true },
                      { id: "email", label: "Email", placeholder: "tu@empresa.com", type: "email", required: true },
                      { id: "telefono", label: "Teléfono", placeholder: "+57 300 000 0000", type: "tel", required: true },
                    ].map((field, idx) => (
                      <motion.div
                        key={field.id}
                        initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                        animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <label
                          className="field-label caption text-verde"
                          htmlFor={field.id}
                        >
                          {field.label}
                        </label>
                        <motion.input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="field bg-white/60 border border-verde/15 hover:border-verde/25 focus:border-verde focus:bg-white transition-all"
                          whileFocus={reducedMotion ? {} : { boxShadow: "0 0 0 3px rgba(252, 214, 114, 0.1)" }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>
                    ))}

                    {/* Select Field */}
                    <motion.div
                      initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <label
                        className="field-label caption text-verde"
                        htmlFor="tipo_negocio"
                      >
                        Tipo de negocio
                      </label>
                      <select
                        id="tipo_negocio"
                        name="tipo_negocio"
                        required
                        defaultValue=""
                        className="field bg-white/60 border border-verde/15 hover:border-verde/25 focus:border-verde focus:bg-white transition-all"
                      >
                        <option value="" disabled>
                          Selecciona una opción
                        </option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Tienda">Tienda</option>
                        <option value="Distribuidor">Distribuidor</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </motion.div>

                    {/* Volume Field */}
                    <motion.div
                      initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.25 }}
                    >
                      <label
                        className="field-label caption text-verde"
                        htmlFor="volumen"
                      >
                        Volumen aproximado que necesitan
                      </label>
                      <input
                        id="volumen"
                        name="volumen"
                        type="text"
                        placeholder="Ej. 50 kg/mes"
                        className="field bg-white/60 border border-verde/15 hover:border-verde/25 focus:border-verde focus:bg-white transition-all"
                      />
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <label
                        className="field-label caption text-verde"
                        htmlFor="mensaje"
                      >
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        name="mensaje"
                        rows={3}
                        placeholder="Cuéntanos en qué podemos ayudarte"
                        className="field bg-white/60 border border-verde/15 hover:border-verde/25 focus:border-verde focus:bg-white transition-all resize-none"
                      />
                    </motion.div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                          className="text-[14px] text-red-600 font-medium"
                        >
                          {error}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={sending}
                      initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.35 }}
                      whileHover={reducedMotion ? {} : { y: -2 }}
                      whileTap={reducedMotion ? {} : { scale: 0.985 }}
                      className="btn-primary self-start mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {sending ? "Enviando…" : "Enviar solicitud"}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
