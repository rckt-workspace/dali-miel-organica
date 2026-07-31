import { Link } from "@tanstack/react-router";
import logo from "@/assets/dali-logo.png.asset.json";
import colibries from "@/assets/colibries.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-verde px-6 py-16 text-crema md:px-[120px]">
      <div
        className="deco-bg absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: `url(${colibries.url})` }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 md:grid-cols-4">
        <div>
          <span className="inline-flex rounded-xl bg-crema px-4 py-3">
            <img src={logo.url} alt="Dalí Miel Orgánica" className="h-12 w-auto" />
          </span>
        </div>



        <div>
          <p className="eyebrow mb-4 text-salvia">Tienda</p>
          <ul className="space-y-2 text-[14px] text-crema/80">
            <li>
              <Link to="/producto/$slug" params={{ slug: "acacia" }}>
                Acacia
              </Link>
            </li>
            <li>
              <Link to="/producto/$slug" params={{ slug: "multifloral" }}>
                Multifloral
              </Link>
            </li>
            <li>
              <Link to="/producto/$slug" params={{ slug: "caucho" }}>
                Caucho
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-salvia">Marca</p>
          <ul className="space-y-2 text-[14px] text-crema/80">
            <li>
              <Link to="/historia">Nuestra Historia</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4 text-salvia">Legal</p>
          <ul className="space-y-2 text-[14px] text-crema/80">
            <li>Envíos</li>
            <li>Devoluciones</li>
            <li>Términos y condiciones</li>
            <li>Privacidad</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-12 max-w-[1200px] border-t border-crema/15 pt-6 text-[12px] text-crema/50">
        © 2026 Dalí Miel Orgánica. Todos los derechos reservados.
      </div>
    </footer>
  );
}
