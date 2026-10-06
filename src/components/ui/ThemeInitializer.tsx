"use client";

import { useEffect } from "react";

export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const c = localStorage.getItem("amogha-primary-color");
      if (
        !c ||
        c.toLowerCase() === "#f26992" ||
        c.toLowerCase() === "#0b5147" ||
        c.toLowerCase() === "#7047eb"
      ) {
        localStorage.setItem("amogha-primary-color", "#133E63");
        document.documentElement.style.setProperty("--primary", "#133E63");
        document.documentElement.style.setProperty("--primary-hover", "#0D2E4A");
        document.documentElement.style.setProperty(
          "--primary-glow",
          "rgba(19, 62, 99, 0.25)"
        );
      } else if (c) {
        document.documentElement.style.setProperty("--primary", c);
      }
    } catch {
      // Ignore localStorage exceptions in private browsing
    }
  }, []);

  return null;
}
