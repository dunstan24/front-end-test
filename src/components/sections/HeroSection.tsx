"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { StarIcon, StarRating, FramerLogoIcon } from "@/components/ui/Icons";
import VideoCard from "@/components/ui/VideoCard";
import { TEMPLATE_SCREENSHOTS, VIDEO_SOURCES, AVATAR_URLS } from "@/lib/constants";

interface HeroSectionProps {
  onQuiz: () => void;
}

const HERO_CYCLED_REVIEWS = [
  {
    name: "Seyed",
    quote: "An excellent template in terms of design & customizability.",
    avatar: AVATAR_URLS.seyed,
    rating: 5,
  },
  {
    name: "Alex Rivers",
    quote: "The best Framer template collection I've ever used. Shipped our landing page in under 1 hour.",
    avatar: AVATAR_URLS.alex,
    rating: 5,
  },
  {
    name: "Maya Lin",
    quote: "Saved us weeks of design time. The code quality and typography hierarchy are immaculate.",
    avatar: AVATAR_URLS.maya,
    rating: 5,
  },
  {
    name: "Daniel Sterling",
    quote: "Converted 3x better than our previous custom page. Worth every single cent.",
    avatar: AVATAR_URLS.daniel,
    rating: 5,
  },
];

const HERO_VIDEOS = [
  { name: "Influence", src: VIDEO_SOURCES.oceans },
  { name: "Zenna", src: VIDEO_SOURCES.flower },
  { name: "Agentik", src: VIDEO_SOURCES.oceans },
  { name: "Selene", src: VIDEO_SOURCES.flower },
  { name: "Cora", src: VIDEO_SOURCES.oceans },
  { name: "Talentify", src: VIDEO_SOURCES.flower },
];

/** Column layout config: [videoIndex, videoIndex, ...] per column */
const COLUMN_CONFIG: { indices: number[]; height: number; visibility?: string }[] = [
  { indices: [0, 4, 0, 4], height: 380 },
  { indices: [1, 5, 1, 5], height: 400 },
  { indices: [2, 3, 2, 3], height: 390, visibility: "hidden md:block" },
  { indices: [3, 0, 3, 0], height: 410, visibility: "hidden md:block" },
  { indices: [4, 1, 4, 1], height: 380, visibility: "hidden lg:block" },
];

const SOCIAL_PROOF_AVATARS = [
  AVATAR_URLS.alex,
  AVATAR_URLS.maya,
  AVATAR_URLS.seyed,
];

export default function HeroSection({ onQuiz }: HeroSectionProps) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % HERO_CYCLED_REVIEWS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentReview = HERO_CYCLED_REVIEWS[activeReviewIdx];

  return (
    <section className="pt-32 pb-0 relative overflow-hidden w-full">
      {/* Top Headline Content & Actions Container */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="space-y-5 max-w-2xl text-left relative z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
            <FramerLogoIcon className="w-3 h-3 text-blue-400" />
            Framer Templates
          </div>

          <h1 className="text-[2.6rem] sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            No back-and-forth with<br />AI. Pick, edit, publish.
          </h1>
        </div>

        {/* Actions Row */}
        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-5xl relative z-20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#templates" className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors text-center">
              Pick your template
            </a>
            <button onClick={onQuiz} className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors">
              Or get matched with the perfect one
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {SOCIAL_PROOF_AVATARS.map((src, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-black overflow-hidden relative bg-zinc-800">
                  <Image src={src} alt="" fill sizes="28px" priority className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-zinc-300">
              <StarIcon />
              <span>RATED 4.92/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Edge-to-Edge Tall Video Gallery */}
      <div className="mt-10 relative w-full overflow-hidden" style={{ height: "1400px" }}>
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 opacity-95 w-full px-2">
          {COLUMN_CONFIG.map((col, colIdx) => (
            <div key={colIdx} className={`${col.visibility ?? ""} overflow-hidden relative`}>
              <div className="flex flex-col gap-3.5">
                {col.indices.map((videoIdx, itemIdx) => (
                  <VideoCard
                    key={itemIdx}
                    src={HERO_VIDEOS[videoIdx].src}
                    name={HERO_VIDEOS[videoIdx].name}
                    height={col.height}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fade Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10" />

        {/* Floating Cycling Reviews */}
        <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center justify-center px-4">
          <div key={activeReviewIdx} className="animate-slide-up flex flex-col items-center text-center space-y-2 max-w-xl">
            <StarRating count={currentReview.rating} />

            <p className="text-base sm:text-xl font-semibold text-white tracking-tight leading-snug drop-shadow-md">
              &ldquo;{currentReview.quote}&rdquo;
            </p>

            <div className="flex items-center gap-2 pt-1">
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-zinc-700/60 bg-zinc-800 shrink-0">
                <Image src={currentReview.avatar} alt={currentReview.name} fill sizes="24px" className="object-cover" />
              </div>
              <span className="text-xs sm:text-sm text-zinc-300 font-medium">{currentReview.name}</span>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Pill CTA */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center">
          <button
            onClick={onQuiz}
            className="px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-bold text-blue-400 hover:text-white hover:bg-zinc-800 transition-colors uppercase tracking-wider backdrop-blur-md shadow-lg"
          >
            WHICH TEMPLATE IS FOR ME?
          </button>
        </div>
      </div>
    </section>
  );
}
