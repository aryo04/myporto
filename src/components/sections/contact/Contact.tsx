"use client";

import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
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
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white border border-[#ccc6bd] flex items-center justify-center text-[#4a4640] hover:text-[#865130] hover:border-[#865130] shadow-[0_2px_8px_-2px_rgba(110,89,70,0.06)] hover:shadow-[0_8px_20px_-4px_rgba(134,81,48,0.18)] transition-colors cursor-pointer"
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
