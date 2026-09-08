"use client";

import { motion, type Variants } from "framer-motion";
import { experiences } from "@/data/portfolioData";
import ExperienceCard from "./ExperienceCard";

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
            <ExperienceCard key={idx} experience={exp} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
