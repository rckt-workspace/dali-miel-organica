import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/envios")({
  head: () => ({
    meta: [
      { title: "Política de Envíos — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Cobertura nacional en Colombia, tiempos de despacho y entrega, costos y empaque de los envíos de Dalí Miel Orgánica.",
      },
      { property: "og:title", content: "Política de Envíos — Dalí Miel Orgánica" },
      {
        property: "og:description",
        content: "Cómo despachamos y entregamos tu miel Dalí: cobertura, tiempos, costos y empaque.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de Envíos"
      intro="En Dalí trabajamos para que tu miel llegue en las mejores condiciones."
      sections={[
        {
          title: "Cobertura",
          body: "Hacemos envíos a nivel nacional dentro de Colombia. (Pendiente confirmar si habrá envíos internacionales.)",
        },
        {
          title: "Tiempo de despacho",
          body: "Los pedidos se despachan entre 1 y 3 días hábiles después de confirmado el pago.",
        },
        {
          title: "Tiempo de entrega",
          body: "Varía según la ciudad de destino — se informará el tiempo estimado al momento de finalizar la compra.",
        },
        {
          title: "Costo de envío",
          body: "Se calcula automáticamente en el checkout según el destino y el peso del pedido.",
        },
        {
          title: "Empaque",
          body: "Cuidamos que los frascos viajen bien protegidos para evitar roturas durante el transporte.",
        },
      ]}
    />
  ),
});
