"use client";

import React, { useState, useCallback } from "react";
import defaultQuizData from "@/data/quiz.json";
import { ArrowRight, X, Check, Sparkles } from "lucide-react";
import Image from "next/image";
import { TEMPLATE_SCREENSHOTS } from "@/lib/constants";

/** Column layout for the animated background gallery */
const GALLERY_COLUMNS: { indices: number[]; height: number; direction: "up" | "down"; visibility?: string }[] = [
  { indices: [0, 4, 0, 4], height: 500, direction: "up" },
  { indices: [1, 5, 1, 5], height: 520, direction: "down" },
  { indices: [2, 6, 2, 6], height: 510, direction: "up", visibility: "hidden sm:block" },
  { indices: [3, 7, 3, 7], height: 530, direction: "down", visibility: "hidden md:block" },
  { indices: [8, 2, 8, 2], height: 500, direction: "up", visibility: "hidden lg:block" },
  { indices: [5, 1, 5, 1], height: 520, direction: "down", visibility: "hidden lg:block" },
];

interface QuizCTAProps {
  data?: typeof defaultQuizData;
}

export default function QuizCTA({ data = defaultQuizData }: QuizCTAProps) {
  const quizData = data;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = useCallback((qId: number, option: string) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
    setCurrentStep((prev) => {
      if (prev < quizData.quizQuestions.length - 1) return prev + 1;
      setShowResult(true);
      return prev;
    });
  }, [quizData.quizQuestions.length]);

  const handleReset = useCallback(() => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  }, []);

  return (
    <section id="quiz" className="py-0 relative w-full overflow-hidden bg-black border-none font-sans">
      <div className="relative w-full overflow-hidden" style={{ height: "1000px" }}>
        
        {/* Animated Moving Columns Grid */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 opacity-80 w-full px-2 pointer-events-none">
          {GALLERY_COLUMNS.map((col, colIdx) => (
            <div key={colIdx} className={`${col.visibility ?? ""} overflow-hidden relative`}>
              <div className={`flex flex-col gap-3.5 ${
                col.direction === "up" ? "animate-marquee-vertical-up" : "animate-marquee-vertical-down"
              }`}>
                {col.indices.map((imgIdx, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0"
                    style={{ height: `${col.height}px` }}
                  >
                    <Image
                      src={TEMPLATE_SCREENSHOTS[imgIdx]}
                      alt="Template preview"
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover opacity-90"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Full Width Smooth Vignette & Fade Overlays */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />

        {/* Centered Overlay Content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 sm:pb-24 text-center p-6 sm:p-12 space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[10px] sm:text-[11px] font-bold text-blue-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>30-SECOND QUIZ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            Not sure which<br />template is for you?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md mx-auto drop-shadow-md">
            Answer a few short questions and get matched with a website template perfect for your business, with 30% off.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                handleReset();
                setModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-2xl transform hover:scale-105"
            >
              <span>Take the quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Quiz Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-2xl text-left space-y-6"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Template matching quiz"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close quiz"
            >
              <X className="w-4 h-4" />
            </button>

            {!showResult ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between text-xs text-zinc-500 font-mono">
                  <span>Question {currentStep + 1} of {quizData.quizQuestions.length}</span>
                  <span>30-Second Matcher</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  {quizData.quizQuestions[currentStep].question}
                </h3>

                <div className="space-y-2.5">
                  {quizData.quizQuestions[currentStep].options.map((opt, idx) => {
                    const qId = quizData.quizQuestions[currentStep].id;
                    const isSelected = answers[qId] === opt;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(qId, opt)}
                        className={`w-full p-3.5 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? "bg-blue-600/20 border-blue-500 text-white"
                            : "bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900"
                        }`}
                      >
                        <span>{opt}</span>
                        {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto">
                  <Sparkles className="w-6 h-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                    RECOMMENDED MATCH FOUND
                  </span>
                  <h3 className="text-2xl font-bold text-white">
                    Aura SaaS Template
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    Based on your answers, Aura SaaS includes pre-built pricing tables, interactive code showcases, and automatic dark mode ideal for your launch.
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <a
                    href="#pricing"
                    onClick={() => setModalOpen(false)}
                    className="w-full py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Claim 30% Off & Get Aura</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={handleReset}
                    className="text-xs text-zinc-500 hover:text-white py-1"
                  >
                    Retake Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
