"use client";

import React, { useEffect } from "react";
import { X, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import type { HeroData } from "@/lib/data";

interface HeroQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: HeroData["quizModal"];
  onStartQuiz?: () => void;
}

/**
 * HeroQuizModal Component
 * Full-screen overlay modal triggered by clicking "Or get matched with the perfect one" in the Hero section.
 * Replicates the exact browser.supply modal experience:
 * - Dimmed backdrop with blur
 * - 60-SECOND QUIZ top badge
 * - 2-line headline with 30% discount offer
 * - Solid white button with arrow icon
 * - Tilted/rotated template preview images collage background decoration
 * - Backdrop click & ESC key close support
 */
export default function HeroQuizModal({
  isOpen,
  onClose,
  data,
  onStartQuiz,
}: HeroQuizModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Modal Container Card */}
      <div
        className="relative max-w-2xl w-full rounded-3xl bg-surface-card border border-white/15 p-8 sm:p-12 overflow-hidden shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()} // Prevent close on card click
      >
        {/* Close (X) Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-white/5 hover:bg-white/15 text-brand-muted hover:text-white transition-colors border border-white/10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tilted Collage Images Background Decoration */}
        <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
          {data.collageImages.map((img, idx) => {
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
                <Image src={img} alt="Template Collage" fill className="object-cover" />
              </div>
            );
          })}
        </div>

        {/* Modal Main Content */}
        <div className="relative z-10 space-y-6 text-left max-w-lg">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/15 border border-accent-purple/30 text-[11px] font-extrabold uppercase tracking-widest text-accent-purple">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{data.badge}</span>
          </div>

          {/* 2-Line Headline */}
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {data.headline}
          </h3>

          {/* Subtitle Description */}
          <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
            {data.description}
          </p>

          {/* Solid White Action Button */}
          <div className="pt-2">
            <button
              onClick={() => {
                onClose();
                if (onStartQuiz) {
                  onStartQuiz();
                } else {
                  const quizSec = document.getElementById("quiz");
                  if (quizSec) quizSec.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-xl shadow-white/10"
            >
              <span>{data.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
