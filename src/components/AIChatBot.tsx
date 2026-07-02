import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Terminal, Bot } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      text: "Hello! I am Neethu's AI Portfolio Representative, powered by Gemini 3.5 Flash. I'm here to assist recruiters, graduate admissions committee members, and research supervisors. Ask me anything about Neethu's Java/Python skills, her ISRO internship, or her blockchain publication!",
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const suggestedPrompts = [
    "Tell me about her ISRO internship",
    "What is her published paper about?",
    "What did she do at Kantar?",
    "What are her core AI / ML skills?",
  ];

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          // Extract last few messages for context keeping
          history: messages.slice(-6).map((msg) => ({
            role: msg.role,
            text: msg.text,
          })),
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', text: data.text }]);
      } else {
        throw new Error(data.error || 'Failed to generate response');
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "I apologize, but I had a minor network transmission interrupt. While I reconnect, here's some quick context: Neethu is currently a Software Developer at HCLTech, specializes in Spring Boot, Python, Big Data (PySpark, Databricks), and has an 8.89 CGPA from Dayananda Sagar College of Engineering. Please feel free to email her directly at **neethurokhadeashok@gmail.com**!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Pulse trigger button */}
      {!isOpen && (
        <button
          id="chatbot-trigger"
          onClick={() => setIsOpen(true)}
          className="glow-button flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] text-white transition-all hover:scale-110 active:scale-95 cursor-none focus:outline-none"
          title="Chat with Neethu's AI Representative"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#38bdf8]"></span>
          </span>
        </button>
      )}

      {/* Chat dialog container */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="glass-panel w-96 max-w-[calc(100vw-2rem)] h-[550px] max-h-[80vh] rounded-2xl flex flex-col overflow-hidden animate-float border border-[#7c3aed]/35"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-[#0f172a] to-[#1e1b4b] border-b border-[#7c3aed]/20 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center border border-[#7c3aed]/40">
                <Sparkles className="w-4.5 h-4.5 text-[#38bdf8]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center space-x-1.5 font-heading">
                  <span>Neethu's AI Rep</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                </h4>
                <p className="text-[10px] text-gray-400 flex items-center font-mono">
                  <Terminal className="w-2.5 h-2.5 mr-1 text-[#38bdf8]" /> Active Agent v2.5
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors cursor-none focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeIn_0.2s_ease-out]`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#7c3aed]/80 to-[#6366f1]/80 text-white rounded-br-none'
                      : 'bg-slate-900/90 border border-[#7c3aed]/15 text-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap select-text">
                    {/* Simplified render markdown links & bullets */}
                    {msg.text.split('\n').map((line, lIdx) => {
                      // Bullet check
                      if (line.trim().startsWith('*')) {
                        return (
                          <span key={lIdx} className="block pl-3 relative my-0.5">
                            <span className="absolute left-0 text-[#38bdf8]">•</span>
                            {line.replace(/^\*\s*/, '')}
                          </span>
                        );
                      }
                      return <span key={lIdx} className="block my-0.5">{line}</span>;
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/90 border border-[#7c3aed]/15 text-gray-400 rounded-xl rounded-bl-none px-4 py-3 text-xs flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {/* Suggested Prompts Grid */}
          {messages.length === 1 && (
            <div className="p-3 border-t border-[#7c3aed]/10 bg-slate-950/40">
              <p className="text-[10px] uppercase font-semibold text-[#38bdf8]/80 mb-2 font-mono tracking-wider">Suggested Queries:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {suggestedPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(p)}
                    className="text-left p-1.5 bg-slate-900/80 border border-[#7c3aed]/10 hover:border-[#38bdf8]/40 rounded-lg text-[10px] text-gray-300 hover:text-white transition-all hover:scale-[1.02] truncate cursor-none"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Panel */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-slate-950/80 border-t border-[#7c3aed]/25 flex items-center space-x-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Query Neethu's credentials..."
              className="flex-1 bg-slate-900/80 border border-[#7c3aed]/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#38bdf8] placeholder-gray-500 transition-colors cursor-none"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="p-2 rounded-xl bg-gradient-to-tr from-[#7c3aed] to-[#38bdf8] text-white hover:scale-105 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all cursor-none focus:outline-none flex items-center justify-center"
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
