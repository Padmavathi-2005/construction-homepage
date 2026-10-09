import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ThemeInitializer from "@/components/ui/ThemeInitializer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://construction.sangvish.com"
  ),
  title: "Amogha Construction & Infrastructure | Building the Future",
  description:
    "Building with precision, quality, and commitment. Amogha Construction & Infrastructure specializes in luxury developments, civil infrastructure, and sustainable construction engineering.",
  keywords: [
    "Amogha Construction & Infrastructure",
    "Amogha Construction",
    "Civil Infrastructure",
    "Luxury Residential Construction",
    "Structural Engineering",
    "Commercial Developments",
  ],
  authors: [{ name: "Amogha Construction & Infrastructure" }],
  openGraph: {
    title: "Amogha Construction & Infrastructure",
    description:
      "Building with precision, quality, and commitment. Premier construction, civil infrastructure, and architectural development.",
    type: "website",
    images: [{ url: "/images/amogha-logo-transparent.png", alt: "Amogha Construction & Infrastructure" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jost.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-white text-[#111111] antialiased selection:bg-[#f26a1b] selection:text-white overflow-x-hidden min-h-screen"
        style={{ fontFamily: '"Jost", var(--font-jost), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
      >
        <ThemeInitializer />
        <SmoothScroll>{children}</SmoothScroll>
        <WhatsAppButton />
      </body>
    </html>
  );
}

