"use client";

import React, { useState } from "react";
import defaultQuizData from "@/data/quiz.json";
import { HelpCircle, Sparkles, ArrowRight, X, Check } from "lucide-react";
import Image from "next/image";
import type { QuizData } from "@/lib/data";

interface QuizCTAProps {
  data?: QuizData;
}

export default function QuizCTA({ data = defaultQuizData }: QuizCTAProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const quizData = data;

  const handleNext = () => {
    if (currentQ < quizData.quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
    } else {
      setSubmitted(true);
    }
  };

  const resetQuiz = () => {
    setModalOpen(false);
    setCurrentQ(0);
    setSelectedAnswer(null);
    setSubmitted(false);
  };

  return (
    <section id="quiz" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Container */}
      <div className="relative rounded-3xl bg-gradient-to-b from-surface-card to-zinc-950 border border-white/10 p-8 sm:p-12 lg:p-16 text-center space-y-8 overflow-hidden shadow-2xl">
        {/* Background Marquee Strip of Templates */}
        <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden flex items-center">
          <div className="flex gap-4 animate-marquee shrink-0">
            {[...quizData.backgroundThumbnails, ...quizData.backgroundThumbnails].map((img, i) => (
              <div key={i} className="relative w-48 h-32 rounded-xl overflow-hidden shrink-0">
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 text-xs font-semibold text-accent-cyan">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{quizData.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {quizData.title}
          </h2>

          <p className="text-brand-muted text-base leading-relaxed">
            {quizData.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs font-bold rounded-full bg-white text-black hover:bg-zinc-200 transition-all shadow-lg"
            >
              <span>{quizData.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#support"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
            >
              <span>{quizData.ctaSecondary}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Quiz Modal Overlay */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-surface-card border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent-purple" />
                <h3 className="text-base font-bold text-white">Template Matcher Quiz</h3>
              </div>
              <button
                onClick={resetQuiz}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-brand-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!submitted ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs text-accent-purple font-mono font-bold">
                    Question {currentQ + 1} of {quizData.quizQuestions.length}
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    {quizData.quizQuestions[currentQ].question}
                  </h4>
                </div>

                <div className="space-y-2.5">
                  {quizData.quizQuestions[currentQ].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(opt)}
                      className={`w-full p-3.5 rounded-xl text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        selectedAnswer === opt
                          ? "bg-accent-purple/20 border-accent-purple text-white font-semibold"
                          : "bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{opt}</span>
                      {selectedAnswer === opt && <Check className="w-4 h-4 text-accent-purple" />}
                    </button>
                  ))}
                </div>

                <button
                  disabled={!selectedAnswer}
                  onClick={handleNext}
                  className="w-full py-3 rounded-full text-xs font-bold bg-white text-black hover:bg-zinc-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {currentQ === quizData.quizQuestions.length - 1 ? "See Recommendation" : "Next Question"}
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 py-4 animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-white">Match Found: Aura SaaS Template</h4>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Based on your answers, <strong>Aura SaaS & AI Template</strong> is the perfect fit for your launch!
                </p>
                <button
                  onClick={resetQuiz}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-black"
                >
                  Close & View Template
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
