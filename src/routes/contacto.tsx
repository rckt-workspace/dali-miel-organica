import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useState } from "react";
import colibries from "@/assets/colibries.png.asset.json";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Dalí Miel Orgánica" },
      {
        name: "description",
        content: "Escríbenos para pedidos, distribución o alianzas con Dalí Miel Orgánica.",
      },
      { property: "og:title", content: "Contacto — Dalí" },
      { property: "og:description", content: "Escríbenos: pedidos, distribución y alianzas." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden bg-verde px-6 py-[60px] md:px-[120px] md:py-[100px]">
      <div
        className="deco-bg absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: `url(${colibries.url})` }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1100px] gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div className="flex flex-col gap-5">
          <p className="eyebrow text-salvia">Contacto</p>
          <h1 className="h1-display text-crema">Escríbenos</h1>
          <p className="body-text text-crema/85">
            Pedidos, distribución, alianzas o simplemente curiosidad por la miel de la altillanura:
            respondemos todos los mensajes.
          </p>

          <div className="mt-2 flex gap-6 text-crema">
            <a href="#" aria-label="Instagram">
              <Instagram className="size-5" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Facebook">
              <Facebook className="size-5" strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="Email">
              <Mail className="size-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        <form
          className="flex flex-col gap-6 rounded-2xl bg-crema/[0.06] p-6 md:p-10"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className="field-label caption text-crema" htmlFor="nombre">
              Nombre
            </label>
            <input id="nombre" required className="field bg-crema" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="field-label caption text-crema" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="field bg-crema"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="field-label caption text-crema" htmlFor="mensaje">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              required
              rows={5}
              className="field bg-crema"
              placeholder="Cuéntanos en qué podemos ayudarte"
            />
          </div>
          <button type="submit" className="btn-secondary self-start">
            {sent ? "Mensaje enviado ✓" : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
}
