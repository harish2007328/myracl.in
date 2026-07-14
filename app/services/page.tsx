"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const detailedServices = [
  {
    id: "seo",
    num: "01",
    title: "Search Engine Optimization",
    tagline: "Organic Traffic & Rankings",
    description: "We optimize your search visibility, ranking authority, and organic traffic funnel. Our technical and content SEO framework drives long-term, high-intent customer acquisition.",
    scope: [
      "Technical SEO & Speed Audits",
      "Keyword Research & Mapping",
      "On-page Content Optimization"
    ],
    deliverables: [
      "SEO Audit & Strategic Roadmap",
      "Keyword Rankings Dashboard"
    ],
    process: [
      { step: "Phase 1: Audit", detail: "Crawling layout and finding bottlenecks." },
      { step: "Phase 2: Optimize", detail: "Tuning metadata, headings, and copy." },
      { step: "Phase 3: Rank", detail: "Building site authority and backlinks." }
    ],
    techStack: ["Search Console", "Ahrefs", "Semrush"]
  },
  {
    id: "strategy",
    num: "02",
    title: "Brand Strategy",
    tagline: "Identity & Guidelines",
    description: "We define your brand positioning, core messaging, and visual guidelines to translate business goals into bold, cohesive identity designs.",
    scope: [
      "Brand Audit & Analysis",
      "Logo & Visual Assets",
      "Style & Color Guidelines"
    ],
    deliverables: [
      "Strategy Dossier & Style Guide",
      "Complete Design Resource Package"
    ],
    process: [
      { step: "Phase 1: Discover", detail: "Deep dive interviews and research." },
      { step: "Phase 2: Define", detail: "Setting brand pillars & guidelines." },
      { step: "Phase 3: Design", detail: "Visual concept explorations & assets." }
    ],
    techStack: ["Figma", "Illustrator", "Miro"]
  },
  {
    id: "performance",
    num: "03",
    title: "Performance Ads",
    tagline: "Meta & Google Campaigns",
    description: "Paid acquisition campaign design, testing framework, and media buying execution across Meta, Google, and TikTok optimized for maximum ROAS.",
    scope: [
      "Targeting & Segmentation Setup",
      "High-Converting Copywriting",
      "A/B Testing & Bid Adjustments"
    ],
    deliverables: [
      "Active Account Architecture",
      "Weekly Reports & creative assets"
    ],
    process: [
      { step: "Phase 1: Audit", detail: "Finding conversion leaks in accounts." },
      { step: "Phase 2: Setup", detail: "Audience setup & tracking configurations." },
      { step: "Phase 3: Scale", detail: "Aggressively scaling winning creatives." }
    ],
    techStack: ["Meta Ads Manager", "Google Ads Manager", "Triple Whale"]
  },
  {
    id: "video",
    num: "04",
    title: "Video Production",
    tagline: "Commercials & Hooks",
    description: "High-production commercials, product shoots, and organic hooks scripted, filmed, and edited for social conversion.",
    scope: [
      "Concept development & Scripting",
      "Filming & Art Direction",
      "Editing & platform optimization"
    ],
    deliverables: [
      "1x Premium Brand Commercial",
      "10x Vertical Video Hooks (Reels/TikTok)"
    ],
    process: [
      { step: "Phase 1: Pre-Prod", detail: "Storyboarding and scripting hooks." },
      { step: "Phase 2: Production", detail: "Filming, lighting, and sound direction." },
      { step: "Phase 3: Post-Prod", detail: "High-impact conversion editing." }
    ],
    techStack: ["Premiere Pro", "DaVinci Resolve", "Sony Cine"]
  },
  {
    id: "website",
    num: "05",
    title: "Website Making",
    tagline: "Next.js & Interactive Dev",
    description: "Interactive, custom-designed web applications and optimized landing pages built super-fast with modern animations.",
    scope: [
      "Responsive UX/UI Design",
      "Interactive Frontend Code",
      "SEO & Core Web Vitals Tunings"
    ],
    deliverables: [
      "Custom Coded Web App",
      "Core Web Vitals 100 Score Page"
    ],
    process: [
      { step: "Phase 1: Design", detail: "User journeys & layout wireframes." },
      { step: "Phase 2: Build", detail: "Developing React/Tailwind frontend code." },
      { step: "Phase 3: Deploy", detail: "Hosting to Vercel with SEO checks." }
    ],
    techStack: ["Next.js", "Tailwind CSS", "Vercel"]
  },
  {
    id: "social",
    num: "06",
    title: "Social Growth",
    tagline: "Content Calendars & Loops",
    description: "Organic content engines built to scale impressions, build narratives, and foster active communities.",
    scope: [
      "Account Strategy & Calendar Plan",
      "Carousel Graphic Templates",
      "Community Engagement Hooks"
    ],
    deliverables: [
      "30-Day Grid Layout Planner",
      "DM Lead-Gen Automations (ManyChat)"
    ],
    process: [
      { step: "Phase 1: Research", detail: "Finding trending topics and keywords." },
      { step: "Phase 2: Create", detail: "Designing template grids & script hooks." },
      { step: "Phase 3: Automate", detail: "Setting up DM automation loops." }
    ],
    techStack: ["ManyChat", "Buffer", "Canva Pro"]
  }
];

