"use client";

import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import HeaderNav from "@/components/layout/HeaderNav";
import HeroSection from "@/components/sections/HeroSection";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import WhyTemplates from "@/components/sections/WhyTemplates";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import Footer from "@/components/layout/Footer";

/**
 * Dynamic imports for below-fold heavy sections and overlays.
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
const HeroQuizModal = dynamic(
  () => import("@/components/ui/HeroQuizModal"),
  { ssr: false }
);

/**
 * Homepage — Client Component that orchestrates section layout,
 * welcome popup on every refresh/page load, and global quiz modal.
 */
export default function HomePage() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [welcomeOpen, setWelcomeOpen] = useState(false);

  const openQuiz = useCallback(() => setQuizOpen(true), []);
  const closeQuiz = useCallback(() => setQuizOpen(false), []);
  const closeWelcome = useCallback(() => setWelcomeOpen(false), []);

  // Show welcome popup automatically on every page load / refresh
  useEffect(() => {
    setWelcomeOpen(true);
  }, []);

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

      {/* Global interactive quiz modal */}
      {quizOpen && <QuizModal onClose={closeQuiz} />}

      {/* Welcome promo popup (shows on every load/refresh, closes on click) */}
      {welcomeOpen && (
        <HeroQuizModal
          isOpen={welcomeOpen}
          onClose={closeWelcome}
        />
      )}
    </div>
  );
}
