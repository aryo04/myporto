"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import { personalInfo } from "@/data/portfolioData";

export default function Contact() {
  const contactChannels = [
    {
      name: "Email",
      label: `Send email to ${personalInfo.email}`,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`,
      icon: Mail,
    },
    {
      name: "LinkedIn",
      label: "LinkedIn Profile",
      href: "https://www.linkedin.com/in/aryo-daffa-khairuddin/",
      icon: LinkedinIcon,
    },
    {
      name: "GitHub",
      label: "GitHub Profile",
      href: "https://github.com/aryo04",
      icon: GithubIcon,
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-[#f5f3f0]/50 border-t border-[#ccc6bd]/70 text-center relative overflow-hidden"
      id="contact"
    >
      {/* Subtle Top Accent Divider Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-[#865130]/70 to-transparent" />

      <div className="max-w-[1200px] mx-auto px-5 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          {/* Section Header Badge */}
          <span className="inline-flex items-center gap-1.5 font-sans text-[11px] text-[#865130] uppercase tracking-widest mb-4 font-semibold bg-[#f5f3f0] px-3.5 py-1.5 rounded-full border border-[#ccc6bd]/70">
            <Sparkles className="w-3.5 h-3.5 text-[#865130]" />
            <span>Inquiries &amp; Collaborations</span>
          </span>

          <h2 className="font-display text-[34px] sm:text-[44px] md:text-[52px] text-[#050504] font-normal leading-tight">
            Let&apos;s connect and build something together.
          </h2>

          <p className="font-sans text-[16px] md:text-[18px] text-[#4a4640] mt-4 leading-relaxed">
            Open to engineering appointments, machine learning projects, and full-stack software initiatives.
          </p>

          {/* Social / Contact Icons Row */}
          <div className="mt-9 flex items-center justify-center gap-4 sm:gap-5">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <motion.a
                  key={channel.name}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={channel.label}
                  whileHover={{ y: -4, scale: 1.08 }}
                  whileTap={{ scale: 0.94 }}
                  className="group relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-[#ccc6bd] text-[#4a4640] hover:text-[#865130] hover:border-[#865130] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_-4px_rgba(134,81,48,0.22)] flex items-center justify-center transition-all duration-300"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:scale-110" />

                  {/* Floating Tooltip */}
                  <span className="absolute -top-10 px-2.5 py-1 rounded-md bg-[#1f1e1d] text-[#fbf9f6] text-[11px] font-sans font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-200 pointer-events-none shadow-md z-10">
                    {channel.name}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1f1e1d]" />
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
