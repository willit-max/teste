
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import { Message } from '../types/chat';
import { MessageItem } from './MessageItem';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  isLoading,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-gray-300">Nexus AI</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
                <Sparkles size={32} className="text-white" />
              </div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                How can I help you today?
              </h1>
              <p className="text-gray-500 max-w-md mx-auto">
                Nexus AI is your advanced creative partner, ready to help you build, code, and solve anything.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {[
                "Explain quantum computing in simple terms",
                "Write a Python script to scrape a website",
                "Help me plan a 3-day trip to Tokyo",
                "Draft an email to a client about a delay"
              ].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => onSendMessage(prompt)}
                  className="p-4 text-left text-sm text-gray-400 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all group"
                >
                  {prompt}
                  <div className="mt-2 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold uppercase">Use this prompt →</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="w-full py-8 bg-white/[0.02]">
                <div className="max-w-3xl mx-auto px-4 flex gap-6">
                  <div className="w-8 h-8 rounded-sm bg-indigo-600 flex items-center justify-center shrink-0">
                    <Bot size={20} className="animate-pulse" />
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-32" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a] to-transparent">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-end gap-2 bg-[#141414] border border-white/10 rounded-2xl p-2 focus-within:border-white/20 transition-all shadow-2xl"
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Nexus AI..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 py-4 px-4 resize-none max-h-64 scrollbar-hide"
              style={{ minHeight: '44px' }}
            />

            <div className="flex items-center gap-1 pr-2 pb-2">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={cn(
                  "p-2.5 rounded-xl transition-all",
                  input.trim() && !isLoading
                    ? "bg-white text-black hover:bg-gray-200"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                )}
              >
                <Send size={18} />
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
