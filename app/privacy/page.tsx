"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
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

      document.documentElement.style.setProperty("--scroll-rotation", `${scrollY * 0.12}deg`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0039C8] text-white flex flex-col font-sans overflow-x-hidden select-none">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full text-center overflow-visible z-10 h-[400px] min-h-[350px] flex items-center justify-center pt-24">
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

          <span className="text-xs font-black tracking-[0.25em] text-[#AEFF02] uppercase block mb-3">
            // AGENCY COMPLIANCE & PRIVACY
          </span>
          <h1 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none text-white max-w-4xl mx-auto">
            Privacy Policy<span className="text-[#AEFF02]">.</span>
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="w-full bg-white rounded-t-[40px] overflow-hidden relative z-20 flex flex-col text-black">
        <section className="w-full py-20 px-4 md:px-8 bg-white border-b-4 border-black">
          <div className="max-w-4xl mx-auto flex flex-col gap-12">
            
            {/* Grid Layout of Privacy Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Card 1: Overview */}
              <div className="bg-[#191919] text-white border-4 border-black p-8 rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                <span className="text-[10px] font-bold text-[#AEFF02] uppercase tracking-wider block mb-2">
                  01. SCOPE OF SERVICES
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Digital Marketing Privacy</h3>
                <p className="font-semibold text-xs text-neutral-400 leading-relaxed uppercase">
                  This policy governs data handling across all myracl. agency services, including Brand Strategy, Performance Ads (Meta, Google, YouTube), Video Production, Web Design, and Local SEO. We ensure all campaigns comply with data-privacy and ethical-reach standards.
                </p>
              </div>

              {/* Card 2: Ad Arbitrage & Tracking */}
              <div className="bg-neutral-50 border-4 border-black p-8 rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                <span className="text-[10px] font-bold text-[#0039C8] uppercase tracking-wider block mb-2">
                  02. ADVERTISING DATA
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Campaign Auditing</h3>
                <p className="font-semibold text-xs text-neutral-500 leading-relaxed uppercase">
                  For paid media (Meta & Google campaigns), we utilize pixels, custom conversion funnels, and UTM parameters to measure return on ad spend (ROAS). We only analyze aggregate campaign footprints to optimize client target metrics.
                </p>
              </div>

              {/* Card 3: Lead Capture & Sheets Integration */}
              <div className="bg-neutral-50 border-4 border-black p-8 rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                <span className="text-[10px] font-bold text-[#0039C8] uppercase tracking-wider block mb-2">
                  03. LEAD PROCESSING
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Database Storage</h3>
                <p className="font-semibold text-xs text-neutral-500 leading-relaxed uppercase">
                  When you submit your email via our newsletter or query our AI assistant with contact details (email/phone), we store these specs in a secure Google Sheet database. This helps us follow up on bookings and send marketing insights.
                </p>
              </div>

              {/* Card 4: Web Portals & Geolocation */}
              <div className="bg-[#191919] text-white border-4 border-black p-8 rounded-[24px] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all">
                <span className="text-[10px] font-bold text-[#AEFF02] uppercase tracking-wider block mb-2">
                  04. TECHNICAL AUDITING
                </span>
                <h3 className="font-black text-2xl uppercase tracking-tight mb-4">Website Specs & GeoIP</h3>
                <p className="font-semibold text-xs text-neutral-400 leading-relaxed uppercase">
                  We collect browser details (screen size, language, referrer) and audit IP addresses to resolve geographical data (Country, State, City) and network ISP identity. This optimization maximizes local SEO performance.
                </p>
              </div>
            </div>

            {/* General Policy Sections */}
            <div className="bg-slate-50 border-4 border-black p-8 rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">
              <div>
                <h3 className="font-black text-xl uppercase tracking-tight mb-3">1. Client Campaign Management</h3>
                <p className="font-semibold text-sm text-neutral-600 leading-relaxed">
                  In performing brand strategy and lead generation, we act as both data controller and processor. Client metrics, advertising lists, and target demographics are handled within secure networks, never shared with third parties, and deleted upon project completion.
                </p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-black text-xl uppercase tracking-tight mb-3">2. User footprint & Cookies</h3>
                <p className="font-semibold text-sm text-neutral-600 leading-relaxed mb-4">
                  We use cookies and local parameters to customize your browsing experience, verify active chatbot sessions, and log consent status.
                </p>
                <div className="space-y-3 font-semibold text-xs text-neutral-500 pl-4">
                  <p>• <strong className="text-black uppercase">myracl-cookie-consent:</strong> Remembers your consent choice (accepted/declined) for 365 days.</p>
                  <p>• <strong className="text-black uppercase">myracl-user-email / myracl-user-phone:</strong> Caches user-provided contact info when typed in newsletter boxes or shared in chat log sessions to sync with our outreach database.</p>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <h3 className="font-black text-xl uppercase tracking-tight mb-3">3. Data Integrity & Safety</h3>
                <p className="font-semibold text-sm text-neutral-600 leading-relaxed">
                  Lead details and user information forwarded to our Google Sheet database are protected using Google&apos;s enterprise cloud security policies. We do not sell or lease your tracking metrics, email address, or phone details under any circumstances.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Footer CTA */}
        <section className="w-full py-20 px-4 md:px-8 bg-[#0039C8] text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-black text-4xl md:text-6xl uppercase tracking-tighter leading-none text-white">
              Any questions on your <span className="text-[#AEFF02]">data</span>?
            </h2>
            <p className="font-bold text-base md:text-lg text-blue-100 max-w-xl">
              Write to us at hello@myracl.in for any questions about data deletion, performance cookies, or campaigns.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 bg-[#AEFF02] text-black font-black uppercase text-sm tracking-wider rounded-xl border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:-translate-y-[2px] hover:shadow-[6px_6px_0px_rgba(0,0,0,1)] active:scale-95 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
