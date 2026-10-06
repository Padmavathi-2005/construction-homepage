"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

export default function MobileNav({ isOpen, onClose, navItems }: MobileNavProps) {
  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as const,
      },
    },
    opened: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 16 },
    opened: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.12 + i * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="opened"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-[#FFFFFF] flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-[#E8E8E3] pb-5">
            <a
              href="#hero"
              onClick={(e) => {
                onClose();
                scrollToSection("hero", e);
              }}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/images/amogha-logo-transparent.png"
                alt="Amogha Construction & Infrastructure"
                className="h-12 w-auto object-contain"
              />
            </a>

            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 border border-[#E8E8E3] hover:border-[#111111] text-[#111111] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-10 flex flex-col space-y-4">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                custom={index}
                variants={itemVariants}
                className="group border-b border-[#F1F1EC] pb-4"
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    onClose();
                    scrollToSection(item.href, e);
                  }}
                  className="flex items-center justify-between text-2xl font-sans font-medium uppercase tracking-[0.06em] text-[#111111] hover:text-[#555A57] transition-colors cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-sm font-sans text-[#8B8F8D] group-hover:text-[#111111] transition-colors">
                    ↗
                  </span>
                </a>
              </motion.div>
            ))}
          </div>

          {/* Bottom Info & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="space-y-6 pt-6 border-t border-[#E8E8E3] text-xs text-[#555A57]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-[#8B8F8D] mb-1">
                  Main Studio
                </span>
                <p className="text-[#111111] font-sans text-xs">
                  123, Prime Avenue, Commercial Zone
                </p>
                <p className="font-sans text-xs text-[#555A57]">
                  +91 98765 43210
                </p>
              </div>

              <div>
                <span className="block text-[10px] font-mono tracking-widest uppercase text-[#8B8F8D] mb-1">
                  Inquiries
                </span>
                <p className="font-sans text-xs text-[#111111]">
                  contact@examplecompany.com
                </p>
              </div>
            </div>

            {/* Minimal Rectangular ENQUIRE Button */}
            <a
              href="#contact"
              onClick={(e) => {
                onClose();
                scrollToSection("contact", e);
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#133E63] text-white hover:bg-[#F26A1B] text-xs font-sans font-medium tracking-[0.12em] uppercase transition-all duration-300 rounded-[6px] shadow-sm cursor-pointer"
            >
              <span>ENQUIRE</span>
              <span>↗</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
