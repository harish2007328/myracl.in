"use client";

import React, { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "WELCOME TO MYRACL. HOW CAN WE HELP SCALE YOUR BRAND NARRATIVE TODAY? ASK ME ANYTHING ABOUT OUR SERVICES, METHODOLOGY, OR HOW TO BOOK A CALL.",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "ERROR CONNECTING TO ASSISTANT. PLEASE MAKE SURE THE API ROUTE IS WORKING AND GROQ KEY IS SET.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerQuickReply = (text: string) => {
    handleSendMessage(text);
  };

  const handleBookCall = () => {
    setIsOpen(false);
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If on another page, redirect to home with hash
      window.location.href = "/#contact";
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none">
      
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-[#AEFF02] border-2 border-neutral-900 text-black flex items-center justify-center shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-95 transition-all cursor-pointer relative group"
          aria-label="Open Chatbot"
        >
          {/* Pulsing notification bubble */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0039C8]"></span>
          </span>

          <svg className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[550px] max-h-[80vh] bg-white border-2 border-neutral-900 rounded-[24px] shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-200">
          
          {/* Header */}
          <div className="bg-[#AEFF02] border-b-2 border-neutral-900 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3.5 h-3.5 bg-[#0039C8] rounded-full border border-black animate-pulse" />
              <div>
                <h3 className="font-black text-base uppercase tracking-wider text-black">myracl. CARE</h3>
                <span className="text-[10px] font-bold text-black/60 uppercase tracking-widest block -mt-1">Online & ready</span>
              </div>
            </div>
            
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white border-2 border-neutral-900 flex items-center justify-center text-black font-black text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] active:scale-95 transition-all cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto bg-neutral-100 flex flex-col gap-4 scrollbar-thin shadow-[inset_0px_4px_10px_rgba(0,0,0,0.08)]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] flex flex-col ${
                  msg.role === "user" ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <div
                  className={`p-3.5 rounded-[20px] border-2 border-neutral-900 text-sm font-semibold tracking-tight leading-relaxed shadow-[2px_2px_0px_rgba(0,0,0,1)] ${
                    msg.role === "user"
                      ? "bg-[#0039C8] text-white rounded-br-none"
                      : "bg-white text-black rounded-bl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="self-start items-start max-w-[85%]">
                <div className="p-3.5 rounded-[20px] rounded-bl-none border-2 border-neutral-900 bg-white text-black text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  <div className="flex gap-1.5 items-center py-1">
                    <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions / Suggestions */}
          <div className="px-4 py-2 border-t-2 border-dashed border-neutral-900 bg-white flex flex-wrap gap-2">
            <button
              onClick={handleBookCall}
              className="px-3 py-1.5 rounded-lg bg-[#AEFF02] border-2 border-neutral-900 text-black font-black uppercase text-[10px] tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] active:scale-95 transition-all cursor-pointer"
            >
              🗓️ Book a Call
            </button>
            <button
              onClick={() => triggerQuickReply("TELL ME ABOUT YOUR CORE SERVICES.")}
              className="px-3 py-1.5 rounded-lg bg-white border-2 border-neutral-900 text-black font-black uppercase text-[10px] tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] active:scale-95 transition-all cursor-pointer"
            >
              ⚡ Services
            </button>
            <button
              onClick={() => triggerQuickReply("WHAT IS YOUR PRICING MODEL?")}
              className="px-3 py-1.5 rounded-lg bg-white border-2 border-neutral-900 text-black font-black uppercase text-[10px] tracking-wider shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] active:scale-95 transition-all cursor-pointer"
            >
              💰 Pricing
            </button>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="border-t-2 border-neutral-900 p-3 bg-white flex gap-2"
          >
            <input
              type="text"
              placeholder="ASK MYRACL..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-grow px-4 py-2.5 rounded-xl border-2 border-neutral-900 font-bold uppercase text-xs outline-none bg-neutral-50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.06)] focus:bg-white transition-colors placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#0039C8] border-2 border-neutral-900 text-white font-black uppercase text-xs tracking-wider shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:shadow-[3.5px_3.5px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:-translate-y-0 disabled:shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] active:scale-95 transition-all cursor-pointer"
            >
              Send
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
