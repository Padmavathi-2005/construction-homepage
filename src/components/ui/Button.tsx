"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon = true,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-sans uppercase tracking-[0.16em] text-xs font-medium transition-all duration-300 overflow-hidden group cursor-pointer select-none focus:outline-none";

    const sizeStyles = {
      sm: "h-10 px-5 text-[11px] gap-2",
      md: "h-12 px-7 text-xs gap-3",
      lg: "h-14 px-8 text-xs gap-3.5 tracking-[0.18em]",
    };

    const variantStyles = {
      primary:
        "bg-[var(--primary)] border border-[var(--primary)] text-white shadow-[0_2px_14px_var(--primary-glow)] hover:brightness-90 active:scale-[0.99]",
      secondary:
        "bg-white text-[#111111] hover:bg-[#F8F8F5] hover:border-[#111111] border border-[#E8E8E3] active:scale-[0.99] shadow-xs",
      outline:
        "bg-transparent text-[#111111] border border-[#111111]/20 active:scale-[0.99]",
      ghost:
        "bg-transparent text-[#555A57] hover:text-[#111111] hover:bg-black/[0.03]",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <span className="relative z-10 font-medium flex items-center">
          {children}
        </span>

        {icon && (
          <span className="relative z-10 overflow-hidden w-4 h-4 flex items-center justify-center">
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
