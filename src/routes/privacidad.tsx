import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Tratamiento de Datos Personales — Dalí Miel Orgánica" },
      {
        name: "description",
        content:
          "Qué datos recolecta Dalí, con qué finalidad, tus derechos como titular y cómo protegemos tu información (Ley 1581 de 2012).",
      },
      { property: "og:title", content: "Política de Tratamiento de Datos Personales — Dalí" },
      {
        property: "og:description",
        content: "Cómo Dalí Miel Orgánica recolecta, usa y protege tus datos personales.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => (
    <LegalPage
      title="Política de Tratamiento de Datos Personales"
      intro="En cumplimiento de la Ley 1581 de 2012 y el Decreto 1377 de 2013 (normativa colombiana de protección de datos personales — Habeas Data), Dalí informa lo siguiente:"
      sections={[
        {
          title: "Datos que recolectamos",
          body: "Nombre, correo electrónico, teléfono, dirección de envío e información de pago procesada a través de Wompi (Dalí no almacena directamente los datos de tu tarjeta).",
        },
        {
          title: "Finalidad",
          body: "Usamos tus datos para procesar pedidos, gestionar envíos, responder consultas de servicio al cliente y —si lo autorizas— enviarte comunicaciones comerciales.",
        },
        {
          title: "Tus derechos",
          body: "Como titular de tus datos, tienes derecho a conocer, actualizar, rectificar y solicitar la eliminación de tu información personal, así como a revocar la autorización de uso en cualquier momento.",
        },
        {
          title: "Cómo ejercer tus derechos",
          body: "Puedes escribir a [correo de contacto] indicando tu solicitud.",
        },
        {
          title: "Seguridad",
          body: "Implementamos medidas razonables para proteger tu información contra acceso no autorizado.",
        },
        {
          title: "Terceros",
          body: "Compartimos información con Wompi (procesamiento de pagos) y con la transportadora encargada del envío, únicamente para completar tu pedido.",
        },
      ]}
    />
  ),
});
