"use client";

import React, { useState, useEffect, useRef } from "react";

import { WobblyStar } from "./DecorativeShapes";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  tooltipBg: string;
  tooltipText: string;
  tooltipBorder: string;
}

const services: ServiceItem[] = [
  {
    id: "seo",
    num: "01",
    title: "Search Engine Optimization",
    tagline: "Organic Traffic & Rankings",
    description: "We optimize your search visibility, ranking authority, and organic traffic funnel. Our technical and content SEO framework drives long-term, high-intent customer acquisition.",
    tooltipBg: "bg-[#AEFF02]",
    tooltipText: "text-black",
    tooltipBorder: "border-black"
  },
  {
    id: "strategy",
    num: "02",
    title: "Brand Strategy",
    tagline: "Identity & Guidelines",
    description: "We define your brand positioning, core messaging, and visual identity guidelines. Our strategy translates business goals into bold, cohesive designs that build long-term equity.",
    tooltipBg: "bg-neutral-950",
    tooltipText: "text-white",
    tooltipBorder: "border-neutral-800"
  },
  {
    id: "performance",
    num: "03",
    title: "Performance Ads",
    tagline: "Meta & Google Campaigns",
    description: "Paid acquisition campaign design, testing framework, and media buying execution across Meta, Google, and TikTok. We design and optimize campaigns targeting maximum ROAS.",
    tooltipBg: "bg-neutral-100",
    tooltipText: "text-black",
    tooltipBorder: "border-black"
  },
  {
    id: "video",
    num: "04",
    title: "Video Production",
    tagline: "Commercials & Hooks",
    description: "High-production-value commercials, product shoots, and short-form organic video hooks. We script, film, and edit creative video content optimized for social conversion.",
    tooltipBg: "bg-[#AEFF02]",
    tooltipText: "text-black",
    tooltipBorder: "border-black"
  },
  {
    id: "website",
    num: "05",
    title: "Website Making",
    tagline: "Next.js & Interactive Dev",
    description: "Interactive, custom-designed web applications and optimized landing pages. We build super-fast websites with modern layout engines, focusing heavily on UX and responsive code.",
    tooltipBg: "bg-[#0039C8]",
    tooltipText: "text-white",
    tooltipBorder: "border-black"
  },
  {
    id: "social",
    num: "06",
    title: "Social Growth",
    tagline: "Content Calendars & Loops",
    description: "Organic content engines built to scale impressions, build narratives, and foster active communities. We manage publishing schedules, design posts, and write high-engagement hooks.",
    tooltipBg: "bg-[#AEFF02]",
    tooltipText: "text-black",
    tooltipBorder: "border-black"
  }
];

