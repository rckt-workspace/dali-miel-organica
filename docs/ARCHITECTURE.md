# Arquitectura del Sistema — DALI Miel Orgánica

**Sprint 1: Foundation Architecture**

---

## 1. Visión General del Sistema

```mermaid
flowchart TD
    subgraph Client [Browser / Cliente]
        UI[React 19 + TanStack Router]
        CartState[Cart Context / localStorage]
    end

    subgraph Hosting [Infraestructura & Edge / Host]
        Proxy[Render / Edge CDN]
    end

    subgraph ServerRuntime [TanStack Start / Nitro Runtime]
        ServerEntry[src/server.ts & src/start.ts]
        ServerConfig[src/server/config]

        subgraph ServerServices [Servicios Server-Side]
            ChatSvc[ChatService]
            SupabaseAdmin[Supabase Client Admin]
            PaymentContract[PaymentProvider Abstraction]
            LLMContract[LLMProvider Abstraction]
        end
    end

    subgraph ExternalServices [Proveedores Externos]
        OpenRouter[OpenRouter API]
        SupabaseDB[(Supabase PostgreSQL + RLS)]
        Wompi[Pasarela de Pagos / Wompi]
    end

    UI <--> |HTTP / SSR / Server Functions| Proxy
    Proxy <--> ServerEntry
    ServerEntry --> ServerServices

    ChatSvc --> LLMContract
    LLMContract --> |google/gemma-3-4b-it:free (Primary)| OpenRouter
    LLMContract -.-> |openrouter/free (Fallback)| OpenRouter

    PaymentContract -.-> |Futuro WompiProvider| Wompi
    PaymentContract -.-> |Futuro MockProvider (Dev/Test)| ServerServices

    SupabaseAdmin --> SupabaseDB
```

---

## 2. Capas de la Arquitectura

### A. Capa de Presentación (Frontend)

- **Tecnologías**: React 19, `@tanstack/react-router`, Tailwind CSS v4, Radix UI.
- **Rutas Principales**:
  - `/` (Home / Vitrina / Filosofía / FAQ)
  - `/tienda` (Catálogo con filtro por línea pura y picante)
  - `/producto/$slug` (Detalle, selector de gramaje, ficha técnica)
  - `/carrito` (Gestión de orden en cliente)
  - `/checkout` (Captura de datos de entrega y orden)
  - `/mayoristas` (Captación B2B)
  - `/historia`, `/contacto`, páginas legales.
- **Principio**: La interfaz de usuario es una capa de presentación. **No es autoridad de precios ni de pagos**.

---

### B. Capa de Servidor y Runtime (TanStack Start + Nitro)

- **Entrada del Servidor**: [`src/server.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server.ts) y [`src/start.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/start.ts).
- **Protección de Importaciones**: La carpeta `src/server/**` tiene protección de empaquetado; sus módulos nunca son expuestos ni empaquetados en el bundle cliente del navegador.
- **Configuración Centralizada**: [`src/server/config/index.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server/config/index.ts) gestiona variables de entorno con esquemas y validaciones Zod estrictas.

---

### C. Proveedor de LLM e Inteligencia Artificial

- **Abstracción**: `LLMProvider` ([`src/server/llm/provider.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server/llm/provider.ts)) desacopla a DALI de cualquier proveedor de IA específico.
- **Implementación OpenRouter**: [`OpenRouterProvider`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server/llm/openrouter.provider.ts) realiza llamadas a `/chat/completions`, gestiona timeouts vía `AbortController` y sanitiza los errores para evitar fugas de claves.
- **Servicio de Chat y Fallback**:
  - `ChatService` ([`src/server/chat/chat.service.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server/chat/chat.service.ts)) orquesta el flujo:
    1. Llama al modelo primario (`google/gemma-3-4b-it:free`).
    2. Si tiene éxito: devuelve la respuesta tipada.
    3. Si falla con un error recuperable (timeout, rate limit 429, error 5xx, indisponibilidad) y `CHAT_USE_FALLBACK=true`: activa el modelo fallback (`openrouter/free`).
    4. Los errores de validación (400, 422) o autenticación no disparan fallback y son controlados.
  - Hooks preparados para `EnhancementService` y `JudgeService` (desactivados por defecto vía feature flags).

---

### D. Proveedor de Pagos (Payment Abstraction)

- **Contrato de Dominio**: `PaymentProvider` ([`src/server/payment/provider.ts`](file:///C:/Users/maura/OneDrive/Documents/GitHub/dali-miel-organica/src/server/payment/provider.ts)).
- **Operaciones Definidas**:
  - `createPayment(request)`: Inicia transacción con la pasarela.
  - `getPaymentStatus(paymentId)`: Consulta estado canónico de la transacción.
  - `verifyWebhook(payload, signature, secret)`: Valida firma criptográfica de notificaciones entrantes.
  - `refundPayment(request)`: Procesa devoluciones.
- **Implementaciones Futuras Planificadas**:
  - `MockPaymentProvider`: Para testing local y desarrollo sin pasarela activa.
  - `WompiPaymentProvider`: Integración de producción con la pasarela colombiana Wompi.

---

### E. Capa de Base de Datos y Persistencia

- **Supabase PostgreSQL**:
  - Migraciones versionadas en `supabase/migrations/`.
  - Políticas de seguridad a nivel de fila (Row Level Security - RLS).
  - Control de acceso basado en roles (`app_role`: `admin`, `moderator`, `user`).
  - Tabla `leads_b2b` para registro de solicitudes de mayoristas y empresas.

---

## 3. Matriz de Variables de Entorno

| Variable                        | Ámbito  | Descripción                                           | Ejemplo / Default              |
| :------------------------------ | :------ | :---------------------------------------------------- | :----------------------------- |
| `OPENROUTER_API_KEY`            | Server  | Clave privada de API OpenRouter                       | `sk-or-v1-...`                 |
| `OPENROUTER_BASE_URL`           | Server  | Endpoint base de OpenRouter                           | `https://openrouter.ai/api/v1` |
| `CHAT_PRIMARY_LLM`              | Server  | Modelo LLM principal                                  | `google/gemma-3-4b-it:free`    |
| `CHAT_FALLBACK_LLM`             | Server  | Modelo LLM de respaldo                                | `openrouter/free`              |
| `CHAT_USE_FALLBACK`             | Server  | Habilita fallback automático ante fallos recuperables | `true`                         |
| `CHAT_USE_ENHANCEMENT`          | Server  | Habilita optimizador de prompt                        | `false`                        |
| `CHAT_USE_JUDGE`                | Server  | Habilita evaluador de calidad                         | `false`                        |
| `CHAT_TEMPERATURE`              | Server  | Temperatura de muestreo LLM                           | `0.2`                          |
| `CHAT_TOP_P`                    | Server  | Top-P de muestreo LLM                                 | `0.8`                          |
| `CHAT_MAX_TOKENS`               | Server  | Límite máximo de tokens por respuesta                 | `450`                          |
| `CHAT_TIMEOUT_MS`               | Server  | Timeout máximo por petición                           | `45000`                        |
| `RAG_MIN_SCORE`                 | Server  | Umbral mínimo de similitud vectorial                  | `0.0`                          |
| `VITE_SUPABASE_URL`             | Público | URL del proyecto Supabase                             | `https://...supabase.co`       |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Público | Clave pública de Supabase                             | `sb_publishable_...`           |
