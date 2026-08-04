import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/devoluciones")({
  head: () => ({
    meta: [
      { title: "Devoluciones y Garantías — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Derecho de retracto, excepciones por seguridad alimentaria, producto dañado y reembolsos en Dalí Miel Orgánica.",
      },
      { property: "og:title", content: "Política de Devoluciones y Garantías — Dalí" },
      {
        property: "og:description",
        content: "Cómo solicitar una devolución o reembolso de tu pedido Dalí, según el Estatuto del Consumidor.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de Devoluciones y Garantías"
      intro="De acuerdo con el Estatuto del Consumidor colombiano (Ley 1480 de 2012), como comprador tienes derecho de retracto sobre compras realizadas por medios electrónicos."
      sections={[
        {
          title: "Derecho de retracto",
          body: "Tienes hasta 5 días hábiles después de recibir tu pedido para solicitar la devolución, siempre que el producto esté sin abrir, sin usar y en su empaque original.",
        },
        {
          title: "Excepción por higiene y seguridad alimentaria",
          body: "Al ser un producto alimenticio, no se aceptan devoluciones de frascos abiertos o con el sello de seguridad roto, salvo que el producto haya llegado dañado o en mal estado.",
        },
        {
          title: "Producto dañado o incorrecto",
          body: "Si tu pedido llega defectuoso, dañado o es diferente al que ordenaste, contáctanos dentro de las 48 horas siguientes a la entrega con fotos del producto — te ofreceremos cambio o reembolso completo.",
        },
        {
          title: "Proceso",
          body: "Escríbenos a [correo de contacto] indicando tu número de pedido y el motivo de la devolución.",
        },
        {
          title: "Reembolsos",
          body: "Una vez aprobada la devolución, el reembolso se procesa en un plazo de [X] días hábiles al mismo medio de pago utilizado en la compra.",
        },
      ]}
    />
  ),
});
