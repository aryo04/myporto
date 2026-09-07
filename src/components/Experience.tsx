"use client";

import { motion, type Variants } from "framer-motion";
import { Calendar, Briefcase, Award } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { experiences } from "@/data/portfolioData";

function renderFormattedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-[#1b1c1a]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function Experience() {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="py-16 md:py-24 bg-[#f5f3f0]/50 border-y border-[#ccc6bd]/50"
      id="experience"
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
            My Journey
          </span>
          <h2 className="font-display text-[32px] md:text-[40px] text-[#050504] font-normal">
            Experience &amp; Programs
          </h2>
          <p className="font-sans text-[15px] text-[#4a4640] mt-1">
            Hands-on engineering roles, institutional software delivery, and competitive cohorts.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-5"
        >
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.008 }}
              transition={{ type: "spring", stiffness: 360, damping: 26 }}
              className="cursor-default group"
            >
              <SpotlightCard leftAccent className="bg-white border border-[#ccc6bd] group-hover:border-[#b8b0a5] rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_-2px_rgba(110,89,70,0.04)] group-hover:shadow-[0_16px_36px_-10px_rgba(134,81,48,0.12),0_4px_12px_-2px_rgba(134,81,48,0.06)] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-1">
                  <div className="space-y-1.5 flex-1">
                    <h3 className="font-display text-[22px] md:text-[24px] text-[#050504] font-medium group-hover:text-[#865130] transition-colors">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-[15px] text-[#865130] font-medium group-hover:text-[#6e3f22] transition-colors">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 md:pt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 bg-[#efeeeb] group-hover:bg-[#865130] group-hover:text-white px-2.5 py-1 rounded-full text-[#865130] font-sans text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 border border-[#ccc6bd]/40">
                      {exp.type === "Internship" ? (
                        <Briefcase className="w-3 h-3" />
                      ) : (
                        <Award className="w-3 h-3" />
                      )}
                      <span>{exp.type}</span>
                    </span>

                    <div className="inline-flex items-center text-[#7b766f] font-mono text-xs bg-[#f5f3f0] group-hover:bg-[#fbf9f6] group-hover:border-[#865130]/50 px-3 py-1 rounded-full border border-[#ccc6bd]/50 transition-all duration-300">
                      <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#865130]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Structured Bullet Points or Description */}
                {exp.points && exp.points.length > 0 ? (
                  <ul className="mt-4 pt-4 border-t border-[#ccc6bd]/40 space-y-2.5">
                    {exp.points.map((pt, pIdx) => (
                      <li
                        key={pIdx}
                        className="flex items-start gap-3 font-sans text-[14px] md:text-[14.5px] text-[#4a4640] leading-relaxed group-hover:text-[#1b1c1a] transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#865130] mt-2.5 shrink-0 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(134,81,48,0.5)] transition-all duration-300" />
                        <span className="flex-1">{renderFormattedText(pt)}</span>
                      </li>
                    ))}
                  </ul>
                ) : exp.description ? (
                  <p className="mt-4 pt-4 border-t border-[#ccc6bd]/40 font-sans text-[14px] md:text-[14.5px] text-[#4a4640] leading-relaxed group-hover:text-[#1b1c1a] transition-colors duration-200">
                    {renderFormattedText(exp.description)}
                  </p>
                ) : null}
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
