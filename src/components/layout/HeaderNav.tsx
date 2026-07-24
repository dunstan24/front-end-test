"use client";

import React, { useState, useEffect } from "react";
import defaultNavData from "@/data/navigation.json";
import { Twitter, Youtube, Menu, X, Globe } from "lucide-react";
import type { NavigationData } from "@/lib/data";

interface HeaderNavProps {
  data?: NavigationData;
}

/**
 * Minimalist Sticky Header Navigation matching browser.supply reference exactly:
 * - Left: Logo icon + "Browser.supply"
 * - Center: Plain text navigation links (Templates, Live examples, Support, Blog)
 * - Right: X icon, YouTube icon, and white "Bundle" pill button
 */
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
          ? "bg-black/90 backdrop-blur-md border-b border-zinc-900 py-3 shadow-md"
          : "bg-black py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href={navData.logo.href} className="flex items-center gap-2 group">
          <Globe className="w-4 h-4 text-white group-hover:text-zinc-300 transition-colors" />
          <span className="font-semibold text-white tracking-tight text-sm sm:text-base">
            {navData.logo.text}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navData.navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social Icons & Bundle CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={navData.socialLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="X (Twitter)"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href={navData.socialLinks[1].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-1"
            aria-label="YouTube"
          >
            <Youtube className="w-4 h-4" />
          </a>

          <a
            href={navData.cta.href}
            className="px-5 py-2 text-xs font-semibold rounded-full bg-white text-black hover:bg-zinc-200 transition-all"
          >
            {navData.cta.text}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-300 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-zinc-900 px-4 py-6 space-y-4 animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navData.navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={navData.socialLinks[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={navData.socialLinks[1].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>

            <a
              href={navData.cta.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-full bg-white text-black"
            >
              {navData.cta.text}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
