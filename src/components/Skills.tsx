"use client";

import { motion, type Variants } from "framer-motion";
import { Brain, Layers, Terminal } from "lucide-react";
import TechIcon from "@/components/TechIcon";
import SpotlightCard from "@/components/SpotlightCard";
import { skillCategories } from "@/data/portfolioData";

export default function Skills() {
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="py-14 md:py-20 bg-[#f5f3f0]/60 border-b border-[#ccc6bd]/60"
      id="skills"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 max-w-2xl"
        >
          <span className="font-sans text-[11px] text-[#865130] uppercase tracking-widest block mb-2 font-semibold">
            Technical Architecture
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] text-[#050504] font-normal">
            Skills &amp; Tooling
          </h2>
          <p className="font-sans text-[15px] text-[#4a4640] mt-2">
            Technologies and frameworks I build with on production pipelines.
          </p>
        </motion.div>

        {/* 3 Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {skillCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-full"
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
                    <motion.div
                      key={sIdx}
                      whileHover={{ scale: 1.02, y: -1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group/item flex items-center gap-2 px-2.5 py-2 rounded-xl bg-[#f5f3f0]/70 border border-[#ccc6bd]/60 hover:border-[#865130] hover:bg-white hover:shadow-2xs transition-all cursor-default min-w-0"
                      title={skill.name}
                    >
                      <div className="p-1 rounded-md bg-white group-hover/item:bg-[#f5f3f0] border border-[#ccc6bd]/30 shrink-0 shadow-2xs transition-colors flex items-center justify-center">
                        <TechIcon name={skill.name} className="w-3.5 h-3.5 shrink-0" />
                      </div>
                      <span className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#1b1c1a] group-hover/item:text-[#865130] truncate transition-colors min-w-0">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