export default function ServicesList() {
  const [hoveredService, setHoveredService] = useState<ServiceItem | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ width: 1200, height: 800 });
  
  // Ref to track latest mouse position inside the scroll listener without re-binding
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Update viewport dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Update mouse position state and ref
  const handleMouseMove = (e: React.MouseEvent) => {
    const newPos = { x: e.clientX, y: e.clientY };
    setMousePos(newPos);
    mousePosRef.current = newPos;
  };

  // Sync scroll with mouse coordinates to update tooltip content even when mouse doesn't move
  useEffect(() => {
    const checkElementUnderCursor = () => {
      const { x, y } = mousePosRef.current;
      if (x === 0 && y === 0) return;
      
      const element = document.elementFromPoint(x, y);
      if (!element) return;
      
      const row = element.closest("[data-service-id]");
      if (row) {
        const serviceId = row.getAttribute("data-service-id");
        const match = services.find((s) => s.id === serviceId);
        if (match) {
          setHoveredService(match);
        }
      } else {
        setHoveredService(null);
      }
    };

    window.addEventListener("scroll", checkElementUnderCursor, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkElementUnderCursor);
    };
  }, []);

  // Tooltip position centering and viewport safety clamping
  const boxWidth = 320;
  const boxHeight = 180;
  
  // Align mouse pointer with middle-left of tooltip box (offset x by 12px to the right of cursor, y centered)
  const tooltipX = Math.max(12, Math.min(viewport.width - boxWidth - 12, mousePos.x + 12));
  const tooltipY = Math.max(12, Math.min(viewport.height - boxHeight - 12, mousePos.y - boxHeight / 2));

  return (
    <section className="w-full bg-white text-black py-24 relative z-10 px-0">
      
      {/* Centered Header */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-neutral-200 pb-8 relative">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• Core Capabilities</span>
            <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              How We <span className="relative inline-block text-[#0039C8] z-10">
                Scale.
                <svg
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                  className="absolute left-0 bottom-[-8px] w-full h-[16px] pointer-events-none select-none z-[-1]"
                >
                  <path
                    d="M 4,10 Q 25,3 50,11 T 96,10"
                    stroke="#AEFF02"
                    strokeWidth="8"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-bold text-lg text-neutral-500 uppercase tracking-tight mt-3">
              One-by-one execution across strategy, ads, design, and code.
            </p>
          </div>
          {/* Large wobbly star on the right side to fill the empty space */}
          <div className="hidden md:flex items-center justify-center pr-6 pb-2 pointer-events-none select-none shrink-0">
            <WobblyStar size="w-32 h-32" color="#0039C8" className="rotate-12" strokeWidth={12} />
          </div>
        </div>
      </div>

      {/* Full-Width Service Rows Container */}
      <div className="flex flex-col w-full overflow-hidden">
        {services.map((service, index) => {
          return (
            <div
              key={service.id}
              data-service-id={service.id}
              onMouseEnter={() => setHoveredService(service)}
              onMouseLeave={() => setHoveredService(null)}
              onMouseMove={handleMouseMove}
              className={`w-full border-t-4 border-black relative transition-all duration-300 cursor-pointer select-none group py-10 md:py-12 px-4 md:px-8 overflow-hidden z-10 ${
                index === services.length - 1 ? "border-b-4" : ""
              }`}
            >
              
              {/* Single Liquid Layer (slides in from top to bottom, unified brand blue background) */}
              <div 
                className="absolute inset-x-0 top-0 w-full h-[108%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0 rounded-b-[80px] group-hover:rounded-b-none -z-10 bg-[#0039C8]"
              />

              {/* Inner content wrapper (aligned to page layout grid) */}
              <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors duration-300">
                
                {/* Left Side: Num + Title */}
                <div className="flex items-baseline gap-6 md:gap-8 transition-transform duration-300 group-hover:translate-x-6">
                  <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#0039C8] transition-colors duration-300 group-hover:text-[#AEFF02]">
                    {service.num}
                  </span>
                  
                  <h3 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-3deg] group-hover:text-white">
                    {service.title}
                  </h3>
                </div>

                {/* Right Side: Tagline (Push to sides) */}
                <div className="font-black text-base sm:text-lg md:text-xl uppercase tracking-tight text-neutral-400 text-left sm:text-right transition-all duration-300 group-hover:-translate-x-6 group-hover:skew-x-[-3deg] group-hover:text-white/70">
                  {service.tagline}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Cursor-Following Details Card Tooltip (Desktop Only for touch-screen safety) */}
      {hoveredService && (
        <div
          className="fixed pointer-events-none left-0 top-0 z-[9999] hidden md:block"
          style={{
            transform: `translate3d(${tooltipX}px, ${tooltipY}px, 0)`,
            transition: "transform 150ms cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Custom colored tooltip card containing title and paragraph details */}
          <div className={`border-4 p-5 rounded-[20px] w-[320px] shadow-[6px_6px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-2 ${hoveredService.tooltipBg} ${hoveredService.tooltipText} ${hoveredService.tooltipBorder}`}>
            <h4 className="font-black text-2xl uppercase tracking-tighter leading-none mb-1">
              {hoveredService.title}
            </h4>
            <p className="text-xs font-semibold leading-relaxed opacity-90">
              {hoveredService.description}
            </p>
          </div>
        </div>
      )}

    </section>
  );
}
