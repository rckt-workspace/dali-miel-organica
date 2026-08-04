import acacia from "@/assets/acacia.png.asset.json";
import acaciaG1 from "@/assets/acacia-galeria-18.png.asset.json";
import acaciaG2 from "@/assets/acacia-galeria-19.png.asset.json";
import acaciaG3 from "@/assets/acacia-galeria-20.png.asset.json";
import multifloral from "@/assets/multifloral.png.asset.json";
import caucho from "@/assets/caucho.png.asset.json";
import morita from "@/assets/chile-morita.jpg.asset.json";
import arbol from "@/assets/chile-arbol.jpg.asset.json";

export type ProductLine = "pura" | "picante";

export type BadgeIcon = "leaf" | "minerals" | "glycemic" | "pressure" | "sleep" | "shield" | "flame";

export type Badge = { icon: BadgeIcon; label: string; description?: string };

export type Product = {
  slug: string;
  name: string;
  tasting: string;
  badges: Badge[];
  benefits: string[];
  price: string;
  detailedBenefits: string;
  sizes: string[];
  image: string;
  gallery?: string[];
  accent: string;
  line: ProductLine;
};

export const products: Product[] = [
  {
    slug: "acacia",
    detailedBenefits: "Notas maderosas y robustas. Reduce la ansiedad, facilita la digestión, ayuda a conciliar el sueño y mejora la circulación. Contiene 90% en sales minerales.",
    name: "Acacia",
    tasting: "Notas maderosas y robustas al paladar.",
    badges: [
      {
        icon: "leaf",
        label: "Natural no procesada",
        description: "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "minerals",
        label: "Rica en sales minerales",
        description: "Un aporte natural de minerales esenciales en cada cucharada.",
      },
      {
        icon: "glycemic",
        label: "Bajo glicémico",
        description: "Ideal para quienes cuidan sus niveles de azúcar en sangre.",
      },
    ],
    benefits: ["Natural no procesada", "Rica en sales minerales", "Bajo glicémico"],
    price: "$XX.XXX COP",
    sizes: ["500 GR"],
    image: acacia.url,
    accent: "#FEAEBB",
    line: "pura",
  },
  {
    slug: "multifloral",
    detailedBenefits: "Notas frutales y florales. Antiinflamatorio y rico en proteínas. Ideal como endulzante primario — ayuda a mejorar la calidad del sueño y puede apoyar procesos de sustitución de azúcar.",
    name: "Multifloral",
    tasting: "Notas frutales y florales al paladar.",
    badges: [
      {
        icon: "leaf",
        label: "Natural no procesada",
        description: "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "pressure",
        label: "Reduce presión arterial",
        description: "Aporta beneficios cardiovasculares como parte de una dieta balanceada.",
      },
      {
        icon: "sleep",
        label: "Mejora calidad del sueño",
        description: "Un aliado natural para conciliar un sueño más reparador.",
      },
    ],
    benefits: ["Natural no procesada", "Reduce presión arterial", "Mejora calidad del sueño"],
    price: "$XX.XXX COP",
    sizes: ["500 GR"],
    image: multifloral.url,
    accent: "#9CDCED",
    line: "pura",
  },
  {
    slug: "caucho",
    detailedBenefits: "Notas cítricas y suaves. Ayuda a reducir el colesterol malo, protege el corazón, tiene potencial antibacterial y es rico en antioxidantes.",
    name: "Caucho",
    tasting: "Notas cítricas y suaves al paladar.",
    badges: [
      {
        icon: "leaf",
        label: "Natural no procesada",
        description: "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "shield",
        label: "Potencial antibacteriano",
        description: "Propiedades naturales que apoyan las defensas del cuerpo.",
      },
      {
        icon: "glycemic",
        label: "Potencial antiinflamatorio",
        description: "Contribuye a reducir procesos inflamatorios de forma natural.",
      },
    ],
    benefits: ["Natural no procesada", "Potencial antibacteriano", "Potencial antiinflamatorio"],
    price: "$XX.XXX COP",
    sizes: ["500 GR"],
    image: caucho.url,
    accent: "#C0ADE7",
    line: "pura",
  },
  {
    slug: "chile-morita",
    detailedBenefits: "Miel orgánica infusionada con chile morita. Toque ahumado con picor medio, ideal para maridar con quesos, pizzas y carnes.",
    name: "Chile Morita",
    tasting:
      "Miel orgánica infusionada con chile morita — un toque ahumado y picante para romper la rutina de tu mesa.",
    badges: [
      { icon: "leaf", label: "Natural no procesada" },
      { icon: "flame", label: "Picor medio ahumado" },
      { icon: "shield", label: "Ideal para quesos" },
    ],
    benefits: ["Ahumado", "Picor medio", "Ideal para quesos"],
    price: "$XX.XXX COP",
    sizes: ["300g"],
    image: morita.url,
    accent: "#D98C6B",
    line: "picante",
  },
  {
    slug: "chile-de-arbol",
    detailedBenefits: "Miel orgánica infusionada con chile de árbol. Picor vivo y directo, ideal para maridar con quesos y carnes.",
    name: "Chile de Árbol",
    tasting:
      "Miel orgánica infusionada con chile de árbol — picor vivo y directo, ideal para maridar con quesos y carnes.",
    badges: [
      { icon: "leaf", label: "Natural no procesada" },
      { icon: "flame", label: "Picor intenso" },
      { icon: "shield", label: "Para quesos y carnes" },
    ],
    benefits: ["Picor intenso", "100% colombiana", "Para quesos y carnes"],
    price: "$XX.XXX COP",
    sizes: ["300g"],
    image: arbol.url,
    accent: "#D98C6B",
    line: "picante",
  },
];

export const pureProducts = products.filter((p) => p.line === "pura");
export const spicyProducts = products.filter((p) => p.line === "picante");

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const longDescription =
  "El hogar de nuestros apiarios son los bosques tropicales de Colombia, en la Orinoquia. Al ser una marca con denominación de origen expresamos vida, sabiduría y bienestar en cada cosecha, pilares de la comunidad y la región donde trabajamos. Dalí es una marca orgullosamente colombiana y llanera, miel cultivada y cosechada en nuestro país, pulmón del mundo.";
