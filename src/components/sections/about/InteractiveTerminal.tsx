"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, RotateCcw } from "lucide-react";

interface TerminalStep {
  command: string;
  output: React.ReactNode;
}

const TERMINAL_STEPS: TerminalStep[] = [
  {
    command: "whoami",
    output: (
      <div className="space-y-0.5 text-[#d4cfc7]">
        <div className="text-[#a3e635] font-semibold text-[13px]">
          Aryo Daffa Khairuddin
        </div>
        <div className="text-[#9c9790] text-[12px]">
          AI Engineer &amp; Web Developer • Informatics Graduate
        </div>
      </div>
    ),
  },
  {
    command: "cat expertise.txt",
    output: (
      <div className="space-y-1 text-[#d4cfc7] text-[12.5px]">
        <div>
          <span className="text-[#c27038] font-semibold">Core Stack: </span>
          <span className="text-[#60a5fa] font-bold">React</span>,{" "}
          <span className="text-[#60a5fa] font-bold">Node.js</span>
        </div>
        <div>
          <span className="text-[#c27038] font-semibold">Full-Stack &amp; Mobile: </span>
          <span>Next.js, Express.js, TypeScript, Flutter, Dart, PostgreSQL, Supabase, Tailwind CSS</span>
        </div>
        <div>
          <span className="text-[#c27038] font-semibold">AI &amp; ML: </span>
          <span>Python, TensorFlow, FastAPI, Scikit-learn</span>
        </div>
        <div>
          <span className="text-[#c27038] font-semibold">DevOps: </span>
          <span>Docker, Nginx, Linux, Git &amp; GitHub</span>
        </div>
      </div>
    ),
  },
  {
    command: "cat education.txt",
    output: (
      <div className="text-[#fb923c] text-[12.5px]">
        Informatics Graduate • Gunadarma University
      </div>
    ),
  },
  {
    command: "aryo --status",
    output: (
      <div className="space-y-1 text-[#d4cfc7] text-[12.5px]">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-[#4ade80] font-semibold">
            ACTIVE — Open for Full-Time &amp; Project Opportunities
          </span>
        </div>
        <div className="text-[#9c9790] text-[11.5px] pl-4">
          Roles: AI Engineer, Full-Stack Developer, Back-End Developer
        </div>
      </div>
    ),
  },
];

export default function InteractiveTerminal() {
  const [completedSteps, setCompletedSteps] = useState<TerminalStep[]>([]);
  const [currentPromptText, setCurrentPromptText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll ONLY inside the terminal container, never the window
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [completedSteps, currentPromptText]);

  // Automated Typing Sequence
  useEffect(() => {
    let isCancelled = false;

    const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const runSequence = async () => {
      // 1. Initial Blank Delay (terminal starts completely empty)
      await wait(800);
      if (isCancelled) return;

      for (let i = 0; i < TERMINAL_STEPS.length; i++) {
        const step = TERMINAL_STEPS[i];

        // Type the command letter by letter at a natural, readable cadence
        for (let charIdx = 1; charIdx <= step.command.length; charIdx++) {
          if (isCancelled) return;
          setCurrentPromptText(step.command.slice(0, charIdx));
          await wait(65 + Math.random() * 35);
        }

        // Deliberate pause after command finishes typing (simulating user pressing Enter)
        await wait(500);
        if (isCancelled) return;

        // Reveal the answer/output
        setCompletedSteps((prev) => [...prev, step]);
        setCurrentPromptText("");

        // Comfortable reading pause before typing the next command
        await wait(1400);
        if (isCancelled) return;
      }

      setIsFinished(true);
    };

    runSequence();

    return () => {
      isCancelled = true;
    };
  }, [playKey]);

  const handleReplay = () => {
    setCompletedSteps([]);
    setCurrentPromptText("");
    setIsFinished(false);
    setPlayKey((prev) => prev + 1);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#141312] border border-[#ccc6bd]/80 shadow-[0_16px_36px_-10px_rgba(30,25,20,0.25),0_4px_12px_-2px_rgba(30,25,20,0.12)] font-mono text-[13px] text-[#d4cfc7] transition-all duration-300 hover:border-[#865130]/90 flex flex-col h-[420px]">
      {/* Terminal Window Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#1e1c1b] border-b border-white/5 select-none shrink-0">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-xs" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-xs" />
          <span className="ml-2 text-[11px] text-[#9c9790] font-sans font-medium flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#c27038]" />
            <span>aryo@portfolio: ~ (bash)</span>
          </span>
        </div>

        <button
          onClick={handleReplay}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] bg-white/5 hover:bg-white/10 text-[#a8a39d] hover:text-[#fbf9f6] transition-colors border border-white/5 cursor-pointer font-sans"
          title="Replay Terminal Animation"
          type="button"
        >
          <RotateCcw className="w-3 h-3 text-[#c27038]" />
          <span>Replay</span>
        </button>
      </div>

      {/* Scrollable Terminal Body */}
      <div
        ref={terminalBodyRef}
        className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4 font-mono leading-relaxed text-[12.5px] text-[#d4cfc7]"
      >
        {/* Completed Command & Answer Blocks */}
        {completedSteps.map((step, idx) => (
          <div key={idx} className="space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 text-[12.5px]">
              <span className="text-[#c27038] font-bold">aryo@machine:~$</span>
              <span className="text-[#fbf9f6] font-medium">{step.command}</span>
            </div>
            <div className="pl-3 border-l-2 border-white/10">{step.output}</div>
          </div>
        ))}

        {/* Currently Typing Line (Letter by letter) */}
        {!isFinished && (
          <div className="flex items-center gap-1.5 text-[12.5px]">
            <span className="text-[#c27038] font-bold">aryo@machine:~$</span>
            <span className="text-[#fbf9f6] font-medium">{currentPromptText}</span>
            <span className="inline-block w-2 h-3.5 bg-[#c27038] animate-pulse ml-0.5" />
          </div>
        )}

        {/* Final Idle State with Cursor */}
        {isFinished && (
          <div className="flex items-center gap-1.5 text-[12.5px] pt-1 text-[#7b766f]">
            <span className="text-[#c27038] font-bold">aryo@machine:~$</span>
            <span className="inline-block w-2 h-3.5 bg-[#22c55e] animate-pulse ml-0.5" />
          </div>
        )}
      </div>
    </div>
  );
}
