import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./motion/MagneticButton";

type ImageAsset = {
  url: string;
};

interface HeroCinematicProps {
  backgroundImage: ImageAsset;
  productImage?: ImageAsset;
  decorativeImage?: ImageAsset;
}

export function HeroCinematic({
  backgroundImage,
  productImage,
  decorativeImage,
}: HeroCinematicProps) {
  const containerRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 35]
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 15]
  );
  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1, 1.08]
  );
  const decorativeY = useTransform(bgY, (v) => v * 0.4);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-crema md:min-h-[700px]"
    >
      {/* Background Layer with Gradient Overlay */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={backgroundImage.url}
          alt="Hero background"
          className="w-full h-full object-cover object-[70%_center]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--color-crema) 0%, rgba(249,246,228,0.90) 30%, rgba(249,246,228,0.50) 50%, rgba(249,246,228,0.15) 70%)",
          }}
        />
      </motion.div>

      {/* Subtle Editorial Depth Text */}
      <motion.div
        className="absolute top-1/4 left-0 md:left-[8%] pointer-events-none"
        style={{ y: textY }}
      >
        <div className="text-crema opacity-[0.05] font-display text-[140px] md:text-[240px] leading-none whitespace-nowrap">
          ORINOQUIA
        </div>
      </motion.div>

      {/* Main Content Layer */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-[72px] pt-16 md:pt-[80px] pb-20 md:pb-[100px] min-h-screen md:min-h-[700px] flex items-center">
        <div className="grid md:grid-cols-2 gap-8 w-full items-center">
          {/* Text Content */}
          <motion.div
            className="flex flex-col gap-6"
            style={{ y: textY }}
          >
            <motion.p
              className="eyebrow text-verde"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.4 }}
            >
              De los bosques tropicales de Colombia
            </motion.p>

            <motion.h1
              className="h1-display text-verde leading-tight"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
            >
              Miel que nace donde<br />
              Colombia respira
            </motion.h1>

            <motion.p
              className="body-text text-verde/85 max-w-[420px]"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.16, duration: 0.4 }}
            >
              Miel 100% orgánica de la altillanura colombiana, con denominación de origen. Vida,
              sabiduría y bienestar en cada cosecha.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.4 }}
              className="pt-2"
            >
              <MagneticButton
                className="btn-primary btn-base"
                onClick={() => {
                  window.location.href = "/tienda";
                }}
              >
                Descubre nuestra miel
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Product Visual - Subtle */}
          {productImage && (
            <motion.div
              className="hidden md:flex justify-end items-center"
              style={{ y: textY }}
            >
              <div className="relative w-full max-w-[350px] h-[420px]">
                <img
                  src={productImage.url}
                  alt="Featured product"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Single Slow Decorative Element */}
      {decorativeImage && (
        <motion.div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[250px] md:w-[380px] opacity-[0.06] md:opacity-[0.08]"
          style={{ y: decorativeY }}
        >
          <img
            src={decorativeImage.url}
            alt=""
            aria-hidden="true"
            className="w-full h-auto"
          />
        </motion.div>
      )}
    </section>
  );
}
