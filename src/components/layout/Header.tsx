/**
 * Header — Purchase Request page header with logo, title, and cart indicator.
 *
 * Features:
 * - Company logo + "Purchase Request" title
 * - Cart icon with live item count badge
 * - Mobile hamburger menu
 * - Sticky on scroll with backdrop blur
 */

"use client";

import React, { useState, useEffect } from "react";
import { CartIcon, PackageIcon } from "@/components/ui/Icons";

interface HeaderProps {
  /** Number of items in cart */
  cartCount: number;
  /** Scroll to cart section */
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "#000",
        backdropFilter: scrolled ? "blur(16px)" : "none",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-900"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <PackageIcon className="w-5 h-5 text-white" />
            <span className="text-sm font-semibold text-white tracking-tight">
              OrderHub
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-zinc-800" />
          <span className="hidden sm:block text-[11px] text-zinc-500 font-medium uppercase tracking-widest">
            Purchase Request
          </span>
        </div>

        {/* Right: Cart Button */}
        <button
          onClick={onCartClick}
          className="relative p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-zinc-900"
          aria-label={`View cart (${cartCount} items)`}
        >
          <CartIcon className="w-5 h-5" />

          {/* Cart Count Badge */}
          {cartCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 rounded-full bg-blue-500 text-[10px] font-bold text-white animate-fade-in">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
