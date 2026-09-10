"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { UserCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { personalInfo } from "@/data/portfolioData";
import InteractiveTerminal from "./InteractiveTerminal";

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const narrativeCardRef = useRef<HTMLDivElement>(null);
  const terminalCardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const titleChars = "About Me".split("");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Cinematic 3D Gate & Reveal Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Left Card 3D Swing & Entrance
      tl.from(narrativeCardRef.current, {
        x: -45,
        y: 35,
        rotationY: -12,
        rotationX: 6,
        opacity: 0,
        duration: 0.95,
        clearProps: "transform,opacity",
      })
        // Title Character-by-character 3D flip-up
        .from(
          ".about-title-char",
          {
            y: "125%",
            rotationX: 45,
            opacity: 0,
            stagger: 0.035,
            duration: 0.75,
            ease: "back.out(1.8)",
            clearProps: "transform,opacity",
          },
          "-=0.65"
        )
        // Story paragraph smooth cascade
        .from(
          ".about-story-p",
          {
            y: 22,
            opacity: 0,
            duration: 0.7,
            stagger: 0.12,
            clearProps: "all",
          },
          "-=0.45"
        )
        // Right Terminal 3D Swing & Power-Up Scale
        .from(
          terminalCardRef.current,
          {
            x: 45,
            y: 35,
            rotationY: 12,
            rotationX: 6,
            scale: 0.93,
            opacity: 0,
            duration: 1,
            clearProps: "transform,opacity",
          },
          "-=0.85"
        );

      // 2. Interactive 3D Parallax Tilt with Mouse
      const section = sectionRef.current;
      const leftCard = narrativeCardRef.current;
      const rightCard = terminalCardRef.current;
      const glow = glowRef.current;
      if (!section || !leftCard || !rightCard) return;

      const leftRotateX = gsap.quickTo(leftCard, "rotationX", {
        duration: 0.5,
        ease: "power2.out",
      });
      const leftRotateY = gsap.quickTo(leftCard, "rotationY", {
        duration: 0.5,
        ease: "power2.out",
      });
      const rightRotateX = gsap.quickTo(rightCard, "rotationX", {
        duration: 0.5,
        ease: "power2.out",
      });
      const rightRotateY = gsap.quickTo(rightCard, "rotationY", {
        duration: 0.5,
        ease: "power2.out",
      });
      const glowX = glow
        ? gsap.quickTo(glow, "x", { duration: 0.65, ease: "power2.out" })
        : null;
      const glowY = glow
        ? gsap.quickTo(glow, "y", { duration: 0.65, ease: "power2.out" })
        : null;

      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (!isFinePointer) return;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = section.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle, high-end 3D perspective response
        leftRotateX(-mouseY * 7);
        leftRotateY(mouseX * 7);
        rightRotateX(-mouseY * 5);
        rightRotateY(mouseX * 5);

        if (glowX && glowY) {
          glowX(mouseX * 50);
          glowY(mouseY * 50);
        }
      };

      const handleMouseLeave = () => {
        leftRotateX(0);
        leftRotateY(0);
        rightRotateX(0);
        rightRotateY(0);
        if (glowX && glowY) {
          glowX(0);
          glowY(0);
        }
      };

      section.addEventListener("mousemove", handleMouseMove);
      section.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        section.removeEventListener("mousemove", handleMouseMove);
        section.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20 bg-white/75 backdrop-blur-[2px] border-y border-[#ccc6bd]/60 overflow-hidden relative"
      style={{ perspective: "1400px" }}
      id="about"
    >

      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* About Narrative Column (6 Cols) with 3D Tilt */}
          <div
            ref={narrativeCardRef}
            className="lg:col-span-6 will-change-transform transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <SpotlightCard className="bg-[#fbf9f6] rounded-2xl p-7 md:p-10 border border-[#ccc6bd]/80 warm-card-shadow flex flex-col justify-center transition-shadow duration-300 hover:shadow-[0_20px_45px_-12px_rgba(134,81,48,0.18)]">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-[#865130]" />
                <span className="text-[11px] font-mono tracking-widest text-[#865130] uppercase font-semibold">
                  BACKGROUND &amp; PROFILE
                </span>
              </div>

              {/* Masked 3D Flip-up Title */}
              <h2 className="font-display text-[32px] md:text-[42px] text-[#050504] font-normal mb-5 leading-tight overflow-hidden">
                {titleChars.map((char, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom"
                  >
                    <span className="about-title-char inline-block will-change-transform">
                      {char === " " ? "\u00A0" : char}
                    </span>
                  </span>
                ))}
              </h2>

              <p className="about-story-p font-sans text-[16px] md:text-[18px] text-[#4a4640] leading-relaxed mb-4">
                {personalInfo.aboutStory}
              </p>
              <p className="about-story-p font-sans text-[14px] md:text-[15px] text-[#7b766f] leading-relaxed border-t border-[#ccc6bd]/40 pt-4">
                Focused on building practical AI and web solutions, from developing machine learning models and integrating LLMs to deploying functional applications for real-world use cases.
              </p>
            </SpotlightCard>
          </div>

          {/* Automated Auto-Typing Q&A Terminal Column (6 Cols) with Scan-beam & 3D Tilt */}
          <div
            ref={terminalCardRef}
            className="lg:col-span-6 flex justify-center w-full will-change-transform transform-gpu relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <InteractiveTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
