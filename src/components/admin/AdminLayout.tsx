"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Layers,
  Image as ImageIcon,
  LayoutDashboard,
  Eye,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  actions,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/auth/me")
      .then((res) => {
        if (!res.ok) {
          router.push(`/admin/login?from=${pathname}`);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setAdminUser(data.user);
      })
      .catch(() => {
        router.push(`/admin/login?from=${pathname}`);
      });
  }, [pathname, router]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const navLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Hero Sequence", href: "/admin/hero", icon: Layers },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Live Hero Preview", href: "/admin/hero/preview", icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#18181B] flex flex-col font-sans selection:bg-[#f26992] selection:text-white">
      {/* Top Floating / Pill Navigation Bar (Taste Skill Aesthetic) */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-[#E8E6DF]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Brand Capsule */}
          <Link
            href="/admin"
            className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-white/90 border border-stone-200/90 shadow-[0_1px_3px_rgba(0,0,0,0.03)] hover:border-[#f26992]/40 hover:shadow-sm transition-all group"
          >
            <img src="/images/amogha-mark.png" alt="Amogha" className="w-7 h-7 object-contain" />
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-semibold text-xs tracking-wider uppercase text-stone-900 group-hover:text-[#f26992] transition-colors">
                Amogha
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium border border-stone-200/60">
                CMS
              </span>
            </div>
          </Link>

          {/* Center Floating Pill Navigation (Like Taste Skill's Header Nav) */}
          <nav className="hidden md:flex items-center bg-[#EBE7DF]/70 backdrop-blur-md p-1 rounded-full border border-stone-300/40 shadow-xs gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${
                    isActive
                      ? "bg-white text-stone-950 shadow-xs font-semibold"
                      : "text-stone-600 hover:text-stone-950 hover:bg-white/50 font-medium"
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 transition-colors ${
                      isActive ? "text-[#f26992]" : "text-stone-400"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-2.5">
            {/* View Live Site Pill */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-stone-200/80 bg-white/80 hover:bg-white text-xs font-medium text-stone-700 hover:text-stone-950 shadow-2xs hover:shadow-xs transition-all"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </Link>

            {/* High-Contrast Admin Pill (Inspired by Taste Skill GitHub Pill) */}
            {adminUser && (
              <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] text-white text-xs font-medium shadow-xs border border-stone-800">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f26992] animate-pulse" />
                <Shield className="w-3 h-3 text-[#f26992]" />
                <span className="truncate max-w-[130px] font-mono text-[11px] text-stone-300">
                  {adminUser.email}
                </span>
              </div>
            )}

            {/* Sign Out Pill Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200/80 bg-white/80 hover:bg-red-50 hover:border-red-200 hover:text-red-600 text-xs font-medium text-stone-600 shadow-2xs transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-stone-200 bg-white text-stone-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E6DF] bg-[#FAF8F5] p-4 space-y-2">
            <div className="bg-[#EBE7DF]/60 p-1.5 rounded-2xl space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2.5 px-3.5 py-2 text-xs rounded-xl font-medium transition-colors ${
                      isActive
                        ? "bg-white text-stone-950 font-semibold shadow-xs"
                        : "text-stone-600 hover:bg-white/40"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${isActive ? "text-[#f26992]" : "text-stone-400"}`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between px-2">
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-stone-900"
              >
                <span>View Live Site</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </Link>
              {adminUser && (
                <span className="text-[11px] font-mono text-stone-500 truncate max-w-[160px]">
                  {adminUser.email}
                </span>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Page Header (Taste Skill Aesthetic with Pill Badge & Editorial Title) */}
      {title && (
        <div className="border-b border-[#E8E6DF]/70 bg-gradient-to-b from-[#FAF8F5] to-[#F3EFE7]/50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                {/* Taste Skill Style Pill Tag */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f26992]/10 border border-[#f26992]/25 text-[#f26992] text-xs font-medium shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f26992] animate-pulse" />
                  <span>Architecture CMS • Control Engine</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal text-stone-900 tracking-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm font-sans text-stone-600 max-w-2xl leading-relaxed">
                    {subtitle}
                  </p>
                )}
              </div>

              {actions && (
                <div className="flex flex-wrap items-center gap-2.5">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white/60 border-t border-[#E8E6DF]/70 py-4 text-[11px] font-mono text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f26992]" />
            <span>AMOGHA DEVELOPERS // HERO CMS VERSION 3.2.0</span>
          </div>
          <span>POSTGRESQL + PRISMA + SUPABASE STORAGE</span>
        </div>
      </footer>
    </div>
  );
}
