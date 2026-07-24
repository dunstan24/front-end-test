"use client";

import React, { useState } from "react";
import defaultPricingData from "@/data/pricing.json";
import {
  Zap,
  RefreshCw,
  PlayCircle,
  Infinity,
  Layers,
  Sparkles,
  Headphones,
  Feather,
  Rocket,
  RotateCcw,
  CheckCircle2,
  Framer,
  Layout,
  Check
} from "lucide-react";

interface OptionItem {
  id: string;
  label: string;
  extraPrice?: number;
  price?: number;
  defaultSelected?: boolean;
  disabled?: boolean;
  icon?: string;
}

interface FeatureItem {
  text: string;
  icon: string;
}

/**
 * Helper to render icons based on key
 */
const renderIcon = (key: string) => {
  switch (key) {
    case "zap":
      return <Zap className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "refresh":
      return <RefreshCw className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "play":
      return <PlayCircle className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "infinity":
      return <Infinity className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "layers":
      return <Layers className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "sparkles":
      return <Sparkles className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "headphones":
      return <Headphones className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "feather":
      return <Feather className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "rocket":
      return <Rocket className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "repeat":
      return <RotateCcw className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "framer":
      return <Framer className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "figma":
      return (
        <svg className="w-4 h-4 text-zinc-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm-6 6c0-1.657 1.343-3 3-3h3v3c0 1.657-1.343 3-3 3s-3-1.343-3-3zm0-6c0-1.657 1.343-3 3-3h3v6H9c-1.657 0-3-1.343-3-3zm0-6c0-1.657 1.343-3 3-3h3v6H9c-1.657 0-3-1.343-3-3zm6-3h3c1.657 0 3 1.343 3 3s-1.343 3-3 3h-3V3z" />
        </svg>
      );
    case "layout":
      return <Layout className="w-4 h-4 text-zinc-400 shrink-0" />;
    case "checkCircle":
      return <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0" />;
    default:
      return <Check className="w-4 h-4 text-zinc-400 shrink-0" />;
  }
};

export default function PricingSection() {
  const data = defaultPricingData;

  // State for Single Template Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["framer", "doneForYou"]);

  // State for Custom Project Scope
  const [selectedScope, setSelectedScope] = useState<string>("landing");

  // Toggle Single Template Add-ons
  const toggleAddon = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Calculate Single Template Price
  const singleTemplateTotalPrice =
    data.singleTemplate.basePrice +
    (selectedAddons.includes("figma") ? 39 : 0) +
    (selectedAddons.includes("doneForYou") ? 370 : 0);

  // Custom Project Selected Price
  const customProjectPrice =
    selectedScope === "multipage" ? "$4,995" : "$2,495";

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1240px] mx-auto text-left font-sans">
      {/* Top Header */}
      <div className="mb-10">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#13182b] border border-[#27335c] text-[10px] sm:text-[11px] font-bold text-[#8ba0fe] uppercase tracking-widest mb-4 shadow-sm">
          <span>{data.header.badge}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12] whitespace-pre-line">
          {data.header.title}
        </h2>
      </div>

      {/* Main Container Frame with 1px Divider Lines */}
      <div className="rounded-3xl border border-zinc-800/90 bg-[#050507] overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-zinc-800/80">
        
        {/* ── CARD 1: SINGLE TEMPLATE (INTERACTIVE ADD-ONS) ── */}
        <div className="bg-[#050507] p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Header meta */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-4">
                ONE-TIME PAYMENT
              </span>

              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {data.singleTemplate.title}
                </h3>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  ${singleTemplateTotalPrice}
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {data.singleTemplate.description}
              </p>
            </div>

            {/* Interactive Options Box */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 divide-y divide-zinc-800/60 overflow-hidden">
              {data.singleTemplate.options.map((opt) => {
                const isSelected = selectedAddons.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleAddon(opt.id, opt.disabled)}
                    className={`p-3.5 flex items-center justify-between transition-all select-none ${
                      opt.disabled ? "cursor-default opacity-80" : "cursor-pointer hover:bg-zinc-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {renderIcon(opt.icon)}
                      <span className="text-xs font-semibold text-zinc-200">
                        {opt.label}{" "}
                        {opt.extraPrice > 0 && (
                          <span className="text-amber-500 font-bold ml-0.5">
                            (+${opt.extraPrice})
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Radio / Checkbox Indicator */}
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-white text-black border border-white"
                          : "border border-zinc-700 bg-zinc-800/80"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Included Section */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block">
                INCLUDED:
              </span>
              <ul className="space-y-3">
                {data.singleTemplate.included.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    {renderIcon(feat.icon)}
                    <span>{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <a
            href={data.singleTemplate.btnHref}
            className="w-full py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all text-center block shadow"
          >
            {data.singleTemplate.btnText}
          </a>
        </div>

        {/* ── CARD 2: BUNDLE ── */}
        <div className="bg-[#050507] p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Header meta */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-4">
                ONE-TIME PAYMENT
              </span>

              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {data.bundle.title}
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {data.bundle.price}
                  </span>
                  <span className="text-sm text-zinc-500 line-through font-medium">
                    {data.bundle.originalPrice}
                  </span>
                </div>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {data.bundle.description}
              </p>
            </div>

            {/* Included Section */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block">
                INCLUDED:
              </span>
              <ul className="space-y-3">
                {data.bundle.included.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    {renderIcon(feat.icon)}
                    <span>{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <a
            href={data.bundle.btnHref}
            className="w-full py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-bold hover:bg-zinc-800 transition-all text-center block"
          >
            {data.bundle.btnText}
          </a>
        </div>

        {/* ── CARD 3: CUSTOM PROJECT (INTERACTIVE SCOPE) ── */}
        <div className="bg-[#050507] p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <div className="space-y-6">
            {/* Header meta */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block mb-4">
                ONE-TIME PAYMENT
              </span>

              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {data.customProject.title}
                </h3>
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {customProjectPrice}
                </span>
              </div>

              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                {data.customProject.description}
              </p>
            </div>

            {/* Interactive Scope Box */}
            <div className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 divide-y divide-zinc-800/60 overflow-hidden">
              {data.customProject.options.map((opt) => {
                const isSelected = selectedScope === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedScope(opt.id)}
                    className="p-3.5 flex items-center justify-between transition-all cursor-pointer hover:bg-zinc-800/50 select-none"
                  >
                    <div className="flex items-center gap-2.5">
                      {renderIcon(opt.icon)}
                      <span className="text-xs font-semibold text-zinc-200">
                        {opt.label}
                      </span>
                    </div>

                    {/* Radio Button Indicator */}
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${
                        isSelected
                          ? "border-2 border-white bg-transparent"
                          : "border border-zinc-700 bg-zinc-800/80"
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Included Section */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 block">
                INCLUDED:
              </span>
              <ul className="space-y-3">
                {data.customProject.included.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
                    {renderIcon(feat.icon)}
                    <span>{feat.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Button */}
          <a
            href={data.customProject.btnHref}
            className="w-full py-3 rounded-full bg-zinc-900 border border-zinc-800 text-white text-xs font-bold hover:bg-zinc-800 transition-all text-center block"
          >
            {data.customProject.btnText}
          </a>
        </div>

      </div>
    </section>
  );
}
