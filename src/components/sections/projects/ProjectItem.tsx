"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import TechIcon from "@/components/ui/TechIcon";
import type { ProjectItem as ProjectData } from "@/data/portfolioData";

interface ProjectItemProps {
  project: ProjectData;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);

  const isEven = index % 2 === 0;
  const projectNumber = String(index + 1).padStart(2, "0");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const item = itemRef.current;
      const visual = visualRef.current;
      const info = infoRef.current;
      const img = imageInnerRef.current;
      if (!item || !visual || !info) return;

      // 1. Converging 3D ScrollTrigger Entrance (Kiri & Kanan saling mendekat)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 78%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      });

      // Visual Mockup Card entrance (from its respective side with 3D angle)
      tl.from(visual, {
        x: isEven ? -65 : 65,
        y: 45,
        rotationY: isEven ? -12 : 12,
        rotationX: 6,
        scale: 0.93,
        opacity: 0,
        duration: 1.05,
        clearProps: "transform,opacity",
      })
        // Information Column entrance (from the opposite side)
        .from(
          info,
          {
            x: isEven ? 55 : -55,
            y: 35,
            opacity: 0,
            duration: 0.9,
            clearProps: "transform,opacity",
          },
          "-=0.75"
        )
        // Project Title Slide
        .from(
          info.querySelector(".project-title"),
          {
            y: 22,
            opacity: 0,
            duration: 0.65,
            clearProps: "all",
          },
          "-=0.55"
        )
        // Tech stack pills cascade
        .from(
          info.querySelectorAll(".project-tech-pill"),
          {
            scale: 0.88,
            y: 12,
            opacity: 0,
            stagger: 0.04,
            duration: 0.45,
            ease: "back.out(1.6)",
            clearProps: "all",
          },
          "-=0.4"
        )
        // Action buttons entrance
        .from(
          info.querySelectorAll(".project-action-btn"),
          {
            scale: 0.92,
            y: 14,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
            ease: "power2.out",
            clearProps: "all",
          },
          "-=0.3"
        );

      // 2. Subtle Parallax on Image while scrolling through
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -3 },
          {
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Interactive 3D Tilt on Hover of the Visual Container
      const xTo = gsap.quickTo(visual, "rotationY", {
        duration: 0.45,
        ease: "power2.out",
      });
      const yTo = gsap.quickTo(visual, "rotationX", {
        duration: 0.45,
        ease: "power2.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = visual.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        xTo(mouseX * 8);
        yTo(-mouseY * 8);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      visual.addEventListener("mousemove", handleMouseMove);
      visual.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        visual.removeEventListener("mousemove", handleMouseMove);
        visual.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: itemRef }
  );

  return (
    <div
      ref={itemRef}
      className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 lg:gap-18 items-center"
      style={{ perspective: "1400px" }}
    >
      {/* Image Preview Container (Alternating via md:order) */}
      <div
        ref={visualRef}
        className={`md:col-span-7 will-change-transform transform-gpu ${
          isEven ? "md:order-1" : "md:order-2"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#181716] border border-[#ccc6bd]/70 shadow-[0_12px_36px_-8px_rgba(110,89,70,0.12)] hover:shadow-[0_24px_52px_-12px_rgba(134,81,48,0.22)] hover:border-[#865130] transition-all duration-500">
          {/* High Quality Project Visual showing 100% full without cropping */}
          {project.primaryButton?.url && project.primaryButton.url !== "#" ? (
            <a
              href={project.primaryButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden cursor-pointer"
              title={`Open ${project.title}`}
            >
              <img
                ref={imageInnerRef}
                src={project.image}
                alt={project.title}
                className="w-full h-auto block object-contain group-hover:scale-[1.015] transition-transform duration-500 ease-out will-change-transform"
                loading="lazy"
              />
            </a>
          ) : (
            <div className="overflow-hidden">
              <img
                ref={imageInnerRef}
                src={project.image}
                alt={project.title}
                className="w-full h-auto block object-contain group-hover:scale-[1.015] transition-transform duration-500 ease-out will-change-transform"
                loading="lazy"
              />
            </div>
          )}

          {/* Floating Highlight Badge */}
          {project.highlightBadge && (
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1b1c1a]/85 backdrop-blur-md text-[#fbf9f6] text-[11px] font-mono tracking-wider border border-white/15 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#f08a46]" />
              <span>{project.highlightBadge}</span>
            </div>
          )}
        </div>
      </div>

      {/* Information & Details Container (Alternating via md:order) */}
      <div
        ref={infoRef}
        className={`md:col-span-5 flex flex-col justify-center will-change-transform transform-gpu ${
          isEven ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Index Identifier & Category */}
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[12px] text-[#865130] font-semibold">
            {projectNumber} //
          </span>
          <span className="font-sans text-[11.5px] uppercase tracking-widest text-[#865130] font-semibold">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="project-title font-display text-[30px] md:text-[36px] text-[#050504] font-medium mb-3.5 leading-tight hover:text-[#865130] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-[15px] md:text-[15.5px] text-[#4a4640] leading-relaxed mb-6">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((t, tIdx) => (
            <span
              key={tIdx}
              className="project-tech-pill inline-flex items-center gap-1.5 bg-[#f5f3f0] hover:bg-[#efeeeb] px-3 py-1.5 rounded-xl text-[#1b1c1a] font-sans text-[12.5px] font-medium border border-[#ccc6bd]/60 transition-colors cursor-default"
            >
              <TechIcon name={t} className="w-3.5 h-3.5 shrink-0" />
              <span>{t}</span>
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3.5 pt-2">
          {project.primaryButton && (
            <a
              href={project.primaryButton.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1f1e1d] hover:bg-[#865130] text-[#fbf9f6] text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>{project.primaryButton.label}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}

          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-action-btn inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#f5f3f0] text-[#050504] hover:text-[#865130] text-[13px] font-medium border border-[#ccc6bd] hover:border-[#865130] transition-all duration-200 shadow-2xs hover:scale-105 active:scale-95"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
