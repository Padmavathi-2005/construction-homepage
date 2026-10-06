"use client";

import React from "react";

interface ProcessStep {
  number: string;
  stepLabel: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  imageShape: "step1" | "step2" | "step3";
  tags: string[];
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    stepLabel: "STEP 01",
    title: "Launch Agreement",
    description:
      "Our Launch Agreement serves as a testament to our commitment to excellence, transparent timelines, and our unwavering dedication to delivering exceptional structural results.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    alt: "Modern luxury completed architectural residence with warm ambient illumination",
    imageShape: "step1",
    tags: ["Scope", "Timeline", "Budget"],
  },
  {
    number: "02",
    stepLabel: "STEP 02",
    title: "Land Survey & Topography",
    description:
      "Our Land Survey process begins with a rigorous examination of the property, evaluating legal boundaries, topography, and sub-soil bedrock using high-precision surveying instruments.",
    image: "https://images.unsplash.com/photo-1526593740665-f57a5d42dd0a?auto=format&fit=crop&w=900&q=80",
    alt: "Professional land surveyor with theodolite on construction site",
    imageShape: "step2",
    tags: ["Boundaries", "Soil Test", "Levels"],
  },
  {
    number: "03",
    stepLabel: "STEP 03",
    title: "Architectural Floor Plan",
    description:
      "Our Floor Plan process provides a solid structural foundation for your project, transforming conceptual ideas into meticulous architectural drafts, spatial elevations, and structural schematics.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
    alt: "Architect drafting detailed building blueprint floor plans with architectural miniature model",
    imageShape: "step3",
    tags: ["Drafts", "Elevations", "Structure"],
  },
];

/* Outlined editorial step numeral */
function StepNumber({ step }: { step: ProcessStep }) {
  return (
    <div className="flex flex-col items-start text-left shrink-0">
      <span className="font-mono text-[11px] font-semibold tracking-[0.26em] text-[#E85D1A] uppercase block mb-1">
        {step.stepLabel}
      </span>
      <span className="font-serif text-7xl xl:text-8xl font-normal leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_#133E63] transition-colors duration-500 group-hover/step:text-[#133E63]">
        {step.number}
      </span>
    </div>
  );
}

