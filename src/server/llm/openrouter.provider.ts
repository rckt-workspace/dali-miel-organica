import { getServerConfig } from "../config";
import type { LLMProvider } from "./provider";
import {
  LLMError,
  type ChatMessage,
  type LLMCompletionOptions,
  type LLMCompletionResponse,
  type LLMErrorCode,
} from "./types";

interface OpenRouterChoice {
  message?: {
    role: string;
    content: string;
  };
  finish_reason?: string;
}

interface OpenRouterResponse {
  id?: string;
  model?: string;
  choices?: OpenRouterChoice[];
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  error?: {
    message: string;
    code?: number | string;
    metadata?: unknown;
  };
}

export class OpenRouterProvider implements LLMProvider {
  readonly name = "OpenRouter";
  private readonly baseUrl: string;
  private readonly apiKey: string;
  private readonly defaultModel: string;
  private readonly defaultTimeoutMs: number;

  constructor(options?: {
    baseUrl?: string;
    apiKey?: string;
    defaultModel?: string;
    defaultTimeoutMs?: number;
  }) {
    const config = getServerConfig();
    this.baseUrl = (options?.baseUrl ?? config.openRouter.baseUrl).replace(/\/+$/, "");
    this.apiKey = options?.apiKey ?? config.openRouter.apiKey;
    this.defaultModel = options?.defaultModel ?? config.chat.primaryLlm;
    this.defaultTimeoutMs = options?.defaultTimeoutMs ?? config.chat.timeoutMs;
  }

  async complete(
    messages: ChatMessage[],
    options?: LLMCompletionOptions,
  ): Promise<LLMCompletionResponse> {
    if (!this.apiKey) {
      throw new LLMError({
        message: "OPENROUTER_API_KEY is not configured on the server",
        code: "AUTH_ERROR",
        provider: this.name,
        isRecoverable: false,
      });
    }

    if (!messages || messages.length === 0) {
      throw new LLMError({
        message: "At least one message is required for completion",
        code: "INVALID_REQUEST",
        provider: this.name,
        isRecoverable: false,
      });
    }

    const config = getServerConfig();
    const model = options?.model || this.defaultModel;
    const timeoutMs = options?.timeout_ms ?? this.defaultTimeoutMs;
    const temperature = options?.temperature ?? config.chat.temperature;
    const topP = options?.top_p ?? config.chat.topP;
    const maxTokens = options?.max_tokens ?? config.chat.maxTokens;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    if (options?.signal) {
      options.signal.addEventListener("abort", () => controller.abort());
    }

    const startTime = Date.now();

    try {
      const endpoint = `${this.baseUrl}/chat/completions`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://dali-miel-organica.lovable.app",
          "X-Title": "Dali Miel Organica",
        },
        body: JSON.stringify({
          model,
          messages: messages.map((m) => ({
            role: m.role,
            content: m.content,
            ...(m.name ? { name: m.name } : {}),
          })),
          temperature,
          top_p: topP,
          max_tokens: maxTokens,
        }),
        signal: controller.signal,
      });

      const durationMs = Date.now() - startTime;

      if (!response.ok) {
        let errorDetails = `HTTP ${response.status} ${response.statusText}`;
        let parsedError: OpenRouterResponse["error"] | undefined;

        try {
          const body = (await response.json()) as OpenRouterResponse;
          parsedError = body.error;
          if (parsedError?.message) {
            errorDetails = parsedError.message;
          }
        } catch {
          // Fallback to status text if response is not JSON
        }

        const { code, isRecoverable } = this.classifyHttpStatus(response.status);

        throw new LLMError({
          message: `OpenRouter request failed for model ${model}: ${errorDetails}`,
          code,
          statusCode: response.status,
          provider: this.name,
          isRecoverable,
        });
      }

      const data = (await response.json()) as OpenRouterResponse;
      const firstChoice = data.choices?.[0];

      if (!firstChoice?.message?.content) {
        throw new LLMError({
          message: `OpenRouter returned an empty or malformed completion for model ${model}`,
          code: "SERVER_ERROR",
          provider: this.name,
          statusCode: response.status,
          isRecoverable: true,
        });
      }

      return {
        content: firstChoice.message.content,
        model: data.model || model,
        usage: data.usage,
        finish_reason: firstChoice.finish_reason,
        duration_ms: durationMs,
      };
    } catch (error) {
      if (error instanceof LLMError) {
        throw error;
      }

      const isAbortError =
        error instanceof Error && (error.name === "AbortError" || error.message.includes("abort"));

      if (isAbortError) {
        throw new LLMError({
          message: `OpenRouter completion timed out after ${timeoutMs}ms for model ${model}`,
          code: "TIMEOUT",
          provider: this.name,
          isRecoverable: true,
          cause: error,
        });
      }

      throw new LLMError({
        message:
          error instanceof Error
            ? `OpenRouter network error: ${error.message}`
            : "Unknown network error during OpenRouter completion",
        code: "UNAVAILABLE",
        provider: this.name,
        isRecoverable: true,
        cause: error,
      });
    } finally {
      clearTimeout(timer);
    }
  }

  private classifyHttpStatus(status: number): { code: LLMErrorCode; isRecoverable: boolean } {
    if (status === 401 || status === 403) {
      return { code: "AUTH_ERROR", isRecoverable: false };
    }
    if (status === 400 || status === 422) {
      return { code: "INVALID_REQUEST", isRecoverable: false };
    }
    if (status === 429) {
      return { code: "RATE_LIMIT", isRecoverable: true };
    }
    if (status >= 500 && status <= 599) {
      return { code: "SERVER_ERROR", isRecoverable: true };
    }
    return { code: "UNKNOWN", isRecoverable: false };
  }
}
