import React from "react";
import defaultFeaturesData from "@/data/features.json";
import { Smartphone, Video, Search, Database, Layers } from "lucide-react";
import Image from "next/image";
import type { FeaturesData } from "@/lib/data";

const iconMap = {
  Smartphone: Smartphone,
  Video: Video,
  Search: Search,
  Database: Database,
};

interface WhyTemplatesProps {
  data?: FeaturesData;
}

export default function WhyTemplates({ data = defaultFeaturesData }: WhyTemplatesProps) {
  const featuresData = data;

  return (
    <section id="why-templates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-xs font-semibold text-accent-cyan">
          <Layers className="w-3.5 h-3.5" />
          <span>{featuresData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {featuresData.header.title}
        </h2>
        <p className="text-brand-muted text-base leading-relaxed">
          {featuresData.header.subtitle}
        </p>
      </div>

      {/* Features Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featuresData.items.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Smartphone;

          return (
            <div
              key={item.id}
              className="group relative rounded-3xl bg-surface-card border border-white/10 hover:border-white/20 transition-all duration-300 p-8 flex flex-col justify-between overflow-hidden shadow-xl shadow-black/30"
            >
              {/* Top Meta */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent-cyan group-hover:bg-accent-cyan group-hover:text-black transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-brand-muted bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-brand-muted leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Image Preview Mockup */}
              <div className="mt-8 relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-60" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
