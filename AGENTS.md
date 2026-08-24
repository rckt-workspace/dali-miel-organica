<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# Contrato de Ingeniería y Guardrails para Agentes — Dalí Miel Orgánica

Este documento establece las reglas obligatorias de desarrollo, arquitectura y seguridad para todos los agentes de IA y desarrolladores que trabajen en este repositorio.

---

## 1. Estrategia de Ramas y Git Flow

- **`main`**: Rama de producción. Protegida contra commits directos y force-pushes.
- **`develop`**: Rama de integración continua.
- **`feature/*`**: Ramas de trabajo para nuevas funcionalidades (ej. `feature/foundation`).
- **Regla estricta**: No hacer commits directos a `main`. Todos los cambios entran vía Pull Request o merge controlado tras pasar CI.
- **Historial**: No reescribir historial publicado (rebase/squash/amend de commits ya subidos) para proteger la sincronización con Lovable.

---

## 2. Gestión Segura de Secretos y Variables de Entorno

- **Aislamiento Server-Side**: Secretos como `OPENROUTER_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTS_SECRET` y `WOMPI_INTEGRITY_SECRET` pertenecen exclusivamente al entorno de servidor (`src/server/**`).
- **Regla `VITE_`**: NUNCA utilizar el prefijo `VITE_` para claves privadas, tokens o secretos. Cualquier variable con prefijo `VITE_` se empaqueta en el bundle público del navegador.
- **Cero fugas**: Jamás imprimir o registrar claves en logs, mensajes de error, respuestas HTTP, documentación o commits.
- **Plantillas**: Mantener siempre actualizado `.env.example` con placeholders seguros.

---

## 3. Autoridad de Pagos y Lógica Comercial

- **Server Authority**: El cálculo de precios, cantidades, subtotales, impuestos, costos de envío y totales debe validarse y ejecutarse **exclusivamente en el servidor**.
- **Frontend como Presentación**: El cliente web (`src/routes/**`, `src/components/**`) NUNCA es autoridad de pago ni de precios.
- **Pasarelas de Pago**: Todo proveedor de pagos debe implementar la abstracción `PaymentProvider` (`src/server/payment/provider.ts`) para evitar acoplamientos rígidos con pasarelas específicas (ej. Wompi).
- **Webhooks**: Toda notificación asíncrona de pago debe verificar firmas criptográficas en el servidor antes de actualizar el estado de una orden.

---

## 4. Base de Datos y Supabase

- **Migraciones**: Todo cambio de base de datos (tablas, columnas, tipos, triggers, funciones) debe crearse como archivo SQL en `supabase/migrations/`.
- **Row Level Security (RLS)**: Cada tabla debe tener RLS habilitado y políticas explícitas (`SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- **Cliente Servidor**: Usar `supabaseAdmin` (`src/integrations/supabase/client.server.ts`) únicamente en contextos de servidor seguros para operaciones administrativas.

---

## 5. Arquitectura TanStack Start + Nitro

- **Estructura de Código**:
  - Código servidor: `src/server/**` (protegido contra importaciones en cliente por el bundler).
  - Rutas y páginas: `src/routes/**`.
  - Componentes UI: `src/components/**`.
- **Archivos Generados**: `src/routeTree.gen.ts` es generado automáticamente por `@tanstack/router-plugin`. **NUNCA editarlo manualmente**.
- **Dependencias**: Reutilizar el stack existente (React 19, TanStack Start/Router/Query, Tailwind CSS v4, Radix UI, Zod). No añadir paquetes redundantes.
- **TypeScript**: Mantener tipado estricto en toda la base de código.

---

## 6. Verificación y Calidad de Código

Antes de dar por completada cualquier tarea o feature, se deben ejecutar y verificar los siguientes checks:

1. **Formato y Linting**: `bun run lint` / `npm run lint`
2. **Chequeo de Tipos**: `bun x tsc --noEmit` / `npx tsc --noEmit`
3. **Compilación**: `bun run build` / `npm run build`
4. **Diseño Adaptativo**: Comprobar compatibilidad y visualización en breakpoints Mobile y Desktop.
5. **Documentación**: Registrar cualquier cambio arquitectónico en `docs/ARCHITECTURE.md`.
