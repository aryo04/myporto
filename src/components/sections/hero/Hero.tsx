"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const btnProjectsRef = useRef<HTMLAnchorElement>(null);
  const btnContactRef = useRef<HTMLAnchorElement>(null);

  // Split headline text into words for cinematic mask reveal
  const headlineWords = `Hi, I'm ${personalInfo.name}`.split(" ");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // 1. Cinematic Entrance Sequence
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Welcome Badge
      tl.from(badgeRef.current, {
        y: -24,
        opacity: 0,
        scale: 0.88,
        duration: 0.75,
        ease: "back.out(1.7)",
        clearProps: "all",
      })
        // 3D Flip-up masked headline
        .from(
          ".hero-title-word",
          {
            y: "120%",
            opacity: 0,
            rotationX: 35,
            stagger: 0.045,
            duration: 0.85,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.4"
        )
        // Role Subtitle
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
        // Bio Text
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
        // CTAs with bounce pop
        .from(
          [btnProjectsRef.current, btnContactRef.current],
          {
            y: 18,
            opacity: 0,
            scale: 0.92,
            stagger: 0.1,
            duration: 0.65,
            ease: "back.out(1.5)",
            clearProps: "opacity,scale",
          },
          "-=0.4"
        );

      // 2. Cinematic ScrollTrigger Exit (Hero recedes smoothly into the background)
      if (sectionRef.current && containerRef.current) {
        gsap.to(containerRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
          y: 70,
          opacity: 0.08,
          scale: 0.94,
          ease: "none",
        });
      }

      // 3. Lightweight 3D Depth Parallax on Mouse Move (Zero lag, pure GPU quickTo)
      const section = sectionRef.current;
      const container = containerRef.current;
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;

      if (section && container && isFinePointer) {
        const rotX = gsap.quickTo(container, "rotationX", {
          duration: 0.55,
          ease: "power2.out",
        });
        const rotY = gsap.quickTo(container, "rotationY", {
          duration: 0.55,
          ease: "power2.out",
        });
        const glowX = glowRef.current
          ? gsap.quickTo(glowRef.current, "x", {
              duration: 0.75,
              ease: "power2.out",
            })
          : null;
        const glowY = glowRef.current
          ? gsap.quickTo(glowRef.current, "y", {
              duration: 0.75,
              ease: "power2.out",
            })
          : null;

        const handleMouseMove = (e: MouseEvent) => {
          const rect = section.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;

          rotX(-normY * 7); // gentle 7 deg tilt
          rotY(normX * 7);

          if (glowX && glowY) {
            glowX(normX * 90);
            glowY(normY * 70);
          }
        };

        const handleMouseLeave = () => {
          rotX(0);
          rotY(0);
          if (glowX && glowY) {
            glowX(0);
            glowY(0);
          }
        };

        section.addEventListener("mousemove", handleMouseMove, { passive: true });
        section.addEventListener("mouseleave", handleMouseLeave, { passive: true });

        // 4. Subtle Magnetic Pull on CTA Buttons
        const setupMagnetic = (btn: HTMLElement | null) => {
          if (!btn) return () => {};
          const xTo = gsap.quickTo(btn, "x", { duration: 0.35, ease: "power2.out" });
          const yTo = gsap.quickTo(btn, "y", { duration: 0.35, ease: "power2.out" });

          const handleBtnMove = (e: MouseEvent) => {
            const bRect = btn.getBoundingClientRect();
            const relX = e.clientX - (bRect.left + bRect.width / 2);
            const relY = e.clientY - (bRect.top + bRect.height / 2);
            xTo(relX * 0.28);
            yTo(relY * 0.28);
          };

          const handleBtnLeave = () => {
            xTo(0);
            yTo(0);
          };

          btn.addEventListener("mousemove", handleBtnMove);
          btn.addEventListener("mouseleave", handleBtnLeave);

          return () => {
            btn.removeEventListener("mousemove", handleBtnMove);
            btn.removeEventListener("mouseleave", handleBtnLeave);
          };
        };

        const cleanupProjects = setupMagnetic(btnProjectsRef.current);
        const cleanupContact = setupMagnetic(btnContactRef.current);

        return () => {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseleave", handleMouseLeave);
          cleanupProjects();
          cleanupContact();
        };
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex flex-col justify-center items-center py-12 md:py-16 max-w-[1200px] mx-auto px-5 md:px-12 text-center overflow-hidden"
      style={{ perspective: "1200px" }}
      id="hero"
    >
      {/* Soft Interactive Radial Glow behind Hero */}
      <div
        ref={glowRef}
        className="absolute w-[460px] h-[460px] rounded-full bg-radial from-[#865130]/10 via-[#865130]/3 to-transparent pointer-events-none blur-3xl -z-10 transform-gpu will-change-transform"
        aria-hidden="true"
      />

      <div
        ref={containerRef}
        className="max-w-3xl mx-auto flex flex-col items-center space-y-6 my-auto transform-gpu will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Welcome Badge */}
        <div
          ref={badgeRef}
          style={{ transform: "translateZ(25px)" }}
          className="inline-flex items-center gap-2 bg-[#f5f3f0]/90 backdrop-blur-xs border border-[#ccc6bd]/80 rounded-full px-4 py-1.5 shadow-sm transform-gpu"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#865130]" />
          <span className="font-sans text-[12px] text-[#865130] font-semibold tracking-wide">
            Welcome to my portfolio
          </span>
        </div>

        {/* Main Name & Title */}
        <div className="space-y-3" style={{ transform: "translateZ(38px)" }}>
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
            style={{ transform: "translateZ(22px)" }}
            className="font-display text-[24px] sm:text-[30px] md:text-[34px] text-[#865130] font-normal leading-snug"
          >
            {personalInfo.role}
          </p>
        </div>

        {/* Punchy Bio */}
        <p
          ref={bioRef}
          style={{ transform: "translateZ(18px)" }}
          className="font-sans text-[17px] md:text-[19px] text-[#4a4640] max-w-2xl leading-relaxed mx-auto"
        >
          {personalInfo.bio}
        </p>

        {/* CTAs with Magnetic Physics */}
        <div
          ref={ctaRef}
          style={{ transform: "translateZ(32px)" }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <a
            ref={btnProjectsRef}
            href="#projects"
            className="hero-cta-btn h-11 px-6 rounded-full bg-[#1f1e1d] text-[#fbf9f6] hover:bg-[#865130] font-sans text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 flex items-center justify-center shadow-sm gap-2 transform-gpu will-change-transform"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            ref={btnContactRef}
            href="#contact"
            className="hero-cta-btn h-11 px-6 rounded-full bg-white/90 backdrop-blur-xs text-[#050504] border border-[#ccc6bd] hover:border-[#865130] hover:text-[#865130] font-sans text-[13px] font-semibold tracking-wide uppercase transition-colors duration-200 flex items-center justify-center shadow-xs transform-gpu will-change-transform"
          >
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
