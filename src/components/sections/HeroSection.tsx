import React from "react";
import defaultHeroData from "@/data/hero.json";
import { Star, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { HeroData } from "@/lib/data";

interface HeroSectionProps {
  data?: HeroData;
}

export default function HeroSection({ data = defaultHeroData }: HeroSectionProps) {
  const heroData = data;

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-purple/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-medium text-brand-muted backdrop-blur-md">
          <div className="flex items-center gap-1 text-amber-400">
            {[...Array(heroData.rating.starCount)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
            ))}
          </div>
          <span className="text-white font-semibold">{heroData.rating.score}</span>
          <span className="text-brand-subtle">•</span>
          <span>{heroData.rating.reviews}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          <span className="text-white block">{heroData.headline.primary}</span>
          <span className="text-gradient-purple block mt-1">{heroData.headline.highlight}</span>
        </h1>

        {/* Description */}
        <p className="text-brand-muted text-base sm:text-lg md:text-xl max-w-2xl font-normal leading-relaxed">
          {heroData.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
          <a
            href={heroData.ctas.primary.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-lg shadow-white/10"
          >
            <span>{heroData.ctas.primary.text}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={heroData.ctas.secondary.href}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            <span>{heroData.ctas.secondary.text}</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple font-bold border border-accent-purple/30">
              {heroData.ctas.secondary.badge}
            </span>
          </a>
        </div>

        {/* Trust Tags */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-brand-muted pt-2">
          {heroData.showcase.tags.map((tag, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple" />
              <span>{tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Browser Showcase Mockup */}
      <div className="mt-14 relative max-w-5xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-surface-card overflow-hidden shadow-2xl shadow-purple-900/10 backdrop-blur-xl">
          {/* Browser Bar */}
          <div className="px-4 py-3 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="px-4 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-brand-muted flex items-center gap-2 font-mono max-w-xs truncate">
              <Sparkles className="w-3 h-3 text-accent-purple" />
              <span>browser.supply/studio</span>
            </div>
            <div className="w-12" />
          </div>

          {/* Image Showcase */}
          <div className="relative aspect-[16/9] w-full bg-zinc-950 overflow-hidden">
            <Image
              src={heroData.showcase.image}
              alt={heroData.showcase.title}
              fill
              className="object-cover object-top opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-transparent to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </section>
  );
}
