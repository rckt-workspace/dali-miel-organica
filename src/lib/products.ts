import acacia from "@/assets/miel-acacia.jpg";
import multifloral from "@/assets/miel-multifloral.jpg";
import caucho from "@/assets/miel-caucho.jpg";

export type Product = {
  slug: string;
  name: string;
  tasting: string;
  benefits: string[];
  price: string;
  sizes: string[];
  image: string;
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
  },
  {
    slug: "multifloral",
    name: "Multifloral",
    tasting: "Notas frutales y florales al paladar.",
    benefits: ["Antiinflamatorio", "Rica en proteínas", "Mejora el sueño"],
    price: "$XX.XXX COP",
    sizes: ["280g"],
    image: multifloral,
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
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const longDescription =
  "El hogar de nuestros apiarios son los bosques tropicales de Colombia, en la Orinoquia. Al ser una marca con denominación de origen expresamos vida, sabiduría y bienestar en cada cosecha, pilares de la comunidad y la región donde trabajamos. Dalí es una marca orgullosamente colombiana y llanera, miel cultivada y cosechada en nuestro país, pulmón del mundo.";
