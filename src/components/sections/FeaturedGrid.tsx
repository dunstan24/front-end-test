"use client";

import React, { useState } from "react";
import Image from "next/image";

const EXACT_FEATURED_TEMPLATES = [
  {
    id: "selene",
    name: "Selene",
    badge: "NEW",
    category: "AI SAAS",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "zenna",
    name: "Zenna",
    badge: null,
    category: "YOGA STUDIO",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "traction",
    name: "Traction",
    badge: null,
    category: "SMMA",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FeaturedGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="templates" className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Top Badge: WHICH TEMPLATE IS FOR ME? */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          WHICH TEMPLATE IS FOR ME?
        </span>
      </div>

      {/* Header Row: Headline + View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
          Premium templates<br />built to drive results.
        </h2>

        <a
          href="#pricing"
          className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all text-center self-start sm:self-auto shrink-0 shadow-md"
        >
          View all
        </a>
      </div>

      {/* 3 Featured Template Cards with Hover Image Swap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXACT_FEATURED_TEMPLATES.map((t) => {
          const isHovered = hoveredId === t.id;
          return (
            <div
              key={t.id}
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer space-y-4 group"
            >
              {/* Card Image Container (Hover Swaps Image) */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-xl transition-all duration-300 group-hover:border-zinc-700">
                {/* Primary Image */}
                <Image
                  src={t.imgPrimary}
                  alt={t.name}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Secondary Image (Appears on Mouse Hover) */}
                <Image
                  src={t.imgSecondary}
                  alt={`${t.name} hover preview`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Card Meta (Title + Badge & Category + Price) */}
              <div className="space-y-1 text-left px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {t.name}
                  </h3>
                  {t.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      {t.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {t.category} <span className="mx-1">•</span> {t.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
