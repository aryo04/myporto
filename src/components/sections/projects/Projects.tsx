"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/portfolioData";
import ProjectItem from "./ProjectItem";

export default function Projects() {
  return (
    <section
      className="py-20 md:py-32 max-w-[1200px] mx-auto px-5 md:px-12"
      id="projects"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
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
            {projects.length} Exemplars / 2025–2026
          </span>
        </div>
      </motion.div>

      {/* 1-by-1 Alternating (Kiri Kanan Kiri Kanan) Project List */}
      <div className="space-y-24 md:space-y-36">
        {projects.map((proj, idx) => (
          <ProjectItem key={proj.id} project={proj} index={idx} />
        ))}
      </div>
    </section>
  );
}
