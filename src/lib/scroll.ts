"use client";

/**
 * Universal smooth scrolling utility for landing page sections.
 * Seamlessly integrates with Lenis smooth scroll and Hero playback state.
 */
export function scrollToSection(
  target: string,
  e?: React.MouseEvent | React.SyntheticEvent
) {
  if (e && typeof e.preventDefault === "function") {
    e.preventDefault();
  }

  if (typeof window === "undefined") return;

  // Clean the target id (e.g., "#about" -> "about", "/#about" -> "about")
  let cleanId = target.replace(/^[/#]+/, "").trim();
  if (!cleanId) cleanId = "hero";

  // If currently not on the root page, navigate back to home with hash
  if (window.location.pathname !== "/") {
    window.location.href = `/#${cleanId}`;
    return;
  }

  // Force unlock scroll from Hero if video scrubbing had locked it
  document.documentElement.classList.remove("lenis-stopped");

  // Inform Hero to mark completion and release Lenis
  try {
    (window as any).__heroProgress = 1.0;
    window.dispatchEvent(new CustomEvent("hero-progress", { detail: 1.0 }));
    window.dispatchEvent(new CustomEvent("hero-force-unlock"));
  } catch {
    // Ignore in non-browser environments
  }

  const lenis = (window as any).__lenis;
  if (lenis && typeof lenis.start === "function") {
    lenis.start();
  }

  // Handle scrolling to top
  if (cleanId === "hero" || cleanId === "top") {
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (window.history?.pushState) {
      window.history.pushState(null, "", window.location.pathname);
    }
    return;
  }

  // Find target element by primary id or fallback aliases
  let targetElement = document.getElementById(cleanId);

  if (!targetElement) {
    // Fallback aliases
    if (cleanId === "portfolio") {
      targetElement = document.getElementById("projects");
    } else if (cleanId === "projects") {
      targetElement = document.getElementById("portfolio");
    }
  }

  if (!targetElement) {
    console.warn(`Section with ID "${cleanId}" not found.`);
    return;
  }

  // Smooth scroll using Lenis if available, or native browser smooth scroll
  if (lenis && typeof lenis.scrollTo === "function") {
    lenis.scrollTo(targetElement, {
      offset: -20,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  } else {
    const y =
      targetElement.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({
      top: Math.max(0, y),
      behavior: "smooth",
    });
  }

  // Update hash without jumping
  if (window.history?.pushState) {
    window.history.pushState(null, "", `#${cleanId}`);
  }
}
