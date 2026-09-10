"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Brain, Layers, Terminal } from "lucide-react";
import TechIcon from "@/components/ui/TechIcon";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { skillCategories } from "@/data/portfolioData";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "neurology":
        return <Brain className="w-5 h-5 text-[#865130]" />;
      case "dns":
        return <Layers className="w-5 h-5 text-[#865130]" />;
      case "terminal":
        return <Terminal className="w-5 h-5 text-[#865130]" />;
      default:
        return <Brain className="w-5 h-5 text-[#865130]" />;
    }
  };

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Section header entrance
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

      // Staggered category cards entrance and pill badges micro-stagger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsGridRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".skill-category-card", {
        y: 45,
        opacity: 0,
        duration: 0.85,
        stagger: 0.16,
        clearProps: "all",
      }).from(
        ".skill-badge-item",
        {
          y: 12,
          opacity: 0,
          scale: 0.94,
          stagger: 0.02,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.4"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-14 md:py-20 bg-[#f5f3f0]/60 border-b border-[#ccc6bd]/60"
      id="skills"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-12 max-w-2xl">
          <span className="font-sans text-[11px] text-[#865130] uppercase tracking-widest block mb-2 font-semibold">
            Technical Architecture
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] text-[#050504] font-normal">
            Skills &amp; Tools
          </h2>
          <p className="font-sans text-[15px] text-[#4a4640] mt-2">
            Technologies and frameworks I build with on production pipelines.
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {skillCategories.map((cat, idx) => (
            <div
              key={idx}
              className="skill-category-card h-full transition-transform duration-300 hover:-translate-y-1.5"
            >
              <SpotlightCard className="bg-white border border-[#ccc6bd] rounded-2xl p-6 warm-card-shadow flex flex-col justify-start gap-4 group h-full">
                {/* Category Header */}
                <div className="border-b border-[#ccc6bd]/40 pb-3.5">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-lg bg-[#f5f3f0] group-hover:bg-[#efeeeb] transition-colors border border-[#ccc6bd]/30 shadow-2xs">
                      {getCategoryIcon(cat.icon)}
                    </div>
                    <h3 className="font-display text-[21px] text-[#050504] font-medium">
                      {cat.title}
                    </h3>
                  </div>
                  <p className="font-sans text-[13px] text-[#7b766f]">
                    {cat.subtitle}
                  </p>
                </div>

                {/* Structured 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {cat.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className="skill-badge-item group/item flex items-center gap-2 px-2.5 py-2 rounded-xl bg-[#f5f3f0]/70 border border-[#ccc6bd]/60 hover:border-[#865130] hover:bg-white hover:shadow-2xs transition-all duration-200 cursor-default min-w-0 hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95"
                      title={skill.name}
                    >
                      <div className="p-1 rounded-md bg-white group-hover/item:bg-[#f5f3f0] border border-[#ccc6bd]/30 shrink-0 shadow-2xs transition-colors flex items-center justify-center">
                        <TechIcon name={skill.name} className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <span className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#1b1c1a] group-hover/item:text-[#865130] truncate transition-colors min-w-0">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
