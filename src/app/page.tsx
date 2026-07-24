"use client";

import React, { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import HeaderNav from "@/components/layout/HeaderNav";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import WhyTemplates from "@/components/sections/WhyTemplates";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import Footer from "@/components/layout/Footer";

/**
 * Dynamic imports for below-fold heavy sections.
 * These are code-split into separate chunks and loaded on demand,
 * reducing the initial JS bundle size.
 */
const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection"),
  { ssr: true }
);
const QuizCTA = dynamic(
  () => import("@/components/sections/QuizCTA"),
  { ssr: true }
);
const AboutCreator = dynamic(
  () => import("@/components/sections/AboutCreator"),
  { ssr: true }
);
const QuizModal = dynamic(
  () => import("@/components/ui/QuizModal"),
  { ssr: false }
);

/**
 * Homepage — Client Component that orchestrates section layout
 * and coordinates the global Quiz Modal overlay state.
 */
export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false);
  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeaderNav onQuiz={openQuiz} />

      <main>
        <HeroSection onQuiz={openQuiz} />
        <FeaturedGrid />
        <WhyTemplates />
        <HowItWorks />
        <TestimonialsGrid />
        <PricingSection />
        <QuizCTA />
        <AboutCreator />
      </main>

      <Footer />

      {quizOpen && <QuizModal onClose={closeQuiz} />}
    </div>
  );
}
