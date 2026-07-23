import React from "react";
import defaultTestimonialsData from "@/data/testimonials.json";
import { Star, CheckCircle, MessageSquareQuote } from "lucide-react";
import Image from "next/image";
import type { TestimonialsData } from "@/lib/data";

interface TestimonialsGridProps {
  data?: TestimonialsData;
}

export default function TestimonialsGrid({ data = defaultTestimonialsData }: TestimonialsGridProps) {
  const testimonialsGridData = data;

  return (
    <section id="testimonials-grid" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-pink/10 border border-accent-pink/20 text-xs font-semibold text-accent-pink">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>{testimonialsGridData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {testimonialsGridData.header.title}
        </h2>
        <p className="text-brand-muted text-base leading-relaxed">
          {testimonialsGridData.header.subtitle}
        </p>
      </div>

      {/* Testimonials 3-Column Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonialsGridData.grid.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl bg-surface-card border border-white/10 hover:border-white/20 transition-all duration-300 p-6 flex flex-col justify-between space-y-6 shadow-xl shadow-black/30 hover:-translate-y-1"
          >
            <div className="space-y-4">
              {/* Stars & Template Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-brand-muted">
                  {item.templateUsed}
                </span>
              </div>

              {/* Quote text */}
              <p className="text-sm text-zinc-300 leading-relaxed font-normal">
                "{item.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 pt-4 border-t border-white/5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="truncate flex-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {item.name}
                  </h4>
                  {item.verified && (
                    <CheckCircle className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                  )}
                </div>
                <p className="text-[11px] text-brand-muted truncate">
                  {item.role} • {item.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
