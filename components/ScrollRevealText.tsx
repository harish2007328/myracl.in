"use client";

import React, { useRef, useEffect, useState } from "react";

export default function ScrollRevealText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on scroll position of this container
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      
      const start = windowHeight * 0.85;
      const end = -sectionHeight * 0.15;
      const raw = (start - sectionTop) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      
      setProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const items = [
    { type: "word", content: "We" },
    { type: "word", content: "don't" },
    { type: "word", content: "just" },
    { type: "word", content: "run" },
    { type: "word", content: "ads" },
    { type: "icon", content: "lightning" },
    { type: "word", content: "we" },
    { type: "word", content: "engineer" },
    { type: "word", content: "growth" },
    { type: "word", content: "systems." },
    { type: "word", content: "Every" },
    { type: "word", content: "pixel" },
    { type: "icon", content: "sparkle" },
    { type: "word", content: "every" },
    { type: "word", content: "word," },
    { type: "word", content: "every" },
    { type: "word", content: "campaign" },
    { type: "word", content: "is" },
    { type: "word", content: "built" },
    { type: "word", content: "to" },
    { type: "word", content: "move" },
    { type: "word", content: "the" },
    { type: "word", content: "needle." },
    { type: "icon", content: "target" },
    { type: "word", content: "From" },
    { type: "word", content: "brand" },
    { type: "word", content: "identity" },
    { type: "word", content: "to" },
    { type: "word", content: "performance" },
    { type: "word", content: "marketing," },
    { type: "word", content: "we" },
    { type: "word", content: "obsess" },
    { type: "word", content: "over" },
    { type: "word", content: "the" },
    { type: "word", content: "details" },
    { type: "icon", content: "arrow" },
    { type: "word", content: "that" },
    { type: "word", content: "transform" },
    { type: "word", content: "startups" },
    { type: "word", content: "into" },
    { type: "word", content: "market" },
    { type: "word", content: "leaders" },
    { type: "word", content: "and" },
    { type: "word", content: "ideas" },
    { type: "word", content: "into" },
    { type: "word", content: "movements." },
    { type: "icon", content: "rocket" },
  ];

  const totalItems = items.length;

  const renderIcon = (type: string, isRevealed: boolean) => {
    // Mini-badge styles matching neo-brutalist cards
    const badgeStyle = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.15em",
      height: "1.15em",
      borderRadius: "0.25em",
      borderWidth: "2px",
      borderStyle: "solid",
      borderColor: isRevealed ? "#000000" : "rgba(255, 255, 255, 0.2)",
      backgroundColor: isRevealed ? "#AEFF02" : "rgba(255, 255, 255, 0.05)",
      boxShadow: isRevealed ? "3px 3px 0px rgba(0,0,0,1)" : "0px 0px 0px rgba(0,0,0,0)",
      transform: isRevealed ? "translateY(-3px) rotate(-3deg)" : "translateY(0px) rotate(0deg)",
      transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      marginLeft: "0.2em",
      marginRight: "0.2em",
      verticalAlign: "middle",
    };

    // Specific badge backgrounds to mix colors and match UI in the blue box
    if (isRevealed) {
      if (type === "target") {
        badgeStyle.backgroundColor = "#FFFFFF"; // White badge
        badgeStyle.transform = "translateY(-3px) rotate(3deg)";
      } else if (type === "arrow") {
        badgeStyle.backgroundColor = "#AEFF02"; // Lime badge
        badgeStyle.transform = "translateY(-3px) rotate(6deg)";
      } else if (type === "rocket") {
        badgeStyle.backgroundColor = "#000000"; // Black badge
        badgeStyle.borderColor = "#000000";
        badgeStyle.transform = "translateY(-3px) rotate(-5deg)";
      }
    }

    const iconColor = isRevealed 
      ? (type === "rocket" ? "#FFFFFF" : "#000000") 
      : "rgba(255, 255, 255, 0.3)";

    switch (type) {
      case "lightning":
        return (
          <span style={badgeStyle}>
            <svg
              viewBox="0 0 24 24"
              className="w-[60%] h-[60%]"
              fill={iconColor}
              stroke="none"
            >
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10" />
            </svg>
          </span>
        );
      case "sparkle":
        return (
          <span style={badgeStyle}>
            <svg
              viewBox="0 0 24 24"
              className="w-[65%] h-[65%]"
              fill={iconColor}
              stroke="none"
            >
              <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9" />
            </svg>
          </span>
        );
      case "target":
        return (
          <span style={badgeStyle}>
            <svg
              viewBox="0 0 24 24"
              className="w-[65%] h-[65%]"
              fill="none"
              stroke={iconColor}
              strokeWidth="3"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="5" fill={isRevealed ? "#0039C8" : "transparent"} stroke="none" />
            </svg>
          </span>
        );
      case "arrow":
        return (
          <span style={badgeStyle}>
            <svg
              viewBox="0 0 24 24"
              className="w-[60%] h-[60%]"
              fill="none"
              stroke={iconColor}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        );
      case "rocket":
        return (
          <span style={badgeStyle}>
            <svg
              viewBox="0 0 24 24"
              className="w-[60%] h-[60%]"
              fill="none"
              stroke={iconColor}
              strokeWidth="2.5"
              strokeLinejoin="round"
            >
              <path d="M4.5 16.5c-1.5 1.5-2.5 3.5-2.5 3.5s2-1 3.5-2.5M12 5l9-1 1 9-9 9-4.5-4.5L12 5z" />
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={containerRef} className="w-full flex items-center justify-center py-16 md:py-20 px-6 md:px-12 text-white select-none">
      <p className="max-w-5xl mx-auto font-black text-[clamp(24px,4.2vw,50px)] leading-[1.3] tracking-tight text-center">
        {items.map((item, i) => {
          const itemProgress = i / totalItems;
          const isRevealed = progress > itemProgress;

          if (item.type === "icon") {
            return (
              <span key={i} className="inline-block">
                {renderIcon(item.content, isRevealed)}
              </span>
            );
          }

          return (
            <span
              key={i}
              className="inline-block mr-[0.25em] transition-colors duration-300 ease-out"
              style={{
                color: isRevealed ? "#FFFFFF" : "rgba(255, 255, 255, 0.25)",
              }}
            >
              {item.content}
            </span>
          );
        })}
      </p>
    </div>
  );
}
