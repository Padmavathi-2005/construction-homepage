"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Lock, Mail, ArrowRight, Loader2, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin";

  const [email, setEmail] = useState("admin@amoghadevelopers.com");
  const [password, setPassword] = useState("AmoghaAdmin2026!");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(from);
        router.refresh();
      } else {
        setErrorMsg(data.error || "Authentication failed");
      }
    } catch {
      setErrorMsg("Network error during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-md border border-stone-200/90 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-8 sm:p-10 select-none">
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <img
          src="/images/amogha-logo-transparent.png"
          alt="Amogha Construction & Infrastructure"
          className="h-20 w-auto object-contain mb-4"
        />

        {/* Taste Skill Style Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f26992]/10 border border-[#f26992]/25 text-[#f26992] text-[11px] font-medium mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f26992] animate-pulse" />
          <span>Architecture CMS Portal</span>
        </div>

        <h1 className="text-2xl font-serif font-normal text-stone-900 tracking-tight">
          Amogha Developers
        </h1>
        <p className="text-xs font-sans text-stone-500 mt-1">
          Sign in to manage the cinematic hero scroll timeline
        </p>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-900 text-xs font-sans rounded-2xl flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
            Admin Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5]/60 text-sm font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
              placeholder="admin@amoghadevelopers.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase tracking-wider text-stone-700 mb-1.5 font-medium">
            Access Key / Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-200 bg-[#FAF8F5]/60 text-sm font-sans focus:border-[#f26992] focus:ring-2 focus:ring-[#f26992]/20 focus:outline-none transition-all"
              placeholder="••••••••••••"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-5 rounded-full bg-[#f26992] hover:bg-[#dc4d77] text-white text-xs font-medium shadow-[0_4px_14px_rgba(242,105,146,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to CMS Control</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Credentials helper card */}
      <div className="mt-8 p-4 bg-[#FAF8F5] border border-stone-200/80 rounded-2xl text-[11px] font-mono text-stone-500 space-y-1">
        <div className="text-stone-900 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
          <Shield className="w-3.5 h-3.5 text-[#f26992]" />
          <span>Default Super-Admin Credentials</span>
        </div>
        <div>User: admin@amoghadevelopers.com</div>
        <div>Pass: AmoghaAdmin2026!</div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-center items-center p-6 selection:bg-[#f26992] selection:text-white">
      <Suspense
        fallback={
          <div className="p-8 text-center text-xs font-mono text-stone-500">
            Loading CMS Portal...
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
