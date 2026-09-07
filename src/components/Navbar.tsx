"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/data/portfolioData";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);

          const sections = ["about", "skills", "experience", "projects", "contact"];
          const scrollPos = window.scrollY + 160;

          for (const sectionId of sections) {
            const el = document.getElementById(sectionId);
            if (el) {
              const top = el.offsetTop;
              const height = el.offsetHeight;
              if (scrollPos >= top && scrollPos < top + height) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
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
                    isActive ? "text-[#865130] font-semibold" : "font-normal"
                  }
                >
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Action Button + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="hidden sm:inline-flex h-10 px-5 rounded-full bg-[#1f1e1d] text-[#fbf9f6] hover:bg-[#865130] text-[12px] font-semibold tracking-wider uppercase transition-all duration-200 items-center justify-center shadow-sm gap-1.5"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded-lg text-[#050504] hover:bg-[#efeeeb] transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-[#050504]" />
            ) : (
              <Menu className="w-6 h-6 text-[#050504]" />
            )}
          </button>
        </div>
      </div>

      {/* Animated Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden border-t border-[#ccc6bd]/60 bg-[#fbf9f6] px-5 py-4 space-y-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleLinkClick}
                className={`block py-2 text-[15px] border-b border-[#ccc6bd]/30 transition-colors ${
                  activeSection === link.id
                    ? "text-[#865130] font-semibold pl-2"
                    : "text-[#4a4640] hover:text-[#050504]"
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-1.5 w-full py-2.5 text-center rounded-full bg-[#1f1e1d] text-[#fbf9f6] text-[12px] font-semibold uppercase tracking-wider mt-3 hover:bg-[#865130] transition-colors"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