/* White content card */
function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div className="relative max-w-lg rounded-2xl bg-white/90 backdrop-blur-sm border border-[#133E63]/10 p-7 xl:p-8 shadow-[0_18px_40px_-18px_rgba(19,62,99,0.25)] transition-all duration-500 group-hover/step:-translate-y-1 group-hover/step:shadow-[0_26px_50px_-18px_rgba(19,62,99,0.35)]">
      {/* Top accent bar */}
      <div aria-hidden="true" className="absolute top-0 left-7 right-7 h-[3px] rounded-b-full bg-gradient-to-r from-[#133E63] via-[#2C6A9E] to-[#E85D1A]" />
      <h3 className="font-serif text-3xl xl:text-[34px] font-normal text-[#0C2340] leading-tight mb-3 tracking-tight">
        {step.title}
      </h3>
      <div className="w-10 h-[2.5px] bg-[#E85D1A] mb-4 transition-all duration-500 group-hover/step:w-16" />
      <p className="text-[#4F5B68] text-[15px] xl:text-base leading-relaxed">
        {step.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-5">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-[#133E63] bg-[#EAF1F8] border border-[#133E63]/10 rounded-full px-3 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Clipped architectural image */
function StepImage({ step, side }: { step: ProcessStep; side: "left" | "right" }) {
  const clip =
    side === "left"
      ? "[clip-path:polygon(0_0,100%_0,100%_100%,28px_100%,0_calc(100%-28px))]"
      : "[clip-path:polygon(42px_0,100%_0,100%_100%,0_100%,0_42px)]";
  return (
    <div className="relative shrink-0">
      {/* Offset blueprint frame */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border border-[#133E63]/20 rounded-sm ${side === "left" ? "translate-x-3 translate-y-3" : "-translate-x-3 translate-y-3"}`}
      />
      <div
        aria-hidden="true"
        className={`absolute -bottom-2 w-10 h-10 border-b-[3.5px] border-[#E85D1A] z-20 pointer-events-none ${side === "left" ? "-left-2 border-l-[3.5px]" : "-right-2 border-r-[3.5px]"}`}
      />
      <div className={`relative w-72 sm:w-80 xl:w-[410px] aspect-[16/11] overflow-hidden bg-slate-200 shadow-[0_22px_45px_-15px_rgba(19,62,99,0.35)] ${clip}`}>
        <img
          src={step.image}
          alt={step.alt}
          loading="lazy"
          className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover/step:scale-105"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/25 via-transparent to-transparent" />
      </div>
    </div>
  );
}

export default function ProcessSection() {
  return (
    <section
      id="process"
      className="relative w-full bg-[linear-gradient(180deg,#EAF1F8_0%,#F5F8FC_45%,#EDF3F9_100%)] text-[#0C2340] py-20 sm:py-24 lg:py-28 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 overflow-hidden border-t border-[#133E63]/10"
    >
      {/* ================= BLUEPRINT GRID BACKGROUND ================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.5] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(19,62,99,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(19,62,99,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Soft colour glows */}
      <div aria-hidden="true" className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#2C6A9E]/10 blur-3xl pointer-events-none" />
      <div aria-hidden="true" className="absolute -bottom-40 -right-32 w-[520px] h-[520px] rounded-full bg-[#E85D1A]/[0.07] blur-3xl pointer-events-none" />

      {/* Topographic Contour Linework (Bottom Left) */}
      <svg
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none opacity-40 select-none"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path d="M-50 400 C 50 350, 100 280, 180 300 C 260 320, 320 250, 400 280" stroke="#9DB4CC" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M-80 360 C 20 310, 80 240, 150 260 C 220 280, 280 210, 370 240" stroke="#9DB4CC" strokeWidth="1" />
        <path d="M-100 320 C 0 270, 60 200, 130 220 C 200 240, 260 170, 350 200" stroke="#9DB4CC" strokeWidth="0.8" />
        <path d="M-120 280 C -20 230, 40 160, 110 180 C 180 200, 240 130, 330 160" stroke="#9DB4CC" strokeWidth="0.6" />
      </svg>

      {/* ================= PENCIL BUILDING SKETCHES ================= */}
      {/* Villa sketch — top left, beside the heading */}
      <img
        src="/images/sketches/villa.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute top-6 -left-10 lg:left-0 w-[360px] lg:w-[440px] xl:w-[500px] mix-blend-multiply opacity-[0.28] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]"
      />

      {/* Tower + crane sketch — right side, middle */}
      <img
        src="/images/sketches/tower.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute top-[34%] -right-16 lg:-right-8 w-[300px] lg:w-[360px] xl:w-[400px] mix-blend-multiply opacity-[0.24] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_75%)]"
      />

      {/* Apartment sketch — bottom left */}
      <img
        src="/images/sketches/apartment.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-[520px] lg:w-[640px] xl:w-[720px] mix-blend-multiply opacity-[0.22] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20 lg:mb-24">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.26em] uppercase text-[#E85D1A] mb-4">
            <span className="w-6 h-px bg-[#E85D1A]" />
            How We Build
            <span className="w-6 h-px bg-[#E85D1A]" />
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal text-[#0C2340] tracking-[-0.02em] leading-[1.1] max-w-3xl">
            A precise process, from agreement to blueprint
          </h2>
          <p className="mt-5 text-[#4F5B68] text-base sm:text-lg leading-relaxed max-w-2xl">
            Every Amogha project follows a disciplined, transparent path, so you always know what&apos;s next.
          </p>
        </div>

        {/* ================= BILATERAL ALTERNATING TIMELINE ================= */}
        <div className="relative">
          {/* Center vertical timeline line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] rounded-full bg-gradient-to-b from-[#133E63]/10 via-[#133E63]/40 to-[#E85D1A]/50 pointer-events-none"
          />

          <div className="flex flex-col space-y-20 sm:space-y-28 lg:space-y-32">
            {PROCESS_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={step.number} className="relative group/step">
                  {/* ================= DESKTOP LAYOUT (lg+) ================= */}
                  <div className="hidden lg:grid grid-cols-2 items-center">
                    {/* LEFT COLUMN */}
                    <div className="relative flex items-center pr-10 xl:pr-14">
                      {isEven ? (
                        <div className="flex items-center justify-end gap-6 xl:gap-8 w-full">
                          <StepImage step={step} side="left" />
                          <StepNumber step={step} />
                        </div>
                      ) : (
                        <div className="flex justify-end w-full">
                          <StepCard step={step} />
                        </div>
                      )}
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="relative flex items-center pl-10 xl:pl-14">
                      {isEven ? (
                        <StepCard step={step} />
                      ) : (
                        <div className="flex items-center justify-start gap-6 xl:gap-8 w-full">
                          <StepNumber step={step} />
                          <StepImage step={step} side="right" />
                        </div>
                      )}
                    </div>

                    {/* CENTER TIMELINE NODE MARKER */}
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-[1.5px] border-[#133E63]/30 bg-white shadow-[0_0_0_6px_rgba(234,241,248,0.9)] flex items-center justify-center z-30 transition-transform duration-500 group-hover/step:scale-110"
                    >
                      <span className="absolute inset-0 rounded-full bg-[#E85D1A]/20 animate-ping [animation-duration:2.5s]" />
                      <span className="relative w-3 h-3 rounded-full bg-[#E85D1A]" />
                    </div>
                  </div>

                  {/* ================= MOBILE / TABLET LAYOUT (< lg) ================= */}
                  <div className="lg:hidden flex flex-col rounded-2xl bg-white/90 border border-[#133E63]/10 shadow-[0_18px_40px_-18px_rgba(19,62,99,0.25)] overflow-hidden">
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        className="w-full h-full object-cover select-none"
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0C2340]/55 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-5 flex items-end gap-3">
                        <span className="font-serif text-5xl font-normal text-white leading-none">{step.number}</span>
                        <span className="font-mono text-[11px] font-semibold tracking-[0.24em] text-[#FFB48A] uppercase pb-1">
                          {step.stepLabel}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-serif text-2xl font-normal text-[#0C2340] tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <div className="w-10 h-[2.5px] bg-[#E85D1A] mb-3" />
                      <p className="text-[#4F5B68] text-[15px] leading-relaxed">{step.description}</p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {step.tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-[#133E63] bg-[#EAF1F8] border border-[#133E63]/10 rounded-full px-3 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
