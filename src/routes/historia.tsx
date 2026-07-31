import { createFileRoute } from "@tanstack/react-router";
import bosque from "@/assets/apicultores.png.asset.json";
import logo from "@/assets/dali-logo.png.asset.json";

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

function Historia() {
  return (
    <>
      <section className="bg-verde px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div className="mx-auto flex max-w-[820px] flex-col gap-5">
          <p className="eyebrow text-salvia">Somos</p>
          <h1 className="h2-display text-crema">
            Una marca de miel cruda originada en la altillanura colombiana
          </h1>
          <p className="text-[16px] text-crema/85">
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

      <section className="px-6 py-[60px] md:px-[120px] md:py-[100px]">
        <div className="mx-auto flex max-w-[820px] flex-col gap-5">
          <p className="eyebrow text-verde">Nuestra filosofía</p>
          <h2 className="h2-display text-verde">
            Parte del respeto, la humildad y la conservación de la tierra
          </h2>
          <p className="text-[16px] text-verde">
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

      <div className="relative">
        <img
          src={bosque.url}
          alt="Apicultores de Dalí revisando un panal en el bosque tropical de la hacienda La Sonora"
          loading="lazy"
          width={1024}
          height={1400}
          className="h-[420px] w-full object-cover object-[center_45%] md:h-[560px]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to top right, rgba(35,91,78,0.25) 0%, rgba(35,91,78,0.12) 35%, rgba(35,91,78,0) 60%)",
          }}
        />
        <span className="absolute bottom-6 left-6 inline-flex rounded-lg bg-crema p-2">
          <img src={logo.url} alt="" className="h-8 w-auto" />
        </span>
      </div>

    </>
  );
}
