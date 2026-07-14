"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { WobblyCrown } from "@/components/DecorativeShapes";

const teamMembers = [
  {
    role: "Creative Direction",
    title: "Narrative Builder",
    description: "Architects the visual language, design systems, and identity standards for brands looking to establish cultural authority."
  },
  {
    role: "Performance Lead",
    title: "Arbitrage Expert",
    description: "Manages budgets, runs rigorous testing loops, and maximizes return on advertising spend (ROAS) across all ad platforms."
  },
  {
    role: "Lead Developer",
    title: "Interface Engineer",
    description: "Coded using React, Next.js, and modern animation engines to create fast, interactive, and responsive web platforms."
  },
  {
    role: "Video Production",
    title: "Hook Designer",
    description: "Directs commercials, organic content shoots, and high-engagement vertical video hooks that capture raw attention."
  }
];

const pillars = [
  {
    letter: "R",
    name: "Reach",
    before: "1,200 impressions/mo (Stagnant)",
    after: "150,000+ impressions/mo (Scaling)",
    growth: "+12,400% organic & paid expansion",
    progress: "w-[95%]",
    percentage: "95%",
    summary: "We deploy aggressive ad arbitrage and speed-oriented SEO optimization to maximize your visibility."
  },
  {
    letter: "A",
    name: "Authority",
    before: "Invisible in search & industry niche",
    after: "#1 search rank & thought leadership",
    growth: "+10x keyword ranking surge",
    progress: "w-[92%]",
    percentage: "92%",
    summary: "We craft expert Positioning Dossiers and internal linking networks that command trust."
  },
  {
    letter: "C",
    name: "Content",
    before: "Boring stock graphics & zero hooks",
    after: "High-production commercials & viral scripts",
    growth: "5.2x engagement rate multiplier",
    progress: "w-[98%]",
    percentage: "98%",
    summary: "We script, shoot, and edit custom vertical reels and commercial assets optimized for absolute click-through."
  },
  {
    letter: "L",
    name: "Leads",
    before: "Bounce rate 85% & dead contact form",
    after: "Next.js portals & ManyChat automations",
    growth: "3.8x lead-gen conversion leap",
    progress: "w-[96%]",
    percentage: "96%",
    summary: "We build ultra-fast Next.js portals and automated DM funnels to capture and convert every user visit."
  }
];

