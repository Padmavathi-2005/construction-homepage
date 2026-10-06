"use client";

import React, { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import { scrollToSection } from "@/lib/scroll";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 25;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      {/* 
        The <header> remains completely transparent with zero full-width background bar.
        Hero / video remains fully visible behind the header.
        Pointer events are passed through to the hero, except on interactive elements.
      */}
      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-6 sm:px-9 md:px-10 lg:px-12 xl:px-14 pt-5 sm:pt-6">
        <div className="w-full flex items-center justify-between">
          {/* Left: Brand Logo (Transparent at top, gains white background + border radius on scroll) */}
          <a
            href="#hero"
            onClick={(e) => scrollToSection("hero", e)}
            className={`pointer-events-auto group relative flex items-center select-none focus:outline-none transition-all duration-300 cursor-pointer ${
              isScrolled
                ? "bg-white/95 backdrop-blur-md border border-[#133E63]/15 shadow-[0_8px_30px_rgba(19,62,99,0.08)] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-[16px]"
                : "bg-transparent border border-transparent shadow-none px-1 py-1 rounded-[16px]"
            }`}
          >
            <div className="relative h-10 sm:h-11 md:h-12 flex items-center">
              {/* Light logo (white + orange) when transparent at top */}
              <img
                src="/images/amogha-logo-light.png"
                alt="Amogha Construction & Infrastructure"
                className={`h-full w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] transition-opacity duration-300 ${
                  isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              />
              {/* Navy logo when scrolled with white background */}
              <img
                src="/images/amogha-logo-transparent.png"
                alt="Amogha Construction & Infrastructure"
                className={`h-full w-auto object-contain transition-opacity duration-300 absolute inset-0 ${
                  isScrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              />
            </div>
          </a>

          {/* Right: Floating Rounded Navigation Panel */}
          <nav
            aria-label="Main Navigation"
            className="pointer-events-auto hidden md:flex items-center gap-6 lg:gap-8 px-7 py-3.5 min-h-[52px] w-fit rounded-[18px] bg-white/95 backdrop-blur-md border border-[#133E63]/15 shadow-[0_8px_30px_rgba(19,62,99,0.08)] transition-all duration-300"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(item.href, e)}
                className="text-[12px] font-sans font-semibold tracking-[0.12em] uppercase text-[#0E283F] hover:text-[#F26A1B] transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile: Floating Rounded Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="pointer-events-auto md:hidden flex items-center gap-2 px-4 py-2 rounded-[14px] bg-[rgba(255,255,255,0.92)] backdrop-blur-md border border-black/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.06)] text-[#111111] hover:text-[#555555] focus:outline-none transition-colors"
          >
            <span className="text-[11px] font-sans font-medium tracking-[0.14em] uppercase">
              MENU
            </span>
            <span className="flex flex-col gap-1 w-3.5">
              <span className="w-full h-[1.5px] bg-[#111111]" />
              <span className="w-full h-[1.5px] bg-[#111111]" />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
