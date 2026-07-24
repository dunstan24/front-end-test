import React from "react";
import defaultTemplatesData from "@/data/templates.json";
import { ArrowUpRight, ExternalLink, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import type { TemplatesData } from "@/lib/data";

interface FeaturedGridProps {
  data?: TemplatesData;
}

/**
 * FeaturedGrid Component
 * Replicates the template preview grid directly beneath the hero section on browser.supply.
 */
export default function FeaturedGrid({ data = defaultTemplatesData }: FeaturedGridProps) {
  const templatesData = data;

  return (
    <section id="templates" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{templatesData.header.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {templatesData.header.title}
          </h2>
          <p className="text-brand-muted text-sm leading-relaxed">
            {templatesData.header.subtitle}
          </p>
        </div>

        <a
          href={templatesData.header.viewAllHref}
          className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-accent-purple bg-white/5 border border-white/10 hover:border-accent-purple/40 px-5 py-2.5 rounded-full transition-all shrink-0 self-start md:self-auto"
        >
          <span>{templatesData.header.viewAllText}</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Templates Staggered/Masonry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesData.featured.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:-translate-y-1"
          >
            {/* Card Image Container */}
            <div className="relative aspect-[16/11] w-full bg-zinc-900 overflow-hidden">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

              {/* Badge Tag */}
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/80 text-white border border-white/10">
                  {template.badge}
                </span>
              </div>

              {/* External Preview Link Button */}
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-white hover:text-black"
                aria-label={`Preview ${template.name}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4 text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-accent-purple uppercase tracking-wider">
                    {template.category}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-base font-bold text-white">
                      {template.price}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-accent-purple transition-colors">
                  {template.name}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                  {template.desc}
                </p>
              </div>

              {/* Features List & CTA */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="grid grid-cols-2 gap-1.5 text-[11px] text-zinc-400">
                  {template.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <Check className="w-3 h-3 text-accent-purple shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Live Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
