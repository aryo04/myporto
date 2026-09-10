"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Split headline text into words for cinematic mask reveal
  const headlineWords = `Hi, I'm ${personalInfo.name}`.split(" ");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.from(badgeRef.current, {
        y: -18,
        opacity: 0,
        scale: 0.92,
        duration: 0.65,
        clearProps: "all",
      })
        .from(
          ".hero-title-word",
          {
            y: "115%",
            opacity: 0,
            rotationX: 12,
            stagger: 0.045,
            duration: 0.8,
            clearProps: "transform,opacity",
          },
          "-=0.35"
        )
        .from(
          roleRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            clearProps: "all",
          },
          "-=0.45"
        )
        .from(
          bioRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
            clearProps: "all",
          },
          "-=0.45"
        )
        .from(
          ".hero-cta-btn",
          {
            y: 18,
            opacity: 0,
            scale: 0.96,
            stagger: 0.1,
            duration: 0.6,
            clearProps: "all",
          },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      className="pt-16 md:pt-28 pb-16 md:pb-24 max-w-[1200px] mx-auto px-5 md:px-12 text-center"
      id="hero"
    >
      <div
        ref={containerRef}
        className="max-w-3xl mx-auto flex flex-col items-center space-y-6"
      >
        {/* Welcome Badge */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2 bg-[#f5f3f0] border border-[#ccc6bd]/80 rounded-full px-4 py-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#865130]" />
          <span className="font-sans text-[12px] text-[#865130] font-semibold tracking-wide">
            Welcome to my portfolio
          </span>
        </div>

        {/* Main Name & Title */}
        <div className="space-y-3">
          <h1 className="font-display text-[48px] sm:text-[62px] md:text-[74px] text-[#050504] leading-[1.05] font-normal tracking-tight">
            {headlineWords.map((word, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden pb-1 mr-[0.25em] last:mr-0 align-bottom"
              >
                <span className="hero-title-word inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h1>
          <p
            ref={roleRef}
            className="font-display text-[24px] sm:text-[30px] md:text-[34px] text-[#865130] font-normal leading-snug"
          >
            {personalInfo.role}
          </p>
        </div>

        {/* Punchy Bio */}
        <p
          ref={bioRef}
          className="font-sans text-[17px] md:text-[19px] text-[#4a4640] max-w-2xl leading-relaxed mx-auto"
        >
          {personalInfo.bio}
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <a
            href="#projects"
            className="hero-cta-btn h-11 px-6 rounded-full bg-[#1f1e1d] text-[#fbf9f6] hover:bg-[#865130] hover:scale-105 active:scale-95 font-sans text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center shadow-sm gap-2"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="hero-cta-btn h-11 px-6 rounded-full bg-white text-[#050504] border border-[#ccc6bd] hover:border-[#865130] hover:text-[#865130] hover:scale-105 active:scale-95 font-sans text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center shadow-xs"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
