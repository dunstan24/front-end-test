"use client";

import React, { useState } from "react";
import defaultHeroData from "@/data/hero.json";
import { Star, Zap } from "lucide-react";
import Image from "next/image";
import type { HeroData } from "@/lib/data";
import HeroQuizModal from "@/components/ui/HeroQuizModal";

interface HeroSectionProps {
  data?: HeroData;
}

/**
 * HeroSection Component
 * Replicates the exact left-aligned hero layout of browser.supply:
 * - Top Left Badge: ⚡ FRAMER TEMPLATES
 * - Headline (Left aligned): "No back-and-forth with AI. Pick, edit, publish."
 * - Hero Actions (Flex Row):
 *   - Left: "Pick your template" (White pill) + "Or get matched with the perfect one" (Dark pill)
 *   - Right: Avatars stack + ★ RATED 4.92/5
 */
export default function HeroSection({ data = defaultHeroData }: HeroSectionProps) {
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const heroData = data;

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      <div className="space-y-8 max-w-4xl">
        {/* Top Left Badge: FRAMER TEMPLATES */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          <Zap className="w-3 h-3 fill-blue-400 stroke-none" />
          <span>{heroData.topBadge.text}</span>
        </div>

        {/* Headline (Left Aligned, White Text) */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
          <span className="block">{heroData.headline.line1}</span>
          <span className="block">{heroData.headline.line2}</span>
        </h1>

        {/* Hero Actions Row: Buttons on Left + Rating on Right */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
          {/* Left: Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={heroData.ctas.primary.href}
              className="px-6 py-3.5 text-xs font-semibold rounded-full bg-white text-black hover:bg-zinc-200 transition-all text-center"
            >
              {heroData.ctas.primary.text}
            </a>

            <button
              onClick={() => setIsQuizModalOpen(true)}
              className="px-6 py-3.5 text-xs font-semibold rounded-full bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 transition-all text-center"
            >
              {heroData.ctas.secondary.text}
            </button>
          </div>

          {/* Right: Rating & Avatar Stack */}
          <div className="flex items-center gap-3">
            {/* Avatars Stack */}
            <div className="flex items-center -space-x-2 overflow-hidden">
              {heroData.rating.avatars.map((img, i) => (
                <div
                  key={i}
                  className="inline-block h-7 w-7 rounded-full ring-2 ring-black relative overflow-hidden bg-zinc-800"
                >
                  <Image src={img} alt="User Avatar" fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Rating Text */}
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
              <span>{heroData.rating.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Quiz Full-Screen Modal */}
      <HeroQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        data={heroData.quizModal}
      />
    </section>
  );
}
