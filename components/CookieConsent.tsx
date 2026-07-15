"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if consent has already been given
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("myracl-cookie-consent="));

    if (!consent) {
      // Delay showing it slightly for smooth UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = async (status: "accepted" | "declined") => {
    // Set cookie
    document.cookie = `myracl-cookie-consent=${status}; path=/; max-age=31536000; SameSite=Lax`;
    setIsVisible(false);

    try {
      // Read email and phone from cookies if they exist
      const getCookie = (name: string) => {
        const match = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
        return match ? decodeURIComponent(match.split("=")[1]) : undefined;
      };

      const email = getCookie("myracl-user-email");
      const phone = getCookie("myracl-user-phone");

      // Gather client information
      const clientInfo = {
        language: navigator.language || "",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
        referrer: document.referrer || "",
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        consentStatus: status,
        email,
        phone,
      };

      // Send to our backend API to enrich with server info and send to Google Sheet
      await fetch("/api/track-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clientInfo),
      });
    } catch (error) {
      console.error("Failed to send tracking data:", error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9998] max-w-sm sm:max-w-md bg-white border-4 border-black p-6 rounded-[24px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] select-none animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex flex-col gap-4 text-black">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍪</span>
          <h3 className="font-black text-lg uppercase tracking-tight">Cookie Consent</h3>
        </div>
        <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider leading-relaxed">
          We use cookies to analyze site traffic, personalize content, and improve your experience. 
          Read our{" "}
          <Link href="/privacy" className="text-[#0039C8] underline font-black hover:text-[#AEFF02] transition-colors">
            Privacy Policy
          </Link>{" "}
          to learn more.
        </p>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleConsent("accepted")}
            className="flex-1 bg-[#AEFF02] text-black font-black text-xs uppercase tracking-wider py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 transition-all duration-200 cursor-pointer text-center"
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={() => handleConsent("declined")}
            className="bg-white text-black font-black text-xs uppercase tracking-wider py-3 px-5 rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] active:scale-95 transition-all duration-200 cursor-pointer text-center"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
