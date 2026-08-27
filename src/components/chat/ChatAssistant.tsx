import { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useChat } from "./useChat";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const { messages, isLoading, error, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setHasNewMessage(true);
      }
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const handleSendMessage = (message: string) => {
    sendMessage(message);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 z-40"
          aria-label="Abrir asistente"
          title="Asistente DALI"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
          {hasNewMessage && (
            <motion.span
              className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          )}
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-full md:w-96 bg-white rounded-lg shadow-2xl flex flex-col z-50 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ height: "600px", maxHeight: "600px" }}
        >
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <MessageCircle size={20} className="md:size-6" />
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
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChatMessage message={msg} />
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-gray-100 text-gray-900 px-3 md:px-4 py-2 md:py-3 rounded-lg rounded-bl-none">
                      <div className="flex gap-1">
                        <motion.div
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-gray-500 rounded-full"
                          animate={{ y: [0, -8, 0] }}
                          transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {error && (
                  <motion.div
                    className="flex justify-start mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-red-100 text-red-900 px-3 md:px-4 py-2 rounded-lg rounded-bl-none text-xs md:text-sm">
                      {error}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
