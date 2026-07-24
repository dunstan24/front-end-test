/**
 * VideoCard — Reusable autoplay video tile with dark overlay and label badge.
 *
 * Uses LazyVideo to defer video loading until scrolled into view,
 * preventing the browser from fetching all video streams on page load.
 */
"use client";

import LazyVideo from "@/components/ui/LazyVideo";

interface VideoCardProps {
  /** Video source URL */
  src: string;
  /** Label text shown in the top-left badge */
  name: string;
  /** Fixed pixel height for the card */
  height: number;
  /** Additional Tailwind classes on the outer container */
  className?: string;
}

export default function VideoCard({ src, name, height, className = "" }: VideoCardProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl ${className}`}
      style={{ height: `${height}px` }}
    >
      <LazyVideo
        src={src}
        className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
      />
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
      <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
        {name}
      </div>
    </div>
  );
}
