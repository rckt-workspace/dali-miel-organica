import type { ChatMessage, LLMCompletionOptions, LLMCompletionResponse } from "./types";

export interface LLMProvider {
  readonly name: string;
  complete(messages: ChatMessage[], options?: LLMCompletionOptions): Promise<LLMCompletionResponse>;
}
