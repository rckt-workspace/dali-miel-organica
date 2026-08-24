# Auditoría Técnica — DALI Miel Orgánica

**Sprint 1: Foundation**  
**Fecha:** Agosto 2026  
**Rama:** `feature/foundation`

---

## 1. Resumen Ejecutivo

El proyecto **Dali Miel Orgánica** es una aplicación web full-stack de comercio electrónico construida sobre el ecosistema **TanStack Start**, **React 19**, **Nitro** y **Tailwind CSS v4**, conectada y sincronizada con **Lovable.dev**.

Esta auditoría técnica evalúa el estado del repositorio al inicio del Sprint 1, detallando configuración de runtime, scripts, seguridad de variables de entorno y preparación para integraciones server-side (LLM y pasarela de pagos).

---

## 2. Parámetros Operativos del Proyecto

| Parámetro                    | Valor Determinado                                                        | Notas                                                                           |
| :--------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| **PACKAGE_MANAGER**          | `bun` (v1.3.x) / `npm`                                                   | Repositorio contiene `bun.lock` (150 KB) y `bunfig.toml`. Compatible con `npm`. |
| **NODE_VERSION_RECOMMENDED** | `20.x` / `22.x` (LTS)                                                    | Compatible con ES2022 y runtime Vite 8 / Nitro.                                 |
| **BUILD_COMMAND**            | `bun run build` (o `npm run build`)                                      | Ejecuta `vite build`, compilando cliente SSR y servidor Nitro.                  |
| **START_COMMAND**            | `bun run preview` (dev/preview) / `node .output/server/index.mjs` (prod) | Nitro compila a `.output/server/index.mjs` (o Cloudflare Worker).               |
| **BUILD_OUTPUT**             | `.output/public` (estáticos) + `.output/server` (SSR)                    | Estructura estándar de salida de Nitro/TanStack Start.                          |

---

## 3. Auditoría de Scripts en `package.json`

### Scripts Reales Existentes:

- `dev`: `vite dev` — Inicia servidor de desarrollo local con Vite + TanStack Start.
- `build`: `vite build` — Compila bundle cliente y servidor de producción.
- `build:dev`: `vite build --mode development` — Compilación con depuración.
- `preview`: `vite preview` — Previsualiza la compilación de producción.
- `lint`: `eslint .` — Ejecuta ESLint 9 con configuración de Prettier y React Hooks.
- `format`: `prettier --write .` — Formatea archivos con Prettier.

### Scripts Faltantes Identificados:

- `typecheck`: No existe como script en `package.json`. Se ejecuta directamente vía `bun x tsc --noEmit` o `npx tsc --noEmit`. _(Se integró en el pipeline de CI)_.
- `test`: No existe framework de pruebas configurado actualmente en `package.json`. _(Se recomienda incorporar Vitest en sprints posteriores)_.

---

## 4. Auditoría de Seguridad y Gestión de Secretos

### Estado de Archivos `.env`:

- `.env`: **Trackeado por Git** en el repositorio inicial. Contiene variables públicas con prefijo `VITE_` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`).
- `.env.example`: Creado en este Sprint con estructura documentada y placeholders seguros.
- `.gitignore`: Incluye `.dev.vars`, `*.local`, `.wrangler/`, `dist`, `.output`.

### Clasificación de Variables:

1. **Públicas (Navegador / Cliente)**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`
   - `LOVABLE_PREVIEW_HOST`

2. **Secretas (Server-Only — NUNCA con prefijo `VITE_`)**:
   - `OPENROUTER_API_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `WOMPI_PRIVATE_KEY` _(futuro)_
   - `WOMPI_EVENTS_SECRET` _(futuro)_
   - `WOMPI_INTEGRITY_SECRET` _(futuro)_

---

## 5. Riesgos Identificados y Mitigaciones

1. **Sincronización con Lovable vs. Git History**:
   - _Riesgo_: Reescribir historial publicado (`git rebase -i`, `git push --force`) rompe la sincronización con Lovable.
   - _Mitigación_: Se estableció regla en `AGENTS.md` prohibiendo `force push` y reescritura de commits ya sincronizados.

2. **Aislamiento de Código de Servidor**:
   - _Riesgo_: Fuga accidental de credenciales o lógica privada al bundle cliente de Vite.
   - _Mitigación_: Todo el código confidencial se ubica en `src/server/**`, protegido por la regla `importProtection` de `@lovable.dev/vite-tanstack-config`.

3. **Autoridad de Pagos y Precios**:
   - _Riesgo_: Modificación de montos en el frontend por clientes malintencionados.
   - _Mitigación_: Se definió el contrato `PaymentProvider` y la directriz de que precios y totales se calculan y validan exclusivamente en el servidor.
