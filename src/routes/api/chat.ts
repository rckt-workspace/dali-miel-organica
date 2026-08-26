import { createFileRoute } from "@tanstack/react-router";
import { ChatService } from "../../server/chat/chat.service";
import { getDaliSystemPrompt } from "../../server/chat/system.prompt";
import type { ChatMessage } from "../../server/llm/types";
import { LLMError } from "../../server/llm/types";

interface ChatRequestBody {
  message?: string;
}

interface ChatResponseBody {
  message: string;
  model: string;
  usedFallback: boolean;
}

interface ErrorResponseBody {
  error: string;
  status: number;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async (event) => {
        const response = await handleChatPost(event);
        return response;
      },
    },
  },
});

async function handleChatPost(
  event: { request: { json: () => Promise<unknown> } },
): Promise<Response> {
  try {
    // Parse request body
    let body: ChatRequestBody;
    try {
      body = (await event.request.json()) as ChatRequestBody;
    } catch {
      return jsonErrorResponse("Invalid JSON", 400);
    }

    // Validate message
    if (!body.message || typeof body.message !== "string") {
      return jsonErrorResponse("message field is required and must be a string", 400);
    }

    const userMessage = body.message.trim();

    if (userMessage.length === 0) {
      return jsonErrorResponse("message cannot be empty", 400);
    }

    if (userMessage.length > 2000) {
      return jsonErrorResponse("message exceeds maximum length of 2000 characters", 400);
    }

    // Build messages with system prompt
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: getDaliSystemPrompt(),
      },
      {
        role: "user",
        content: userMessage,
      },
    ];

    // Invoke ChatService
    const chatService = new ChatService();
    const chatResponse = await chatService.send({
      messages,
    });

    // Filter metadata patterns from response
    const content = chatResponse.content.trim();

    // Remove common metadata/thinking patterns
    if (content.match(/^(Okay|Hmm|Wait|Let me|So|Alright|Right),? /i) &&
        content.includes("user is asking")) {
      // This appears to be internal thinking, not a response
      return jsonErrorResponse("Service temporarily unavailable", 503);
    }

    // Return success response
    const successResponse: ChatResponseBody = {
      message: content,
      model: chatResponse.modelUsed,
      usedFallback: chatResponse.usedFallback,
    };

    return Response.json(successResponse);
  } catch (error) {
    if (error instanceof LLMError) {
      return handleLLMError(error);
    }

    // Unknown error
    return jsonErrorResponse("An unexpected error occurred", 500);
  }
}

function handleLLMError(error: LLMError): Response {
  if (error.code === "AUTH_ERROR") {
    // Server configuration error (missing API key) should be 503, not client error
    if (
      error.message.includes("OPENROUTER_API_KEY is not configured") ||
      error.isRecoverable === false
    ) {
      return jsonErrorResponse("Assistant temporarily unavailable", 503);
    }
    // Upstream auth errors (401/403) are still auth errors
    return jsonErrorResponse("Authentication error", 403);
  }

  if (error.code === "INVALID_REQUEST") {
    return jsonErrorResponse("Invalid request", 400);
  }

  if (error.code === "RATE_LIMIT") {
    return jsonErrorResponse("Rate limit exceeded, please try again later", 429);
  }

  if (error.code === "TIMEOUT") {
    return jsonErrorResponse("Request timed out, please try again", 504);
  }

  if (error.code === "SERVER_ERROR" || error.code === "UNAVAILABLE") {
    return jsonErrorResponse("Service temporarily unavailable", 503);
  }

  // Default: internal error
  return jsonErrorResponse("Internal server error", 500);
}

function jsonErrorResponse(message: string, statusCode: number): Response {
  const errorBody: ErrorResponseBody = {
    error: message,
    status: statusCode,
  };

  return new Response(JSON.stringify(errorBody), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
