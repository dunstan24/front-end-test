"use client";

import React from "react";
import defaultCreatorData from "@/data/creator.json";

export default function AboutCreator() {
  const data = defaultCreatorData;

  return (
    <section id="about-creator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto text-left font-sans">
      {/* Section Header */}
      <div className="mb-10 text-left">
        {/* Top Pill Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#13182b] border border-[#27335c] text-[10px] sm:text-[11px] font-bold text-[#8ba0fe] uppercase tracking-widest mb-4 shadow-sm">
          <span>{data.badge}</span>
        </div>

        {/* Headline & Action Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12] whitespace-pre-line">
            {data.title}
          </h2>

          <a
            href="#pricing"
            className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all shadow-md self-start md:self-auto shrink-0 flex items-center gap-1.5"
          >
            <span>{data.topBtnText}</span>
          </a>
        </div>
      </div>

      {/* Main Container Box */}
      <div className="rounded-3xl border border-zinc-800/90 bg-[#050507] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* Left Column: Autoplay Short Video */}
        <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[580px] bg-zinc-900 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={(e) => e.currentTarget.play()}
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src={data.videoUrl} type="video/mp4" />
          </video>
        </div>

        {/* Right Column: Bio & 2x2 Stats Grid */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {/* Upper Section: Copywriting */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-6">
            <div>
              <span className="px-3 py-1 rounded bg-[#241705] text-[#e0982d] border border-[#4a2e0a] text-[10px] font-extrabold uppercase tracking-widest inline-block mb-4 shadow-sm">
                {data.founderBadge || "FOUNDER"}
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight whitespace-pre-line">
                {data.aboutTitle}
              </h3>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              {data.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Lower 2x2 Stats Grid with 1px border lines */}
          <div className="grid grid-cols-2 gap-[1px] bg-zinc-800/80 border-t border-zinc-800/80">
            {data.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#050507] p-6 sm:p-8 flex flex-col justify-center space-y-1.5"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 font-normal">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
