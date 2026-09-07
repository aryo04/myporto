"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  leftAccent?: boolean;
}

export default function SpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(134, 81, 48, 0.08)",
  leftAccent = false,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Ambient Spotlight Glow Layer */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-inherit z-0"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {/* Left Edge Accent Indicator & Radiant Ambient Glow on Hover */}
      {leftAccent && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#965c37] via-[#865130] to-[#6e3f22] rounded-l-2xl opacity-0 group-hover:opacity-100 scale-y-75 group-hover:scale-y-100 transition-all duration-300 z-20 origin-center" />
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-[#865130]/12 via-[#865130]/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0" />
        </>
      )}
      <div className="relative z-10 w-full h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
