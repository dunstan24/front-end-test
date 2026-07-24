// Data layer — single source of truth for both Server Components and API Route Handlers.
// All JSON data lives in /src/data/*.json and is imported here as typed constants.

import navigationData from "@/data/navigation.json";
import heroData from "@/data/hero.json";
import marqueeTestimonialsData from "@/data/marquee-testimonials.json";
import templatesData from "@/data/templates.json";
import featuresData from "@/data/features.json";
import howItWorksData from "@/data/how-it-works.json";
import testimonialsData from "@/data/testimonials.json";
import caseStudyData from "@/data/case-study.json";
import pricingData from "@/data/pricing.json";
import quizData from "@/data/quiz.json";
import creatorData from "@/data/creator.json";
import footerData from "@/data/footer.json";

// TypeScript type exports
export type NavigationData = typeof navigationData;
export type HeroData = typeof heroData;
export type MarqueeTestimonialsData = typeof marqueeTestimonialsData;
export type TemplatesData = typeof templatesData;
export type FeaturesData = typeof featuresData;
export type HowItWorksData = typeof howItWorksData;
export type TestimonialsData = typeof testimonialsData;
export type CaseStudyData = typeof caseStudyData;
export type PricingData = typeof pricingData;
export type QuizData = typeof quizData;
export type CreatorData = typeof creatorData;
export type FooterData = typeof footerData;

// Data fetcher functions (async for API route compatibility)
export async function getNavigation() { return navigationData; }
export async function getHero() { return heroData; }
export async function getMarqueeTestimonials() { return marqueeTestimonialsData; }
export async function getTemplates(params?: { category?: string; query?: string }) {
  let items = templatesData.featured;
  if (params?.category) {
    const cat = params.category.toLowerCase();
    items = items.filter(t => t.category.toLowerCase().includes(cat));
  }
  if (params?.query) {
    const q = params.query.toLowerCase();
    items = items.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }
  return { header: templatesData.header, featured: items, total: items.length };
}
export async function getFeatures() { return featuresData; }
export async function getHowItWorks() { return howItWorksData; }
export async function getTestimonials(params?: { template?: string }) {
  let grid = testimonialsData.grid;
  if (params?.template) {
    const t = params.template.toLowerCase();
    grid = grid.filter(item => item.quote.toLowerCase().includes(t));
  }
  return { header: testimonialsData.header, grid, total: grid.length };
}
export async function getCaseStudy() { return caseStudyData; }
export async function getPricing() { return pricingData; }
export async function getQuiz() { return quizData; }
export async function getCreator() { return creatorData; }
export async function getFooter() { return footerData; }
