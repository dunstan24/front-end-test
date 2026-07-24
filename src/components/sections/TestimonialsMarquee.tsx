import React from "react";
import defaultData from "@/data/marquee-testimonials.json";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialsMarqueeProps {
  data?: typeof defaultData | typeof defaultData.items;
}

export default function TestimonialsMarquee({ data = defaultData }: TestimonialsMarqueeProps) {
  // Support both array and object data structure
  const marqueeData = Array.isArray(data) ? { header: defaultData.header, items: data } : data;
  const doubleTestimonials = [...marqueeData.items, ...marqueeData.items];

  return (
    <section className="py-12 border-y border-zinc-900 bg-black relative overflow-hidden">
      {/* Section Sub-header Text */}
      <div className="text-center space-y-1 mb-8 px-4">
        <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold font-mono">
          <Star className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
          <span>{marqueeData.header.ratingText}</span>
        </div>
        <h3 className="text-xs uppercase tracking-widest font-extrabold text-zinc-400">
          {marqueeData.header.title}
        </h3>
      </div>

      {/* Left and Right Fade Gradients */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Marquee Ticker */}
      <div className="flex overflow-hidden group">
        <div className="flex gap-4 animate-marquee group-hover:[animation-play-state:paused] shrink-0">
          {doubleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-80 sm:w-96 p-4 sm:p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-colors flex flex-col justify-between shrink-0"
            >
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-none" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                  "{item.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-900 mt-4 text-left">
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-zinc-800 bg-zinc-900 shrink-0">
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
                  <p className="text-[11px] text-zinc-500 truncate">
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
