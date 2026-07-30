import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import bosque from "@/assets/bosque-sonora.jpg";

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
      <section className="bg-verde px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
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

      <section className="px-6 py-[60px] md:px-[120px] md:py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="eyebrow text-verde">Nuestra miel</p>
            <h2 className="h2-display text-verde">Tres variedades, un mismo origen</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-verde md:grid-cols-2">
        <img
          src={bosque}
          alt="Apiarios de Dalí en los bosques de la hacienda La Sonora"
          loading="lazy"
          width={1024}
          height={1024}
          className="h-full w-full object-cover md:max-h-[640px]"
        />
        <div className="flex flex-col justify-center gap-5 px-6 py-14 md:px-[100px] md:py-20">
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
