import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Dalí Miel Orgánica" },
      { name: "description", content: "Completa tus datos de envío y confirma tu pedido Dalí." },
      { property: "og:title", content: "Checkout — Dalí" },
      { property: "og:description", content: "Completa tu pedido de miel cruda orgánica." },
    ],
  }),
  component: Checkout,
});

const fields = [
  { id: "nombre", label: "Nombre completo", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "telefono", label: "Teléfono", type: "tel" },
  { id: "direccion", label: "Dirección", type: "text" },
  { id: "ciudad", label: "Ciudad", type: "text" },
  { id: "departamento", label: "Departamento", type: "text" },
];

function Checkout() {
  const { items } = useCart();
  const [done, setDone] = useState(false);

  return (
    <section className="px-6 py-[60px] md:px-[120px] md:py-[96px]">
      <div className="mx-auto max-w-[1100px]">
        <h1 className="h1-display text-verde">Checkout</h1>

        <div className="mt-10 grid gap-10 md:grid-cols-[65fr_35fr]">
          <form
            className="grid gap-6 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
            }}
          >
            {fields.map((f) => (
              <div key={f.id} className={f.id === "direccion" ? "sm:col-span-2" : ""}>
                <label className="field-label caption" htmlFor={f.id}>
                  {f.label}
                </label>
                <input id={f.id} type={f.type} required className="field" />
              </div>
            ))}

            <div className="sm:col-span-2 rounded-xl border border-dashed border-verde/30 p-6">
              <p className="eyebrow text-verde">Método de pago</p>
              <p className="mt-2 body-text text-verde/70">
                Pasarela de pago pendiente de definir. Este bloque es intercambiable.
              </p>
            </div>

            <button type="submit" className="btn-primary sm:col-span-2 justify-self-start">
              {done ? "Pedido confirmado ✓" : "Confirmar pedido"}
            </button>
          </form>

          <aside className="h-fit rounded-2xl bg-salvia p-8">
            <p className="eyebrow text-verde">Resumen del pedido</p>
            <ul className="mt-6 space-y-4">
              {items.length === 0 && (
                <li className="body-text text-verde/70">No hay productos en el carrito.</li>
              )}
              {items.map((i) => (
                <li
                  key={`${i.slug}-${i.size}`}
                  className="flex items-center justify-between gap-4 body-text text-verde"
                >
                  <span>
                    {i.name} · {i.size} × {i.qty}
                  </span>
                  <span className="font-semibold">{i.price}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-verde/20 pt-4 text-[18px] font-semibold text-verde">
              <span>Total</span>
              <span>$XX.XXX COP</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
