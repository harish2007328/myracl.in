"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Track mouse coordinates directly on DOM without trigger React re-renders
    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      if (cursor.style.opacity === "0") {
        cursor.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      if (isClickable) {
        cursor.setAttribute("data-hover", "true");
      } else {
        cursor.removeAttribute("data-hover");
      }
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = "1";
    };

    // Initialize opacity to 0 until mouse moves
    cursor.style.opacity = "0";

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed left-0 top-0 pointer-events-none z-[99999] hidden md:block will-change-transform opacity-0 cursor-wrapper"
      style={{
        marginTop: "-1px",
        marginLeft: "-1px",
        transition: "transform 80ms cubic-bezier(0.25, 1, 0.5, 1), opacity 0.2s ease-in-out",
      }}
    >
      <style>{`
        .cursor-wrapper svg {
          transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .cursor-wrapper path {
          transition: fill 0.25s ease;
        }
        .cursor-wrapper[data-hover="true"] svg {
          transform: scale(1.2);
        }
        .cursor-wrapper[data-hover="true"] path {
          fill: #0039C8 !important;
        }
      `}</style>

      {/* Classic, sharp, pixel-perfect cursor arrow */}
      <svg
        width="34"
        height="38"
        viewBox="0 0 25 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: "drop-shadow(3px 3px 0px rgba(0,0,0,1))",
        }}
      >
        <path
          d="M 3,1 L 3,23 L 9,17 L 14,27 L 18,25 L 13,15 L 21,15 Z"
          fill="#AEFF02"
          stroke="#000000"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
      </svg>
    </div>
  );
}
