import acacia from "@/assets/miel-acacia.jpg";
import multifloral from "@/assets/miel-multifloral.jpg";
import caucho from "@/assets/miel-caucho.jpg";
import morita from "@/assets/chile-morita.jpg.asset.json";
import arbol from "@/assets/chile-arbol.jpg.asset.json";

export type ProductLine = "pura" | "picante";

export type Product = {
  slug: string;
  name: string;
  tasting: string;
  benefits: string[];
  price: string;
  sizes: string[];
  image: string;
  line: ProductLine;
};


export const products: Product[] = [
  {
    slug: "acacia",
    name: "Acacia",
    tasting: "Notas maderosas y robustas al paladar.",
    benefits: [
      "Reduce la ansiedad",
      "Facilita la digestión",
      "Ayuda al sueño",
      "Mejora la circulación",
    ],
    price: "$XX.XXX COP",
    sizes: ["280g"],
    image: acacia,
    line: "pura",
  },
  {
    slug: "multifloral",
    name: "Multifloral",
    tasting: "Notas frutales y florales al paladar.",
    benefits: ["Antiinflamatorio", "Rica en proteínas", "Mejora el sueño"],
    price: "$XX.XXX COP",
    sizes: ["280g"],
    image: multifloral,
    line: "pura",
  },
  {
    slug: "caucho",
    name: "Caucho",
    tasting: "Notas cítricas y suaves al paladar.",
    benefits: [
      "Reduce el colesterol malo",
      "Protege el corazón",
      "Antibacterial",
      "Rica en antioxidantes",
    ],
    price: "$XX.XXX COP",
    sizes: ["280g"],
    image: caucho,
    line: "pura",
  },
  {
    slug: "chile-morita",
    name: "Chile Morita",
    tasting:
      "Miel orgánica infusionada con chile morita — un toque ahumado y picante para romper la rutina de tu mesa.",
    benefits: ["Ahumado", "Picor medio", "Ideal para quesos"],
    price: "$XX.XXX COP",
    sizes: ["300g"],
    image: morita.url,
    line: "picante",
  },
  {
    slug: "chile-de-arbol",
    name: "Chile de Árbol",
    tasting:
      "Miel orgánica infusionada con chile de árbol — picor vivo y directo, ideal para maridar con quesos y carnes.",
    benefits: ["Picor intenso", "100% colombiana", "Para quesos y carnes"],
    price: "$XX.XXX COP",
    sizes: ["300g"],
    image: arbol.url,
    line: "picante",
  },
];

export const pureProducts = products.filter((p) => p.line === "pura");
export const spicyProducts = products.filter((p) => p.line === "picante");

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);


export const longDescription =
  "El hogar de nuestros apiarios son los bosques tropicales de Colombia, en la Orinoquia. Al ser una marca con denominación de origen expresamos vida, sabiduría y bienestar en cada cosecha, pilares de la comunidad y la región donde trabajamos. Dalí es una marca orgullosamente colombiana y llanera, miel cultivada y cosechada en nuestro país, pulmón del mundo.";
