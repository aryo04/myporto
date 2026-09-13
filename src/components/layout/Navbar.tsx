"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sections = ["about", "skills", "experience", "projects", "contact"];
          const scrollPos = window.scrollY + 200;

          let current = "";
          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                current = sectionId;
                break;
              }
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about", id: "about" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`sticky top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(110,89,70,0.06)] border-b border-[#ccc6bd]/80"
          : "bg-[#fbf9f6]/80 backdrop-blur-sm border-b border-[#ccc6bd]/40"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-12 flex items-center justify-between h-16">
        {/* Brand Logo */}
        <Link
          href="#hero"
          className="group text-[22px] tracking-tight text-[#050504] font-medium flex items-center gap-2 font-display"
        >
          <span className="font-semibold group-hover:text-[#865130] transition-colors">
            ArDK
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className="relative px-3.5 py-1.5 font-sans text-[14px] text-[#4a4640] hover:text-[#050504] transition-colors rounded-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-[#efeeeb] rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={
                    isActive
                      ? "text-[#865130] font-semibold transition-colors"
                      : "transition-colors"
                  }
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA / Connect Button & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1f1e1d] hover:bg-[#865130] text-[#fbf9f6] font-sans text-[12px] uppercase tracking-wider font-semibold transition-all duration-200 shadow-xs group"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#4a4640] hover:text-[#050504] hover:bg-[#efeeeb] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#fbf9f6] border-b border-[#ccc6bd] overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block px-4 py-2.5 rounded-xl font-sans text-[15px] transition-colors ${
                    activeSection === link.id
                      ? "bg-[#efeeeb] text-[#865130] font-semibold"
                      : "text-[#4a4640] hover:bg-[#f5f3f0]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3">
                <a
                  href="#contact"
                  onClick={handleLinkClick}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-[#1f1e1d] text-[#fbf9f6] font-sans text-[13px] uppercase tracking-wider font-semibold"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
