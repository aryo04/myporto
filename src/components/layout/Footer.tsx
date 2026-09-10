"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { personalInfo } from "@/data/portfolioData";

function MagneticItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // Fast, responsive spring translation towards mouse
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (clientX - centerX) * 0.28;
      const deltaY = (clientY - centerY) * 0.28;
      xTo(deltaX);
      yTo(deltaY);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={itemRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandColRef = useRef<HTMLDivElement>(null);
  const linksColRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from([brandColRef.current, linksColRef.current], {
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
        },
        y: 28,
        opacity: 0,
        duration: 0.75,
        stagger: 0.14,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      className="w-full bg-white border-t border-[#ccc6bd]/60 transition-all duration-200 ease-out"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Brand & Copyright Column */}
        <div ref={brandColRef} className="flex flex-col space-y-2.5 max-w-md">
          <span className="font-display text-[24px] text-[#050504] font-medium tracking-tight">
            ArDK
          </span>
          <p className="font-sans text-[13px] text-[#4a4640] leading-relaxed">
            Informatics graduate from Gunadarma University, focused on building AI-powered applications and modern web experiences across machine learning, computer vision, and full-stack development.
          </p>
          <p className="font-sans text-[11px] uppercase tracking-wider text-[#7b766f] pt-2 font-semibold">
            &copy; 2026 {personalInfo.name}. All rights reserved.
          </p>
        </div>

        {/* Footer Quick Index Links */}
        <div
          ref={linksColRef}
          className="flex flex-wrap gap-12 text-[#4a4640] font-sans text-[13px]"
        >
          <div className="flex flex-col space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#050504] font-semibold">
              Navigation
            </span>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group"
              href="#about"
            >
              <span>About</span>
            </a>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group"
              href="#skills"
            >
              <span>Skills &amp; Tools</span>
            </a>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group"
              href="#experience"
            >
              <span>Experience</span>
            </a>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group"
              href="#projects"
            >
              <span>Selected Works</span>
            </a>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#050504] font-semibold">
              Networks
            </span>
            <MagneticItem>
              <a
                className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group py-0.5"
                href={`mailto:${personalInfo.email}`}
              >
                <Mail className="w-3.5 h-3.5 text-[#865130]" />
                <span>{personalInfo.email}</span>
              </a>
            </MagneticItem>

            <MagneticItem>
              <a
                className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group py-0.5"
                href="https://github.com/aryo04"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#865130]" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-[#7b766f] group-hover:text-[#865130] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticItem>

            <MagneticItem>
              <a
                className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group py-0.5"
                href="https://www.linkedin.com/in/aryo-daffa-khairuddin/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#865130]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#7b766f] group-hover:text-[#865130] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </MagneticItem>
          </div>
        </div>
      </div>
    </footer>
  );
}