export default function ServicesPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroGridRef = useRef<HTMLDivElement>(null);
  const hashtagRef = useRef<SVGSVGElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const wavyArrowRef = useRef<SVGSVGElement>(null);

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

      if (hashtagRef.current) {
        hashtagRef.current.style.transform = `rotate(${14 + scrollY * 0.12}deg)`;
      }
      if (arrowRef.current) {
        arrowRef.current.style.transform = `rotate(${140 - scrollY * 0.08}deg)`;
      }
      if (wavyArrowRef.current) {
        wavyArrowRef.current.style.transform = `rotate(${-30 + scrollY * 0.1}deg)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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

          {/* Hashtag Shape */}
          <svg
            ref={hashtagRef}
            className="absolute top-0 left-12 md:left-24 w-20 h-24 rotate-[14deg] pointer-events-none select-none hidden md:block transition-transform duration-100 ease-out"
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

          {/* Arrow Shape */}
          <svg
            ref={arrowRef}
            className="absolute top-0 right-12 md:right-24 w-28 h-32 rotate-[140deg] pointer-events-none select-none hidden md:block transition-transform duration-100 ease-out"
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
          <h1 className="font-black text-[clamp(36px,6vw,72px)] leading-[1.02] tracking-tighter uppercase text-white max-w-4xl">
            Core Services Of Our
          </h1>

          {/* Rotated Badge Row */}
          <div className="inline-flex items-center gap-3 mt-3">
            <span className="bg-[#AEFF02] text-[#0039C8] font-black text-[clamp(36px,6vw,72px)] leading-none tracking-tighter uppercase px-5 py-1.5 rounded-xl -rotate-2 select-none border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
              Agency
            </span>
          </div>
        </div>
      </section>

      {/* White Canvas Page Content */}
      <div className="w-full bg-white text-black rounded-t-[40px] overflow-hidden relative z-20 flex flex-col">
        
        {/* Expandable Grid Section */}
        <section className="w-full py-20 px-4 md:px-8 bg-neutral-50 border-b-4 border-black">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center mb-16">
              <span className="text-xs font-bold tracking-[0.2em] text-[#0039C8] uppercase block mb-3">• EXPLORE DETAILED CAPABILITIES</span>
              <h2 className="font-black text-3xl md:text-5xl uppercase tracking-tighter leading-none">
                Core <span className="text-[#0039C8]">Expertise.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {detailedServices.map((service) => {
                const isExpanded = expandedId === service.id;
                return (
                  <div 
                    key={service.id}
                    className="bg-white border-2 border-neutral-900 rounded-[24px] p-6 shadow-[4px_4px_0px_rgba(0,0,0,1)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0px_rgba(0,0,0,1)]"
                  >
                    <div className="flex flex-col gap-4">
                      {/* Card Header */}
                      <div className="flex items-center justify-between border-b-2 border-neutral-100 pb-3">
                        <span className="font-mono text-sm font-black text-[#0039C8]">
                          {service.num}
                        </span>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-neutral-100 px-2.5 py-1 rounded-md border border-neutral-200">
                          {service.tagline}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-black text-2xl uppercase tracking-tight">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="font-semibold text-xs text-neutral-500 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Expanded Content with Grid-style Details */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t-2 border-dashed border-neutral-200 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
                          {/* Scope & Deliverables columns */}
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <span className="block font-black text-[10px] uppercase tracking-wider text-[#0039C8] mb-1.5">• Scope</span>
                              <ul className="space-y-1">
                                {service.scope.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-2 font-semibold text-neutral-600 text-[11px]">
                                    <span className="w-1.5 h-1.5 bg-[#AEFF02] border border-black rounded-full shrink-0" />
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <span className="block font-black text-[10px] uppercase tracking-wider text-[#0039C8] mb-1.5">• Deliverables</span>
                              <ul className="space-y-1">
                                {service.deliverables.map((item, idx) => (
                                  <li key={idx} className="flex items-center gap-2 font-semibold text-neutral-600 text-[11px]">
                                    <span className="text-[#0039C8] font-bold">✓</span>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Methodology Process */}
                          <div>
                            <span className="block font-black text-[10px] uppercase tracking-wider text-[#0039C8] mb-2">• Process</span>
                            <div className="space-y-2">
                              {service.process.map((step, idx) => (
                                <div key={idx} className="bg-neutral-50 border border-neutral-200 p-2.5 rounded-xl flex flex-col gap-0.5">
                                  <span className="font-black text-[9px] text-[#0039C8] uppercase tracking-widest">
                                    {step.step}
                                  </span>
                                  <p className="font-semibold text-[10px] text-neutral-500 leading-normal">
                                    {step.detail}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech stack */}
                          <div>
                            <span className="block font-black text-[10px] uppercase tracking-wider text-neutral-400 mb-1.5">• Tools</span>
                            <div className="flex flex-wrap gap-1.5">
                              {service.techStack.map((tech, idx) => (
                                <span key={idx} className="font-mono text-[9px] font-bold uppercase bg-black text-[#AEFF02] px-2 py-0.5 rounded-md">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Toggle Button */}
                    <button 
                      onClick={() => toggleExpand(service.id)}
                      className={`w-full mt-6 py-2.5 rounded-xl border-2 border-neutral-900 font-black uppercase text-[10px] tracking-wider transition-all duration-200 shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer ${
                        isExpanded 
                          ? "bg-white text-black hover:bg-neutral-50" 
                          : "bg-[#AEFF02] text-black hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_rgba(0,0,0,1)]"
                      }`}
                    >
                      {isExpanded ? "Collapse Details -" : "Explore Details +"}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full py-20 px-4 md:px-8 bg-[#0039C8] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none text-white">
              Ready to <span className="text-[#AEFF02]">scale</span> your narrative?
            </h2>
            <p className="font-bold text-base md:text-lg text-blue-100 max-w-xl">
              Book a 15-minute roadmap call to define your positioning and discover growth pathways.
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
