export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
  name?: string;
}

export interface LLMCompletionOptions {
  model?: string;
  temperature?: number;
  top_p?: number;
  max_tokens?: number;
  timeout_ms?: number;
  signal?: AbortSignal;
}

export interface LLMTokenUsage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

export interface LLMCompletionResponse {
  content: string;
  model: string;
  usage?: LLMTokenUsage;
  finish_reason?: string;
  duration_ms: number;
}

export type LLMErrorCode =
  | "TIMEOUT"
  | "RATE_LIMIT"
  | "AUTH_ERROR"
  | "INVALID_REQUEST"
  | "SERVER_ERROR"
  | "UNAVAILABLE"
  | "UNKNOWN";

export class LLMError extends Error {
  readonly code: LLMErrorCode;
  readonly statusCode?: number;
  readonly isRecoverable: boolean;
  readonly provider: string;

  constructor(params: {
    message: string;
    code: LLMErrorCode;
    provider: string;
    statusCode?: number;
    isRecoverable?: boolean;
    cause?: unknown;
  }) {
    // Sanitize message to prevent leaking any potential secrets or raw keys
    const sanitizedMessage = params.message
      .replace(/Bearer\s+[A-Za-z0-9_.-]+/gi, "Bearer [REDACTED]")
      .replace(/sk-[A-Za-z0-9_.-]+/gi, "[REDACTED_KEY]");

    super(sanitizedMessage);
    this.name = "LLMError";
    this.code = params.code;
    this.provider = params.provider;
    this.statusCode = params.statusCode;
    this.isRecoverable = params.isRecoverable ?? false;

    if (params.cause) {
      this.cause = params.cause;
    }
  }
}
