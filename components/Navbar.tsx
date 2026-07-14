"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate dynamic threshold based on viewport height minus header height
      const threshold = window.innerHeight - 76;

      // 1. Morph into shrunk floating size only after crossing the Hero section
      setIsScrolled(currentScrollY > threshold);

      // 2. Determine visibility (scrolling up vs scrolling down)
      if (currentScrollY <= threshold) {
        // Always visible and full-width while inside the Hero section
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down past Hero: hide the header
        setIsVisible(false);
      } else {
        // Scrolling up past Hero: show the header
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Compute classes dynamically based on states (border-transparent applied for all states to remove outer outline)
  let headerClass = "fixed left-1/2 -translate-x-1/2 z-50 bg-[#0039C8] px-6 md:px-10 border-solid border-4 border-transparent shadow-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]";

  if (!isScrolled) {
    // Inside Hero: full-width, transparent border, visible at top-0
    headerClass += " top-0 w-full max-w-full py-5 rounded-none";
  } else if (isVisible) {
    // Past Hero & scrolling up: floating card flush at top-0 (rounded bottom only, no border, no shadow)
    headerClass += " top-0 w-[92%] max-w-7xl py-3.5 rounded-b-[20px] rounded-t-none";
  } else {
    // Past Hero & scrolling down: slide up out of viewport
    headerClass += " top-[-150px] w-[92%] max-w-7xl py-3.5 rounded-b-[20px] rounded-t-none";
  }

  return (
    <header className={headerClass} role="banner">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6" aria-label="Main Navigation">

        {/* Wordmark Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="myracl. — Home">
          <Image
            src="/logo.png"
            alt="myracl. wordmark"
            width={140}
            height={40}
            priority
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Pill Nav Menu (Transparent text links, no bg fill, no borders) */}
        <ul className="hidden md:flex items-center gap-6 list-none m-0 p-0" role="list">
          <li>
            <Link
              href="/services"
              className="inline-block text-white/80 hover:text-white font-black uppercase text-[11px] tracking-wider transition-colors duration-200 select-none"
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="inline-block text-white/80 hover:text-white font-black uppercase text-[11px] tracking-wider transition-colors duration-200 select-none"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              href="/#works"
              className="inline-block text-white/80 hover:text-white font-black uppercase text-[11px] tracking-wider transition-colors duration-200 select-none"
            >
              Works
            </Link>
          </li>
          <li>
            <Link
              href="/#testimonials"
              className="inline-block text-white/80 hover:text-white font-black uppercase text-[11px] tracking-wider transition-colors duration-200 select-none"
            >
              Testimonials
            </Link>
          </li>
          <li>
            <Link
              href="/#contact"
              className="inline-block text-white/80 hover:text-white font-black uppercase text-[11px] tracking-wider transition-colors duration-200 select-none"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* CTA Button (Vibrant Neo-Brutalist Focus Point) */}
        <Link
          href="/#contact"
          className="inline-flex items-center px-6 py-2.5 bg-[#AEFF02] text-black font-black uppercase text-[11px] tracking-wider rounded-xl border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:-translate-y-[1px] hover:translate-x-[-1px] hover:shadow-[4px_4px_0px_rgba(0,0,0,1)] active:scale-95 transition-all duration-200 select-none"
          id="nav-cta-btn"
        >
          Get a Quote
        </Link>
      </nav>
    </header>
  );
}
