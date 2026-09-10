"use client";

import { Calendar, Briefcase, Award } from "lucide-react";
import SpotlightCard from "@/components/ui/SpotlightCard";
import type { ExperienceItem } from "@/data/portfolioData";

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

export default function ExperienceCard({
  experience,
  index,
}: {
  experience: ExperienceItem;
  index?: number;
}) {
  return (
    <div className="cursor-default group experience-card-inner">
      <SpotlightCard
        leftAccent
        className="bg-white border border-[#ccc6bd] group-hover:border-[#865130]/80 rounded-2xl p-6 md:p-8 shadow-[0_2px_8px_-2px_rgba(110,89,70,0.04)] group-hover:shadow-[0_18px_40px_-10px_rgba(134,81,48,0.16)] transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-1">
          <div className="exp-header-text space-y-1.5 flex-1">
            <h3 className="font-display text-[22px] md:text-[24px] text-[#050504] font-medium group-hover:text-[#865130] transition-colors">
              {experience.role}
            </h3>
            <p className="font-sans text-[15px] text-[#865130] font-medium group-hover:text-[#6e3f22] transition-colors">
              {experience.company}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 md:pt-1 flex-wrap">
            <span className="exp-badge inline-flex items-center gap-1.5 bg-[#efeeeb] group-hover:bg-[#865130] group-hover:text-white px-2.5 py-1 rounded-full text-[#865130] font-sans text-[11px] uppercase tracking-wider font-semibold transition-all duration-300 border border-[#ccc6bd]/40">
              {experience.type === "Internship" ? (
                <Briefcase className="w-3 h-3" />
              ) : (
                <Award className="w-3 h-3" />
              )}
              <span>{experience.type}</span>
            </span>

            <div className="exp-badge inline-flex items-center text-[#7b766f] font-mono text-xs bg-[#f5f3f0] group-hover:bg-[#fbf9f6] group-hover:border-[#865130]/50 px-3 py-1 rounded-full border border-[#ccc6bd]/50 transition-all duration-300">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#865130]" />
              <span>{experience.period}</span>
            </div>
          </div>
        </div>

        {/* Structured Bullet Points or Description */}
        {experience.points && experience.points.length > 0 ? (
          <ul className="mt-4 pt-4 border-t border-[#ccc6bd]/40 space-y-2.5">
            {experience.points.map((pt, pIdx) => (
              <li
                key={pIdx}
                className="exp-bullet-item flex items-start gap-3 font-sans text-[14px] md:text-[14.5px] text-[#4a4640] leading-relaxed group-hover:text-[#1b1c1a] transition-colors duration-200"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#865130] mt-2.5 shrink-0 group-hover:scale-125 group-hover:shadow-[0_0_8px_rgba(134,81,48,0.5)] transition-all duration-300" />
                <span className="flex-1">{renderFormattedText(pt)}</span>
              </li>
            ))}
          </ul>
        ) : experience.description ? (
          <p className="exp-bullet-item mt-4 pt-4 border-t border-[#ccc6bd]/40 font-sans text-[14px] md:text-[14.5px] text-[#4a4640] leading-relaxed group-hover:text-[#1b1c1a] transition-colors duration-200">
            {renderFormattedText(experience.description)}
          </p>
        ) : null}
      </SpotlightCard>
    </div>
  );
}
