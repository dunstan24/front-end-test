import React from "react";
import defaultFeaturesData from "@/data/features.json";
import { Smartphone, Video, Search, Database } from "lucide-react";
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

/**
 * WhyTemplates Component
 * Replicates Section 4 of browser.supply:
 * WHY CHOOSE US badge + "Everything you need to launch. All in one place, not a stack."
 */
export default function WhyTemplates({ data = defaultFeaturesData }: WhyTemplatesProps) {
  const featuresData = data;

  return (
    <section id="why-templates" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Section Header */}
      <div className="space-y-2 max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          <span>{featuresData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {featuresData.header.title}
        </h2>
      </div>

      {/* Features Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuresData.items.map((item) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Smartphone;

          return (
            <div
              key={item.id}
              className="group relative rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              {/* Top Meta */}
              <div className="space-y-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-blue-400">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-full border border-zinc-800">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {item.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Card Image Preview Mockup */}
              <div className="mt-6 relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
