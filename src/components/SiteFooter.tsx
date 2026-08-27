import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { motion } from "motion/react";
import logo from "@/assets/dali-logo.png.asset.json";
import colibries from "@/assets/colibries.png.asset.json";
import { StaggerGroup } from "./motion";

const socials = [
  { href: "https://instagram.com", label: "Instagram", Icon: Instagram },
  { href: "https://wa.me/", label: "WhatsApp", Icon: MessageCircle },
  { href: "https://facebook.com", label: "Facebook", Icon: Facebook },
];

const footerLinks = [
  {
    section: "Tienda",
    links: [
      { to: "/producto/acacia", label: "Acacia" },
      { to: "/producto/multifloral", label: "Multifloral" },
      { to: "/producto/caucho", label: "Caucho" },
    ],
  },
  {
    section: "Marca",
    links: [
      { to: "/historia", label: "Nuestra Historia" },
      { to: "/contacto", label: "Contacto" },
    ],
  },
  {
    section: "Empresas",
    links: [{ to: "/mayoristas", label: "Compras al por mayor" }],
  },
  {
    section: "Legal",
    links: [
      { to: "/envios", label: "Envíos" },
      { to: "/devoluciones", label: "Devoluciones" },
      { to: "/privacidad", label: "Privacidad" },
      { to: "/terminos-y-condiciones", label: "Términos" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-verde px-6 py-16 text-crema md:px-[120px] md:py-20">
      {/* Decorative colibries background */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: `url(${colibries.url})` }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.06 }}
        transition={{ duration: 0.8 }}
      />

      {/* Upper branding section */}
      <motion.div
        className="relative mx-auto max-w-[1200px] mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="flex justify-center mb-6">
          <img src={colibries.url} alt="" className="w-16 opacity-30" aria-hidden="true" />
        </motion.div>
        <h3 className="text-3xl md:text-4xl font-display text-crema mb-2">
          DALÍ
        </h3>
        <p className="text-sm text-crema/70 max-w-md mx-auto">
          Miel que nace donde Colombia respira
        </p>
      </motion.div>

      {/* Footer grid */}
      <div className="relative mx-auto max-w-[1200px] mb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand info */}
          <motion.div
            className="col-span-2 md:col-span-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <span className="inline-flex rounded-lg bg-crema/10 px-3 py-2 mb-6">
              <img src={logo.url} alt="Dalí" className="h-8 w-auto" />
            </span>
            <div>
              <p className="eyebrow text-salvia mb-3">Síguenos</p>
              <div className="flex gap-2">
                {socials.map(({ href, label, Icon }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex size-8 items-center justify-center rounded-full bg-crema/10 text-crema transition-colors hover:bg-salvia hover:text-verde"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="size-3.5" strokeWidth={1.8} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Link sections */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.section}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + idx * 0.05 }}
            >
              <p className="eyebrow text-salvia mb-3 text-xs">{section.section}</p>
              <ul className="space-y-1.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-crema/70 hover:text-crema transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider + copyright */}
      <motion.div
        className="relative mx-auto max-w-[1200px] border-t border-crema/10 pt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="text-center">
          <p className="text-xs text-crema/50">
            © 2024 Dalí Miel Orgánica. Todos los derechos reservados.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
