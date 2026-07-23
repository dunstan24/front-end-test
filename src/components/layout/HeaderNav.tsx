"use client";

import React, { useState, useEffect } from "react";
import defaultNavData from "@/data/navigation.json";
import { Twitter, Youtube, Menu, X, ArrowUpRight } from "lucide-react";
import type { NavigationData } from "@/lib/data";

interface HeaderNavProps {
  data?: NavigationData;
}

export default function HeaderNav({ data = defaultNavData }: HeaderNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navData = data;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-surface-glass backdrop-blur-xl border-b border-border-subtle py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={navData.logo.href} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-purple via-accent-indigo to-accent-cyan p-[1px] shadow-sm">
            <div className="w-full h-full bg-surface-dark rounded-[7px] flex items-center justify-center font-bold text-xs text-white group-hover:bg-transparent transition-colors">
              BS
            </div>
          </div>
          <span className="font-semibold text-white tracking-tight text-sm sm:text-base group-hover:text-accent-purple transition-colors">
            {navData.logo.text}
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-muted">
            {navData.logo.badge}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
          {navData.navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-brand-muted hover:text-white hover:bg-white/5 rounded-full transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons & CTA */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 border-r border-white/10 pr-3">
            <a
              href={navData.socialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label={navData.socialLinks[0].label}
            >
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a
              href={navData.socialLinks[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted hover:text-white hover:bg-white/10 transition-colors"
              aria-label={navData.socialLinks[1].label}
            >
              <Youtube className="w-3.5 h-3.5" />
            </a>
          </div>

          <a
            href={navData.cta.href}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-md shadow-white/10"
          >
            <span>{navData.cta.text}</span>
            <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full font-bold">
              {navData.cta.badge}
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-dark border-b border-border-subtle px-4 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-2">
            {navData.navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-brand-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={navData.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={navData.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-muted"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <a
              href={navData.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full bg-white text-black"
            >
              <span>{navData.cta.text}</span>
              <span className="text-[10px] bg-black text-white px-1.5 py-0.5 rounded-full font-bold">
                {navData.cta.badge}
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
