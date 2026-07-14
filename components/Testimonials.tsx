"use client";

import React, { useState, useEffect, useRef } from "react";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  category: string;
  rating: number;
  bgClass: string;
  textClass: string;
  borderClass: string;
  starsClass: string;
  accentClass: string;
  badgeBg: string;
  badgeText: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    category: "Performance Ads",
    rating: 5,
    quote: "myracl completely transformed our brand. From identity to our ad creatives, they handled everything with insane energy. Our sales doubled within 3 months.",
    author: "Rahul Mehta",
    role: "Founder, UrbanBite",
    bgClass: "bg-white",
    textClass: "text-black",
    borderClass: "border-black",
    starsClass: "fill-[#0039C8]",
    accentClass: "text-neutral-500",
    badgeBg: "bg-black",
    badgeText: "text-[#AEFF02]"
  },
  {
    id: 2,
    category: "Branding",
    rating: 5,
    quote: "These guys think different. They don't just run campaigns — they build stories around your brand. The ROI speaks for itself. Best decision we made.",
    author: "Priya Sharma",
    role: "CEO, GreenLeaf Organics",
    bgClass: "bg-neutral-950",
    textClass: "text-white",
    borderClass: "border-neutral-900",
    starsClass: "fill-[#AEFF02]",
    accentClass: "text-neutral-400",
    badgeBg: "bg-white/10 border border-white/20",
    badgeText: "text-[#AEFF02]"
  },
  {
    id: 3,
    category: "Social Media",
    rating: 5,
    quote: "From zero social presence to 50K engaged followers. myracl's content strategy was a game-changer for us. They genuinely care about results.",
    author: "Arjun Patel",
    role: "Co-Founder, Artisan Coffee Co.",
    bgClass: "bg-[#AEFF02]",
    textClass: "text-black",
    borderClass: "border-black",
    starsClass: "fill-black",
    accentClass: "text-black/60",
    badgeBg: "bg-black/10 border border-black/20",
    badgeText: "text-black"
  },
  {
    id: 4,
    category: "Video Production",
    rating: 5,
    quote: "Working with myracl on our commercial campaign was a blast. The production value they delivered was next level and perfectly captured our energy.",
    author: "Sarah Jenkins",
    role: "Marketing Director, Nova Fitness",
    bgClass: "bg-[#0039C8]",
    textClass: "text-white",
    borderClass: "border-black",
    starsClass: "fill-[#AEFF02]",
    accentClass: "text-white/70",
    badgeBg: "bg-white",
    badgeText: "text-black"
  },
  {
    id: 5,
    category: "Website Making",
    rating: 5,
    quote: "The custom web platform is super fast and beautifully matches our new design system. Lead conversions have increased by 45% since launch.",
    author: "Budi Santoso",
    role: "Product Lead, Xurya",
    bgClass: "bg-neutral-100",
    textClass: "text-black",
    borderClass: "border-black",
    starsClass: "fill-[#0039C8]",
    accentClass: "text-neutral-500",
    badgeBg: "bg-[#AEFF02]",
    badgeText: "text-black"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  
  // Dragging state
  const [dragOffset, setDragOffset] = useState(0);
  const startX = useRef(0);
  const isDragging = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // Responsive logic to set visible count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // Tablet
      } else {
        setVisibleCount(3); // Desktop
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = testimonials.length - visibleCount;

  // Navigation handlers
  const handleNext = () => {
    setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Dragging handlers (Mouse)
  const handleMouseDown = (e: React.MouseEvent) => {
    startX.current = e.clientX;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const currentX = e.clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    // Determine scroll direction based on drag distance
    if (dragOffset > 75) {
      handlePrev();
    } else if (dragOffset < -75) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Dragging handlers (Touch)
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX.current;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (dragOffset > 50) {
      handlePrev();
    } else if (dragOffset < -50) {
      handleNext();
    }
    setDragOffset(0);
  };

  // Calculate horizontal translation offset
  // Base offset is standard slide translate, plus manual drag offset in pixels
  const baseTranslate = -(activeIndex * (100 / visibleCount));
  const transformStyle = dragOffset !== 0
    ? `translateX(calc(${baseTranslate}% + ${dragOffset}px))`
    : `translateX(${baseTranslate}%)`;
    
  const transitionStyle = dragOffset !== 0 ? "none" : "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      {/* Header Block: Heading & Nav buttons */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 border-b border-neutral-200 pb-8">
        <div>
          <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• Testimonials</span>
          <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
            What They <span className="relative inline-block text-[#0039C8] z-10">
              Say.
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
            Real feedback from brands that dared to disrupt.
          </p>
        </div>

        {/* Circular Navigation Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handlePrev}
            className="w-14 h-14 rounded-full border-4 border-black bg-white text-black flex items-center justify-center font-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer select-none shrink-0"
            aria-label="Previous slide"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-14 h-14 rounded-full border-4 border-black bg-[#AEFF02] text-black flex items-center justify-center font-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:translate-y-0 active:translate-x-0 active:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all cursor-pointer select-none shrink-0"
            aria-label="Next slide"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Viewport with drag-cursor styling */}
      <div
        className="overflow-hidden -mx-3 px-3 py-4 select-none cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{
            transform: transformStyle,
            transition: transitionStyle,
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3 flex flex-col justify-stretch"
            >
              {/* Individual Testimonial Card */}
              <div
                className={`h-full rounded-[24px] p-8 border-4 border-black flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 min-h-[380px] ${t.bgClass} ${t.textClass}`}
              >
                <div>
                  {/* Card Header: Category badge & Star Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <span className={`px-3 py-1 rounded-md font-black text-[10px] uppercase tracking-wider ${t.badgeBg} ${t.badgeText}`}>
                      {t.category}
                    </span>

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          className={t.starsClass}
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="font-bold text-lg leading-relaxed mb-6 tracking-tight">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                {/* Author Credentials */}
                <div className={`border-t pt-5 ${
                  t.bgClass.includes("neutral-950")
                    ? "border-white/10"
                    : t.bgClass.includes("blue")
                    ? "border-white/15"
                    : "border-black/10"
                }`}>
                  <p className="font-black text-lg uppercase tracking-tight">
                    {t.author}
                  </p>
                  <p className={`font-bold text-sm uppercase ${t.accentClass}`}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination indicators (Dots matching the number of pages) */}
      {maxIndex > 0 && (
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-3.5 h-3.5 rounded-full border-2 border-black transition-all cursor-pointer ${
                activeIndex === idx
                  ? "bg-[#AEFF02] scale-110 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  : "bg-white hover:bg-neutral-100"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
