"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Click outside to close chatbot
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Extract Email & Phone contact details via regex
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+?[0-9][0-9\s.-]{7,14}[0-9])/g;

    const foundEmails = text.match(emailRegex);
    const foundPhones = text.match(phoneRegex);

    let extractedEmail = "";
    let extractedPhone = "";

    if (foundEmails && foundEmails.length > 0) {
      extractedEmail = foundEmails[0];
      document.cookie = `myracl-user-email=${encodeURIComponent(extractedEmail)}; path=/; max-age=31536000; SameSite=Lax`;
    }

    if (foundPhones && foundPhones.length > 0) {
      const cleanPhone = foundPhones[0].replace(/[\s.-]/g, "");
      if (cleanPhone.length >= 8) {
        extractedPhone = foundPhones[0];
        document.cookie = `myracl-user-phone=${encodeURIComponent(extractedPhone)}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }

    // If contact details are extracted, report to tracking API
    if (extractedEmail || extractedPhone) {
      try {
        // Read existing values from cookies to merge
        const getCookie = (name: string) => {
          const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
          return match ? decodeURIComponent(match.split("=")[1]) : undefined;
        };

        const email = extractedEmail || getCookie("myracl-user-email");
        const phone = extractedPhone || getCookie("myracl-user-phone");

        await fetch("/api/track-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: navigator.language || "",
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
            referrer: document.referrer || "",
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            consentStatus: "accepted",
            email,
            phone
          })
        });
      } catch (e) {
        console.error("Chat info tracking error:", e);
      }
    }

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

  const quickReplies = [
    "What are your rates?",
    "Local SEO",
    "Portfolio",
  ];

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

  // Render markdown with custom tags rather than raw text
  const renderMessageContent = (content: string, role: "user" | "assistant") => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      let isBullet = false;
      let cleanLine = line;
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        isBullet = true;
        cleanLine = line.trim().replace(/^[-*]\s+/, "");
      }

      // Parse **bold** tags
      const parts = [];
      let lastIndex = 0;
      const regex = /\*\*(.*?)\*\*/g;
      let match;
      while ((match = regex.exec(cleanLine)) !== null) {
        const matchIndex = match.index;
        if (matchIndex > lastIndex) {
          parts.push(cleanLine.substring(lastIndex, matchIndex));
        }
        parts.push(
          <strong 
            key={matchIndex} 
            className={role === "user" ? "font-black text-[#AEFF02]" : "font-black text-[#0039C8]"}
          >
            {match[1]}
          </strong>
        );
        lastIndex = regex.lastIndex;
      }
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.substring(lastIndex));
      }

      if (isBullet) {
        return (
          <div key={idx} className="flex items-start gap-2 my-1 pl-2">
            <span className={role === "user" ? "text-[#AEFF02] font-black" : "text-[#0039C8] font-black"}>•</span>
            <span className="font-semibold">{parts}</span>
          </div>
        );
      }
      return <p key={idx} className="my-0.5 font-semibold">{parts}</p>;
    });
  };

  return (
    <div ref={containerRef} className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end select-none">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-3 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all duration-300 ease-out group pointer-events-auto cursor-pointer flex items-center justify-center focus:outline-none"
          aria-label="Open chatbot"
        >
          {/* Outer spinning text ring */}
          <div className="absolute inset-0 w-full h-full p-2" style={{ animation: "spin 24s linear infinite" }}>
            <svg viewBox="0 0 120 120" className="w-full h-full overflow-visible" aria-hidden="true">
              <path id="chatBadgeTextPath" d="M60,60 m0,-48 a48,48 0 1,1 -0.1,0" fill="none" />
              <text fontSize="7.2" fontWeight="900" fill="#000000" className="tracking-[0.15em]">
                <textPath href="#chatBadgeTextPath" startOffset="50%" textAnchor="middle">
                  TALK TO OUR EXPERTS • MYRACL AI ASSISTANT • SCALE YOUR BRAND •
                </textPath>
              </text>
            </svg>
          </div>
          
          {/* Center button circle */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#AEFF02] border-3 border-black flex items-center justify-center z-10 transition-transform duration-300 group-hover:scale-110 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 text-black fill-none stroke-current stroke-[3]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </button>
      ) : (
        <div className="w-[360px] sm:w-[420px] max-h-[82vh] overflow-hidden rounded-[24px] border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
          {/* Header */}
          <div className="relative overflow-hidden bg-[#0039C8] border-b-4 border-black px-5 py-4 text-white flex-shrink-0">
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <Image
                    src="/logo.png"
                    alt="myracl."
                    width={70}
                    height={18}
                    className="h-[16px] w-auto object-contain"
                    priority
                  />
                  <span className="bg-[#AEFF02] text-black text-[9px] px-1 py-0.5 rounded border border-black font-black uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] leading-none select-none">
                    AI
                  </span>
                </div>
                <p className="text-[11px] text-white/80 font-medium tracking-tight">
                  Ask questions that you need
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleBookCall}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-white text-black hover:bg-[#AEFF02] transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  title="Book a Call"
                  aria-label="Book a Call"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[2.5]" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border-2 border-black bg-white text-black font-black hover:bg-[#AEFF02] transition shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] cursor-pointer"
                  aria-label="Close chatbot"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          {/* Main Body */}
          <div className="flex-1 overflow-hidden bg-white flex flex-col justify-center min-h-[380px]">
            {messages.length === 1 ? (
              /* Center Welcome UI */
              <div data-lenis-prevent className="flex flex-col items-center justify-center text-center my-auto space-y-5 px-6 py-4 animate-fade-in">
                <div className="h-3.5 w-3.5 rounded-full bg-[#AEFF02] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse shrink-0" />
                <div className="space-y-2">
                  <h3 className="font-black text-base text-black uppercase tracking-tight">AI Assistant</h3>
                  <p className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider max-w-[290px] mx-auto leading-relaxed">
                    Welcome to myracl. How can we help scale your brand narrative today? Ask me anything about our services, rates, or works.
                  </p>
                </div>
                <div className="w-full space-y-2.5 pt-2 px-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => triggerQuickReply(reply)}
                      className="w-full rounded-xl border-2 border-black bg-white py-2.5 px-4 text-xs font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-[#AEFF02] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:scale-98 cursor-pointer text-center"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Standard Chat Log UI */
              <div data-lenis-prevent className="h-full overflow-y-auto px-5 py-4 space-y-4 max-h-[52vh]">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] rounded-2xl border-2 border-black px-4 py-2.5 text-sm leading-relaxed shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${msg.role === "user" ? "bg-[#0039C8] text-white rounded-br-sm" : "bg-slate-50 text-slate-900 rounded-bl-sm"}`}>
                      <div className="whitespace-pre-wrap font-bold">{renderMessageContent(msg.content, msg.role)}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border-2 border-black bg-slate-50 px-4 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 rounded-full bg-black animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 rounded-full bg-black animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Footer form */}
          <div className="border-t-3 border-black bg-white px-5 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-3"
            >
              <input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 rounded-2xl border-3 border-black bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:bg-white focus:border-[#0039C8] focus:ring-2 focus:ring-[#0039C8]/15"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border-3 border-black bg-[#0039C8] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition enabled:hover:bg-[#002f9b] enabled:hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span className="text-xl font-bold">→</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
