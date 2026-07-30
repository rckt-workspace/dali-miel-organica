import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/tienda", label: "Tienda" },
  { to: "/historia", label: "Nuestra Historia" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full bg-crema">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-6 md:px-[120px]">
        <Link to="/" className="font-display text-[22px] leading-none text-verde">
          DALÍ
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[15px] text-verde transition-opacity hover:opacity-70"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/carrito" className="relative text-verde" aria-label="Carrito">
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-coral text-[10px] font-semibold text-verde">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/tienda"
            className="btn-primary px-6 py-[10px] text-[14px] hidden sm:inline-flex"
          >
            Comprar
          </Link>
          <button
            className="text-verde md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <Menu className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-verde/10 px-5 pb-6 md:hidden">
          <div className="flex flex-col gap-4 pt-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-[15px] text-verde"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export { X };
