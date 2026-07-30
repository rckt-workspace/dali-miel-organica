import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-verde px-6 py-16 text-crema md:px-[120px]">
      <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-4">
        <div className="font-display text-[22px]">DALÍ</div>

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

      <div className="mx-auto mt-12 max-w-[1200px] border-t border-crema/15 pt-6 text-[12px] text-crema/50">
        © 2026 Dalí Miel Orgánica. Todos los derechos reservados.
      </div>
    </footer>
  );
}
