"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import TechIcon from "@/components/ui/TechIcon";
import type { ProjectItem as ProjectData } from "@/data/portfolioData";

interface ProjectItemProps {
  project: ProjectData;
  index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
  const isEven = index % 2 === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 lg:gap-18 items-center">
      {/* Image Preview Container (Alternating via md:order) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`md:col-span-7 ${isEven ? "md:order-1" : "md:order-2"}`}
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
                src={project.image}
                alt={project.title}
                className="w-full h-auto block object-contain group-hover:scale-[1.015] transition-transform duration-500 ease-out"
                loading="lazy"
              />
            </a>
          ) : (
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto block object-contain group-hover:scale-[1.015] transition-transform duration-500 ease-out"
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
      </motion.div>

      {/* Information & Details Container (Alternating via md:order) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
        className={`md:col-span-5 flex flex-col justify-center ${
          isEven ? "md:order-2" : "md:order-1"
        }`}
      >
        {/* Category */}
        <span className="font-sans text-[11.5px] uppercase tracking-widest text-[#865130] font-semibold block mb-2.5">
          {project.category}
        </span>

        {/* Project Title */}
        <h3 className="font-display text-[30px] md:text-[36px] text-[#050504] font-medium mb-3.5 leading-tight hover:text-[#865130] transition-colors">
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
              className="inline-flex items-center gap-1.5 bg-[#f5f3f0] hover:bg-[#efeeeb] px-3 py-1.5 rounded-xl text-[#1b1c1a] font-sans text-[12.5px] font-medium border border-[#ccc6bd]/60 transition-colors cursor-default"
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
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#1f1e1d] hover:bg-[#865130] text-[#fbf9f6] text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 shadow-sm"
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
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-[#f5f3f0] text-[#050504] hover:text-[#865130] text-[13px] font-medium border border-[#ccc6bd] hover:border-[#865130] transition-all duration-200 shadow-2xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
