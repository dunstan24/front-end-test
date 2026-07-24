// Server Component — no hooks or interactivity needed

import Image from "next/image";
import { VIDEO_SOURCES } from "@/lib/constants";

export default function WhyTemplates() {
  return (
    <section className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Section Headline */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-10">
        Everything you need to launch.<br />All in one place, not a stack.
      </h2>

      {/* Unified Bento Grid Box */}
      <div className="rounded-3xl bg-[#050507] border border-zinc-800/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl">
        
        {/* QUADRANT 1: Responsive Breakpoints (Top Left - 7 Cols) */}
        <div className="md:col-span-7 border-b md:border-r border-zinc-800/80 p-6 md:p-8 flex flex-col justify-between min-h-[420px] bg-[#050507] relative overflow-hidden">
          {/* Top Graphic: Framer Breakpoint Device Mockups with Autoplay Video */}
          <div className="flex gap-2.5 items-start justify-center overflow-hidden mb-6 -mx-2 pt-2">
            {/* Desktop 1200 Mockup */}
            <div className="w-[52%] bg-black rounded-lg border border-zinc-800 p-2 space-y-1.5 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono px-1">
                <span>▶ Desktop 1200</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[4/3] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-3 text-left flex flex-col justify-between">
                <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-75 z-0">
                  <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="space-y-1 relative z-20">
                  <div className="text-[9px] font-extrabold text-white tracking-wide">DESIGNING + BUILDING</div>
                  <div className="text-[8px] font-extrabold text-white tracking-wide">HIGH-PERFORMING WEBSITES</div>
                  <div className="text-[6px] text-zinc-300 max-w-[120px]">Hello there, I&apos;m Chris - I craft websites that are user-friendly, beautiful & convert.</div>
                </div>
                <div className="inline-block self-start px-2 py-0.5 rounded bg-orange-600 text-[6px] font-bold text-white uppercase relative z-20 shadow">
                  LET&apos;S START BUILDING YOURS
                </div>
                <div className="absolute bottom-2 right-2 w-12 h-14 rounded overflow-hidden border border-white/20 z-20">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="" fill sizes="48px" className="object-cover" />
                </div>
              </div>
            </div>

            {/* Tablet 1199 Mockup */}
            <div className="w-[30%] bg-black rounded-lg border border-zinc-800 p-2 space-y-1.5 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono px-1">
                <span>▶ Tablet 1199</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[3/4] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-2 text-left flex flex-col justify-between">
                <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-75 z-0">
                  <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="space-y-1 relative z-20">
                  <div className="text-[8px] font-extrabold text-white">DESIGNING + BUILDING</div>
                  <div className="text-[7px] font-extrabold text-white">WEBSITES</div>
                </div>
                <div className="inline-block self-start px-1.5 py-0.5 rounded bg-orange-600 text-[5px] font-bold text-white relative z-20 shadow">
                  LET&apos;S START
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="w-[18%] bg-black rounded-lg border border-zinc-800 p-1.5 space-y-1 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[7px] text-zinc-500 font-mono px-0.5">
                <span>▶ Phone</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[9/16] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-1 text-left">
                <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-75 z-0">
                  <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="text-[6px] font-extrabold text-white leading-tight relative z-20">DESIGNING WEBSITES</div>
              </div>
            </div>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight text-left">
            Responsive straight out of the box. No coding or design required.
          </h3>
        </div>

        {/* QUADRANT 2: Video Tutorials (Top Right - 5 Cols) */}
        <div className="md:col-span-5 border-b border-zinc-800/80 p-6 md:p-8 flex flex-col justify-end relative min-h-[420px] bg-[#050507] overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
            alt="Real human creator tutorial"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover object-top opacity-95 z-10">
            <source src={VIDEO_SOURCES.oceans} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />

          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight text-left relative z-30">
            Step-by-step video tutorials included by a real human.
          </h3>
        </div>

        {/* QUADRANT 3: SEO & CMS (Bottom Left - 6 Cols) */}
        <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-zinc-800/80 p-6 md:p-8 flex flex-col justify-between space-y-8 bg-[#050507]">
          <div className="space-y-4 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
              Automatic SEO, sitemaps and full-control all ready in your site.
            </h3>

            <div className="bg-[#0b0c10] rounded-xl border border-zinc-800/90 p-4 space-y-3 font-sans text-xs">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Site Settings</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                  <div className="text-[9px] text-zinc-500">Title</div>
                  <div className="text-[11px] text-zinc-200 font-medium truncate mt-0.5">Premium Framer Website Templates</div>
                </div>
                <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                  <div className="text-[9px] text-zinc-500">Language</div>
                  <div className="text-[11px] text-zinc-200 font-medium mt-0.5">English <span className="text-zinc-500">en</span></div>
                </div>
              </div>
              <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                <div className="text-[9px] text-zinc-500">Description</div>
                <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Professional Framer website templates starting at $129.</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left pt-6 border-t border-zinc-800/60">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
              Easily create and manage content with a built-in CMS.
            </h3>

            <div className="bg-[#0b0c10] rounded-xl border border-zinc-800/90 p-3 font-sans text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-[11px] text-white font-medium">Villa Sorrento</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono">Live •</span>
              </div>
              <span className="text-[10px] text-zinc-500">Posts & Articles</span>
            </div>
          </div>
        </div>

        {/* QUADRANT 4: Pro Hosting (Bottom Right - 6 Cols) */}
        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-end relative min-h-[350px] bg-[#050507] overflow-hidden text-left">
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight relative z-10">
            Pro hosting included for fast and secure global sites.
          </h3>
        </div>

      </div>
    </section>
  );
}
