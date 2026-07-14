"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import ServicesList from "@/components/ServicesList";
import BookingSection from "@/components/BookingSection";
import ScrollRevealText from "@/components/ScrollRevealText";
import {
  WobblyStar,
  WobblyCircle,
  WobblySpiral,
  WobblyArrow,
  WobblyHashtag,
  WobblySun,
  WobblyCrown,
} from "@/components/DecorativeShapes";

const projects = [
  {
    category: "Video Production",
    title: "Nova Fitness",
    desc: "Complete commercial campaign shoot",
    gradient: "from-[#0039C8] to-[#001f70]",
    badgeBg: "bg-[#AEFF02] text-black",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80"
  },
  {
    category: "Performance Ads",
    title: "UrbanBite D2C",
    desc: "4x ROAS in 60 days via Meta & Google",
    gradient: "from-[#AEFF02] to-[#7abf00]",
    badgeBg: "bg-black text-[#AEFF02]",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80",
    stats: "4x ROAS"
  },
  {
    category: "Social Media",
    title: "Artisan Coffee Co.",
    desc: "0 to 50K followers in 4 months",
    gradient: "from-neutral-900 to-neutral-800",
    badgeBg: "bg-white text-black",
    image: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=600&q=80",
    stats: "50K followers"
  },
  {
    category: "Website Making",
    title: "Xurya",
    desc: "Renewable energy platform & landing page",
    gradient: "from-emerald-600 to-teal-800",
    badgeBg: "bg-[#AEFF02] text-black",
    image: "/xurya.png",
    objectPosition: "top"
  }
];
const renderPlatformIcon = (p: any, isHovered: boolean, isRevealed: boolean) => {
  const iconColor = isHovered ? "#0039C8" : isRevealed ? "#000000" : "#D4D4D4";
  const className = "w-8 h-8 md:w-11 md:h-11 object-contain transition-all duration-300";

  if (!p.isCustom) {
    const logoColor = isHovered ? "0039C8" : "000000";
    const logoSrc = `https://cdn.simpleicons.org/${p.slug}/${logoColor}`;
    return (
      <img
        src={logoSrc}
        alt={p.name}
        className={className}
        style={{
          opacity: isHovered ? 1 : isRevealed ? 0.85 : 0.2,
        }}
        loading="lazy"
      />
    );
  }

  // Render Custom SVGs
  const svgStyle = {
    color: iconColor,
    opacity: isHovered ? 1 : isRevealed ? 0.85 : 0.2,
  };

  switch (p.type) {
    case "seo":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
          <line x1="8" y1="15" x2="12" y2="15" />
        </svg>
      );
    case "localseo":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case "content":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      );
    case "brand":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "webdev":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "landing":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
    case "analytics":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "cro":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <path d="M12 2v4M12 18v4M4 12h4M18 12h4" />
        </svg>
      );
    case "performance":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
      );
    case "remarketing":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <polyline points="16 8 21 8 21 3" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
          <polyline points="8 16 3 16 3 21" />
        </svg>
      );
    case "reputation":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
        </svg>
      );
    case "gbp":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "marketplace":
      return (
        <svg viewBox="0 0 24 24" className={className} style={svgStyle} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Home() {
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const platformsContainerRef = useRef<HTMLDivElement>(null);
  const [platformsProgress, setPlatformsProgress] = useState(0);
  const [hoveredPlatformIdx, setHoveredPlatformIdx] = useState<number | null>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const hashtagRef = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const wavyArrowRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight - 76;
      const progress = Math.min(1, Math.max(0, scrollY / (heroHeight || 1)));

      if (heroContentRef.current) {
        const scale = 1 - progress * 0.12; // zoom down (shrink) to 0.88
        const opacity = Math.max(0, 1 - progress * 1.35); // fade out
        const translateY = progress * 75; // translate down by 75px
        heroContentRef.current.style.transform = `scale(${scale}) translate3d(0, ${translateY}px, 0)`;
        heroContentRef.current.style.opacity = `${opacity}`;
      }

      if (heroGridRef.current) {
        const opacity = Math.max(0, 1 - progress * 1.3);
        heroGridRef.current.style.opacity = `${opacity}`;
      }

      document.documentElement.style.setProperty('--scroll-rotation', `${scrollY * 0.12}deg`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!platformsContainerRef.current) return;
      const rect = platformsContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      const start = windowHeight * 0.85;
      const end = -sectionHeight * 0.15;
      const raw = (start - sectionTop) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));

      setPlatformsProgress(clamped);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      const moveDistance = 3000; // Set a smooth 3,000px translation travel range

      if (marquee1Ref.current) {
        marquee1Ref.current.style.transform = `translateX(${-moveDistance + scrollPercent * moveDistance}px)`;
      }
      if (marquee2Ref.current) {
        marquee2Ref.current.style.transform = `translateX(${-scrollPercent * moveDistance}px)`;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is myracl. considered Tirunelveli's No.1 digital marketing agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "myracl. combines aggressive growth-oriented Brand Strategy, high-ROAS Performance Ads, responsive Next.js Web Development, and local SEO services. We operate as growth partners, aligning our retainers with client business scaling results."
        }
      },
      {
        "@type": "Question",
        "name": "Does myracl. provide SEO services in Tirunelveli?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, myracl. provides comprehensive local SEO services in Tirunelveli, Tamil Nadu. We optimize Google Business Profiles (GBP), perform technical speed and heading audits, build content authority, and help local businesses rank on the first page of search results."
        }
      },
      {
        "@type": "Question",
        "name": "How does the Performance Ads pricing model work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We operate on a custom base retainer combined with a performance revenue share. This ensures that we are directly aligned with your brand's growth and only win when you scale."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0039C8] flex flex-col text-white font-sans overflow-x-hidden selection:bg-[#AEFF02] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Main Content ── */}
      <main className="flex-1 flex flex-col pt-[76px]">

        <section
          className="relative w-full text-center overflow-visible z-10 h-[calc(100vh-76px)] min-h-[520px] sm:min-h-[580px] md:min-h-[640px] lg:min-h-[680px]"
          aria-labelledby="hero-heading"
        >
          {/* Fixed wrapper to hold visual elements in viewport while scrolling */}
          <div className="fixed top-[76px] left-0 w-full h-[calc(100vh-76px)] pointer-events-none z-10 overflow-visible flex items-center justify-center">

            {/* Grid Background Overlay — Masked independently */}
            <div
              ref={heroGridRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)
                `,
                backgroundSize: "44px 44px",
                WebkitMaskImage: "radial-gradient(ellipse 80% 40% at 50% 50%, black 50%, transparent 95%)",
                maskImage: "radial-gradient(ellipse 80% 40% at 50% 50%, black 50%, transparent 95%)",
              }}
            />

            {/* Inner content + decorative elements constrained to max-w-7xl */}
            <div
              ref={heroContentRef}
              className="relative w-full max-w-7xl mx-auto px-6 md:px-10 z-10 pointer-events-auto py-8 will-change-transform"
            >

              {/* Hashtag */}
              <svg
                ref={hashtagRef}
                className="absolute top-0 left-20 md:left-40 w-24 h-28 lg:w-28 lg:h-32 rotate-[14deg] pointer-events-none select-none hidden md:block transition-transform duration-100 ease-out"
                aria-hidden="true"
                viewBox="0 0 300 315"
                fill="none"
                overflow="visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M 88,20 C 74,110, 74,198, 88,290" stroke="#AEFF02" strokeWidth="43" strokeLinecap="round" />
                <path d="M 200,20 C 186,110, 186,198, 200,290" stroke="#AEFF02" strokeWidth="49" strokeLinecap="round" />
                <path d="M 18,110 C 88,98, 210,98, 278,110" stroke="#AEFF02" strokeWidth="44" strokeLinecap="round" />
                <path d="M 18,195 C 88,184, 210,184, 278,195" stroke="#AEFF02" strokeWidth="39" strokeLinecap="round" />
              </svg>

              {/* Arrow */}
              <svg
                ref={arrowRef}
                className="absolute top-4 right-0 md:right-24 lg:right-32 w-36 h-40 lg:w-44 lg:h-48 rotate-[140deg] pointer-events-none select-none hidden md:block transition-transform duration-100 ease-out"
                aria-hidden="true"
                viewBox="0 0 240 280"
                fill="none"
                overflow="visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 185,18 C 15,55, 15,205, 185,242"
                  stroke="#AEFF02" strokeWidth="23" strokeLinecap="round"
                />
                <g transform="rotate(20 185 242)">
                  <path
                    d="M 125,200 L 185,242 L 125,278"
                    stroke="#AEFF02" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
              </svg>

              {/* Wavy Long-Tailed Arrow */}
              <svg
                ref={wavyArrowRef}
                className="absolute top-36 left-4 md:left-8 lg:left-12 w-48 h-36 lg:w-60 lg:h-44 rotate-[-30deg] pointer-events-none select-none hidden md:block transition-transform duration-100 ease-out"
                aria-hidden="true"
                viewBox="0 0 320 320"
                fill="none"
                overflow="visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 40,20 C 140,10, 240,40, 260,95 C 280,150, 180,180, 120,200 C 50,225, 120,285, 200,290"
                  stroke="#AEFF02" strokeWidth="28" strokeLinecap="round" fill="none"
                />
                <g transform="rotate(15 200 290)">
                  <path
                    d="M 160,265 L 200,290 L 160,315"
                    stroke="#AEFF02" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round"
                  />
                </g>
              </svg>

              {/* Local SEO badge */}
              <span className="inline-block font-mono text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#AEFF02] mb-6 bg-black border-2 border-neutral-900 rounded-lg px-4 py-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)] select-none">
                // TIRUNELVELI&apos;S NO.1 DIGITAL MARKETING AGENCY
              </span>

              {/* ── Hero Headline ── */}
              <h1
                className="font-black text-[clamp(44px,8vw,88px)] leading-[1.02] tracking-[-2px] text-white uppercase max-w-[960px] mx-auto animate-fade-in"
                id="hero-heading"
              >
                Elevate Your<br />
                Brand With Our
              </h1>

              {/* CREATIVE + Wordmark row */}
              <div className="inline-flex flex-wrap items-center justify-center gap-3 mt-2 md:mt-3">
                <span className="bg-[#AEFF02] text-[#0039C8] font-black text-[clamp(44px,8vw,88px)] leading-none tracking-[-2px] uppercase px-6 py-2 rounded-2xl -rotate-2 select-none border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  Creative
                </span>
                <span className="flex items-center relative -top-3 md:-top-4">
                  <Image
                    src="/logo.png"
                    alt="myracl."
                    width={380}
                    height={110}
                    priority
                    className="h-[clamp(64px,9vw,110px)] w-auto object-contain"
                  />
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-6 mt-12 mb-8 z-10 relative">
                <a
                  href="#contact"
                  className="px-8 py-4 bg-[#AEFF02] text-black font-black text-xl uppercase tracking-wider rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-300 select-none"
                >
                  Book a Call
                </a>
                <a
                  href="#works"
                  className="px-8 py-4 bg-white text-black font-black text-xl uppercase tracking-wider rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-300 select-none"
                >
                  Selected Works
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* ── White Canvas Container (Full Width) ── */}
        <div className="w-full bg-white rounded-t-[40px] mt-8 lg:mt-16 overflow-hidden relative z-20 flex flex-col">

          <section id="services" className="w-full bg-white relative z-10 px-4 md:px-8 py-20 text-black overflow-hidden" aria-label="Our Services" suppressHydrationWarning>
            <div className="max-w-7xl mx-auto relative z-10">

              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 border-b border-neutral-200 pb-8 relative">
                <h2 className="flex items-center flex-wrap gap-x-4 gap-y-2 font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9] text-black">
                  <span>Our</span>
                  <span className="relative inline-block text-[#0039C8] z-10">
                    Expertise.
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
                  <WobblyCrown className="rotate-[12deg] shrink-0 md:translate-y-1" color="#AEFF02" size="w-16 h-16 md:w-24 md:h-24" strokeWidth={12} />
                </h2>

                <p className="font-bold text-lg text-neutral-500 max-w-sm uppercase tracking-tight leading-snug md:text-right">
                  Transform ideas into reality by combining creativity, strategy, and expertise.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Card 1: Market Research */}
                <div className="group relative rounded-[24px] p-6 pt-8 bg-[#191919] text-white flex flex-col justify-between border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#202020] hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <div className="flex justify-between items-center gap-4">
                      <h3 className="font-black text-[35px] text-[#AEFF02] tracking-tighter leading-[0.95]">
                        Market<br />research
                      </h3>
                      <div className="w-16 h-16 rounded-full bg-[#2E2E2E] border border-neutral-700/50 flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#AEFF02] group-hover:text-[#191919] group-hover:border-transparent shadow-lg z-20 shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                      </div>
                    </div>
                    <div className="border-t border-neutral-800 group-hover:border-neutral-700/50 transition-colors duration-500 my-4" />
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors duration-500 font-medium leading-relaxed">
                      Blends consumer behavior and economic trends to confirm and improve business idea
                    </p>
                  </div>
                  <div className="rounded-b-[24px] overflow-hidden w-[calc(100%+48px)] -mx-6 -mb-6 aspect-[16/9] mt-6 relative">
                    <img src="/market_research.png" alt="Market Research" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </div>

                {/* Card 2: Ads Production (Highlighted) */}
                <div className="group relative rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] rounded-bl-[140px] p-6 pt-8 bg-[#0039C8] text-white flex flex-col justify-between border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#002FB0] hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <div className="relative">
                      <h3 className="font-black text-[35px] text-white tracking-tighter leading-[0.95]">
                        Ads<br />Production
                      </h3>
                    </div>
                    <div className="border-t border-white/20 group-hover:border-white/30 transition-colors duration-500 my-4" />
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-500 font-medium leading-relaxed">
                      Creative consultation, Pre-production, Production and Post-production
                    </p>
                  </div>

                  {/* Floating Lime green arrow overlapping the bottom left corner */}
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#AEFF02] rounded-full flex items-center justify-center shadow-xl z-20 text-[#0039C8] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                  </div>

                  <div className="rounded-bl-[140px] rounded-br-[24px] rounded-t-none overflow-hidden w-[calc(100%+48px)] -mx-6 -mb-6 aspect-[16/9] mt-6 relative">
                    <img src="/ads_production.png" alt="Ads Production" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </div>

                {/* Card 3: Branding strategies */}
                <div className="group relative rounded-[24px] p-6 pt-8 bg-[#191919] text-white flex flex-col justify-between border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#202020] hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <div>
                    <div className="flex justify-between items-center gap-4">
                      <h3 className="font-black text-[35px] text-[#AEFF02] tracking-tighter leading-[0.95]">
                        Branding<br />strategies
                      </h3>
                      <div className="w-16 h-16 rounded-full bg-[#2E2E2E] border border-neutral-700/50 flex items-center justify-center text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:bg-[#AEFF02] group-hover:text-[#191919] group-hover:border-transparent shadow-lg z-20 shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                      </div>
                    </div>
                    <div className="border-t border-neutral-800 group-hover:border-neutral-700/50 transition-colors duration-500 my-4" />
                    <p className="text-sm text-neutral-400 group-hover:text-neutral-200 transition-colors duration-500 font-medium leading-relaxed">
                      Builds identification and favorability with customers and potential customers
                    </p>
                  </div>
                  <div className="rounded-b-[24px] overflow-hidden w-[calc(100%+48px)] -mx-6 -mb-6 aspect-[16/9] mt-6 relative">
                    <img src="/branding_strategies.png" alt="Branding Strategies" className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── Seamless Marquee Strip 2 (Expertise to About Us Transition) ── */}
          <div className="w-[140%] -left-[20%] -rotate-2 bg-[#111111] py-5 overflow-hidden relative z-20 flex border-y border-neutral-800 shadow-md">
            <div ref={marquee1Ref} className="flex will-change-transform">
              <div className="flex whitespace-nowrap font-black uppercase text-2xl md:text-4xl tracking-tighter text-[#AEFF02]">
                {Array(15).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center mx-4 gap-4">
                    <span>★ DARE TO DISRUPT</span>
                    <span className="text-white">★ WE SHAPE NARRATIVES</span>
                    <span>★ ZERO BULLSHIT</span>
                    <span className="text-white">★ DATA-BACKED CREATIVE</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Platforms We Master ── */}
          <section ref={platformsContainerRef} className="w-full bg-white relative z-10 px-4 md:px-8 py-20 text-black">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• Platforms & Tools</span>
                <h2 className="font-black text-3xl md:text-[48px] tracking-tight leading-[1.1] text-black">
                  Platforms We Master<span className="text-[#0039C8]">.</span>
                </h2>
              </div>

              {/* Logo Funnel – Inverted Triangle */}
              {(() => {
                const platforms = [
                  // Row 1: High demand priority (9 items)
                  { name: "Meta Ads", isCustom: false, slug: "meta", desc: "Facebook & Instagram ads that target real buying intent." },
                  { name: "Google Ads", isCustom: false, slug: "googleads", desc: "Search & display campaigns built around measurable ROI." },
                  { name: "Instagram Mktg", isCustom: false, slug: "instagram", desc: "Content, reels and growth strategy that builds a following." },
                  { name: "Web Dev", isCustom: true, type: "webdev", desc: "Fast, modern websites built to rank and convert." },
                  { name: "SEO", isCustom: true, type: "seo", desc: "Rank on page one for searches that actually convert." },
                  { name: "Local SEO", isCustom: true, type: "localseo", desc: "Dominate 'near me' and Google Maps results in Tirunelveli." },
                  { name: "Lead Gen", isCustom: true, type: "performance", desc: "End-to-end systems that fill your calendar with enquiries." },
                  { name: "Landing Pages", isCustom: true, type: "landing", desc: "High-conversion pages built for a single campaign goal." },
                  { name: "WhatsApp Mktg", isCustom: false, slug: "whatsapp", desc: "Automated, personal follow-ups where your customers are." },

                  // Row 2: Specialized business priority (8 items)
                  { name: "LinkedIn Mktg", isCustom: true, type: "linkedin", desc: "B2B lead generation for professional & corporate brands." },
                  { name: "YouTube Mktg", isCustom: false, slug: "youtube", desc: "Video strategy that builds trust before the first enquiry." },
                  { name: "Facebook Mktg", isCustom: false, slug: "facebook", desc: "Community-driven marketing for local and regional reach." },
                  { name: "Ecom Marketing", isCustom: false, slug: "shopify", desc: "Full-funnel growth for online stores and catalogues." },
                  { name: "Marketplace Ads", isCustom: true, type: "marketplace", desc: "Visibility and sales growth on Amazon, Flipkart & more." },
                  { name: "Performance Ads", isCustom: true, type: "performance", desc: "Full-funnel campaigns measured purely on outcomes." },
                  { name: "CRO", isCustom: true, type: "cro", desc: "Continuous testing to lower cost-per-lead over time." },
                  { name: "Analytics", isCustom: true, type: "analytics", desc: "Clear dashboards that show exactly what's working." },

                  // Row 3: Growth support priority (7 items)
                  { name: "Email Marketing", isCustom: true, type: "email", desc: "Nurture sequences that turn leads into repeat customers." },
                  { name: "Content Mktg", isCustom: true, type: "content", desc: "Blogs, guides & assets that earn trust and rankings." },
                  { name: "Brand Strategy", isCustom: true, type: "brand", desc: "Positioning and identity that makes you memorable." },
                  { name: "GBP Profile", isCustom: true, type: "gbp", desc: "Full GBP optimisation to win the local 3-pack." },
                  { name: "Remarketing", isCustom: true, type: "remarketing", desc: "Bring back visitors who almost converted the first time." },
                  { name: "Reputation Mgt", isCustom: true, type: "reputation", desc: "Protect and grow your reviews across every platform." },
                  { name: "Automation", isCustom: false, slug: "zapier", desc: "Workflows that follow up so no lead goes cold." },
                ];
                const rows = [9, 8, 7];
                let idx = 0;
                return (
                  <div className="flex flex-col items-center gap-8 md:gap-10">
                    {rows.map((count, rowIdx) => {
                      const rowItems = platforms.slice(idx, idx + count);
                      const startIdx = idx;
                      idx += count;
                      return (
                        <div key={rowIdx} className="flex justify-center items-center gap-8 md:gap-12 lg:gap-14">
                          {rowItems.map((p, itemIdx) => {
                            const overallIdx = startIdx + itemIdx;
                            const itemProgress = overallIdx / platforms.length;
                            const isRevealed = platformsProgress > itemProgress;
                            const isHovered = hoveredPlatformIdx === overallIdx;

                            return (
                              <div
                                key={p.name}
                                className="relative flex flex-col items-center gap-3 cursor-pointer transition-all duration-300 ease-out"
                                onMouseEnter={() => isRevealed && setHoveredPlatformIdx(overallIdx)}
                                onMouseLeave={() => setHoveredPlatformIdx(null)}
                                style={{
                                  opacity: isRevealed ? 1 : 0.12,
                                  transform: isHovered
                                    ? "scale(1.15) translateY(-3px)"
                                    : isRevealed
                                      ? "scale(1)"
                                      : "scale(0.85)",
                                }}
                              >
                                {/* Tooltip details box */}
                                {isHovered && (
                                  <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-48 bg-black text-white text-[10px] md:text-xs font-black uppercase tracking-wider p-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] text-center z-30 animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none">
                                    {p.desc}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-black" />
                                  </div>
                                )}

                                {renderPlatformIcon(p, isHovered, isRevealed)}

                                <span
                                  className="font-bold text-[10px] uppercase tracking-widest transition-colors duration-300"
                                  style={{
                                    color: isHovered ? "#0039C8" : isRevealed ? "#404040" : "#D4D4D4",
                                  }}
                                >
                                  {p.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </section>

          {/* Floating decorative shapes in the gap between Platforms and About Us (positioned in extreme side margins) */}
          <div className="relative w-full px-4 md:px-8 pointer-events-none select-none h-0 z-20 overflow-visible">
            {/* Far Left Shape (Hashtag - Extra Large, Bold, Pushed to Far Edge) */}
            <WobblyHashtag className="absolute -top-[10px] left-2 md:left-4 lg:left-8 xl:left-12 rotate-[-12deg] z-10 hidden md:block" color="#AEFF02" size="w-44 h-44" strokeWidth={14} />

            {/* Far Right Shape (Star - Extra Large, Bold, Pushed to Far Edge) */}
            <WobblyStar className="absolute -top-[30px] right-2 md:right-4 lg:right-8 xl:right-12 rotate-[15deg] z-10 hidden md:block" color="#0039C8" size="w-44 h-44" strokeWidth={14} />
          </div>

          {/* ── About Us Section ── */}
          <section id="about" className="w-full bg-white relative z-10 px-4 md:px-8 pt-12 md:pt-16 pb-24 text-black">
            <div className="max-w-7xl mx-auto">

              {/* Header */}
              <div className="text-center max-w-4xl mx-auto mb-16">
                <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• About Us</span>
                <h2 className="font-black text-4xl md:text-[54px] tracking-tight leading-[1.1] text-black">
                  A creative growth partner<br />
                  dedicated to building{" "}
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#0039C8] text-white align-middle mx-1.5 shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </span>{" "}
                  <span className="text-black">bolder</span><br className="md:hidden" />
                  {" "}and{" "}
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#AEFF02] text-[#0039C8] align-middle mx-1.5 shadow-md">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A7 7 0 0 0 4 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /></svg>
                  </span>{" "}
                  <span className="text-neutral-500">more narrative brands.</span>
                </h2>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Card 1: Blue Card with massive bold typography */}
                <div className="group relative rounded-[24px] p-8 bg-[#0039C8] text-white flex flex-col justify-between min-h-[390px] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
                  <div className="flex justify-between items-center z-10">
                    <span className="font-black text-3xl tracking-tighter text-white">myracl.</span>
                    <div className="w-10 h-10 rounded-lg bg-black text-[#AEFF02] border-2 border-black flex items-center justify-center shadow-sm">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    </div>
                  </div>

                  <div className="my-auto pt-6 z-10">
                    <h3 className="font-black text-[90px] leading-none tracking-tighter text-[#AEFF02] mb-3">50+</h3>
                    <p className="text-sm font-black uppercase tracking-wide leading-relaxed">
                      Brands served globally with high-impact, award-winning campaigns.
                    </p>
                  </div>
                </div>

                {/* Card 2: Commitment to Measurable (White Card) */}
                <div className="group rounded-[24px] p-8 bg-white border-4 border-black text-black flex flex-col justify-between min-h-[390px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-neutral-200 border-2 border-black">Commitment to measurable</span>
                    <h3 className="font-black text-[90px] leading-none tracking-tighter text-[#0039C8] mt-2">100%</h3>
                  </div>

                  <div className="mt-auto">
                    {/* Avatars */}
                    <div className="flex -space-x-3 mb-6">
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-black flex items-center justify-center text-[10px] font-black text-white shadow-sm">AM</div>
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-[#AEFF02] flex items-center justify-center text-[10px] font-black text-black shadow-sm">JD</div>
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-[#0039C8] flex items-center justify-center text-[10px] font-black text-white shadow-sm">SR</div>
                      <div className="w-10 h-10 rounded-full border-2 border-black bg-white flex items-center justify-center text-[10px] font-black text-black shadow-sm">KL</div>
                    </div>
                    <p className="italic font-bold text-[15px] text-neutral-800 leading-relaxed pl-4 border-l-4 border-[#0039C8]">
                      "Their creative strategy completely reshaped our brand voice. It's bold, raw, and highly engaging."
                    </p>
                  </div>
                </div>

                {/* Card 3: Stacked Layout */}
                <div className="flex flex-col gap-6 justify-between min-h-[390px]">
                  {/* Top stacked card: Reach */}
                  <div className="group bg-[#AEFF02] border-4 border-black text-black rounded-[24px] p-8 flex-1 flex flex-col justify-between shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/10 border border-black/20">Data Points</span>
                      <h3 className="font-black text-[64px] leading-none tracking-tighter text-black mt-2">10M+</h3>
                    </div>
                    <p className="text-xs font-black uppercase tracking-wide leading-relaxed mt-4">
                      Organic impressions generated monthly to power smarter business and branding strategies.
                    </p>
                  </div>

                  {/* Bottom stacked card: Niches */}
                  <div className="group bg-[#111111] border-4 border-black text-white rounded-[24px] p-6 flex justify-between items-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] duration-300">
                    <div className="flex flex-col">
                      <span className="inline-block px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-white/10 border border-white/20 self-start">Years Strong</span>
                      <span className="font-bold text-sm uppercase mt-1">Agency Lifespan</span>
                    </div>
                    <h3 className="font-black text-[56px] leading-none tracking-tighter text-[#AEFF02]">3+</h3>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── Services Rows List Section (Full Width, Bold, One-by-One) ── */}
          <ServicesList />

          {/* ── Seamless Marquee Strip ── */}
          <div className="w-[140%] -left-[20%] -rotate-2 bg-[#AEFF02] py-5 overflow-hidden relative z-20 flex shadow-md">
            <div ref={marquee2Ref} className="flex will-change-transform">
              <div className="flex whitespace-nowrap font-black uppercase text-2xl md:text-4xl tracking-tighter">
                {Array(15).fill(null).map((_, i) => (
                  <div key={i} className="flex items-center mx-4 gap-6">
                    <span className="text-[#0039C8]">★ MAXIMIZE</span>
                    <span className="text-white">★ YOUR</span>
                    <span className="text-black">★ REACH</span>
                    <span className="text-[#0039C8]">★ AUTHORITY</span>
                    <span className="text-white">★ CONTENT</span>
                    <span className="text-black">★ LEAD-GEN</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Works / Portfolio Section ── */}
          <section id="works" className="w-full bg-white relative z-10 py-24 text-black overflow-hidden">
            {/* Background decoration shapes sitting on the sides */}
            <WobblyStar className="absolute -left-22 top-[25%] rotate-[-12deg] z-0 hidden md:block" color="#0039C8" size="w-44 h-44" strokeWidth={14} />
            <WobblyHashtag className="absolute -left-22 bottom-[20%] rotate-[15deg] z-0 hidden md:block" color="#AEFF02" size="w-44 h-44" strokeWidth={14} />
            <WobblyCircle className="absolute -right-22 bottom-[25%] rotate-[30deg] z-0 hidden md:block" color="#0039C8" size="w-44 h-44" strokeWidth={14} />

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 border-b border-neutral-200 pb-8">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• Selected Works</span>
                  <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
                    Selected <span className="relative inline-block text-[#0039C8] z-10">
                      Works.
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
                    Case studies that deliver actual growth.
                  </p>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 bg-[#AEFF02] text-black border-4 border-black rounded-full px-6 py-3 font-black text-sm uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Start a Project
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2 lg:h-[750px] gap-8">
                {projects.map((project, idx) => {
                  // Determine span classes for bento look
                  let gridSpan = "";
                  let aspectClass = "aspect-[4/3] lg:aspect-auto lg:h-full";

                  if (idx === 0) {
                    gridSpan = "lg:col-span-2 lg:col-start-1 lg:row-start-1";
                  } else if (idx === 1) {
                    gridSpan = "lg:col-span-1 lg:col-start-1 lg:row-start-2";
                  } else if (idx === 2) {
                    gridSpan = "lg:col-span-1 lg:col-start-2 lg:row-start-2";
                  } else if (idx === 3) {
                    gridSpan = "lg:col-span-1 lg:col-start-3 lg:row-start-1 lg:row-span-2";
                  }

                  return (
                    <div
                      key={idx}
                      className={`group relative rounded-[24px] overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:translate-x-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 cursor-pointer ${gridSpan} ${aspectClass}`}
                    >
                      {/* Gradient Backdrop (Acts as visual placeholder while loading) */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

                      {/* Image Backdrop from Internet */}
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ objectPosition: project.objectPosition || "center" }}
                        />
                      )}

                      {/* Soft bottom-only gradient overlay near the text for legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

                      {/* Subtle Grid Pattern Overlay */}
                      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:24px_24px] z-10" />

                      {/* Content */}
                      <div className="relative z-20 h-full flex flex-col justify-between p-6 md:p-8">
                        <div className="flex items-center justify-between">
                          <span className={`self-start ${project.badgeBg} border-2 border-black rounded-full px-4 py-1 font-black text-xs uppercase tracking-widest`}>
                            {project.category}
                          </span>

                          {/* Top-right Icon */}
                          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                          </div>
                        </div>

                        <div className="translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          {project.stats && (
                            <div className="bg-[#AEFF02] text-black rounded-lg border-2 border-black px-3 py-1.5 mb-3 inline-block font-black text-sm uppercase tracking-tighter shadow-sm">
                              {project.stats}
                            </div>
                          )}
                          <h3 className="font-black text-3xl md:text-4xl lg:text-5xl uppercase tracking-tighter text-white leading-tight">
                            {project.title}
                          </h3>
                          <p className="font-bold text-sm text-white/80 uppercase mt-2 tracking-wide">
                            {project.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ── Scroll Reveal Philosophy ── */}
          <section className="w-full bg-white relative z-10 px-4 md:px-8 py-16 overflow-visible">
            <div className="max-w-6xl mx-auto relative overflow-visible">
              {/* Corner wobbly shapes overlapping the blue card boundaries */}
              <WobblyStar className="absolute -top-12 -left-12 rotate-12 z-20 scroll-rotate" color="#AEFF02" size="w-24 h-24" strokeWidth={12} />
              <WobblyHashtag className="absolute -bottom-12 -right-12 rotate-[25deg] z-20 scroll-rotate" color="#AEFF02" size="w-24 h-24" strokeWidth={12} />

              <div className="border-4 border-black rounded-[24px] bg-[#0039C8] shadow-[8px_8px_0px_rgba(0,0,0,1)] overflow-hidden">
                <ScrollRevealText />
              </div>
            </div>
          </section>

          {/* ── Testimonials Section ── */}
          <section id="testimonials" className="w-full bg-neutral-50 relative z-10 px-4 md:px-8 py-24 text-black">
            <Testimonials />
          </section>

          {/* ── Call Booking Section (Cal.com Embedded) ── */}
          <BookingSection />

          {/* ── FAQ Section (Full-Width Rows like Services) ── */}
          <section className="w-full bg-neutral-50 pt-24 pb-0 text-black relative z-10 px-0">

            {/* FAQ Header */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-neutral-200 pb-8">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-4">• Common Inquiries</span>
                  <h2 className="flex items-center flex-wrap gap-x-4 gap-y-2 font-black text-5xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
                    <span>Got</span>
                    <span className="relative inline-block text-[#0039C8] z-10">
                      Questions?
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
                    <WobblyStar className="rotate-[15deg] shrink-0 md:translate-y-1 scroll-rotate" color="#0039C8" size="w-12 h-12 md:w-16 md:h-16" strokeWidth={10} />
                  </h2>
                  <p className="font-bold text-lg text-neutral-500 uppercase tracking-tight mt-3">
                    Everything you need to know about scaling your narrative.
                  </p>
                </div>
              </div>
            </div>

            {/* Full-Width FAQ Rows Container */}
            <div className="flex flex-col w-full overflow-hidden">

              {/* FAQ Item 1 */}
              <div className="group w-full border-t-4 border-black relative transition-all duration-300 cursor-pointer select-none py-8 md:py-10 px-4 md:px-8 overflow-hidden z-10">
                {/* Liquid background layer */}
                <div className="absolute inset-x-0 top-0 w-full h-[108%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0 rounded-b-[80px] group-hover:rounded-b-none z-0 bg-[#0039C8]" />

                <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col transition-colors duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-8 transition-transform duration-300 group-hover:translate-x-6">
                      <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#0039C8] transition-colors duration-300 group-hover:text-[#AEFF02]">
                        01
                      </span>
                      <h3 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-3deg] group-hover:text-white">
                        What makes myracl different?
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-3 border-black bg-white group-hover:bg-[#AEFF02] flex items-center justify-center text-black font-black text-2xl shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:scale-105 group-hover:rotate-45 transition-all shrink-0">
                      +
                    </div>
                  </div>

                  {/* Grid height expansion on hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 pl-12 md:pl-16">
                    <div className="overflow-hidden">
                      <p className="font-bold text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-4xl transition-all duration-300">
                        We don&apos;t just run ads. We build narrative brands. Our Gen-Z approach means bolder creative, faster growth loops, and a relentless focus on maximizing your reach, authority, content, and lead-gen simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="group w-full border-t-4 border-black relative transition-all duration-300 cursor-pointer select-none py-8 md:py-10 px-4 md:px-8 overflow-hidden z-10">
                {/* Liquid background layer */}
                <div className="absolute inset-x-0 top-0 w-full h-[108%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0 rounded-b-[80px] group-hover:rounded-b-none z-0 bg-[#0039C8]" />

                <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col transition-colors duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-8 transition-transform duration-300 group-hover:translate-x-6">
                      <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#0039C8] transition-colors duration-300 group-hover:text-[#AEFF02]">
                        02
                      </span>
                      <h3 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-3deg] group-hover:text-white">
                        How fast can we see results?
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-3 border-black bg-white group-hover:bg-[#AEFF02] flex items-center justify-center text-black font-black text-2xl shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:scale-105 group-hover:rotate-45 transition-all shrink-0">
                      +
                    </div>
                  </div>

                  {/* Grid height expansion on hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 pl-12 md:pl-16">
                    <div className="overflow-hidden">
                      <p className="font-bold text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-4xl transition-all duration-300">
                        While long-term brand equity takes months to compound, our aggressive performance marketing strategies typically show measurable ROI within the first 30-45 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="group w-full border-t-4 border-black relative transition-all duration-300 cursor-pointer select-none py-8 md:py-10 px-4 md:px-8 overflow-hidden z-10">
                {/* Liquid background layer */}
                <div className="absolute inset-x-0 top-0 w-full h-[108%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0 rounded-b-[80px] group-hover:rounded-b-none z-0 bg-[#0039C8]" />

                <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col transition-colors duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-8 transition-transform duration-300 group-hover:translate-x-6">
                      <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#0039C8] transition-colors duration-300 group-hover:text-[#AEFF02]">
                        03
                      </span>
                      <h3 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-3deg] group-hover:text-white">
                        Do you work with startups?
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-3 border-black bg-white group-hover:bg-[#AEFF02] flex items-center justify-center text-black font-black text-2xl shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:scale-105 group-hover:rotate-45 transition-all shrink-0">
                      +
                    </div>
                  </div>

                  {/* Grid height expansion on hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 pl-12 md:pl-16">
                    <div className="overflow-hidden">
                      <p className="font-bold text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-4xl transition-all duration-300">
                        Yes, if they are funded or have strong cash flow. We act as an outsourced growth team for brands looking to disrupt their industry.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="group w-full border-t-4 border-black border-b-4 border-black relative transition-all duration-300 cursor-pointer select-none py-8 md:py-10 px-4 md:px-8 overflow-hidden z-10">
                {/* Liquid background layer */}
                <div className="absolute inset-x-0 top-0 w-full h-[108%] transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0 rounded-b-[80px] group-hover:rounded-b-none z-0 bg-[#0039C8]" />

                <div className="max-w-7xl mx-auto w-full relative z-20 flex flex-col transition-colors duration-300">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-6 md:gap-8 transition-transform duration-300 group-hover:translate-x-6">
                      <span className="font-mono text-lg sm:text-xl md:text-2xl font-black text-[#0039C8] transition-colors duration-300 group-hover:text-[#AEFF02]">
                        04
                      </span>
                      <h3 className="font-black text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-tighter leading-none transition-all duration-300 group-hover:skew-x-[-3deg] group-hover:text-white">
                        What is your pricing structure?
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full border-3 border-black bg-white group-hover:bg-[#AEFF02] flex items-center justify-center text-black font-black text-2xl shadow-[3px_3px_0px_rgba(0,0,0,1)] group-hover:scale-105 group-hover:rotate-45 transition-all shrink-0">
                      +
                    </div>
                  </div>

                  {/* Grid height expansion on hover */}
                  <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-300 ease-in-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-6 pl-12 md:pl-16">
                    <div className="overflow-hidden">
                      <p className="font-bold text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-4xl transition-all duration-300">
                        We work on a custom retainer + performance share model. Our incentives are aligned directly with yours—we only win when you scale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* ── Massive Footer (Minimal Redesign) ── */}
          <footer className="w-full bg-[#0039C8] text-white pt-24 pb-0 px-4 md:px-8 relative z-10 border-t border-white/10 overflow-hidden">
            <div className="max-w-7xl mx-auto">

              {/* Top Row: Wordmark & Tagline */}
              <div className="flex justify-between items-center border-b border-white/10 pb-10 mb-16">
                <span className="font-black text-2xl uppercase tracking-tight">
                  MYRACL<span className="text-[#AEFF02]">.</span>
                </span>
                <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase hidden sm:inline-block">
                  Creative Growth Agency
                </span>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

                {/* Left Side: Newsletter (5 columns) */}
                <div className="lg:col-span-5">
                  <h3 className="font-black text-2xl uppercase tracking-tight mb-3">
                    Stay in the loop
                  </h3>
                  <p className="font-medium text-sm text-white/60 uppercase tracking-wider mb-6 max-w-sm leading-relaxed">
                    Get weekly growth teardowns and marketing insights.
                  </p>

                  {/* Underline Newsletter Input */}
                  <div className="flex items-center border-b border-white/20 focus-within:border-[#AEFF02] transition-colors pb-2 max-w-md">
                    <input
                      type="email"
                      placeholder="YOUR EMAIL"
                      className="w-full bg-transparent text-white font-bold uppercase outline-none placeholder:text-white/30 py-2"
                    />
                    <button className="text-[#AEFF02] font-black uppercase text-xs tracking-widest pl-4 hover:text-white transition-colors cursor-pointer">
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* Right Side: Links & Contact (7 columns) */}
                <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-2 sm:grid-cols-3 gap-10">

                  {/* Socials */}
                  <div>
                    <h4 className="font-black text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Socials</h4>
                    <ul className="space-y-3 font-bold text-lg uppercase tracking-tight text-white/70">
                      <li><a href="#" className="hover:text-[#AEFF02] transition-colors">Instagram</a></li>
                      <li><a href="#" className="hover:text-[#AEFF02] transition-colors">LinkedIn</a></li>
                      <li><a href="#" className="hover:text-[#AEFF02] transition-colors">Twitter (X)</a></li>
                      <li><a href="#" className="hover:text-[#AEFF02] transition-colors">Behance</a></li>
                    </ul>
                  </div>

                  {/* Navigation */}
                  <div>
                    <h4 className="font-black text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Navigation</h4>
                    <ul className="space-y-3 font-bold text-lg uppercase tracking-tight text-white/70">
                      <li><a href="#services" className="hover:text-[#AEFF02] transition-colors">Services</a></li>
                      <li><a href="#about" className="hover:text-[#AEFF02] transition-colors">About Us</a></li>
                      <li><a href="#works" className="hover:text-[#AEFF02] transition-colors">Works</a></li>
                      <li><a href="#testimonials" className="hover:text-[#AEFF02] transition-colors">Feedback</a></li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="col-span-2 sm:col-span-1">
                    <h4 className="font-black text-[10px] tracking-[0.2em] uppercase text-white/40 mb-6">Contact</h4>
                    <ul className="space-y-4 text-sm uppercase tracking-wider text-white/70">
                      <li>
                        <p className="font-black text-[9px] text-[#AEFF02] tracking-widest mb-0.5">Email Us</p>
                        <a href="mailto:hello@myracl.in" className="font-bold text-base text-white hover:text-[#AEFF02] transition-colors">
                          hello@myracl.in
                        </a>
                      </li>
                      <li>
                        <p className="font-black text-[9px] text-[#AEFF02] tracking-widest mb-0.5">Location</p>
                        <p className="font-bold text-base text-white">
                          India (Worldwide)
                        </p>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Bottom Copyright bar */}
              <div className="mt-20 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center font-bold text-xs text-white/40 uppercase tracking-widest gap-6">
                <p>© 2026 MYRACL. All rights reserved.</p>
                <div className="flex gap-8 items-center">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>

                  {/* Back to Top */}
                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="text-[#AEFF02] hover:text-white font-black transition-colors cursor-pointer select-none text-xs tracking-widest uppercase ml-4"
                  >
                    Back to Top ↑
                  </button>
                </div>
              </div>
            </div>

            {/* Massive Full-Width Wordmark Text */}
            <div className="w-full mt-16 -mb-4 select-none pointer-events-none text-center">
              <h2 className="font-black text-[clamp(80px,24vw,340px)] tracking-[-0.06em] leading-[0.75] text-[#AEFF02] uppercase block" style={{ textShadow: '8px 8px 0px rgba(0,0,0,1)' }}>
                MYRACL
              </h2>
            </div>
          </footer>

        </div>

      </main>
    </div>
  );
}
