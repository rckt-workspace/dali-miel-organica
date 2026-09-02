import acacia from "@/assets/acacia-portada.png.asset.json";
import acaciaG2 from "@/assets/acacia-galeria-19.png.asset.json";
import acaciaG3 from "@/assets/acacia-galeria-20.png.asset.json";

import multifloral from "@/assets/multifloral.png.asset.json";
import multiG1 from "@/assets/multifloral-g1.png.asset.json";
import multiG2 from "@/assets/multifloral-g2.png.asset.json";
import multiG3 from "@/assets/multifloral-g3.png.asset.json";

import caucho from "@/assets/caucho.png.asset.json";
import cauchoG1 from "@/assets/caucho-g1.png.asset.json";
import cauchoG2 from "@/assets/caucho-g2.png.asset.json";
import cauchoG3 from "@/assets/caucho-g3.png.asset.json";

import morita from "@/assets/chile-morita.jpg.asset.json";
import moritaG1 from "@/assets/morita-g1.png.asset.json";
import moritaG2 from "@/assets/morita-g2.png.asset.json";
import moritaG3 from "@/assets/morita-g3.png.asset.json";

import arbol from "@/assets/chile-arbol.jpg.asset.json";
import arbolG1 from "@/assets/arbol-g1.png.asset.json";
import arbolG2 from "@/assets/arbol-g2.png.asset.json";
import arbolG3 from "@/assets/arbol-g3.png.asset.json";

/*
 * =========================================================
 * PRECIOS DALI
 * =========================================================
 *
 * IMPORTANTE:
 *
 * Estos valores están expresados en PESOS COLOMBIANOS,
 * NO en centavos.
 *
 * Ejemplo:
 *
 * 45000 = $45.000 COP
 *
 * Reemplaza solamente estos cinco números cuando tengas
 * los precios oficiales.
 */

export const PRODUCT_PRICES_COP = {
  acacia: 45000,
  multifloral: 38000,
  caucho: 42000,
  "chile-morita": 32000,
  "chile-de-arbol": 32000,
} as const;

export function formatCop(amount: number): string {
  if (!Number.isFinite(amount) || amount <= 0) {
    return "$XX.XXX COP";
  }

  return `$${Math.round(amount).toLocaleString("es-CO")} COP`;
}

export type ProductLine = "pura" | "picante";

export type BadgeIcon =
  | "leaf"
  | "minerals"
  | "glycemic"
  | "pressure"
  | "sleep"
  | "shield"
  | "flame";

export type Badge = {
  icon: BadgeIcon;
  label: string;
  description?: string;
};

export type Product = {
  slug: string;
  name: string;
  tasting: string;

  badges: Badge[];

  benefits: string[];

  /*
   * price:
   * texto presentado al cliente.
   *
   * priceAmountCop:
   * valor numérico utilizado para carrito y Stripe.
   */
  price: string;
  priceAmountCop: number;

  detailedBenefits: string;

  sizes: string[];

  image: string;

  gallery?: string[];

  accent: string;

  line: ProductLine;

  /*
   * available:
   * controla si el producto se
   * ofrece a la venta. Los
   * productos con available:false
   * siguen en el catálogo (página
   * individual accesible) pero no
   * aparecen en las grids de compra
   * ni pueden agregarse al carrito.
   */
  available: boolean;
};

