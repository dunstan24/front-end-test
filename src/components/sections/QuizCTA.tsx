"use client";

import React, { useState } from "react";
import defaultQuizData from "@/data/quiz.json";
import { ArrowRight, X, Check, Sparkles } from "lucide-react";
import Image from "next/image";

const COLLAGE_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
];

const col1 = [COLLAGE_IMAGES[0], COLLAGE_IMAGES[4], COLLAGE_IMAGES[0], COLLAGE_IMAGES[4]];
const col2 = [COLLAGE_IMAGES[1], COLLAGE_IMAGES[5], COLLAGE_IMAGES[1], COLLAGE_IMAGES[5]];
const col3 = [COLLAGE_IMAGES[2], COLLAGE_IMAGES[6], COLLAGE_IMAGES[2], COLLAGE_IMAGES[6]];
const col4 = [COLLAGE_IMAGES[3], COLLAGE_IMAGES[7], COLLAGE_IMAGES[3], COLLAGE_IMAGES[7]];
const col5 = [COLLAGE_IMAGES[8], COLLAGE_IMAGES[2], COLLAGE_IMAGES[8], COLLAGE_IMAGES[2]];
const col6 = [COLLAGE_IMAGES[5], COLLAGE_IMAGES[1], COLLAGE_IMAGES[5], COLLAGE_IMAGES[1]];

export default function QuizCTA() {
  const quizData = defaultQuizData;
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelectOption = (qId: number, option: string) => {
    const nextAnswers = { ...answers, [qId]: option };
    setAnswers(nextAnswers);

    if (currentStep < quizData.quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  return (
    <section id="quiz" className="py-0 relative w-full overflow-hidden bg-black border-none font-sans">
      {/* Edge-to-Edge 100% Full Width & Extra Tall Height Container (1000px) */}
      <div className="relative w-full overflow-hidden" style={{ height: "1000px" }}>
        
        {/* Full Screen Edge-to-Edge Animated Moving Columns Grid (6 Columns) */}
        <div className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 opacity-80 w-full px-2 pointer-events-none">
          {/* Column 1 (Far Left: Moves UP) */}
          <div className="overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-up">
              {col1.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "500px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Moves DOWN) */}
          <div className="overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-down">
              {col2.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "520px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 (Moves UP) */}
          <div className="hidden sm:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-up">
              {col3.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "510px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 4 (Moves DOWN) */}
          <div className="hidden md:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-down">
              {col4.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "530px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 5 (Moves UP) */}
          <div className="hidden lg:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-up">
              {col5.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "500px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 6 (Far Right: Moves DOWN) */}
          <div className="hidden lg:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5 animate-marquee-vertical-down">
              {col6.map((src, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shrink-0" style={{ height: "520px" }}>
                  <Image src={src} alt="Template preview" fill className="object-cover opacity-90" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 100% Full Width Smooth Vignette & Fade Overlays */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-10" />

        {/* Centered Overlay Content Container (Positioned lower down with smaller text) */}
        <div className="relative z-20 h-full flex flex-col items-center justify-end pb-20 sm:pb-24 text-center p-6 sm:p-12 space-y-4 max-w-2xl mx-auto">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/80 border border-blue-800/60 text-[10px] sm:text-[11px] font-bold text-blue-400 uppercase tracking-widest backdrop-blur-md shadow-lg">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>30-SECOND QUIZ</span>
          </div>

          {/* Main Headline (Slightly smaller size) */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            Not sure which<br />template is for you?
          </h2>

          {/* Subtitle (Slightly smaller size) */}
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal max-w-md mx-auto drop-shadow-md">
            Answer a few short questions and get matched with a website template perfect for your business, with 30% off.
          </p>

          {/* CTA Button */}
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

      {/* Interactive 60-Second Quiz Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative max-w-lg w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 overflow-hidden shadow-2xl text-left space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
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
