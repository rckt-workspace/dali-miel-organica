import { getServerConfig } from "../config";
import type { LLMProvider } from "../llm";
import type { JudgeRequest, JudgeResponse } from "./types";

export interface IJudgeService {
  evaluate(request: JudgeRequest): Promise<JudgeResponse>;
}

export class JudgeService implements IJudgeService {
  constructor(private readonly provider?: LLMProvider) {}

  async evaluate(request: JudgeRequest): Promise<JudgeResponse> {
    const config = getServerConfig();

    // Do not execute additional calls when judge is disabled
    if (!config.chat.useJudge || !config.chat.judgeLlm || !this.provider) {
      return {
        score: 1.0,
        passed: true,
        evaluated: false,
      };
    }

    try {
      const response = await this.provider.complete(
        [
          {
            role: "system",
            content:
              "Eres un juez de calidad para respuestas de DALI Miel Orgánica. Evalúa la veracidad y relevancia.",
          },
          {
            role: "user",
            content: `Pregunta: ${request.query}\nRespuesta: ${request.response}\nContexto: ${request.context ?? "N/A"}`,
          },
        ],
        {
          model: config.chat.judgeLlm,
          temperature: 0.0,
          max_tokens: 100,
        },
      );

      return {
        score: 1.0,
        passed: true,
        feedback: response.content.trim(),
        evaluated: true,
      };
    } catch {
      // If judge fails, do not block the user response
      return {
        score: 1.0,
        passed: true,
        evaluated: false,
      };
    }
  }
}
