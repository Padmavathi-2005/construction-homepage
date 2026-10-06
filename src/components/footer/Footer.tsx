"use client";

import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

export default function Footer() {
  const usefulLinks = [
    { label: "About Us", href: "#about" },
    { label: "Our Services", href: "#services" },
    { label: "Our Process", href: "#process" },
    { label: "Our Projects", href: "#projects" },
    { label: "Contact Us", href: "#contact" },
  ];

  const phoneNumber = "+91 98765 43210";

  return (
    <footer
      id="contact"
      className="relative w-full bg-[linear-gradient(160deg,#18507F_0%,#133E63_45%,#0E3152_100%)] text-[#E6EEF6] overflow-hidden"
    >
      {/* Orange brand accent line on top */}
      <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#F26A1B] via-[#FF8A45] to-[#F26A1B]" />


      {/* Soft glows for depth */}
      <div aria-hidden="true" className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-[#2C6A9E]/40 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-48 -left-32 w-[420px] h-[420px] rounded-full bg-[#F26A1B]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-10">
        {/* ================= MAIN FOOTER GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-14 lg:pb-16 border-b border-white/15">
          {/* Column 1 — Amogha Developer */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <a
                href="#hero"
                onClick={(e) => scrollToSection("hero", e)}
                className="inline-flex items-center transition-transform duration-200 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src="/images/amogha-logo-light.png"
                  alt="Company Logo"
                  className="h-16 sm:h-20 w-auto object-contain"
                />
              </a>
            </div>

            <p className="text-xs sm:text-[13px] text-[#C3D4E5] leading-relaxed font-sans max-w-sm">
              Building visionary architectural spaces through engineering precision, enduring quality, and innovative construction solutions tailored to modern living.
            </p>
          </div>

          {/* Column 2 — Useful Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="block text-xs font-mono tracking-[0.2em] uppercase font-semibold text-[#FF8A45]">
              Useful Links
            </span>
            <ul className="space-y-2.5">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(link.href, e)}
                    className="group inline-flex items-center gap-2 text-xs sm:text-[13px] text-[#C3D4E5] hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#6F93B6] group-hover:bg-[#FF8A45] transition-colors" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact Us */}
          <div className="lg:col-span-4 space-y-4">
            <span className="block text-xs font-mono tracking-[0.2em] uppercase font-semibold text-[#FF8A45]">
              Contact Us
            </span>

            <div className="space-y-3.5 text-xs sm:text-[13px]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#FF8A45] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-mono tracking-wider uppercase text-[#93B0CC]">
                    Address
                  </span>
                  <p className="text-white text-xs sm:text-[13px] font-sans leading-relaxed">
                    123, Prime Avenue, Commercial Zone, Metro City, State 560001
                  </p>
                </div>
              </div>

              {/* Mail */}
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#FF8A45] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-mono tracking-wider uppercase text-[#93B0CC]">
                    Mail Us
                  </span>
                  <a
                    href="mailto:contact@examplecompany.com"
                    className="text-white hover:text-[#FF8A45] font-medium transition-colors break-words"
                  >
                    contact@examplecompany.com
                  </a>
                </div>
              </div>

              {/* Call */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#FF8A45] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] font-mono tracking-wider uppercase text-[#93B0CC]">
                    Call Us
                  </span>
                  <a
                    href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                    className="text-white hover:text-[#FF8A45] font-medium transition-colors"
                  >
                    {phoneNumber}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR ================= */}
        <div className="pt-6 flex items-center justify-center text-[11px] font-mono text-[#93B0CC]">
          <p>© {new Date().getFullYear()} COMPANY NAME. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}
