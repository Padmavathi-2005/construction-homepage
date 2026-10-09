"use client";

import React from "react";

export default function WhatsAppButton() {
  const whatsappUrl =
    "https://api.whatsapp.com/send?phone=+918300505021&text=Hi,%20I%20am%20interested%20in%20getting%20a%20website%20for%20my%20business.%20Could%20you%20please%20share%20more%20details%3F%20https://sangvish.com";

  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="fixed bottom-6 right-5 sm:bottom-7 sm:right-6 z-50 flex items-center group select-none"
    >
      {/* Tooltip / Label pill on desktop hover */}
      <div className="hidden md:flex items-center mr-2 px-2.5 py-1 rounded-full bg-[#111827]/90 text-white text-[11px] font-medium tracking-wide shadow-md border border-white/10 backdrop-blur-sm pointer-events-none transform transition-all duration-300 ease-out origin-right opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#25D366] mr-1.5 animate-pulse" />
        <span>Chat on WhatsApp</span>
      </div>

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:shadow-[0_8px_22px_rgba(37,211,102,0.55)] hover:bg-[#20ba59] transform transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#25D366]/40"
      >
        {/* Soft pulse radar waves */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping pointer-events-none"
          style={{ animationDuration: "2.4s" }}
        />

        {/* WhatsApp Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>
    </aside>
  );
}
