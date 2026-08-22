import { getServerConfig } from "../config";
import type { LLMProvider } from "../llm";
import type { EnhancementRequest, EnhancementResponse } from "./types";

export interface IEnhancementService {
  enhance(request: EnhancementRequest): Promise<EnhancementResponse>;
}

export class EnhancementService implements IEnhancementService {
  constructor(private readonly provider?: LLMProvider) {}

  async enhance(request: EnhancementRequest): Promise<EnhancementResponse> {
    const config = getServerConfig();

    // Do not execute additional calls when enhancement is disabled
    if (!config.chat.useEnhancement || !config.chat.enhancementLlm || !this.provider) {
      return {
        enhancedPrompt: request.userPrompt,
        applied: false,
      };
    }

    try {
      const response = await this.provider.complete(
        [
          {
            role: "system",
            content:
              "Eres un optimizador de consultas para DALI Miel Orgánica. Mejora la consulta manteniendo la intención original.",
          },
          {
            role: "user",
            content: request.userPrompt,
          },
        ],
        {
          model: config.chat.enhancementLlm,
          temperature: 0.1,
          max_tokens: 150,
        },
      );

      return {
        enhancedPrompt: response.content.trim(),
        applied: true,
      };
    } catch {
      // If enhancement fails, gracefully fall back to original prompt
      return {
        enhancedPrompt: request.userPrompt,
        applied: false,
      };
    }
  }
}
