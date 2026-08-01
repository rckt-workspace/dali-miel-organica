import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Tu carrito — Dalí Miel Orgánica" },
      { name: "description", content: "Revisa los productos de miel Dalí en tu carrito." },
      { property: "og:title", content: "Tu carrito — Dalí" },
      { property: "og:description", content: "Revisa tu selección de miel cruda orgánica." },
    ],
  }),
  component: Carrito,
});

function Carrito() {
  const { items, setQty, remove } = useCart();

  return (
    <section className="px-6 py-12 md:px-[120px] md:py-[96px]">
      <div className="mx-auto max-w-[1000px]">
        <h1 className="h1-display text-verde">Tu carrito</h1>

        {items.length === 0 ? (
          <div className="mt-8 flex flex-col items-start gap-6">
            <p className="body-text text-verde/70">Tu carrito está vacío por ahora.</p>
            <Link to="/tienda" className="btn-primary">
              Ir a la tienda
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-12 md:grid-cols-[1fr_320px]">
            <ul>
              {items.map((i) => (
                <li
                  key={`${i.slug}-${i.size}`}
                  className="flex items-center gap-4 border-b border-verde/15 py-5"
                >
                  <img
                    src={i.image}
                    alt={`Miel ${i.name}`}
                    loading="lazy"
                    width={80}
                    height={80}
                    className="size-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="body-text font-semibold text-verde">{i.name}</p>
                    <p className="caption text-verde/60">{i.size}</p>
                  </div>
                  <div className="flex items-center gap-3 text-verde">
                    <button
                      aria-label="Quitar uno"
                      onClick={() => setQty(i.slug, i.size, i.qty - 1)}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-5 text-center text-[15px]">{i.qty}</span>
                    <button
                      aria-label="Añadir uno"
                      onClick={() => setQty(i.slug, i.size, i.qty + 1)}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                  <span className="w-[110px] text-right text-[15px] font-semibold text-verde">
                    {i.price}
                  </span>
                  <button
                    aria-label="Eliminar producto"
                    className="text-verde/50"
                    onClick={() => remove(i.slug, i.size)}
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <aside className="h-fit rounded-2xl bg-salvia p-8">
              <p className="eyebrow text-verde">Resumen</p>
              <div className="mt-6 flex items-center justify-between text-[18px] font-semibold text-verde">
                <span>Subtotal</span>
                <span>$XX.XXX COP</span>
              </div>
              <p className="mt-2 body-text text-verde/70">
                Envío calculado en el siguiente paso.
              </p>
              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Continuar a pago
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
