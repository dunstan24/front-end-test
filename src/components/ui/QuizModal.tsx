"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { CloseIcon } from "@/components/ui/Icons";
import { TEMPLATE_SCREENSHOTS } from "@/lib/constants";

interface QuizModalProps {
  onClose: () => void;
}

const QUIZ_QUESTIONS = [
  { id: 1, q: "What is the primary goal of your website?", opts: ["Launch B2B SaaS", "Showcase Design Agency", "Personal Portfolio", "E-commerce Store"] },
  { id: 2, q: "Which platform do you prefer?", opts: ["Framer Native", "Webflow CMS", "Next.js / Code", "Not Sure Yet"] },
];

export default function QuizModal({ onClose }: QuizModalProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const pick = useCallback((opt: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [QUIZ_QUESTIONS[step].id]: opt };
      return next;
    });
    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      setDone(true);
    }
  }, [step]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="relative w-full max-w-xl mx-4 rounded-2xl bg-[#111] border border-zinc-800 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Template matching quiz"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white"
          aria-label="Close quiz"
        >
          <CloseIcon />
        </button>

        {/* Collage bg decorations */}
        <div className="absolute -top-8 -right-8 w-32 h-24 rounded-xl overflow-hidden opacity-20 rotate-6 pointer-events-none border border-white/10">
          <Image src={TEMPLATE_SCREENSHOTS[0]} alt="" fill sizes="128px" className="object-cover" />
        </div>
        <div className="absolute -bottom-8 -left-8 w-32 h-24 rounded-xl overflow-hidden opacity-20 -rotate-6 pointer-events-none border border-white/10">
          <Image src={TEMPLATE_SCREENSHOTS[2]} alt="" fill sizes="128px" className="object-cover" />
        </div>

        {!done ? (
          <div className="space-y-6 text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-800 text-[10px] font-bold uppercase tracking-widest text-zinc-300 mb-4">
                60-SECOND QUIZ
              </span>
              <div className="text-xs text-zinc-500 mb-1">Question {step + 1} of {QUIZ_QUESTIONS.length}</div>
              <h2 className="text-2xl font-bold text-white leading-snug">
                Get 30% off the perfect template for your business
              </h2>
              <p className="text-sm text-zinc-400 mt-2">{QUIZ_QUESTIONS[step].q}</p>
            </div>
            <div className="space-y-2">
              {QUIZ_QUESTIONS[step].opts.map((opt) => (
                <button
                  key={opt}
                  onClick={() => pick(opt)}
                  className="w-full text-left px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Your Match</div>
            <h2 className="text-3xl font-bold text-white">Aura SaaS Template</h2>
            <p className="text-sm text-zinc-400">Based on your answers, Aura SaaS is the perfect fit. Includes pre-built pricing tables, dark mode, and CMS.</p>
            <button onClick={onClose} className="mt-4 w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-zinc-100 transition-colors flex items-center justify-center gap-2">
              Take the quiz <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
