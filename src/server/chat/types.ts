import type { ChatMessage, LLMCompletionOptions, LLMTokenUsage } from "../llm/types";

export interface ChatRequest {
  messages: ChatMessage[];
  options?: LLMCompletionOptions;
}

export interface ChatResponse {
  content: string;
  modelUsed: string;
  usedFallback: boolean;
  durationMs: number;
  usage?: LLMTokenUsage;
  enhancementApplied?: boolean;
  judgeScore?: number;
}

export interface EnhancementRequest {
  userPrompt: string;
  context?: string;
}

export interface EnhancementResponse {
  enhancedPrompt: string;
  applied: boolean;
}

export interface JudgeRequest {
  query: string;
  response: string;
  context?: string;
}

export interface JudgeResponse {
  score: number;
  passed: boolean;
  feedback?: string;
  evaluated: boolean;
}
