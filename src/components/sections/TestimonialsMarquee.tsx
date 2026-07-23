import React from "react";
import defaultTestimonialsData from "@/data/marquee-testimonials.json";
import { Star } from "lucide-react";
import Image from "next/image";
import type { MarqueeTestimonial } from "@/lib/data";

interface TestimonialsMarqueeProps {
  data?: MarqueeTestimonial[];
}

export default function TestimonialsMarquee({ data = defaultTestimonialsData }: TestimonialsMarqueeProps) {
  const doubleTestimonials = [...data, ...data];

  return (
    <section className="py-12 border-y border-white/5 bg-surface-dark/50 relative overflow-hidden">
      {/* Left and Right Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-surface-dark to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-surface-dark to-transparent z-10 pointer-events-none" />

      <div className="flex overflow-hidden group">
        <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
          {doubleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-80 sm:w-96 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors backdrop-blur-md flex flex-col justify-between shrink-0"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5 mt-4">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/10 bg-zinc-800 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="truncate">
                  <h4 className="text-xs font-semibold text-white truncate">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-brand-muted truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
