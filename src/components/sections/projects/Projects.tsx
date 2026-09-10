"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/portfolioData";
import ProjectItem from "./ProjectItem";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(headerRef.current, {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 max-w-[1200px] mx-auto px-5 md:px-12 overflow-hidden"
      id="projects"
    >
      {/* Section Header */}
      <div
        ref={headerRef}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24"
      >
        <div>
          <span className="font-sans text-[11px] text-[#865130] uppercase tracking-widest block mb-2 font-semibold">
            Featured Works
          </span>
          <h2 className="font-display text-[32px] md:text-[44px] text-[#050504] font-normal leading-tight">
            Selected Projects
          </h2>
          <p className="font-sans text-[15px] md:text-[16px] text-[#4a4640] mt-2 max-w-2xl">
            A selection of AI and web applications built across full-stack development, machine learning, and computer vision.
          </p>
        </div>
        <div className="mt-4 md:mt-0 shrink-0">
          <span className="font-mono text-[13px] text-[#7b766f] bg-[#f5f3f0] px-4 py-2 rounded-full border border-[#ccc6bd]/60 shadow-2xs">
            {projects.length} Projects / 2025–2026
          </span>
        </div>
      </div>

      {/* 1-by-1 Alternating (Kiri Kanan) Project List with GSAP 3D ScrollTrigger */}
      <div className="space-y-24 md:space-y-36">
        {projects.map((proj, idx) => (
          <ProjectItem key={proj.id} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}
