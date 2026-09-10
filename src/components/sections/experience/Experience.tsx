"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { experiences } from "@/data/portfolioData";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Section header entrance animation
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

      // Individual Card-by-Card ScrollTrigger Animation (Dimunculkan 1 per 1 saat di-scroll)
      const cardElements = gsap.utils.toArray<HTMLElement>(".experience-card-item");

      cardElements.forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            toggleActions: "play none none none",
          },
          defaults: { ease: "power3.out" },
        });

        // 1. Card container enters with 3D perspective depth and scale
        tl.from(card, {
          y: 60,
          opacity: 0,
          rotationX: 10,
          scale: 0.95,
          duration: 0.85,
          clearProps: "transform,opacity",
        })
          // 2. Role and company header slide in
          .from(
            card.querySelectorAll(".exp-header-text"),
            {
              x: -18,
              opacity: 0,
              duration: 0.5,
              clearProps: "all",
            },
            "-=0.55"
          )
          // 3. Badges pop with spring bounce
          .from(
            card.querySelectorAll(".exp-badge"),
            {
              scale: 0.86,
              opacity: 0,
              stagger: 0.08,
              duration: 0.45,
              ease: "back.out(1.5)",
              clearProps: "all",
            },
            "-=0.4"
          )
          // 4. Bullet points reveal one by one in succession!
          .from(
            card.querySelectorAll(".exp-bullet-item"),
            {
              x: -20,
              opacity: 0,
              stagger: 0.09,
              duration: 0.55,
              ease: "power2.out",
              clearProps: "all",
            },
            "-=0.35"
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 bg-[#f5f3f0]/50 border-y border-[#ccc6bd]/50"
      id="experience"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <div ref={headerRef} className="mb-14 max-w-2xl">
          <span className="font-sans text-[11px] text-[#865130] uppercase tracking-widest block mb-2 font-semibold">
            My Journey
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] text-[#050504] font-normal">
            Experience &amp; Programs
          </h2>
          <p className="font-sans text-[15px] text-[#4a4640] mt-1">
            Hands-on engineering roles, institutional software delivery, and competitive cohorts.
          </p>
        </div>

        {/* Experience Cards Container with 3D perspective */}
        <div
          ref={cardsContainerRef}
          className="space-y-7"
          style={{ perspective: "1200px" }}
        >
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="experience-card-item will-change-transform transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <ExperienceCard experience={exp} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
