import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import logo from "@/assets/dali-logo.png.asset.json";
import colibries from "@/assets/colibries.png.asset.json";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-verde px-6 py-16 text-crema md:px-[120px]">
      <div
        className="deco-bg absolute inset-0 opacity-[0.13]"
        style={{ backgroundImage: `url(${colibries.url})` }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-[1200px] gap-12 md:grid-cols-4">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit rounded-xl bg-crema px-4 py-3">
            <img src={logo.url} alt="Dalí Miel Orgánica" className="h-12 w-auto" />
          </span>

          <div>
            <p className="eyebrow mb-3 text-salvia">Síguenos</p>
            <div className="flex gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full bg-crema/10 text-crema transition-colors hover:bg-salvia hover:text-verde"
                >
                  <Icon className="size-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>
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
