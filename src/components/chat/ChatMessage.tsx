import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { ChatMessageItem } from "./useChat";

interface ChatMessageProps {
  message: ChatMessageItem;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  const formattedTime = format(message.timestamp, "HH:mm", { locale: es });

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          isUser
            ? "bg-amber-100 text-amber-900 rounded-br-none"
            : "bg-gray-100 text-gray-900 rounded-bl-none"
        }`}
      >
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        <p className={`text-xs mt-1 ${isUser ? "text-amber-700" : "text-gray-500"}`}>
          {formattedTime}
        </p>
      </div>
    </div>
  );
}
