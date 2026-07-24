// Server Component — no hooks or interactivity needed

import Image from "next/image";
import { VIDEO_SOURCES } from "@/lib/constants";

export default function HowItWorks() {
  return (
    <section className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Top Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          HOW DOES IT WORK?
        </span>
      </div>

      {/* Section Headline */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-12">
        Go live within 1 hour, not<br />months, weeks or even days.
      </h2>

      {/* 3-Step Unified Bento Grid Box */}
      <div className="rounded-3xl bg-[#050507] border border-zinc-800/80 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80 shadow-2xl">
        
        {/* CARD 1 (STEP 1: Pick a template) */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group">
          <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-85 z-0 transition-transform duration-700 group-hover:scale-105">
            <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

          <div className="relative z-20 self-start">
            <span className="px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 1
            </span>
          </div>

          <div className="space-y-1.5 relative z-20 text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Pick a template.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-[280px]">
              Browse the collection of expert-crafted templates and select one best for you.
            </p>
          </div>
        </div>

        {/* CARD 2 (STEP 2: Make it yours) */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group text-left">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0b0c10] border border-zinc-800 p-2.5 mb-6 shadow-2xl flex flex-col justify-between">
            <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-80 z-0">
              <source src={VIDEO_SOURCES.flower} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

            <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono border-b border-zinc-800 pb-1.5 relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                <span className="text-white font-bold">Framer Studio</span>
              </div>
              <span className="text-zinc-500">Canvas 100%</span>
            </div>

            <div className="space-y-1 py-1 relative z-20">
              <div className="text-[10px] font-extrabold text-white">DESIGNING + BUILDING</div>
              <div className="text-[9px] font-extrabold text-white">HIGH-PERFORMING WEBSITES</div>
              <div className="inline-block px-2 py-0.5 rounded bg-orange-600 text-[6px] font-bold text-white uppercase shadow">
                LET&apos;S START BUILDING YOURS
              </div>
            </div>

            <div className="bg-[#14151c]/90 p-2 rounded-lg border border-zinc-800 flex items-center justify-between relative z-20 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 border border-white/20"></span>
                <span className="text-[9px] text-zinc-200 font-medium">Accent Color #3B82F6</span>
              </div>
              <span className="text-[8px] text-zinc-500 font-mono">Variables</span>
            </div>
          </div>

          <div className="space-y-3 relative z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 2
            </span>
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Make it yours.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Change text, customize colors, and swap images with ease.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3 (STEP 3: Go live instantly) */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group text-left">
          <div className="space-y-3 mb-4 relative z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 3
            </span>
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Go live instantly.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Launch your site in seconds with just one click, all in one platform.
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0b0c10] border border-zinc-800 p-2.5 shadow-2xl flex flex-col justify-end">
            <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-80 z-0">
              <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

            <div className="bg-[#14151c]/95 p-2.5 rounded-lg border border-zinc-800 flex items-center justify-between relative z-20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-white font-medium">Domain: browser.supply</span>
              </div>
              <button className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow-md flex items-center gap-1 transition">
                Publish
              </button>
              <div className="absolute right-4 -bottom-1 z-30 pointer-events-none transform translate-x-1 translate-y-1">
                <svg className="w-5 h-5 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L9.34 15.02L5.88 18.48C5.46 18.9 4.75 18.6 4.75 18.01V2.99C4.75 2.4 5.46 2.1 5.88 2.52L17.38 14.02C17.8 14.44 17.5 15.15 16.91 15.15H12.44L15.41 21.63C15.65 22.13 15.44 22.73 14.94 22.97L13.64 21.97Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
