import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { pureProducts, spicyProducts } from "@/lib/products";

import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";
import perezoso from "@/assets/perezoso.png.asset.json";
import osoHormiguero from "@/assets/oso-hormiguero.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";
import acaciaSinDrips from "@/assets/producto-acacia-sin-drips.png.asset.json";

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
      <section className="relative overflow-hidden bg-verde">
        {/* Curva orgánica: bone entra por la esquina inferior derecha (desktop) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
          viewBox="0 0 1440 700"
          preserveAspectRatio="none"
        >
          <path
            d="M1440,700 L1440,210 C1230,250 1160,430 940,540 C790,615 620,620 430,700 Z"
            fill="var(--color-crema)"
          />
        </svg>
        {/* Mobile: división horizontal simple */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-crema md:hidden" aria-hidden="true" />

        <div className="relative mx-auto flex max-w-[1440px] flex-col md:flex-row md:items-center">
          <div className="order-2 flex flex-col items-center justify-center gap-6 px-6 pb-[48px] pt-[32px] text-center md:order-1 md:w-[55%] md:items-start md:py-[110px] md:pl-[120px] md:pr-[64px] md:text-left">
            <p className="eyebrow text-crema">De los bosques tropicales de Colombia</p>
            <h1 className="h1-display text-crema">
              Miel cruda orgánica,
              <br />
              cultivada por la naturaleza misma
            </h1>
            <p className="body-text max-w-[600px] text-crema/85">
              Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
              sabiduría y bienestar en cada cosecha — sin atajos y sin pedir permiso.
            </p>
            <Link to="/tienda" className="btn-secondary mt-2">
              Descubre nuestra miel
            </Link>
          </div>

          <div className="order-1 flex items-end justify-center px-6 pt-[40px] md:order-2 md:w-[45%] md:p-[48px]">
            <div className="relative w-full max-w-[240px] md:max-w-[360px] md:translate-y-[26px]">
              {/* gotas de miel sueltas — detalle cálido junto a la base */}
              <svg
                aria-hidden="true"
                viewBox="0 0 120 80"
                className="pointer-events-none absolute -right-4 bottom-6 w-[64px] md:-right-8 md:bottom-8 md:w-[92px]"
              >
                <path
                  d="M30 10c6 9 10 14 10 19a10 10 0 1 1-20 0c0-5 4-10 10-19Z"
                  fill="var(--color-honey)"
                  opacity="0.85"
                />
                <path
                  d="M66 34c4.5 6.8 7.5 10.5 7.5 14.2a7.5 7.5 0 1 1-15 0c0-3.7 3-7.4 7.5-14.2Z"
                  fill="var(--color-honey)"
                  opacity="0.7"
                />
                <circle cx="94" cy="62" r="4" fill="var(--color-honey)" opacity="0.55" />
              </svg>

              <img
                src={acaciaSinDrips.url}
                alt="Frasco de miel de Acacia de Dalí"
                width={417}
                height={569}
                className="relative z-10 h-auto w-full object-contain"
                style={{ filter: "drop-shadow(0 14px 30px rgba(35,91,78,0.35))" }}
              />

              {/* sombra de apoyo bajo el frasco */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-[8%] bottom-[6px] z-0 h-[42px] rounded-[50%]"
                style={{ background: "rgba(35,91,78,0.45)", filter: "blur(28px)" }}
              />

            </div>
          </div>

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
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pureProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-crema px-6 py-[60px] md:px-[120px] md:py-[100px]">
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
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {spicyProducts.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link to="/tienda" search={{ linea: "picante" }} className="btn-picante">
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

        <div className="relative flex flex-col justify-center gap-5 px-6 py-14 md:px-[100px] md:py-20">
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

      <section className="flex flex-col items-center gap-6 px-6 py-[100px] text-center">
        <h2 className="h2-display text-verde">Lleva Dalí a tu mesa</h2>
        <Link to="/tienda" className="btn-primary">
          Ir a la tienda
        </Link>
      </section>
    </>
  );
}
