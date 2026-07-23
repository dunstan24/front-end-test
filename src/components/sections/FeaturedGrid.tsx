import React from "react";
import defaultTemplatesData from "@/data/templates.json";
import { ArrowUpRight, ExternalLink, Sparkles, Check } from "lucide-react";
import Image from "next/image";
import type { TemplatesData } from "@/lib/data";

interface FeaturedGridProps {
  data?: TemplatesData;
}

export default function FeaturedGrid({ data = defaultTemplatesData }: FeaturedGridProps) {
  const templatesData = data;

  return (
    <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20 text-xs font-semibold text-accent-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{templatesData.header.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {templatesData.header.title}
          </h2>
          <p className="text-brand-muted text-sm sm:text-base leading-relaxed">
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

      {/* Templates Grid (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templatesData.featured.map((template) => (
          <div
            key={template.id}
            className="group relative rounded-3xl bg-surface-card border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden shadow-xl shadow-black/40 hover:-translate-y-1.5"
          >
            {/* Card Image Container */}
            <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden">
              <Image
                src={template.image}
                alt={template.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-transparent to-transparent opacity-80" />

              {/* Badge Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-white border border-white/20">
                  {template.badge}
                </span>
              </div>

              {/* External Preview Link Button */}
              <a
                href={template.previewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/80 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md hover:bg-white hover:text-black"
                aria-label={`Preview ${template.name}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-accent-purple uppercase tracking-wider">
                    {template.category}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-bold text-white">
                      {template.price}
                    </span>
                    <span className="text-xs text-brand-subtle line-through">
                      {template.originalPrice}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-accent-purple transition-colors">
                  {template.name}
                </h3>

                <p className="text-xs text-brand-muted leading-relaxed line-clamp-2">
                  {template.description}
                </p>
              </div>

              {/* Features List & CTA */}
              <div className="pt-4 border-t border-white/5 space-y-4">
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                  {template.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 truncate">
                      <Check className="w-3.5 h-3.5 text-accent-purple shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={template.previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
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
