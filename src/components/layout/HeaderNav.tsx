"use client";

import React, { useState, useEffect, useCallback } from "react";
import { LogoIcon, XIcon, YouTubeIcon, CloseIcon, HamburgerIcon } from "@/components/ui/Icons";
import { SOCIAL_LINKS } from "@/lib/constants";

interface HeaderNavProps {
  onQuiz: () => void;
}

const NAV_LINKS = ["Templates", "Live examples", "Support", "Blog"];

export default function HeaderNav({ onQuiz }: HeaderNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "#000",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-900"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <LogoIcon className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold text-white tracking-tight">Browser.supply</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" className="text-[13px] text-zinc-400 hover:text-white transition-colors">
              {l}
            </a>
          ))}
        </nav>

        {/* Right: Social + Bundle */}
        <div className="hidden md:flex items-center gap-4">
          <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Follow us on X">
            <XIcon />
          </a>
          <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" aria-label="Subscribe on YouTube">
            <YouTubeIcon />
          </a>
          <a href="#pricing" className="px-4 py-1.5 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-zinc-100 transition-colors">
            Bundle
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-zinc-400"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <HamburgerIcon />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-zinc-900 px-5 pb-6 pt-4 space-y-4">
          {NAV_LINKS.map((l) => (
            <a key={l} href="#" onClick={closeMobile} className="block text-sm text-zinc-400 hover:text-white py-1">
              {l}
            </a>
          ))}
          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <div className="flex gap-3">
              <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white" aria-label="Follow us on X">
                <XIcon />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white" aria-label="Subscribe on YouTube">
                <YouTubeIcon />
              </a>
            </div>
            <a href="#pricing" onClick={closeMobile} className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold">
              Bundle
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
