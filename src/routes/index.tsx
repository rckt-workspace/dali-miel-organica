import { createFileRoute, Link } from "@tanstack/react-router";
import { Store, Star } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { pureProducts, spicyProducts } from "@/lib/products";

import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";

import heroFoto from "@/assets/hero-pan-caucho.png.asset.json";

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
      <section className="relative overflow-hidden bg-crema">
        {/* Desktop / tablet: foto completa de fondo con texto encima */}
        <div className="relative min-h-[520px] md:min-h-[640px]">
          <img
            src={heroFoto.url}
            alt="Pan con mantequilla y miel Dalí Caucho cayendo, junto al frasco"
            className="absolute inset-0 h-full w-full object-cover object-[78%_center] md:object-[70%_center]"
          />

          {/* Velo claro sobre el costado izquierdo para legibilidad */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-crema) 0%, rgba(249,246,228,0.85) 32%, rgba(249,246,228,0.35) 55%, rgba(249,246,228,0) 72%)",
            }}
          />

          <div className="relative mx-auto flex max-w-[1440px] items-center px-6 py-14 md:min-h-[640px] md:px-[120px] md:py-[110px]">
            <div className="hidden flex-col gap-6 md:flex md:max-w-[560px]">
              <p className="eyebrow text-verde">De los bosques tropicales de Colombia</p>
              <h1 className="h1-display text-verde">
                Miel que nace
                <br className="hidden md:block" /> donde Colombia respira
              </h1>
              <p className="body-text max-w-[560px] text-verde/85">
                Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
                sabiduría y bienestar en cada cosecha — sin atajos y sin pedir permiso.
              </p>
              <Link to="/tienda" className="btn-primary btn-base mt-2 self-start">
                Descubre nuestra miel
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile: bloque bone sólido debajo de la foto */}
        <div className="flex flex-col gap-4 bg-crema px-6 pb-12 pt-8 text-center md:hidden">
          <p className="eyebrow text-verde">De los bosques tropicales de Colombia</p>
          <h1 className="h1-display text-verde">Miel que nace donde Colombia respira</h1>
          <p className="body-text text-verde/85">
            Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
            sabiduría y bienestar en cada cosecha — sin atajos y sin pedir permiso.
          </p>
          <Link to="/tienda" className="btn-primary btn-sm mx-auto mt-2">
            Descubre nuestra miel
          </Link>
        </div>
      </section>





      <section className="relative overflow-hidden px-6 py-12 md:px-[120px] md:py-[120px]">
        <div
          className="deco-bg absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url(${formas.url})` }}
          aria-hidden="true"
        />
        <img
          src={perezoso.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute left-2 top-6 hidden mix-blend-multiply w-[160px] lg:block"
        />
        <img
          src={osoHormiguero.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute bottom-6 right-2 hidden mix-blend-multiply w-[200px] lg:block"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-verde">Nuestra miel</p>
            <h2 className="h2-display text-verde">Tres variedades, un mismo origen</h2>
          </div>
          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-3">
            {pureProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        <div
          className="deco-bg absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url(${formas.url})` }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-picante-naranja">Dalí Picante</p>
            <h2 className="h2-display text-verde">
              Miel con carácter, para quien le gusta que las cosas piquen
            </h2>
          </div>
          <div className="mt-8 grid gap-8 md:mt-14 md:grid-cols-3">
            {spicyProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-8 flex justify-center md:mt-12">
            <Link to="/tienda" search={{ linea: "picante" }} className="btn-picante">
              Ver la línea picante
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-verde px-6 py-12 md:px-[120px] md:py-[80px]">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
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
          <Link
            to="/mayoristas"
            className="w-full shrink-0 rounded-full bg-salvia px-8 py-4 text-center text-[15px] font-semibold text-verde transition-colors hover:bg-salvia-dark sm:w-auto md:text-[16px]"
          >
            Conoce nuestras condiciones
          </Link>

        </div>
      </section>




      <section className="relative grid overflow-hidden bg-verde md:grid-cols-2">
        <div
          className="deco-bg absolute inset-0 opacity-[0.16]"
          style={{ backgroundImage: `url(${ocelote.url})` }}
          aria-hidden="true"
        />

        <div className="relative">
          <img
            src={bosque.url}
            alt="Apicultores de Dalí revisando un panal en los bosques de la hacienda La Sonora"
            loading="lazy"
            width={1024}
            height={1400}
            className="h-[300px] w-full object-cover object-[center_25%] sm:h-[420px] md:h-full md:max-h-[640px]"
            style={{ boxShadow: "0 15px 40px rgba(35,91,78,0.35)" }}
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
          <p className="eyebrow text-salvia">Nuestra filosofía</p>
          <h2 className="h2-display text-crema">
            Parte del respeto, la humildad
            <br className="hidden md:block" /> y la conservación de la tierra
          </h2>
          <p className="body-text text-crema/85">
            Nuestros apiarios están en tres bosques que hoy forman parte de un sistema
            silvopastoril en la hacienda La Sonora. Animales como el oso de palma, el tigrillo y el
            oso perezoso han vuelto a habitar estos bosques gracias a nuestro modelo sostenible de
            conservación y reforestación.
          </p>
        </div>
      </section>



      {/* Testimonios — placeholder temporal hasta tener reseñas reales de clientes */}
      <section className="bg-crema px-6 py-12 md:px-[120px] md:py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-verde">Lo que dicen</p>
            <h2 className="h2-display text-verde">Miel que se recomienda sola</h2>
          </div>
          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3">
            {[
              "La mejor miel que he probado, se nota que es 100% natural.",
              "Me encanta que puedo saber exactamente de dónde viene mi miel.",
              "Calidad excepcional, ya es parte de mi desayuno todos los días.",
            ].map((quote) => (
              <figure key={quote} className="card-soft flex flex-col gap-4 bg-crema p-7">
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
                <blockquote className="body-text text-verde">“{quote}”</blockquote>
                <figcaption className="caption text-verde/60">Cliente verificado</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 md:px-[120px] md:py-[100px]">
        <div className="mx-auto max-w-[820px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-verde">Preguntas frecuentes</p>
            <h2 className="h2-display text-verde">Lo que nos preguntan seguido</h2>
          </div>
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

      <section className="flex flex-col items-center gap-6 px-6 py-14 text-center md:py-[100px]">
        <h2 className="h2-display text-verde">Lleva Dalí a tu mesa</h2>
        <Link to="/tienda" className="btn-primary">
          Ir a la tienda
        </Link>
      </section>
    </>
  );
}
