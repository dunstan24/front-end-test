"use client";

import React, { useState } from "react";
import defaultHowItWorksData from "@/data/how-it-works.json";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import type { HowItWorksData } from "@/lib/data";

interface HowItWorksProps {
  data?: HowItWorksData;
}

/**
 * HowItWorks Component
 * Replicates Section 5 of browser.supply:
 * HOW IT WORKS badge + "Go live within hours, not months, weeks or even days."
 */
export default function HowItWorks({ data = defaultHowItWorksData }: HowItWorksProps) {
  const [activeStep, setActiveStep] = useState(0);
  const howItWorksData = data;
  const current = howItWorksData.steps[activeStep];

  return (
    <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
      {/* Header */}
      <div className="space-y-2 max-w-3xl mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          <span>{howItWorksData.header.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {howItWorksData.header.title}
        </h2>
      </div>

      {/* Grid Layout: Steps Selector (Left) + Live Gallery Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: 3 Step Cards */}
        <div className="lg:col-span-5 space-y-3">
          {howItWorksData.steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer p-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "bg-zinc-950 border-blue-500/50 shadow-lg"
                    : "bg-black border-zinc-900 hover:border-zinc-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full font-mono shrink-0 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "bg-zinc-900 text-zinc-400"
                    }`}
                  >
                    {step.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className={`text-base font-bold transition-colors ${isActive ? "text-white" : "text-zinc-400"}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-500">{step.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Dynamic Preview Window */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl p-2 sm:p-3">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black">
              <Image
                src={current.image}
                alt={current.title}
                fill
                className="object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-zinc-800 text-xs font-semibold text-white">
                  <span>Step {current.step}: {current.title}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {current.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 text-[11px] text-zinc-300 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-md border border-zinc-800"
                    >
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
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
