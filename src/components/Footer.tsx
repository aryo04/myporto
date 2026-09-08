"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/BrandIcons";
import { personalInfo } from "@/data/portfolioData";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#ccc6bd]/60 transition-all duration-200 ease-out">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[1200px] mx-auto px-5 md:px-12 py-12 flex flex-col md:flex-row justify-between items-start gap-8"
      >
        {/* Brand & Copyright Column */}
        <div className="flex flex-col space-y-2.5 max-w-md">
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
        <div className="flex flex-wrap gap-12 text-[#4a4640] font-sans text-[13px]">
          <div className="flex flex-col space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#050504] font-semibold">
              Navigation
            </span>
            <a className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group" href="#about">
              <span>About</span>
            </a>
            <a className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group" href="#skills">
              <span>Skills &amp; Tools</span>
            </a>
            <a className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group" href="#experience">
              <span>Experience</span>
            </a>
            <a className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1 group" href="#projects">
              <span>Selected Works</span>
            </a>
          </div>

          <div className="flex flex-col space-y-2.5">
            <span className="font-sans text-[11px] uppercase tracking-wider text-[#050504] font-semibold">
              Networks
            </span>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group"
              href={`mailto:${personalInfo.email}`}
            >
              <Mail className="w-3.5 h-3.5 text-[#865130]" />
              <span>{personalInfo.email}</span>
            </a>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group"
              href="https://github.com/aryo04"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="w-3.5 h-3.5 text-[#865130]" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-[#7b766f] group-hover:text-[#865130] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              className="hover:text-[#865130] transition-colors duration-200 flex items-center gap-1.5 group"
              href="https://www.linkedin.com/in/aryo-daffa-khairuddin/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-[#865130]" />
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-[#7b766f] group-hover:text-[#865130] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
