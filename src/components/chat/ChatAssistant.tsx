import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show badge when assistant sends a message while chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setHasNewMessage(true);
      }
    }
  }, [messages, isOpen]);

  // Clear badge when opening
  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 z-40"
        aria-label="Abrir asistente"
        title="Asistente DALI"
      >
        <MessageCircle size={24} />
        {hasNewMessage && (
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-full md:w-96 h-screen md:h-[600px] md:max-h-[600px] bg-white rounded-lg md:rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden md:rounded-lg">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <MessageCircle size={20} className="md:size-24" />
          <div className="min-w-0">
            <h2 className="font-bold text-sm md:text-base truncate">DALI Miel Orgánica</h2>
            <p className="text-xs opacity-90 truncate">Asistente Virtual</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-amber-600 p-1 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white flex-shrink-0 ml-2"
          aria-label="Cerrar asistente"
          title="Cerrar"
        >
          <X size={18} className="md:size-5" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4 bg-gray-50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <MessageCircle size={40} className="md:size-12 text-amber-300 mb-2 md:mb-3 opacity-50" />
            <p className="text-gray-600 font-medium text-base md:text-lg">¡Hola! 👋</p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Soy tu asistente virtual de DALI. Pregúntame sobre nuestras mieles, historia o cómo
              comprar.
            </p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 text-gray-900 px-3 md:px-4 py-2 md:py-3 rounded-lg rounded-bl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="flex justify-start mb-4">
                <div className="bg-red-100 text-red-900 px-3 md:px-4 py-2 rounded-lg rounded-bl-none text-xs md:text-sm">
                  {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}
