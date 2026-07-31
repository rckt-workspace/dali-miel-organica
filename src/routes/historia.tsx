import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/apicultores.png.asset.json";
import panalApicultor from "@/assets/panal-apicultor.png.asset.json";
import panalAbejas from "@/assets/panal-abejas.png.asset.json";
import formas from "@/assets/formas-organicas.png.asset.json";
import ocelote from "@/assets/ocelote.png.asset.json";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "Nuestra Historia — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Dalí nace en la hacienda La Sonora: conservación, reforestación y miel cruda con denominación de origen en la Orinoquia colombiana.",
      },
      { property: "og:title", content: "Nuestra Historia — Dalí" },
      {
        property: "og:description",
        content: "Vida, regeneración, educación y santuario de la llanura colombiana.",
      },
    ],
  }),
  component: Historia,
});

const galeria = [
  {
    src: bosque.url,
    alt: "Apicultores de Dalí revisando un panal en el bosque tropical de la hacienda La Sonora",
  },
  { src: panalApicultor.url, alt: "Apicultor sosteniendo un marco de panal lleno de miel" },
  { src: panalAbejas.url, alt: "Primer plano de abejas trabajando sobre un panal" },
];

function Historia() {
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

        <div className="relative mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-[60px] md:px-[120px] md:py-[110px]">
          <p className="eyebrow text-crema">Nuestra historia</p>
          <h1 className="h1-display max-w-[900px] text-crema">Del panal a tu mesa</h1>
          <p className="body-text max-w-[760px] text-crema/85">
            El hogar de nuestros apiarios son los bosques tropicales de Colombia, en la Orinoquia.
            Nuestra misión es llevar miel y otros productos a todo el país y a diferentes partes
            del mundo. La idea es que estos, además de representar a Colombia, a su fauna y flora,
            también brinden los beneficios y propiedades que solo podrán conocer mediante la
            experiencia Dalí. Al ser una marca con denominación de origen expresamos vida,
            sabiduría y bienestar en cada cosecha, pilares de la comunidad y la región donde
            trabajamos. Dalí es una marca orgullosamente colombiana y llanera, miel cultivada y
            cosechada en nuestro país, pulmón del mundo.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div
          className="deco-bg absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url(${formas.url})` }}
          aria-hidden="true"
        />


        <div className="relative mx-auto flex max-w-[820px] flex-col gap-5">
          <p className="eyebrow text-verde">Nuestra filosofía</p>
          <h2 className="h2-display text-verde">
            Parte del respeto, la humildad y la conservación de la tierra
          </h2>
          <p className="body-text text-verde">
            Donde nos es posible realizar este proyecto. Esta marca nace en la hacienda La Sonora,
            en la que hace más de diez años nos alejamos de las prácticas comunes de ganadería para
            regenerar la vida y ser ejemplo de coexistencia con la naturaleza, agradeciendo a
            nuestro hábitat lo que nos proveen. Es por esto que nuestros apiarios están ubicados en
            tres bosques que hoy en día forman parte de un sistema silvopastoril. Allí, la
            ganadería es amigable con el ambiente, pero también nosotros, que formamos parte de
            proyectos de conservación y reforestación, los cuales están dando resultados positivos
            en las zonas donde los desarrollamos. Nuestra finca es el hogar de un sistema en el que
            prevalece el trabajo comunitario, la reforestación y la conservación de la fauna y
            flora. Gracias a este modelo sostenible y amigable con el medioambiente, animales como
            el oso de palma, el tigrillo y el oso perezoso, que habían abandonado sus tierras por
            la huella humana, hoy vuelven a habitar nuestros bosques. Dalí es vida, regeneración,
            educación y santuario de la llanura colombiana.
          </p>
        </div>
      </section>

      <section className="px-6 pb-[80px] md:px-[120px] md:pb-[110px]">
        <div className="mx-auto max-w-[1200px]">
          <h3 className="h3-display text-verde">Los bosques de La Sonora</h3>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {galeria.map((g) => (
              <img
                key={g.src}
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
