"use client";

import React, { useEffect, useState } from "react";
import { WobblyArrow } from "./DecorativeShapes";

export default function BookingSection() {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    const initCal = () => {
      // @ts-ignore
      (function (C, A, L) {
        // @ts-ignore
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        // @ts-ignore
        C.Cal = C.Cal || function () {
          // @ts-ignore
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            // @ts-ignore
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              // @ts-ignore
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              // @ts-ignore
              cal.ns[namespace] = cal.ns[namespace] || api;
              // @ts-ignore
              p(cal.ns[namespace], ar);
              // @ts-ignore
              p(cal, ["initNamespace", namespace]);
            } else {
              // @ts-ignore
              p(cal, ar);
            }
            return;
          }
          // @ts-ignore
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      // @ts-ignore
      if (window.Cal) {
        // @ts-ignore
        window.Cal("init", "15min", { origin: "https://app.cal.com" });
        // @ts-ignore
        window.Cal.config = window.Cal.config || {};
        // @ts-ignore
        window.Cal.config.forwardQueryParams = true;

        // @ts-ignore
        window.Cal.ns["15min"]("inline", {
          elementOrSelector: "#my-cal-inline-15min",
          config: { 
            layout: "month_view", 
            useSlotsViewOnSmallScreen: "true",
            theme: "dark",
            hideEventTypeDetails: true
          },
          calLink: "myracl.in/15min",
        });

        // @ts-ignore
        window.Cal.ns["15min"]("ui", { 
          hideEventTypeDetails: true, 
          layout: "month_view",
          theme: "dark"
        });
      }
    };

    initCal();
  }, []);

  return (
    <section id="contact" className="relative w-full bg-[#0039C8] text-white py-24 px-4 md:px-8 border-t-4 border-black border-b-4 border-black overflow-hidden z-10">
      {/* Grid Background Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 95%)",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 95%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Wobbly Arrow pointing from description text to Cal.com iframe */}
        <WobblyArrow
          className="hidden lg:block absolute left-[45%] top-[25%] -translate-y-1/2 rotate-[25deg] z-20 scroll-rotate"
          color="#AEFF02"
          size="w-24 h-24"
          strokeWidth={12}
        />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text description */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#AEFF02] uppercase block mb-4">• Live Booking</span>
            <h2 className="font-black text-[clamp(50px,8.5vw,115px)] leading-[0.85] tracking-tighter uppercase text-white mb-6">
              Book a <span className="text-[#AEFF02]">Call.</span>
            </h2>
            <p className="font-bold text-xl sm:text-2xl md:text-[25px] lg:text-[27px] text-blue-100/90 uppercase tracking-tight leading-normal max-w-xl">
              Select a date on the calendar to set a meeting and schedule when you want to talk. We&apos;ll outline your brand narrative and growth roadmap in a quick 15-minute call.
            </p>
          </div>

          {/* Right Column: Embedded Cal.com with smaller width */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-[500px] relative group/cal"
              onMouseLeave={() => setIsActive(false)}
            >
              <div 
                id="my-cal-inline-15min" 
                className="w-full h-[580px] border-4 border-black rounded-[24px] bg-neutral-900 overflow-y-auto overflow-x-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)]"
              />
              
              {!isActive && (
                <div 
                  onMouseDown={() => setIsActive(true)}
                  className="absolute inset-0 bg-transparent rounded-[24px] z-20 cursor-pointer"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
