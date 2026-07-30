import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Facebook, Mail } from "lucide-react";
import { useState } from "react";

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
    <section className="bg-verde px-6 py-[60px] md:px-[120px] md:py-[100px]">
      <div className="mx-auto max-w-[720px]">
        <p className="eyebrow text-salvia">Contacto</p>
        <h1 className="h2-display mt-3 text-crema">Escríbenos</h1>

        <form
          className="mt-10 flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div>
            <label className="field-label text-crema" htmlFor="nombre">
              Nombre
            </label>
            <input id="nombre" required className="field bg-crema" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="field-label text-crema" htmlFor="email">
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
            <label className="field-label text-crema" htmlFor="mensaje">
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

        <div className="mt-12 flex gap-6 text-crema">
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
    </section>
  );
}