export const products: Product[] = [
  {
    slug: "acacia",

    name: "Acacia",

    tasting:
      "Notas maderosas y robustas al paladar.",

    detailedBenefits:
      "Notas maderosas y robustas. Reduce la ansiedad, facilita la digestión, ayuda a conciliar el sueño y mejora la circulación. Contiene 90% en sales minerales.",

    badges: [
      {
        icon: "leaf",
        label:
          "Natural no procesada",
        description:
          "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "minerals",
        label:
          "Rica en sales minerales",
        description:
          "Un aporte natural de minerales esenciales en cada cucharada.",
      },
      {
        icon: "glycemic",
        label:
          "Bajo glicémico",
        description:
          "Ideal para quienes cuidan sus niveles de azúcar en sangre.",
      },
    ],

    benefits: [
      "Natural no procesada",
      "Rica en sales minerales",
      "Bajo glicémico",
    ],

    priceAmountCop:
      PRODUCT_PRICES_COP.acacia,

    price: formatCop(
      PRODUCT_PRICES_COP.acacia,
    ),

    sizes: ["500 GR"],

    image: acacia.url,

    gallery: [
      acacia.url,
      acaciaG2.url,
      acaciaG3.url,
    ],

    accent: "#FEAEBB",

    line: "pura",

    available: false,
  },

  {
    slug: "multifloral",

    name: "Multifloral",

    tasting:
      "Notas frutales y florales al paladar.",

    detailedBenefits:
      "Notas frutales y florales. Antiinflamatorio y rico en proteínas. Ideal como endulzante primario — ayuda a mejorar la calidad del sueño y puede apoyar procesos de sustitución de azúcar.",

    badges: [
      {
        icon: "leaf",
        label:
          "Natural no procesada",
        description:
          "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "pressure",
        label:
          "Reduce presión arterial",
        description:
          "Aporta beneficios cardiovasculares como parte de una dieta balanceada.",
      },
      {
        icon: "sleep",
        label:
          "Mejora calidad del sueño",
        description:
          "Un aliado natural para conciliar un sueño más reparador.",
      },
    ],

    benefits: [
      "Natural no procesada",
      "Reduce presión arterial",
      "Mejora calidad del sueño",
    ],

    priceAmountCop:
      PRODUCT_PRICES_COP.multifloral,

    price: formatCop(
      PRODUCT_PRICES_COP.multifloral,
    ),

    sizes: ["500 GR"],

    image: multifloral.url,

    gallery: [
      multiG1.url,
      multiG2.url,
      multiG3.url,
    ],

    accent: "#9CDCED",

    line: "pura",

    available: true,
  },

  {
    slug: "caucho",

    name: "Caucho",

    tasting:
      "Notas cítricas y suaves al paladar.",

    detailedBenefits:
      "Notas cítricas y suaves. Ayuda a reducir el colesterol malo, protege el corazón, tiene potencial antibacterial y es rico en antioxidantes.",

    badges: [
      {
        icon: "leaf",
        label:
          "Natural no procesada",
        description:
          "Miel 100% natural, sin procesos industriales ni aditivos.",
      },
      {
        icon: "shield",
        label:
          "Potencial antibacteriano",
        description:
          "Propiedades naturales que apoyan las defensas del cuerpo.",
      },
      {
        icon: "glycemic",
        label:
          "Potencial antiinflamatorio",
        description:
          "Contribuye a reducir procesos inflamatorios de forma natural.",
      },
    ],

    benefits: [
      "Natural no procesada",
      "Potencial antibacteriano",
      "Potencial antiinflamatorio",
    ],

    priceAmountCop:
      PRODUCT_PRICES_COP.caucho,

    price: formatCop(
      PRODUCT_PRICES_COP.caucho,
    ),

    sizes: ["500 GR"],

    image: caucho.url,

    gallery: [
      cauchoG1.url,
      cauchoG2.url,
      cauchoG3.url,
    ],

    accent: "#C0ADE7",

    line: "pura",

    available: false,
  },

  {
    slug: "chile-morita",

    name: "Chile Morita",

    tasting:
      "Miel orgánica infusionada con chile morita — un toque ahumado y picante para romper la rutina de tu mesa.",

    detailedBenefits:
      "Miel orgánica infusionada con chile morita. Toque ahumado con picor medio, ideal para maridar con quesos, pizzas y carnes.",

    badges: [
      {
        icon: "leaf",
        label:
          "Natural no procesada",
      },
      {
        icon: "flame",
        label:
          "Picor medio ahumado",
      },
      {
        icon: "shield",
        label:
          "Ideal para quesos",
      },
    ],

    benefits: [
      "Ahumado",
      "Picor medio",
      "Ideal para quesos",
    ],

    priceAmountCop:
      PRODUCT_PRICES_COP[
        "chile-morita"
      ],

    price: formatCop(
      PRODUCT_PRICES_COP[
        "chile-morita"
      ],
    ),

    sizes: ["300g"],

    image: morita.url,

    gallery: [
      moritaG1.url,
      moritaG2.url,
      moritaG3.url,
    ],

    accent: "#D98C6B",

    line: "picante",

    available: true,
  },

  {
    slug: "chile-de-arbol",

    name:
      "Chile de Árbol",

    tasting:
      "Miel orgánica infusionada con chile de árbol — picor vivo y directo, ideal para maridar con quesos y carnes.",

    detailedBenefits:
      "Miel orgánica infusionada con chile de árbol. Picor vivo y directo, ideal para maridar con quesos y carnes.",

    badges: [
      {
        icon: "leaf",
        label:
          "Natural no procesada",
      },
      {
        icon: "flame",
        label:
          "Picor intenso",
      },
      {
        icon: "shield",
        label:
          "Para quesos y carnes",
      },
    ],

    benefits: [
      "Picor intenso",
      "100% colombiana",
      "Para quesos y carnes",
    ],

    priceAmountCop:
      PRODUCT_PRICES_COP[
        "chile-de-arbol"
      ],

    price: formatCop(
      PRODUCT_PRICES_COP[
        "chile-de-arbol"
      ],
    ),

    sizes: ["300g"],

    image: arbol.url,

    gallery: [
      arbolG1.url,
      arbolG2.url,
      arbolG3.url,
    ],

    accent: "#D98C6B",

    line: "picante",

    available: false,
  },
];

/*
 * Catálogo completo, incluidos los
 * productos desactivados.
 */
export const allProducts =
  products;

export const availableProducts =
  products.filter(
    (product) =>
      product.available,
  );

export const pureProducts =
  availableProducts.filter(
    (product) =>
      product.line ===
      "pura",
  );

export const spicyProducts =
  availableProducts.filter(
    (product) =>
      product.line ===
      "picante",
  );

export const getProduct = (
  slug: string,
) =>
  products.find(
    (product) =>
      product.slug ===
      slug,
  );

export function getProductPriceCop(
  slug: string,
  size: string,
): number | null {
  const product =
    getProduct(slug);

  if (!product) {
    return null;
  }

  if (!product.available) {
    return null;
  }

  if (
    !product.sizes.includes(
      size,
    )
  ) {
    return null;
  }

  if (
    !Number.isInteger(
      product.priceAmountCop,
    ) ||
    product.priceAmountCop <=
      0
  ) {
    return null;
  }

  return product.priceAmountCop;
}

export const longDescription =
  "El hogar de nuestros apiarios son los bosques tropicales de Colombia, en la Orinoquia. Al ser una marca con denominación de origen expresamos vida, sabiduría y bienestar en cada cosecha, pilares de la comunidad y la región donde trabajamos. Dalí es una marca orgullosamente colombiana y llanera, miel cultivada y cosechada en nuestro país, pulmón del mundo.";