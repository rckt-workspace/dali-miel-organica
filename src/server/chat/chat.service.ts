import { getServerConfig } from "../config";
import { LLMError, type LLMProvider, OpenRouterProvider } from "../llm";
import { EnhancementService, type IEnhancementService } from "./enhancement.service";
import { JudgeService, type IJudgeService } from "./judge.service";
import type { ChatRequest, ChatResponse } from "./types";

export class ChatService {
  private readonly provider: LLMProvider;
  private readonly enhancementService: IEnhancementService;
  private readonly judgeService: IJudgeService;

  constructor(options?: {
    provider?: LLMProvider;
    enhancementService?: IEnhancementService;
    judgeService?: IJudgeService;
  }) {
    this.provider = options?.provider ?? new OpenRouterProvider();
    this.enhancementService = options?.enhancementService ?? new EnhancementService(this.provider);
    this.judgeService = options?.judgeService ?? new JudgeService(this.provider);
  }

  async send(request: ChatRequest): Promise<ChatResponse> {
    const config = getServerConfig();
    const startTime = Date.now();

    if (!request.messages || request.messages.length === 0) {
      throw new LLMError({
        message: "No messages provided for chat request",
        code: "INVALID_REQUEST",
        provider: this.provider.name,
        isRecoverable: false,
      });
    }

    const processedMessages = [...request.messages];
    let enhancementApplied = false;

    // 1. Optional enhancement step (only runs if CHAT_USE_ENHANCEMENT is true)
    if (config.chat.useEnhancement && processedMessages.length > 0) {
      const lastIndex = processedMessages.length - 1;
      const lastMessage = processedMessages[lastIndex];
      if (lastMessage && lastMessage.role === "user") {
        const enhRes = await this.enhancementService.enhance({
          userPrompt: lastMessage.content,
        });
        if (enhRes.applied) {
          processedMessages[lastIndex] = {
            ...lastMessage,
            content: enhRes.enhancedPrompt,
          };
          enhancementApplied = true;
        }
      }
    }

    const primaryModel = request.options?.model || config.chat.primaryLlm;
    const fallbackModel = config.chat.fallbackLlm;
    let usedFallback = false;
    let completion;

    // 2. Primary model execution
    try {
      completion = await this.provider.complete(processedMessages, {
        ...request.options,
        model: primaryModel,
      });
    } catch (primaryError) {
      const isRecoverable = primaryError instanceof LLMError && primaryError.isRecoverable;

      // 3. Fallback check: only trigger if enabled, model is different, and error is recoverable
      const shouldFallback =
        config.chat.useFallback &&
        isRecoverable &&
        Boolean(fallbackModel) &&
        fallbackModel !== primaryModel;

      if (!shouldFallback) {
        throw primaryError;
      }

      // Execute fallback model
      try {
        completion = await this.provider.complete(processedMessages, {
          ...request.options,
          model: fallbackModel,
        });
        usedFallback = true;
      } catch (fallbackError) {
        // Both primary and fallback failed; throw controlled error
        throw fallbackError instanceof LLMError
          ? fallbackError
          : new LLMError({
              message: `Both primary (${primaryModel}) and fallback (${fallbackModel}) models failed.`,
              code: "SERVER_ERROR",
              provider: this.provider.name,
              isRecoverable: false,
              cause: fallbackError,
            });
      }
    }

    // 4. Optional judge evaluation (only runs if CHAT_USE_JUDGE is true)
    let judgeScore: number | undefined;
    if (config.chat.useJudge) {
      const lastUserMessage = request.messages
        .slice()
        .reverse()
        .find((m) => m.role === "user");

      const judgeRes = await this.judgeService.evaluate({
        query: lastUserMessage?.content || "",
        response: completion.content,
      });
      judgeScore = judgeRes.score;
    }

    return {
      content: completion.content,
      modelUsed: completion.model,
      usedFallback,
      durationMs: Date.now() - startTime,
      usage: completion.usage,
      enhancementApplied,
      judgeScore,
    };
  }
}
