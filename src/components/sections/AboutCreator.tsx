import React from "react";
import defaultCreatorData from "@/data/creator.json";
import { UserCheck } from "lucide-react";
import Image from "next/image";
import type { CreatorData } from "@/lib/data";

interface AboutCreatorProps {
  data?: CreatorData;
}

export default function AboutCreator({ data = defaultCreatorData }: AboutCreatorProps) {
  const creatorData = data;

  return (
    <section id="about-creator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl bg-surface-card border border-white/10 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Creator Portrait Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <Image
                src={creatorData.avatar}
                alt={creatorData.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-semibold">{creatorData.name}</span>
                <span className="px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30 text-[10px] font-bold">
                  Verified Framer Expert
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & 4 Stats */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple">
                <UserCheck className="w-3.5 h-3.5" />
                <span>{creatorData.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {creatorData.name}
              </h2>
              <p className="text-xs text-accent-purple font-semibold uppercase tracking-wider">
                {creatorData.role}
              </p>
              <p className="text-brand-muted text-base leading-relaxed">
                {creatorData.bio}
              </p>
            </div>

            {/* 4 Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10">
              {creatorData.stats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-brand-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
