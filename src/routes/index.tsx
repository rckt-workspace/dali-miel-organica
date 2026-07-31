import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { pureProducts, spicyProducts } from "@/lib/products";

import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";
import acacia from "@/assets/acacia.png.asset.json";

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
      <section className="relative isolate overflow-hidden bg-verde px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-[center_35%]"
          style={{ backgroundImage: `url(${acacia.url})` }}
          aria-hidden="true"
        />
        {/* Vertical: solid jade at top/bottom, translucent through the middle */}
        <div
          className="absolute inset-0 -z-20"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to bottom, #235B4E 0%, rgba(35,91,78,0.92) 14%, rgba(35,91,78,0.60) 42%, rgba(35,91,78,0.60) 68%, rgba(35,91,78,0.95) 90%, #235B4E 100%)",
          }}
        />
        {/* Horizontal: solid on the left, photo showing through the right half */}
        <div
          className="absolute inset-0 -z-20"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to right, #235B4E 0%, rgba(35,91,78,0.85) 30%, rgba(35,91,78,0.25) 55%, rgba(35,91,78,0.10) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px]"
          aria-hidden="true"
          style={{ backgroundColor: "rgba(183,216,170,0.15)" }}
        />



        <div className="relative mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
          <p className="eyebrow text-salvia">De los bosques tropicales de Colombia</p>
          <h1 className="h1-display text-crema">
            Miel cruda orgánica,
            <br />
            cultivada por la naturaleza misma
          </h1>
          <p className="max-w-[600px] text-[18px] text-crema/85">
            Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
            sabiduría y bienestar en cada cosecha.
          </p>
          <Link to="/tienda" className="btn-secondary mt-2">
            Descubre nuestra miel
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-[60px] md:px-[120px] md:py-[120px]">
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
          className="pointer-events-none absolute left-2 top-6 hidden w-[160px] mix-blend-multiply lg:block"
        />
        <img
          src={osoHormiguero.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="pointer-events-none absolute bottom-6 right-2 hidden w-[200px] mix-blend-multiply lg:block"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-verde">Nuestra miel</p>
            <h2 className="h2-display text-verde">Tres variedades, un mismo origen</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pureProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-picante-naranja px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-crema">Dalí Picante</p>
            <h2 className="h2-display text-crema">
              Miel con carácter, para quien le gusta que las cosas piquen
            </h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {spicyProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/tienda" search={{ linea: "picante" }} className="btn-secondary">
              Ver la línea picante
            </Link>
          </div>
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
            className="h-[420px] w-full object-cover object-[center_25%] md:h-full md:max-h-[640px]"
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

        <div className="relative flex flex-col justify-center gap-5 px-6 py-14 md:px-[100px] md:py-20">
          <p className="eyebrow text-salvia">Nuestra filosofía</p>
          <h2 className="h2-display text-crema">
            Parte del respeto, la humildad
            <br className="hidden md:block" /> y la conservación de la tierra
          </h2>
          <p className="text-[16px] text-crema/85">
            Nuestros apiarios están en tres bosques que hoy forman parte de un sistema
            silvopastoril en la hacienda La Sonora. Animales como el oso de palma, el tigrillo y el
            oso perezoso han vuelto a habitar estos bosques gracias a nuestro modelo sostenible de
            conservación y reforestación.
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center gap-6 px-6 py-[100px] text-center">
        <h2 className="h2-display text-verde">Lleva Dalí a tu mesa</h2>
        <Link to="/tienda" className="btn-primary">
          Ir a la tienda
        </Link>
      </section>
    </>
  );
}
