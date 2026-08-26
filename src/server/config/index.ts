import { z } from "zod";

const booleanFromString = (defaultValue: boolean) =>
  z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === "") return defaultValue;
      return val.toLowerCase() === "true" || val === "1";
    });

const numberFromString = (defaultValue: number) =>
  z
    .string()
    .optional()
    .transform((val) => {
      if (val === undefined || val === "") return defaultValue;
      const num = Number(val);
      return isNaN(num) ? defaultValue : num;
    });

const serverEnvSchema = z.object({
  // Application URL
  APP_PUBLIC_URL: z.string().url().optional(),

  // Supabase (Server-side)
  SUPABASE_URL: z.string().url().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // OpenRouter (Server-side only)
  OPENROUTER_API_KEY: z.string().optional().default(""),
  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),

  // Chat & LLM Models
  CHAT_PRIMARY_LLM: z.string().default("google/gemma-3-4b-it:free"),
  CHAT_FALLBACK_LLM: z.string().default("openrouter/free"),
  CHAT_ENHANCEMENT_LLM: z.string().default(""),
  CHAT_JUDGE_LLM: z.string().default(""),

  // Feature Flags
  CHAT_USE_FALLBACK: booleanFromString(true),
  CHAT_USE_ENHANCEMENT: booleanFromString(false),
  CHAT_USE_JUDGE: booleanFromString(false),

  // Sampling & Limits
  CHAT_TEMPERATURE: numberFromString(0.2),
  CHAT_TOP_P: numberFromString(0.8),
  CHAT_MAX_TOKENS: numberFromString(450),
  CHAT_TIMEOUT_MS: numberFromString(45000),

  // RAG Configuration
  RAG_MIN_SCORE: numberFromString(0.0),
});

export type ServerConfig = {
  appPublicUrl?: string;
  supabase: {
    url?: string;
    serviceRoleKey?: string;
  };
  openRouter: {
    apiKey: string;
    baseUrl: string;
  };
  chat: {
    primaryLlm: string;
    fallbackLlm: string;
    enhancementLlm: string;
    judgeLlm: string;
    useFallback: boolean;
    useEnhancement: boolean;
    useJudge: boolean;
    temperature: number;
    topP: number;
    maxTokens: number;
    timeoutMs: number;
  };
  rag: {
    minScore: number;
  };
};

function parseServerConfig(
  envSource: Record<string, string | undefined> = process.env,
): ServerConfig {
  const parsed = serverEnvSchema.parse(envSource);

  return {
    appPublicUrl: parsed.APP_PUBLIC_URL,
    supabase: {
      url: parsed.SUPABASE_URL,
      serviceRoleKey: parsed.SUPABASE_SERVICE_ROLE_KEY,
    },
    openRouter: {
      apiKey: parsed.OPENROUTER_API_KEY,
      baseUrl: parsed.OPENROUTER_BASE_URL,
    },
    chat: {
      primaryLlm: parsed.CHAT_PRIMARY_LLM,
      fallbackLlm: parsed.CHAT_FALLBACK_LLM,
      enhancementLlm: parsed.CHAT_ENHANCEMENT_LLM,
      judgeLlm: parsed.CHAT_JUDGE_LLM,
      useFallback: parsed.CHAT_USE_FALLBACK,
      useEnhancement: parsed.CHAT_USE_ENHANCEMENT,
      useJudge: parsed.CHAT_USE_JUDGE,
      temperature: parsed.CHAT_TEMPERATURE,
      topP: parsed.CHAT_TOP_P,
      maxTokens: parsed.CHAT_MAX_TOKENS,
      timeoutMs: parsed.CHAT_TIMEOUT_MS,
    },
    rag: {
      minScore: parsed.RAG_MIN_SCORE,
    },
  };
}

let _config: ServerConfig | null = null;

export function getServerConfig(): ServerConfig {
  if (!_config) {
    _config = parseServerConfig();
  }
  return _config;
}

/**
 * Returns a sanitized view of configuration suitable for diagnostics or logging,
 * ensuring secret keys are never exposed.
 */
export function getSafeServerConfig(): Omit<ServerConfig, "openRouter" | "supabase"> & {
  appPublicUrl?: string;
  openRouter: { baseUrl: string; hasApiKey: boolean };
  supabase: { url?: string; hasServiceRoleKey: boolean };
} {
  const cfg = getServerConfig();
  return {
    appPublicUrl: cfg.appPublicUrl,
    ...cfg,
    openRouter: {
      baseUrl: cfg.openRouter.baseUrl,
      hasApiKey: Boolean(cfg.openRouter.apiKey && cfg.openRouter.apiKey.length > 0),
    },
    supabase: {
      url: cfg.supabase.url,
      hasServiceRoleKey: Boolean(
        cfg.supabase.serviceRoleKey && cfg.supabase.serviceRoleKey.length > 0,
      ),
    },
  };
}
