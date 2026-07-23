"use client";

import React, { useState } from "react";
import defaultHowItWorksData from "@/data/how-it-works.json";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { HowItWorksData } from "@/lib/data";

interface HowItWorksProps {
  data?: HowItWorksData;
}

export default function HowItWorks({ data = defaultHowItWorksData }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const howItWorksData = data;
  const current = howItWorksData.steps[activeStep];

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-indigo/10 border border-accent-indigo/20 text-xs font-semibold text-accent-indigo">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{howItWorksData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
          {howItWorksData.header.title}
        </h2>
        <p className="text-brand-muted text-base leading-relaxed">
          {howItWorksData.header.subtitle}
        </p>
      </div>

      {/* Grid Layout: Steps Selector (Left) + Live Gallery Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 3 Interactive Step Buttons */}
        <div className="lg:col-span-5 space-y-4">
          {howItWorksData.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-6 rounded-3xl border transition-all duration-300 ${
                  isActive
                    ? "bg-surface-card border-accent-purple/50 shadow-lg shadow-purple-900/20"
                    : "bg-white/[0.02] border-white/5 hover:border-white/15"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-sm font-extrabold px-3 py-1 rounded-full font-mono shrink-0 ${
                      isActive
                        ? "bg-accent-purple text-white"
                        : "bg-white/5 text-brand-muted"
                    }`}
                  >
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h3
                      className={`text-lg font-bold transition-colors ${
                        isActive ? "text-white" : "text-brand-muted"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-brand-subtle">{step.subtitle}</p>
                    {isActive && (
                      <p className="text-xs text-brand-muted pt-2 leading-relaxed animate-fade-in">
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Preview Window */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-white/10 bg-surface-card overflow-hidden shadow-2xl p-2 sm:p-4">
            {/* Gallery Image Display */}
            <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/90 via-surface-dark/20 to-transparent" />

              {/* Overlay Content */}
              <div className="absolute bottom-6 left-6 right-6 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-semibold text-white">
                  <span>Step {current.step}: {current.title}</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {current.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-xs text-zinc-300 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
