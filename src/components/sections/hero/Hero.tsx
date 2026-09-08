"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      className="pt-16 md:pt-28 pb-16 md:pb-24 max-w-[1200px] mx-auto px-5 md:px-12 text-center"
      id="hero"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-3xl mx-auto flex flex-col items-center space-y-6"
      >
        {/* Welcome Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-[#f5f3f0] border border-[#ccc6bd]/80 rounded-full px-4 py-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#865130]" />
          <span className="font-sans text-[12px] text-[#865130] font-semibold tracking-wide">
            Welcome to my portfolio
          </span>
        </motion.div>

        {/* Main Name & Title */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h1 className="font-display text-[48px] sm:text-[62px] md:text-[74px] text-[#050504] leading-[1.05] font-normal tracking-tight">
            Hi, I&apos;m {personalInfo.name}
          </h1>
          <p className="font-display text-[24px] sm:text-[30px] md:text-[34px] text-[#865130] font-normal leading-snug">
            {personalInfo.role}
          </p>
        </motion.div>

        {/* Punchy Bio */}
        <motion.p
          variants={itemVariants}
          className="font-sans text-[17px] md:text-[19px] text-[#4a4640] max-w-2xl leading-relaxed mx-auto"
        >
          {personalInfo.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="h-11 px-6 rounded-full bg-[#1f1e1d] text-[#fbf9f6] hover:bg-[#865130] font-sans text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center shadow-sm gap-2"
          >
            <span>View Projects</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="h-11 px-6 rounded-full bg-white text-[#050504] border border-[#ccc6bd] hover:border-[#865130] hover:text-[#865130] font-sans text-[13px] font-semibold tracking-wide uppercase transition-all duration-200 flex items-center justify-center shadow-xs"
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