export default function AboutPage() {
  const [activePillar, setActivePillar] = useState("R");

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = 400; // Reference height for subpage hero
      const progress = Math.min(1, Math.max(0, scrollY / (heroHeight || 1)));

      if (heroContentRef.current) {
        const scale = 1 - progress * 0.12;
        const opacity = Math.max(0, 1 - progress * 1.35);
        const translateY = progress * 60;
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

  const activePillarData = pillars.find((p) => p.letter === activePillar) || pillars[0];

  return (
    <div className="min-h-screen bg-[#0039C8] text-white flex flex-col font-sans overflow-x-hidden select-none">
      <Navbar />

      {/* Hero Section (Matching Landing Page Styling) */}
      <section className="relative w-full text-center overflow-visible z-10 h-[450px] min-h-[400px] flex items-center justify-center pt-24">
        {/* Grid Background Overlay */}
        <div
          ref={heroGridRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            WebkitMaskImage: "radial-gradient(ellipse 80% 40% at 50% 50%, black 50%, transparent 95%)",
            maskImage: "radial-gradient(ellipse 80% 40% at 50% 50%, black 50%, transparent 95%)",
          }}
        />

        <div
          ref={heroContentRef}
          className="relative w-full max-w-7xl mx-auto px-6 md:px-10 z-10 pointer-events-auto will-change-transform flex flex-col items-center"
        >
          {/* Back button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 font-black uppercase text-[10px] tracking-widest text-[#AEFF02] hover:text-white transition-colors mb-6 border-2 border-[#AEFF02] hover:border-white rounded-lg px-3.5 py-1.5 shadow-[2px_2px_0px_rgba(174,255,2,1)] hover:shadow-[2px_2px_0px_rgba(255,255,255,1)] hover:-translate-y-[1px] active:scale-95 transition-all"
          >
            ← Home
          </Link>

          {/* Static Hashtag Shape */}
          <svg
            className="absolute top-0 left-12 md:left-24 w-20 h-24 rotate-[14deg] pointer-events-none select-none hidden md:block"
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

          {/* Static Arrow Shape */}
          <svg
            className="absolute top-0 right-12 md:right-24 w-28 h-32 rotate-[140deg] pointer-events-none select-none hidden md:block"
            viewBox="0 0 240 280"
            fill="none"
            overflow="visible"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 185,18 C 15,55, 15,205, 185,242" stroke="#AEFF02" strokeWidth="23" strokeLinecap="round" />
            <g transform="rotate(20 185 242)">
              <path d="M 125,200 L 185,242 L 125,278" stroke="#AEFF02" strokeWidth="23" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>

          {/* Headline */}
          <h1 className="font-black text-[clamp(32px,5vw,64px)] leading-[1.02] tracking-tighter uppercase text-white max-w-4xl">
            A Growth Partner Founded in 2026
          </h1>

          {/* Rotated Badge Row */}
          <div className="inline-flex flex-col items-center gap-4 mt-3">
            <span className="bg-[#AEFF02] text-[#0039C8] font-black text-[clamp(32px,5vw,64px)] leading-none tracking-tighter uppercase px-5 py-1.5 rounded-xl -rotate-2 select-none border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              2 Months In.
            </span>
            <p className="font-bold text-xs md:text-sm text-[#AEFF02] uppercase tracking-[0.15em] max-w-2xl mt-2">
              Not just a marketing agency. We refine every single detail to boost your business.
            </p>
          </div>
        </div>
      </section>

      {/* White Canvas Page Content */}
      <div className="w-full bg-white text-black rounded-t-[40px] overflow-hidden relative z-20 flex flex-col">
        
        {/* Core Philosophy Section */}
        <section className="w-full py-20 px-4 md:px-8 bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: About Intro */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block">
                // FOUNDED IN 2026 • UNDER 2 MONTHS OF RUTHLESS EXECUTION
              </span>
              <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none">
                More Than Just <br />
                A Marketing <span className="text-[#0039C8]">Agency.</span>
              </h2>
              <p className="font-semibold text-lg text-neutral-600 leading-relaxed">
                myracl. is not just a marketing agency—we are a growth partner. We align ourselves with your brand to refine every single detail, accelerating your business narrative for maximum market impact. Every step we take is engineered perfectly to boost your business.
              </p>
            </div>

            {/* Right: Brutalist Info Box */}
            <div className="lg:col-span-6 bg-neutral-50 border-4 border-black p-8 rounded-[32px] shadow-[8px_8px_0px_rgba(0,0,0,1)] flex flex-col gap-5">
              <div className="flex gap-4 items-center">
                <WobblyCrown size="w-12 h-12 text-[#0039C8] scroll-rotate" strokeWidth={8} />
                <div>
                  <span className="block font-black text-lg uppercase leading-none">Growth-First Compensation</span>
                  <span className="block text-xs font-semibold text-neutral-500 mt-1">We tie our retainers directly to performance milestones.</span>
                </div>
              </div>
              <p className="font-semibold text-sm text-neutral-500 leading-relaxed border-t border-neutral-200 pt-5">
                Launched recently with less than 2 months of operation, we bypass slow legacy workflows. Our Gen-Z team designs fast, builds interactive Next.js web systems, and tests paid traffic loops daily for immediate conversion response.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive R.A.C.L. Dashboard */}
        <section className="w-full py-20 px-4 md:px-8 bg-neutral-100 border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-3">• ACTIVE GROWTH TRACKER</span>
              <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
                Maximise Your <span className="text-[#0039C8]">Performance.</span>
              </h2>
              <p className="font-semibold text-sm text-neutral-400 uppercase mt-2">
                Click a pillar below to see how we maximize its metric capabilities.
              </p>
            </div>

            {/* Interactive Widget Container */}
            <div className="bg-white border-4 border-black rounded-[32px] shadow-[8px_8px_0px_rgba(0,0,0,1)] p-6 md:p-10 max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
              
              {/* Left Column: Tab Selectors */}
              <div className="lg:w-1/3 flex flex-row lg:flex-col gap-3 justify-between">
                {pillars.map((pillar) => {
                  const isActive = pillar.letter === activePillar;
                  return (
                    <button
                      key={pillar.letter}
                      onClick={() => setActivePillar(pillar.letter)}
                      className={`flex-grow flex items-center justify-between gap-4 p-4 rounded-2xl border-2 border-neutral-900 font-black uppercase text-sm tracking-wide transition-all shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] active:scale-95 cursor-pointer ${
                        isActive 
                          ? "bg-[#AEFF02] text-black hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]" 
                          : "bg-neutral-50 text-neutral-400 hover:bg-neutral-100"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-black text-[#AEFF02] flex items-center justify-center text-xs font-black">
                          {pillar.letter}
                        </span>
                        <span>{pillar.name}</span>
                      </span>
                      <span className="hidden sm:inline font-mono text-xs">→</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Dynamic Panel */}
              <div className="lg:w-2/3 bg-neutral-50 border-2 border-neutral-900 rounded-2xl p-6 md:p-8 flex flex-col justify-between gap-6 shadow-[inset_0px_4px_12px_rgba(0,0,0,0.06)]">
                
                {/* Heading & description */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-[#0039C8] tracking-widest uppercase">
                    // MAXIMIZING {activePillarData.name.toUpperCase()}
                  </span>
                  <h3 className="font-black text-2xl md:text-3xl uppercase tracking-tight">
                    {activePillarData.name} Pillar
                  </h3>
                  <p className="font-semibold text-xs text-neutral-500 leading-relaxed">
                    {activePillarData.summary}
                  </p>
                </div>

                {/* Growth Meter bar */}
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-black text-[10px] uppercase text-[#0039C8] tracking-wide">Maximization meter</span>
                    <span className="font-mono text-xs font-black text-black">{activePillarData.percentage}</span>
                  </div>
                  <div className="w-full h-5 bg-neutral-200 border-2 border-black rounded-lg overflow-hidden flex">
                    <div className={`${activePillarData.progress} bg-[#AEFF02] border-r-2 border-black h-full transition-all duration-500 ease-out`} />
                  </div>
                </div>

                {/* Before vs After stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-neutral-200 pt-5">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <span className="block font-black text-[9px] text-red-500 uppercase tracking-widest mb-1">Before partnering</span>
                    <span className="block font-bold text-xs text-neutral-600">{activePillarData.before}</span>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                    <span className="block font-black text-[9px] text-emerald-600 uppercase tracking-widest mb-1">{activePillarData.growth}</span>
                    <span className="block font-bold text-xs text-emerald-800 uppercase">{activePillarData.after}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* Team Grid section */}
        <section className="w-full py-20 px-4 md:px-8 bg-white border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-3">• THE CREATORS</span>
              <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
                Our <span className="text-[#0039C8]">Squad.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, i) => (
                <div 
                  key={i} 
                  className="bg-neutral-50 border-2 border-neutral-900 p-6 rounded-[24px] shadow-[3px_3px_0px_rgba(0,0,0,1)] flex flex-col gap-2 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <span className="text-[10px] font-bold text-[#0039C8] uppercase tracking-wider block">
                    // {member.role}
                  </span>
                  <h3 className="font-black text-lg uppercase tracking-tight">{member.title}</h3>
                  <p className="font-semibold text-xs text-neutral-500 leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full py-20 px-4 md:px-8 bg-[#0039C8] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none text-white">
              Ready to <span className="text-[#AEFF02]">partner</span> with us?
            </h2>
            <p className="font-bold text-base md:text-lg text-blue-100 max-w-xl">
              Let&apos;s build a roadmap call. We will outline your core narrative and growth pathways.
            </p>
            <Link 
              href="/#contact"
              className="inline-flex items-center px-8 py-4 bg-[#AEFF02] text-black font-black uppercase text-sm tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-95 transition-all"
            >
              Book a Call Now →
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
