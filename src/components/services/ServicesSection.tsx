"use client";

import React from "react";
import {
  Home,
  Building2,
  Armchair,
  HardHat,
  DraftingCompass,
  Hammer,
  Route,
  ClipboardCheck,
  ArrowRight,
} from "lucide-react";

interface ServiceCardData {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const SERVICES_LIST: ServiceCardData[] = [
  {
    id: "residential",
    title: "Residential Construction",
    description: "Building modern, durable and beautiful homes tailored to your lifestyle.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    alt: "Modern luxury two-storey residential villa with illuminated pool and landscape",
    icon: Home,
    href: "#contact",
  },
  {
    id: "commercial",
    title: "Commercial Construction",
    description: "Delivering high-quality commercial spaces for businesses and industries.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    alt: "Modern corporate glass and steel commercial building with landscaped plaza",
    icon: Building2,
    href: "#contact",
  },
  {
    id: "interior",
    title: "Interior Design & Build",
    description: "Creating functional and elegant interiors that enhance your space and lifestyle.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    alt: "Contemporary luxury living room interior with wooden wall panelling and ambient lighting",
    icon: Armchair,
    href: "#contact",
  },
  {
    id: "civil",
    title: "Civil Construction",
    description: "Comprehensive civil construction solutions with engineering excellence.",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=800&q=80",
    alt: "Civil engineering structural framework under construction with crane in daylight",
    icon: HardHat,
    href: "#contact",
  },
  {
    id: "architectural",
    title: "Architectural Planning",
    description: "Innovative and practical designs turning your vision into reality.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80",
    alt: "Architectural blueprints and scaled miniature building model on drawing desk",
    icon: DraftingCompass,
    href: "#contact",
  },
  {
    id: "renovation",
    title: "Renovation & Remodeling",
    description: "Transforming existing spaces with modern designs and superior craftsmanship.",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=800&q=80",
    alt: "Interior building renovation site with scaffolding, ladders and natural light",
    icon: Hammer,
    href: "#contact",
  },
  {
    id: "infrastructure",
    title: "Infrastructure Development",
    description: "Building essential infrastructure for stronger, better communities.",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    alt: "Heavy highway road paving machinery and steam rollers operating at golden hour",
    icon: Route,
    href: "#contact",
  },
  {
    id: "project-management",
    title: "Project Management",
    description: "End-to-end project management ensuring quality, safety and timely delivery.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    alt: "Civil engineer with safety helmet and digital tablet reviewing construction site",
    icon: ClipboardCheck,
    href: "#contact",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFF5EE] text-[#0C2340] pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 overflow-hidden border-t border-[#fcd7c0]/60"
    >
      {/* ================= MASTER ARCHITECT PENCIL SKETCH EMBELLISHMENTS ================= */}
      {/* 1. Large Villa Pencil Sketch (Top Right background, matching reference) */}
      <img
        src="/images/sketches/villa.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute -top-12 -right-16 lg:right-0 w-[550px] lg:w-[680px] xl:w-[760px] mix-blend-multiply opacity-[0.18] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_80%)]"
      />

      {/* 2. Commercial Tower with Crane Pencil Sketch (Far Left background) */}
      <img
        src="/images/sketches/tower.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden md:block absolute top-[38%] -left-20 lg:-left-10 w-[360px] lg:w-[420px] mix-blend-multiply opacity-[0.14] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />

      {/* 3. Apartment Complex Elevation Pencil Sketch (Bottom Right background) */}
      <img
        src="/images/sketches/apartment.jpg"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="hidden lg:block absolute -bottom-16 right-0 w-[600px] xl:w-[720px] mix-blend-multiply opacity-[0.14] pointer-events-none select-none [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />


      <div className="relative max-w-7xl mx-auto">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10 sm:mb-12">
          {/* Left Title & Eyebrow */}
          <div className="max-w-2xl">
            {/* Eyebrow with decorative drafting lines */}
            <div className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#E85D1A] mb-2.5">
              <span className="w-8 h-[1.5px] bg-[#E85D1A]" />
              <span>OUR SERVICES</span>
              <span className="w-8 h-[1.5px] bg-[#E85D1A]" />
            </div>

            {/* Main Editorial Heading with Dual Color: "Our" in Navy, "Services" in Orange */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[50px] font-normal tracking-[-0.02em] leading-[1.08]">
              <span className="text-[#0C2340]">Our </span>
              <span className="text-[#E85D1A]">Services</span>
            </h2>

            {/* Subtitle description */}
            <p className="font-sans text-[14px] sm:text-[15px] text-[#52575C] leading-relaxed mt-3 max-w-xl">
              From concept to completion, we deliver comprehensive construction solutions tailored to your needs.
            </p>
          </div>
        </div>

        {/* ================= 8-CARD ARCHITECTURAL GRID WITH COMPACT HEIGHT & HOVER REVEAL ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5 xl:gap-6">
          {SERVICES_LIST.map((service, idx) => {
            const Icon = service.icon;
            const indexNumber = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={service.id}
                className="group relative h-[255px] sm:h-[265px] rounded-[18px] overflow-hidden border border-[#E8DFC8] shadow-[0_8px_22px_rgba(12,35,64,0.06)] hover:shadow-[0_18px_40px_rgba(12,35,64,0.14)] transition-all duration-400 hover:-translate-y-1.5 cursor-pointer bg-white"
              >
                {/* ================= 1. DEFAULT STATE: COMPACT IMAGE CARD ================= */}
                <div className="absolute inset-0 w-full h-full flex flex-col justify-between bg-[#FDFBF7] z-10">
                  {/* Top Image (68% height - compact widescreen ratio) */}
                  <div className="relative w-full h-[68%] overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={service.alt}
                      loading="lazy"
                      className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                    />
                  </div>

                  {/* Bottom Title Bar (32% height - snug, zero excessive gaps) */}
                  <div className="h-[32%] px-3.5 sm:px-4 py-2 flex items-center justify-between border-t border-[#E8DFC8]/70 bg-white">
                    <div className="pr-1.5 min-w-0">
                      <span className="block font-mono text-[9px] tracking-[0.18em] uppercase font-semibold text-[#E85D1A] leading-none mb-1">
                        CAPABILITIES
                      </span>
                      <h3 className="font-serif text-[15px] sm:text-[16px] font-semibold text-[#0C2340] leading-tight tracking-tight truncate">
                        {service.title}
                      </h3>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-[#FAF5EE] border border-[#E8DFC8] flex items-center justify-center shrink-0 text-[#E85D1A] ml-2">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* ================= 2. HOVER REVEAL STATE: SLIDES IN SMOOTHLY FROM RIGHT SIDE ================= */}
                <div className="absolute inset-0 w-full h-full p-5 sm:p-6 flex flex-col justify-center bg-white text-[#0C2340] translate-x-full group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-20 pointer-events-none group-hover:pointer-events-auto border border-[#E8DFC8] shadow-[-10px_0_25px_rgba(12,35,64,0.08)]">
                  <div className="w-7 h-[2px] bg-[#E85D1A] mb-2.5 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out" />
                  <h4 className="font-serif text-[16px] sm:text-[17px] font-semibold text-[#0C2340] leading-snug tracking-tight mb-2 transform translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100 ease-out">
                    {service.title}
                  </h4>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#52575C] leading-relaxed font-normal transform translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-150 ease-out">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
