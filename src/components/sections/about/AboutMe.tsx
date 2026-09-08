"use client";

import React from "react";
import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import { personalInfo } from "@/data/portfolioData";
import InteractiveTerminal from "./InteractiveTerminal";

export default function AboutMe() {
  return (
    <section
      className="py-14 md:py-20 bg-white border-y border-[#ccc6bd]/60"
      id="about"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          {/* About Narrative Column (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <SpotlightCard className="bg-[#fbf9f6] rounded-2xl p-7 md:p-10 border border-[#ccc6bd]/80 warm-card-shadow flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <UserCheck className="w-4 h-4 text-[#865130]" />
                <span className="text-[11px] font-mono tracking-widest text-[#865130] uppercase font-semibold">
                  BACKGROUND &amp; PROFILE
                </span>
              </div>
              <h2 className="font-display text-[32px] md:text-[42px] text-[#050504] font-normal mb-5 leading-tight">
                About Me
              </h2>
              <p className="font-sans text-[16px] md:text-[18px] text-[#4a4640] leading-relaxed mb-4">
                {personalInfo.aboutStory}
              </p>
              <p className="font-sans text-[14px] md:text-[15px] text-[#7b766f] leading-relaxed border-t border-[#ccc6bd]/40 pt-4">
                Focused on building practical AI and web solutions, from developing machine learning models and integrating LLMs to deploying functional applications for real-world use cases.
              </p>
            </SpotlightCard>
          </motion.div>

          {/* Automated Auto-Typing Q&A Terminal Column (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex justify-center w-full"
          >
            <InteractiveTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
