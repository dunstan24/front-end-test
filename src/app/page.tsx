import HeaderNav from "@/components/layout/HeaderNav";
import HeroSection from "@/components/sections/HeroSection";
import TestimonialsMarquee from "@/components/sections/TestimonialsMarquee";
import FeaturedGrid from "@/components/sections/FeaturedGrid";
import WhyTemplates from "@/components/sections/WhyTemplates";
import HowItWorks from "@/components/sections/HowItWorks";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import CaseStudy from "@/components/sections/CaseStudy";
import PricingSection from "@/components/sections/PricingSection";
import QuizCTA from "@/components/sections/QuizCTA";
import AboutCreator from "@/components/sections/AboutCreator";
import Footer from "@/components/layout/Footer";

import {
  getNavigation,
  getHero,
  getMarqueeTestimonials,
  getTemplates,
  getFeatures,
  getHowItWorks,
  getTestimonials,
  getCaseStudy,
  getPricing,
  getQuiz,
  getCreator,
  getFooter,
} from "@/lib/data";

export default async function Home() {
  // Server-side data fetching via single source of truth (/lib/data.ts)
  const [
    navData,
    heroData,
    marqueeData,
    templatesData,
    featuresData,
    howItWorksData,
    testimonialsData,
    caseStudyData,
    pricingData,
    quizData,
    creatorData,
    footerData,
  ] = await Promise.all([
    getNavigation(),
    getHero(),
    getMarqueeTestimonials(),
    getTemplates(),
    getFeatures(),
    getHowItWorks(),
    getTestimonials(),
    getCaseStudy(),
    getPricing(),
    getQuiz(),
    getCreator(),
    getFooter(),
  ]);

  return (
    <div className="min-h-screen bg-surface-dark text-white selection:bg-accent-purple/30 selection:text-white relative overflow-x-hidden">
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0" />
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Navigation Header */}
      <HeaderNav data={navData} />

      {/* Main Content Sections */}
      <main className="relative z-10 pt-16">
        {/* Section 2: Hero Section */}
        <HeroSection data={heroData} />

        {/* Section 3: Testimonials Marquee */}
        <TestimonialsMarquee data={marqueeData} />

        {/* Section 4: Grid Template Unggulan */}
        <FeaturedGrid data={templatesData} />

        {/* Section 5: Why Templates */}
        <WhyTemplates data={featuresData} />

        {/* Section 6: How It Works */}
        <HowItWorks data={howItWorksData} />

        {/* Section 7: Grid Testimoni Besar */}
        <TestimonialsGrid data={testimonialsData} />

        {/* Section 8: Case Study */}
        <CaseStudy data={caseStudyData} />

        {/* Section 9: Pricing Section */}
        <PricingSection data={pricingData} />

        {/* Section 10: CTA Quiz Section */}
        <QuizCTA data={quizData} />

        {/* Section 11: About Creator Section */}
        <AboutCreator data={creatorData} />

        {/* Section 12: Footer */}
        <Footer data={footerData} />
      </main>
    </div>
  );
}
