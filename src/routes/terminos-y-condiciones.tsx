import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/terminos-y-condiciones")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Condiciones de uso del sitio Dalí: precios, disponibilidad, pagos con Wompi, propiedad intelectual y ley aplicable.",
      },
      { property: "og:title", content: "Términos y Condiciones de Uso — Dalí" },
      {
        property: "og:description",
        content: "Los términos que aplican al comprar y navegar en el sitio de Dalí Miel Orgánica.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Términos y Condiciones de Uso"
      intro="Al acceder y realizar compras en el sitio web de Dalí, aceptas los siguientes términos:"
      sections={[
        {
          title: "Sobre nosotros",
          body: "Dalí es una marca de miel orgánica cruda, originaria de los bosques tropicales de Colombia.",
        },
        {
          title: "Precios",
          body: "Los precios publicados están en pesos colombianos (COP) e incluyen los impuestos aplicables, salvo que se indique lo contrario. Dalí se reserva el derecho de modificar precios sin previo aviso.",
        },
        {
          title: "Disponibilidad",
          body: "Todos los productos están sujetos a disponibilidad de inventario. Nos reservamos el derecho de cancelar pedidos por falta de stock, notificando al comprador y realizando el reembolso correspondiente.",
        },
        {
          title: "Pagos",
          body: "Los pagos se procesan a través de la pasarela de pago Wompi. Dalí no almacena información de tarjetas de crédito o débito.",
        },
        {
          title: "Propiedad intelectual",
          body: "El logo, contenido, fotografías e ilustraciones de este sitio son propiedad de Dalí (o de terceros con quienes se tiene autorización de uso) y no pueden reproducirse sin permiso.",
        },
        {
          title: "Uso del sitio",
          body: "El usuario se compromete a usar el sitio de forma lícita y a no realizar actividades que puedan dañar, sobrecargar o afectar el funcionamiento del mismo.",
        },
        {
          title: "Limitación de responsabilidad",
          body: "Dalí no se hace responsable por daños indirectos derivados del uso de sus productos fuera de las indicaciones de consumo recomendadas.",
        },
        {
          title: "Ley aplicable",
          body: "Estos términos se rigen por las leyes de la República de Colombia.",
        },
      ]}
    />
  ),
});
