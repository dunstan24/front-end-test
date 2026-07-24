"use client";

import React, { useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import heroData from "@/data/hero.json";

const DEFAULT_QUIZ_MODAL_DATA = {
  badge: "60-SECOND QUIZ",
  headline: "Get 30% off the perfect template for your business",
  description: "Answer 3 quick questions about your industry, stack, and goals to unlock an instant 30% discount and personalized template match.",
  ctaText: "Take the quiz",
  ctaHref: "#quiz",
  collageImages: [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop",
  ],
};

interface HeroQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  data?: typeof DEFAULT_QUIZ_MODAL_DATA;
}

/**
 * HeroQuizModal Component
 * Full-screen overlay modal triggered on page load or via hero CTA.
 * Safe fallback prevents any undefined data errors.
 */
export default function HeroQuizModal({
  isOpen,
  onClose,
  data = heroData?.quizModal ?? DEFAULT_QUIZ_MODAL_DATA,
}: HeroQuizModalProps) {
  const modalData = data || DEFAULT_QUIZ_MODAL_DATA;
  const collageImages = modalData.collageImages || DEFAULT_QUIZ_MODAL_DATA.collageImages;

  // Prevent background body scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container Card */}
      <div
        className="relative max-w-2xl w-full rounded-3xl bg-[#0a0a0c] border border-white/15 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()} // Prevent close on card click
      >
        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tilted Collage Images Background Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          {collageImages.map((img, idx) => {
            const rotations = ["-rotate-6 translate-x-4", "rotate-6 -translate-y-4", "-rotate-3 translate-y-8", "rotate-12"];
            const positions = [
              "top-[-10%] right-[-5%]",
              "bottom-[-15%] left-[-5%]",
              "top-[20%] left-[-10%]",
              "bottom-[10%] right-[-10%]",
            ];
            return (
              <div
                key={idx}
                className={`absolute w-44 h-32 rounded-2xl overflow-hidden border border-white/20 shadow-2xl ${rotations[idx % rotations.length]} ${positions[idx % positions.length]}`}
              >
                <Image src={img} alt="Template Collage" fill sizes="176px" className="object-cover" />
              </div>
            );
          })}
        </div>

        {/* Modal Main Content */}
        <div className="relative z-10 space-y-6 text-left max-w-lg">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-[11px] font-extrabold uppercase tracking-widest text-purple-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{modalData.badge}</span>
          </div>

          {/* 2-Line Headline */}
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {modalData.headline}
          </h3>

          {/* Subtitle Description */}
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            {modalData.description}
          </p>

          {/* Action Button — clicking it simply closes the popup */}
          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
            >
              <span>{modalData.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
