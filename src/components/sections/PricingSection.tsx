import React from "react";
import defaultPricingData from "@/data/pricing.json";
import { Check, Zap, ShieldCheck } from "lucide-react";
import type { PricingData } from "@/lib/data";

interface PricingSectionProps {
  data?: PricingData;
}

export default function PricingSection({ data = defaultPricingData }: PricingSectionProps) {
  const pricingData = data;

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple">
          <Zap className="w-3.5 h-3.5" />
          <span>{pricingData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {pricingData.header.title}
        </h2>
        <p className="text-brand-muted text-base leading-relaxed">
          {pricingData.header.subtitle}
        </p>
      </div>

      {/* Pricing Cards Grid (3 Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {pricingData.tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
              tier.highlight
                ? "bg-gradient-to-b from-surface-card to-zinc-950 border-2 border-accent-purple shadow-2xl shadow-purple-950/40 lg:-translate-y-3"
                : "bg-surface-card border border-white/10 hover:border-white/20 shadow-xl"
            }`}
          >
            {/* Highlight Ribbon / Badge */}
            {tier.badge && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="px-4 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-gradient-to-r from-accent-purple to-accent-indigo text-white shadow-lg border border-white/20">
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="space-y-6">
              {/* Header Info */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {tier.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="space-y-1 pt-2 border-t border-white/5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    {tier.price}
                  </span>
                </div>
                <span className="text-xs text-brand-subtle block font-medium">
                  {tier.billing}
                </span>
              </div>

              {/* CTA Button */}
              <a
                href={tier.ctaHref}
                className={`w-full py-3.5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                  tier.highlight
                    ? "bg-white text-black hover:bg-zinc-200 shadow-white/10"
                    : "bg-white/5 hover:bg-white text-white hover:text-black border border-white/10"
                }`}
              >
                <span>{tier.ctaText}</span>
              </a>

              {/* Features List */}
              <div className="pt-6 border-t border-white/5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-subtle block">
                  What's included
                </span>
                <ul className="space-y-2.5">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-accent-purple shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Money-back guarantee note */}
            <div className="pt-6 mt-6 border-t border-white/5 text-center flex items-center justify-center gap-1.5 text-[11px] text-brand-subtle">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>14-day 100% money-back guarantee</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
