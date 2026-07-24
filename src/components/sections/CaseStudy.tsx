import React from "react";
import defaultCaseStudyData from "@/data/case-study.json";
import { TrendingUp, ArrowUpRight, Play, Quote } from "lucide-react";
import Image from "next/image";
import type { CaseStudyData } from "@/lib/data";

interface CaseStudyProps {
  data?: CaseStudyData;
}

/**
 * CaseStudy Component
 * Displays a customer spotlight case study with key metrics, founder quote, and video preview.
 */
export default function CaseStudy({ data = defaultCaseStudyData }: CaseStudyProps) {
  const caseStudyData = data;

  return (
    <section id="case-study" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl bg-surface-card border border-white/10 overflow-hidden shadow-2xl p-8 sm:p-12 lg:p-16">
        {/* Background Radial Accent Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{caseStudyData.badge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              {caseStudyData.headline}
            </h2>

            <p className="text-brand-muted text-base sm:text-lg leading-relaxed font-normal">
              Case study: <span className="text-white font-medium">{caseStudyData.client}</span>
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-b border-white/5 py-6">
              {caseStudyData.metrics.map((metric, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-gradient-purple">
                    {metric.value}
                  </div>
                  <div className="text-xs text-brand-muted font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Founder Quote */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
              <Quote className="w-8 h-8 text-accent-purple shrink-0 opacity-60" />
              <div className="space-y-2">
                <p className="text-xs sm:text-sm text-zinc-300 italic">
                  "{caseStudyData.quote}"
                </p>
                <div className="text-xs font-semibold text-white">
                  {caseStudyData.author} — <span className="text-brand-muted font-normal">{caseStudyData.authorRole}</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <a
                href="#templates"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md"
              >
                <span>Explore featured templates</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Case Study Preview Video/Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-white/10 bg-zinc-950 overflow-hidden shadow-2xl group">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={caseStudyData.image}
                  alt={caseStudyData.headline}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Play Video Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                    <Play className="w-6 h-6 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-left">
                  Watch case study video breakdown
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
