import siteData from "@/data/site-data.json";
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

// Type definitions
export type SiteData = typeof siteData;
export type NavigationData = typeof navigationData;
export type HeroData = typeof heroData;
export type MarqueeTestimonial = (typeof marqueeTestimonialsData)[number];
export type TemplatesData = typeof templatesData;
export type FeaturesData = typeof featuresData;
export type HowItWorksData = typeof howItWorksData;
export type TestimonialsData = typeof testimonialsData;
export type CaseStudyData = typeof caseStudyData;
export type PricingData = typeof pricingData;
export type QuizData = typeof quizData;
export type CreatorData = typeof creatorData;
export type FooterData = typeof footerData;

/**
 * Data fetching library - Single Source of Truth
 * Functions in this file read raw resource data and provide filtering/querying capabilities.
 * Shared between Next.js Server Components and API Route Handlers.
 */

export async function getSiteData(): Promise<SiteData> {
  return siteData;
}

export async function getNavigation(): Promise<NavigationData> {
  return navigationData;
}

export async function getHero(): Promise<HeroData> {
  return heroData;
}

export async function getMarqueeTestimonials(): Promise<MarqueeTestimonial[]> {
  return marqueeTestimonialsData;
}

export async function getTemplates(params?: { category?: string; query?: string }) {
  let items = templatesData.featured;

  if (params?.category) {
    const cat = params.category.toLowerCase();
    items = items.filter((t) => t.category.toLowerCase().includes(cat));
  }

  if (params?.query) {
    const q = params.query.toLowerCase();
    items = items.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
    );
  }

  return {
    header: templatesData.header,
    featured: items,
    total: items.length,
  };
}

export async function getFeatures(): Promise<FeaturesData> {
  return featuresData;
}

export async function getHowItWorks(): Promise<HowItWorksData> {
  return howItWorksData;
}

export async function getTestimonials(params?: { template?: string }) {
  let grid = testimonialsData.grid;

  if (params?.template) {
    const tmpl = params.template.toLowerCase();
    grid = grid.filter((t) => t.templateUsed.toLowerCase().includes(tmpl));
  }

  return {
    header: testimonialsData.header,
    grid,
    total: grid.length,
  };
}

export async function getCaseStudy(): Promise<CaseStudyData> {
  return caseStudyData;
}

export async function getPricing(): Promise<PricingData> {
  return pricingData;
}

export async function getQuiz(): Promise<QuizData> {
  return quizData;
}

export async function getCreator(): Promise<CreatorData> {
  return creatorData;
}

export async function getFooter(): Promise<FooterData> {
  return footerData;
}
