import { useState, useCallback } from "react";

export interface ChatMessageItem {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface UseChatState {
  messages: ChatMessageItem[];
  isLoading: boolean;
  error: string | null;
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessageItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) {
      return;
    }

    // Add user message to chat
    const userMsg: ChatMessageItem = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: "user",
      content: userMessage.trim(),
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setError(null);
    setIsLoading(true);

    try {
      // Send to server
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Failed to send message";
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      // Add assistant response
      const assistantMsg: ChatMessageItem = {
        id: `msg-${Date.now()}-${Math.random()}`,
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setError(null);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
  };
}
