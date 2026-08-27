import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { count } = useCart();
  const [bump, setBump] = useState(false);
  const prev = useRef(count);
  const { scrollY } = useScroll();
  const location = useLocation();

  const bgOpacity = useTransform(scrollY, [0, 60], [1, 0.97]);
  const blur = useTransform(scrollY, [0, 60], [0, 8]);
  const headerMargin = useTransform(scrollY, [0, 60], [0, 8]);
  const headerBorderRadius = useTransform(scrollY, [0, 60], ["0px", "20px"]);
  const logoScale = useTransform(scrollY, [0, 60], [1, 0.90]);
  const navPaddingY = useTransform(scrollY, [0, 60], [16, 12]);

  useEffect(() => {
    if (count > prev.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      prev.current = count;
      return () => clearTimeout(t);
    }
    prev.current = count;
  }, [count]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (value) => {
      setIsScrolled(value > 60);
    });
    return unsubscribe;
  }, [scrollY]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      style={{
        paddingLeft: headerMargin,
        paddingRight: headerMargin,
        paddingTop: headerMargin,
      }}
    >
      <motion.nav
        className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full bg-crema px-5 md:px-8"
        style={{
          backdropFilter: blur,
          borderRadius: headerBorderRadius,
          opacity: bgOpacity,
          paddingTop: navPaddingY,
          paddingBottom: navPaddingY,
        }}
        initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
        animate={{
          boxShadow: isScrolled
            ? "0 8px 24px rgba(35,91,78,0.08)"
            : "0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ scale: logoScale }}
        >
          <Link to="/" aria-label="Dalí Miel Orgánica — inicio">
            <img
              src={logo.url}
              alt="Dalí Miel Orgánica"
              className="h-[52px] w-auto"
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((l, idx) => (
            <motion.div
              key={l.to}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + idx * 0.05,
              }}
            >
              <Link to={l.to} className="relative px-4 py-2">
                <span
                  className={`text-sm font-medium transition-colors ${
                    isActive(l.to)
                      ? "text-verde font-semibold"
                      : "text-verde/70 hover:text-verde"
                  }`}
                >
                  {l.label}
                </span>
                {isActive(l.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-1 left-4 right-4 h-0.5 bg-verde"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right: Cart + CTA */}
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link to="/carrito" className="relative text-verde" aria-label="Carrito">
              <ShoppingBag
                className={`size-5 transition-transform duration-300 ${
                  bump ? "scale-125" : "scale-100"
                }`}
                strokeWidth={1.5}
              />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-2 -top-2 flex size-[18px] items-center justify-center rounded-full bg-coral text-[11px] font-semibold text-verde"
                >
                  {count}
                </motion.span>
              )}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              to="/tienda"
              className="btn-primary hidden px-5 py-2 text-sm sm:inline-flex"
            >
              Comprar
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="text-verde md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
            whileTap={{ scale: 0.95 }}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-verde/10 px-5 py-6 bg-crema">
              <div className="flex flex-col gap-4">
                {links.map((l, idx) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: idx * 0.08,
                    }}
                  >
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={`block text-sm font-medium transition-colors ${
                        isActive(l.to)
                          ? "text-verde font-semibold"
                          : "text-verde/70"
                      }`}
                    >
                      <span className="text-xs text-verde/40 mr-2">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
