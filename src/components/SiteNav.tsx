import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import logo from "@/assets/dali-logo.png.asset.json";


const links = [
  { to: "/tienda", label: "Tienda" },
  { to: "/historia", label: "Nuestra Historia" },
  { to: "/mayoristas", label: "Empresas" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  return (
    <header
      className="sticky top-0 z-50 w-full bg-crema"
      style={{ borderBottom: "1px solid var(--color-verde)" }}
    >
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-[120px]">
        <Link to="/" aria-label="Dalí Miel Orgánica — inicio">
          <img src={logo.url} alt="Dalí Miel Orgánica" className="h-[52px] w-auto" />
        </Link>


        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[17px] text-verde transition-opacity hover:opacity-70"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <Link to="/carrito" className="relative text-verde" aria-label="Carrito">
            <ShoppingBag className="size-6" strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-[18px] items-center justify-center rounded-full bg-coral text-[11px] font-semibold text-verde">
                {count}
              </span>
            )}
          </Link>
          <Link
            to="/tienda"
            className="btn-primary px-6 py-[10px] text-[15px] hidden sm:inline-flex"
          >
            Comprar
          </Link>
          <button
            className="text-verde md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X className="size-7" /> : <Menu className="size-7" />}
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
                className="text-[17px] text-verde"
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
