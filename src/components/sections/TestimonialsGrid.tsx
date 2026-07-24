import React from "react";
import defaultTestimonialsData from "@/data/testimonials.json";
import { Star } from "lucide-react";
import Image from "next/image";

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface SpotlightData {
  title: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  highlightQuote: string;
  image: string;
  btnPrimary: string;
  btnSecondary: string;
}

export interface TestimonialsData {
  header: {
    badge: string;
    title: string;
    btnRight?: string;
  };
  grid: TestimonialItem[];
  spotlight: SpotlightData;
}

interface TestimonialsGridProps {
  data?: TestimonialsData;
}

/**
 * TestimonialsGrid Component
 * Replicates the exact layout from the reference design:
 * - Top header with indigo badge, bold headline, and right pill button
 * - Unified rounded border container containing:
 *   - 3x3 grid of 9 testimonial cards separated by clean 1px border lines
 *   - White 5-star ratings, crisp quotes, avatars, and customer names
 *   - Matt's spotlight case study section at the bottom with founder photo & CTA buttons
 */
export default function TestimonialsGrid({ data = defaultTestimonialsData as TestimonialsData }: TestimonialsGridProps) {
  const header = data.header;
  const grid = data.grid;
  const spotlight = data.spotlight;

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto font-sans">
      {/* Top Header */}
      <div className="mb-10 text-left">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#13182b] border border-[#27335c] text-[10px] sm:text-[11px] font-bold text-[#8ba0fe] uppercase tracking-widest mb-4 shadow-sm">
          <span>{header.badge || "HAS ANYONE ELSE TRIED IT?"}</span>
        </div>

        {/* Headline & Action Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12] max-w-2xl whitespace-pre-line">
            {header.title || "Trusted by 2k+ customers\naround the globe."}
          </h2>

          <a
            href="#templates"
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md self-start md:self-auto shrink-0 flex items-center gap-1.5"
          >
            <span>{header.btnRight || "See real customer websites →"}</span>
          </a>
        </div>
      </div>

      {/* Main Container Frame */}
      <div className="rounded-3xl border border-zinc-800/90 bg-[#050507] overflow-hidden shadow-2xl">
        {/* 3x3 Grid with 1px borders dividing cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-zinc-800/80 border-b border-zinc-800/80">
          {grid.map((item) => (
            <div
              key={item.id}
              className="bg-[#050507] p-6 sm:p-7 flex flex-col justify-between space-y-6 text-left"
            >
              <div className="space-y-4">
                {/* 5 White Stars */}
                <div className="flex items-center gap-1 text-white">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-white stroke-none" />
                  ))}
                </div>

                {/* Testimonial Quote */}
                <p className="text-sm sm:text-[15px] font-medium text-zinc-100 leading-snug tracking-tight">
                  "{item.quote}"
                </p>
              </div>

              {/* Reviewer Avatar + Name */}
              <div className="flex items-center gap-3 pt-2">
                <div className="relative w-7 h-7 rounded-full overflow-hidden border border-zinc-700/60 bg-zinc-800 shrink-0">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs font-semibold text-zinc-300 truncate">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Spotlight Case Study Section (Matt's Case Study) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch bg-[#050507]">
          {/* Left Column: Photo of Founders working on laptop */}
          <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[460px] bg-zinc-900 overflow-hidden">
            <Image
              src={spotlight.image}
              alt="Matt launched his new site"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Copy & Buttons */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {spotlight.title}
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                <p>{spotlight.paragraph1}</p>
                <p>{spotlight.paragraph2}</p>
                <p>{spotlight.paragraph3}</p>
              </div>
            </div>

            {/* Dark Quote Box */}
            <div className="p-4 rounded-xl bg-[#0e0f14] border border-zinc-800/80 text-white font-semibold text-xs sm:text-sm leading-relaxed">
              "{spotlight.highlightQuote}"
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#templates"
                className="px-6 py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all text-center"
              >
                {spotlight.btnPrimary}
              </a>

              <a
                href="#case-study"
                className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-bold hover:bg-zinc-800 transition-all text-center"
              >
                {spotlight.btnSecondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
