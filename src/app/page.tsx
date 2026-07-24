"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import TestimonialsGrid from "@/components/sections/TestimonialsGrid";
import PricingSectionComponent from "@/components/sections/PricingSection";
import QuizCTA from "@/components/sections/QuizCTA";
import AboutCreator from "@/components/sections/AboutCreator";

/* ─────────────────────────── CONSTANTS ─────────────────────────── */

const NAV_LINKS = ["Templates", "Live examples", "Support", "Blog"];

const TEMPLATE_SCREENSHOTS = [
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

const HERO_CYCLED_REVIEWS = [
  {
    name: "Seyed",
    quote: "An excellent template in terms of design & customizability.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Alex Rivers",
    quote: "The best Framer template collection I've ever used. Shipped our landing page in under 1 hour.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Maya Lin",
    quote: "Saved us weeks of design time. The code quality and typography hierarchy are immaculate.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
  {
    name: "Daniel Sterling",
    quote: "Converted 3x better than our previous custom page. Worth every single cent.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    rating: 5,
  },
];

const MARQUEE_REVIEWS = [
  { name: "Alex Rivers", role: "Co-founder, Kinetix AI", stars: 5, quote: "The best Framer template collection I've ever used. Shipped our landing page in under 1 hour.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop" },
  { name: "Maya Lin", role: "Head of Design, Horizon Studio", stars: 5, quote: "Saved us weeks of design time. The code quality and typography hierarchy are immaculate.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&auto=format&fit=crop" },
  { name: "Daniel Sterling", role: "Growth Marketer, FlowState", stars: 5, quote: "Converted 3x better than our previous custom page. Worth every single cent.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop" },
  { name: "Sophia Chen", role: "Founder, Luminary Studio", stars: 5, quote: "The video tutorials included answered every single question I had. Incredible support.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop" },
  { name: "Carlos Gomez", role: "Indie Maker, ShipFast", stars: 5, quote: "Buying the bundle was the best investment for our startup this year.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=80&auto=format&fit=crop" },
  { name: "Hannah Wright", role: "Creative Director, Prism Digital", stars: 5, quote: "Extremely easy to customize. The micro-interactions feel completely bespoke.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&auto=format&fit=crop" },
];

const FEATURED_TEMPLATES = [
  {
    id: "tavern", name: "Tavern", type: "Framer", price: "$129",
    badge: "HOT",
    desc: "Clean minimal template for tech & creator tools.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: "influence", name: "Influence", type: "Framer", price: "$129",
    badge: "POPULAR",
    desc: "Short-form content that builds real influence.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
  {
    id: "agentik", name: "Agentik", type: "Framer", price: "$129",
    badge: "FEATURED",
    desc: "AI made easy so your business scales fast.",
    img: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
    wide: false,
  },
];

const BENTO_ITEMS = [
  {
    id: "responsive",
    title: "FULL RESPONSIVE LAYOUTS — MOBILE, TABLET & DESKTOP",
    desc: "Pixel-perfect across every screen size out of the box.",
    tag: "Mobile-First",
    img: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "tutorials",
    title: "STEP-BY-STEP VIDEO TUTORIALS",
    desc: "Comprehensive walkthroughs for customization and launch.",
    tag: "Guided Setup",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "seo",
    title: "AUTOMATIC SEO & SOCIAL CARDS",
    desc: "Pre-optimized meta tags and social share previews.",
    tag: "SEO Optimized",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop",
  },
  {
    id: "cms",
    title: "FRAMER & WEBFLOW CMS READY",
    desc: "Manage blog posts, team members, and portfolio items effortlessly.",
    tag: "Dynamic CMS",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=700&auto=format&fit=crop",
  },
];

const HOW_STEPS = [
  { n: "01", title: "Pick a template", sub: "Choose from our library of conversion-tested templates.", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=900&auto=format&fit=crop", chips: ["14+ Templates", "Instant Access", "Framer Remix"] },
  { n: "02", title: "Make it yours", sub: "Customise text, colors, and images effortlessly.", img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop", chips: ["No Code Needed", "Global Variables", "CMS Integration"] },
  { n: "03", title: "Go live", sub: "Publish to your custom domain with 1 click.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=900&auto=format&fit=crop", chips: ["1-Click Publish", "Custom Domain", "Free SSL"] },
];

const TESTIMONIALS_GRID = [
  { name: "Alex Rivers", role: "Co-founder & CEO, Kinetix AI", stars: 5, quote: "The best Framer template collection I've ever used. We shipped our landing page in under 1 hour.", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", template: "Aura SaaS" },
  { name: "Maya Lin", role: "Head of Design, Horizon Studio", stars: 5, quote: "Saved us weeks of design time. The code quality and typography hierarchy are immaculate.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop", template: "Vortex Agency" },
  { name: "Daniel Sterling", role: "Growth Marketer, FlowState", stars: 5, quote: "Converted 3x better than our previous custom page. Worth every single cent.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", template: "Pulse Portfolio" },
  { name: "Sophia Chen", role: "Founder, Luminary Studio", stars: 5, quote: "The video tutorials answered every question I had. Incredible support included.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", template: "Aura SaaS" },
  { name: "Carlos Gomez", role: "Indie Maker, ShipFast Studio", stars: 5, quote: "Buying the bundle was the best investment for our startup this year by far.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop", template: "Bundle" },
  { name: "Hannah Wright", role: "Creative Director, Prism Digital", stars: 5, quote: "Extremely easy to customize. The micro-interactions feel completely bespoke.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop", template: "Vortex Agency" },
];

const PRICING = [
  {
    id: "single", label: "SINGLE TEMPLATE", price: "$129", note: "One-time payment", highlight: false, badge: null,
    cta: "Get single template",
    features: ["1 Framer template", "Single commercial license", "Figma design source file", "Step-by-step video guide", "Lifetime free updates", "Standard support"],
  },
  {
    id: "bundle", label: "ALL-ACCESS BUNDLE", price: "$399", note: "One-time payment", highlight: true, badge: "MOST POPULAR",
    cta: "Get All-Access Bundle",
    features: ["Access to ALL 14+ templates", "Unlimited commercial licenses", "ALL future template releases", "Figma + Framer source files", "Priority Discord support", "1-on-1 launch review call"],
  },
  {
    id: "custom", label: "CUSTOM PROJECT", price: "$2,495", note: "Starting price", highlight: false, badge: "Bespoke",
    cta: "Book a discovery call",
    features: ["Custom design from scratch", "2-week rapid delivery", "3D animation & custom code", "Full CMS & SEO setup", "Dedicated private Slack", "30 days post-launch support"],
  },
];

const QUIZ_QUESTIONS = [
  { id: 1, q: "What is the primary goal of your website?", opts: ["Launch B2B SaaS", "Showcase Design Agency", "Personal Portfolio", "E-commerce Store"] },
  { id: 2, q: "Which platform do you prefer?", opts: ["Framer Native", "Webflow CMS", "Next.js / Code", "Not Sure Yet"] },
];

/* ─────────────────────────── STAR ICONS ─────────────────────────── */
const Star = ({ filled = true }: { filled?: boolean }) => (
  <svg className={`w-3.5 h-3.5 ${filled ? "text-amber-400 fill-amber-400" : "text-zinc-600"}`} viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const Stars = ({ n = 5 }: { n?: number }) => (
  <div className="flex gap-0.5">{Array.from({ length: n }).map((_, i) => <Star key={i} />)}</div>
);

/* ─────────────────────────── MODAL: QUIZ HERO ─────────────────────────── */
function QuizModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  const pick = (opt: string) => {
    const next = { ...answers, [QUIZ_QUESTIONS[step].id]: opt };
    setAnswers(next);
    if (step < QUIZ_QUESTIONS.length - 1) setStep(step + 1);
    else setDone(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="relative w-full max-w-xl mx-4 rounded-2xl bg-[#111] border border-zinc-800 p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 text-zinc-400 hover:text-white">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Collage bg decorations */}
        <div className="absolute -top-8 -right-8 w-32 h-24 rounded-xl overflow-hidden opacity-20 rotate-6 pointer-events-none border border-white/10">
          <Image src={TEMPLATE_SCREENSHOTS[0]} alt="" fill className="object-cover" />
        </div>
        <div className="absolute -bottom-8 -left-8 w-32 h-24 rounded-xl overflow-hidden opacity-20 -rotate-6 pointer-events-none border border-white/10">
          <Image src={TEMPLATE_SCREENSHOTS[2]} alt="" fill className="object-cover" />
        </div>

        {!done ? (
          <div className="space-y-6">
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
                <button key={opt} onClick={() => pick(opt)} className="w-full text-left px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 hover:border-zinc-600 hover:text-white transition-colors">
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
              Take the quiz <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────── HEADER ─────────────────────────── */
function Header({ onQuiz }: { onQuiz: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{ backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "#000", backdropFilter: scrolled ? "blur(16px)" : "none" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-zinc-900">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" />
          </svg>
          <span className="text-sm font-semibold text-white tracking-tight">Browser.supply</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className="text-[13px] text-zinc-400 hover:text-white transition-colors">{l}</a>
          ))}
        </nav>

        {/* Right: Social + Bundle */}
        <div className="hidden md:flex items-center gap-4">
          {/* X icon */}
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* YouTube icon */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a href="#pricing" className="px-4 py-1.5 rounded-full bg-white text-black text-[13px] font-semibold hover:bg-zinc-100 transition-colors">
            Bundle
          </a>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-zinc-400">
          {mobileOpen
            ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          }
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-zinc-900 px-5 pb-6 pt-4 space-y-4">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" onClick={() => setMobileOpen(false)} className="block text-sm text-zinc-400 hover:text-white py-1">{l}</a>
          ))}
          <div className="pt-4 border-t border-zinc-900 flex items-center justify-between">
            <div className="flex gap-3">
              <a href="https://x.com" target="_blank" className="text-zinc-500 hover:text-white"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
              <a href="https://youtube.com" target="_blank" className="text-zinc-500 hover:text-white"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
            </div>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-semibold">Bundle</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─────────────────────────── HERO (ANIMATED FULL MASONRY & CYCLING REVIEWS) ─────────────────────────── */
function Hero({ onQuiz }: { onQuiz: () => void }) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  // Automatically cycle review comments one by one every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIdx((prev) => (prev + 1) % HERO_CYCLED_REVIEWS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentReview = HERO_CYCLED_REVIEWS[activeReviewIdx];

  const heroVideos = [
    { name: "Influence", type: "AI SAAS", src: "https://vjs.zencdn.net/v/oceans.mp4", poster: TEMPLATE_SCREENSHOTS[0] },
    { name: "Zenna", type: "YOGA STUDIO", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", poster: TEMPLATE_SCREENSHOTS[1] },
    { name: "Agentik", type: "AI SAAS", src: "https://vjs.zencdn.net/v/oceans.mp4", poster: TEMPLATE_SCREENSHOTS[2] },
    { name: "Selene", type: "SMMA", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", poster: TEMPLATE_SCREENSHOTS[3] },
    { name: "Cora", type: "PORTFOLIO", src: "https://vjs.zencdn.net/v/oceans.mp4", poster: TEMPLATE_SCREENSHOTS[4] },
    { name: "Talentify", type: "TECH CAREERS", src: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4", poster: TEMPLATE_SCREENSHOTS[5] },
  ];

  const col1 = [heroVideos[0], heroVideos[4], heroVideos[0], heroVideos[4]];
  const col2 = [heroVideos[1], heroVideos[5], heroVideos[1], heroVideos[5]];
  const col3 = [heroVideos[2], heroVideos[3], heroVideos[2], heroVideos[3]];
  const col4 = [heroVideos[3], heroVideos[0], heroVideos[3], heroVideos[0]];
  const col5 = [heroVideos[4], heroVideos[1], heroVideos[4], heroVideos[1]];

  return (
    <section className="pt-32 pb-0 relative overflow-hidden w-full">
      {/* Top Headline Content & Actions Container */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="space-y-5 max-w-2xl text-left relative z-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-bold text-zinc-300 uppercase tracking-widest">
            <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M6.002 1.61L0 12h6.002V1.61zm0 10.39v10.39L12 12H6.002zM12 1.61L6.002 12H18L12 1.61z" /></svg>
            Framer Templates
          </div>

          <h1 className="text-[2.6rem] sm:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
            No back-and-forth with<br />AI. Pick, edit, publish.
          </h1>
        </div>

        {/* Actions Row */}
        <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-5xl relative z-20">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a href="#templates" className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-100 transition-colors text-center">
              Pick your template
            </a>
            <button onClick={onQuiz} className="px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 hover:text-white hover:border-zinc-600 transition-colors">
              Or get matched with the perfect one
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {["https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=80&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=80&auto=format&fit=crop",
              ].map((src, i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-black overflow-hidden relative bg-zinc-800">
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1 text-[12px] font-semibold text-zinc-300">
              <Star />
              <span>RATED 4.92/5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Edge-to-Edge Tall Video Gallery (No Animation, 1400px Height) */}
      <div className="mt-10 relative w-full overflow-hidden" style={{ height: "1400px" }}>
        
        {/* Static Multi-Column Video Gallery Grid */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3.5 opacity-95 w-full px-2">
          {/* Column 1 */}
          <div className="overflow-hidden relative">
            <div className="flex flex-col gap-3.5">
              {col1.map((item, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl" style={{ height: "380px" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => e.currentTarget.play()}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 */}
          <div className="overflow-hidden relative">
            <div className="flex flex-col gap-3.5">
              {col2.map((item, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl" style={{ height: "400px" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => e.currentTarget.play()}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3 */}
          <div className="hidden md:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5">
              {col3.map((item, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl" style={{ height: "390px" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => e.currentTarget.play()}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4 */}
          <div className="hidden md:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5">
              {col4.map((item, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl" style={{ height: "410px" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => e.currentTarget.play()}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 5 */}
          <div className="hidden lg:block overflow-hidden relative">
            <div className="flex flex-col gap-3.5">
              {col5.map((item, idx) => (
                <div key={idx} className="relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 shrink-0 shadow-2xl" style={{ height: "380px" }}>
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    onCanPlay={(e) => e.currentTarget.play()}
                    className="absolute inset-0 w-full h-full object-cover opacity-85 z-0"
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fade Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none z-10" />

        {/* Floating Cycling Reviews / Comment Text (NO BOX, NO BORDER, NO BACKGROUND) */}
        <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col items-center justify-center px-4">
          <div
            key={activeReviewIdx}
            className="animate-slide-up flex flex-col items-center text-center space-y-2 max-w-xl"
          >
            {/* 5 Stars */}
            <Stars n={currentReview.rating} />

            {/* Comment Quote (Plain Text, No Box) */}
            <p className="text-base sm:text-xl font-semibold text-white tracking-tight leading-snug drop-shadow-md">
              "{currentReview.quote}"
            </p>

            {/* Reviewer Avatar + Name */}
            <div className="flex items-center gap-2 pt-1">
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-zinc-700/60 bg-zinc-800 shrink-0">
                <Image src={currentReview.avatar} alt={currentReview.name} fill className="object-cover" />
              </div>
              <span className="text-xs sm:text-sm text-zinc-300 font-medium">{currentReview.name}</span>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Pill CTA: WHICH TEMPLATE IS FOR ME? */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center">
          <button
            onClick={onQuiz}
            className="px-4 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-bold text-blue-400 hover:text-white hover:bg-zinc-800 transition-colors uppercase tracking-wider backdrop-blur-md shadow-lg"
          >
            WHICH TEMPLATE IS FOR ME?
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── MARQUEE ─────────────────────────── */
function MarqueeSection() {
  const items = [...MARQUEE_REVIEWS, ...MARQUEE_REVIEWS];
  return (
    <section className="py-12 border-y border-zinc-900 overflow-hidden relative bg-black">
      <div className="text-center mb-6 space-y-1">
        <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-widest">
          <Stars n={5} /><span className="ml-1">4.92 / 5 STAR RATED</span>
        </div>
        <div className="text-[11px] uppercase tracking-widest text-zinc-500 font-semibold">Reviews from creators and founders worldwide</div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #000, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #000, transparent)" }} />

      <div className="flex overflow-hidden">
        <div className="animate-marquee shrink-0">
          {items.map((r, i) => (
            <div key={i} className="w-80 rounded-2xl bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between shrink-0" style={{ marginRight: "16px" }}>
              <div className="space-y-3">
                <Stars n={r.stars} />
                <p className="text-[13px] text-zinc-300 leading-relaxed">"{r.quote}"</p>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-zinc-900">
                <div className="w-8 h-8 rounded-full overflow-hidden relative bg-zinc-800 shrink-0">
                  <Image src={r.avatar} alt={r.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">{r.name}</div>
                  <div className="text-[11px] text-zinc-500">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── FEATURED TEMPLATES (EXACT SCREENSHOT MATCH WITH HOVER IMAGE SWAP) ─────────────────────────── */
const EXACT_FEATURED_TEMPLATES = [
  {
    id: "selene",
    name: "Selene",
    badge: "NEW",
    category: "AI SAAS",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "zenna",
    name: "Zenna",
    badge: null,
    category: "YOGA STUDIO",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "traction",
    name: "Traction",
    badge: null,
    category: "SMMA",
    price: "$129 USD",
    imgPrimary: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    imgSecondary: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  },
];

function FeaturedTemplates() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="templates" className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Top Badge: WHICH TEMPLATE IS FOR ME? */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          WHICH TEMPLATE IS FOR ME?
        </span>
      </div>

      {/* Header Row: Headline + View All Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight">
          Premium templates<br />built to drive results.
        </h2>

        <a
          href="#pricing"
          className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-zinc-200 transition-all text-center self-start sm:self-auto shrink-0 shadow-md"
        >
          View all
        </a>
      </div>

      {/* 3 Featured Template Cards with Hover Image Swap */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EXACT_FEATURED_TEMPLATES.map((t) => {
          const isHovered = hoveredId === t.id;
          return (
            <div
              key={t.id}
              onMouseEnter={() => setHoveredId(t.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="cursor-pointer space-y-4 group"
            >
              {/* Card Image Container (Hover Swaps Image) */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-xl transition-all duration-300 group-hover:border-zinc-700">
                {/* Primary Image */}
                <Image
                  src={t.imgPrimary}
                  alt={t.name}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
                  }`}
                />

                {/* Secondary Image (Appears on Mouse Hover) */}
                <Image
                  src={t.imgSecondary}
                  alt={`${t.name} hover preview`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                  }`}
                />
              </div>

              {/* Card Meta (Title + Badge & Category + Price) */}
              <div className="space-y-1 text-left px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {t.name}
                  </h3>
                  {t.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                      {t.badge}
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {t.category} <span className="mx-1">•</span> {t.price}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────── BENTO SECTION (UNIFIED 4-QUADRANT BENTO BOX MATCHING SCREENSHOT) ─────────────────────────── */
function BentoSection() {
  return (
    <section className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Section Headline */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-10">
        Everything you need to launch.<br />All in one place, not a stack.
      </h2>

      {/* Unified Bento Grid Box (Single rounded container divided by thin 1px border lines) */}
      <div className="rounded-3xl bg-[#050507] border border-zinc-800/80 overflow-hidden grid grid-cols-1 md:grid-cols-12 shadow-2xl">
        
        {/* QUADRANT 1: Responsive Breakpoints (Top Left - 7 Cols) - WITH LIVE VIDEO PLAYING INSIDE DEVICES */}
        <div className="md:col-span-7 border-b md:border-r border-zinc-800/80 p-6 md:p-8 flex flex-col justify-between min-h-[420px] bg-[#050507] relative overflow-hidden">
          {/* Top Graphic: Exact Framer Breakpoint Device Mockups with Autoplay Video */}
          <div className="flex gap-2.5 items-start justify-center overflow-hidden mb-6 -mx-2 pt-2">
            {/* Desktop 1200 Mockup */}
            <div className="w-[52%] bg-black rounded-lg border border-zinc-800 p-2 space-y-1.5 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[9px] text-zinc-500 font-mono px-1">
                <span>▶ Desktop 1200</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[4/3] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-3 text-left flex flex-col justify-between">
                {/* Autoplay Video Stream inside Desktop */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => e.currentTarget.play()}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
                >
                  <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="space-y-1 relative z-20">
                  <div className="text-[9px] font-extrabold text-white tracking-wide">DESIGNING + BUILDING</div>
                  <div className="text-[8px] font-extrabold text-white tracking-wide">HIGH-PERFORMING WEBSITES</div>
                  <div className="text-[6px] text-zinc-300 max-w-[120px]">Hello there, I'm Chris - I craft websites that are user-friendly, beautiful & convert.</div>
                </div>
                <div className="inline-block self-start px-2 py-0.5 rounded bg-orange-600 text-[6px] font-bold text-white uppercase relative z-20 shadow">
                  LET'S START BUILDING YOURS
                </div>
                <div className="absolute bottom-2 right-2 w-12 h-14 rounded overflow-hidden border border-white/20 z-20">
                  <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Tablet 1199 — 810 Mockup */}
            <div className="w-[30%] bg-black rounded-lg border border-zinc-800 p-2 space-y-1.5 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[8px] text-zinc-500 font-mono px-1">
                <span>▶ Tablet 1199</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[3/4] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-2 text-left flex flex-col justify-between">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => e.currentTarget.play()}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
                >
                  <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="space-y-1 relative z-20">
                  <div className="text-[8px] font-extrabold text-white">DESIGNING + BUILDING</div>
                  <div className="text-[7px] font-extrabold text-white">WEBSITES</div>
                </div>
                <div className="inline-block self-start px-1.5 py-0.5 rounded bg-orange-600 text-[5px] font-bold text-white relative z-20 shadow">
                  LET'S START
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="w-[18%] bg-black rounded-lg border border-zinc-800 p-1.5 space-y-1 shrink-0 shadow-2xl">
              <div className="flex items-center justify-between text-[7px] text-zinc-500 font-mono px-0.5">
                <span>▶ Phone</span>
                <span>+</span>
              </div>
              <div className="relative aspect-[9/16] rounded bg-[#0b0c10] overflow-hidden border border-zinc-800 p-1 text-left">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onCanPlay={(e) => e.currentTarget.play()}
                  className="absolute inset-0 w-full h-full object-cover opacity-75 z-0"
                >
                  <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />

                <div className="text-[6px] font-extrabold text-white leading-tight relative z-20">DESIGNING WEBSITES</div>
              </div>
            </div>
          </div>

          {/* Bottom Quadrant Text */}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight text-left">
            Responsive straight out of the box. No coding or design required.
          </h3>
        </div>

        {/* QUADRANT 2: Video Tutorials (Top Right - 5 Cols) */}
        <div className="md:col-span-5 border-b border-zinc-800/80 p-6 md:p-8 flex flex-col justify-end relative min-h-[420px] bg-[#050507] overflow-hidden group">
          {/* Real Human Creator Image / Video */}
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
            alt="Real human creator tutorial"
            fill
            className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Video Stream Element */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={(e) => e.currentTarget.play()}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-95 z-10"
          >
            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay for Readable Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-20" />

          {/* Bottom Quadrant Text */}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight text-left relative z-30">
            Step-by-step video tutorials included by a real human.
          </h3>
        </div>

        {/* QUADRANT 3: SEO & CMS (Bottom Left - 6 Cols) */}
        <div className="md:col-span-6 border-b md:border-b-0 md:border-r border-zinc-800/80 p-6 md:p-8 flex flex-col justify-between space-y-8 bg-[#050507]">
          {/* SEO Part */}
          <div className="space-y-4 text-left">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
              Automatic SEO, sitemaps and full-control all ready in your site.
            </h3>

            {/* Site Settings UI Preview */}
            <div className="bg-[#0b0c10] rounded-xl border border-zinc-800/90 p-4 space-y-3 font-sans text-xs">
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Site Settings</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                  <div className="text-[9px] text-zinc-500">Title</div>
                  <div className="text-[11px] text-zinc-200 font-medium truncate mt-0.5">Premium Framer Website Templates</div>
                </div>
                <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                  <div className="text-[9px] text-zinc-500">Language</div>
                  <div className="text-[11px] text-zinc-200 font-medium mt-0.5">English <span className="text-zinc-500">en</span></div>
                </div>
              </div>
              <div className="bg-[#14151c] p-2.5 rounded border border-zinc-800">
                <div className="text-[9px] text-zinc-500">Description</div>
                <div className="text-[11px] text-zinc-400 mt-0.5 truncate">Professional Framer website templates starting at $129.</div>
              </div>
            </div>
          </div>

          {/* CMS Part */}
          <div className="space-y-4 text-left pt-6 border-t border-zinc-800/60">
            <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
              Easily create and manage content with a built-in CMS.
            </h3>

            {/* Framer CMS Editor UI Preview */}
            <div className="bg-[#0b0c10] rounded-xl border border-zinc-800/90 p-3 font-sans text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-[11px] text-white font-medium">Villa Sorrento</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.5 rounded font-mono">Live •</span>
              </div>
              <span className="text-[10px] text-zinc-500">Posts & Articles</span>
            </div>
          </div>
        </div>

        {/* QUADRANT 4: Pro Hosting (Bottom Right - 6 Cols) */}
        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-end relative min-h-[350px] bg-[#050507] overflow-hidden text-left">
          {/* Subtle background server globe graphic */}
          <div className="absolute inset-0 opacity-40 pointer-events-none">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
              alt=""
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/80 to-transparent" />
          </div>

          {/* Bottom Quadrant Text */}
          <h3 className="text-xl md:text-2xl font-bold text-white leading-snug tracking-tight relative z-10">
            Pro hosting included for fast and secure global sites.
          </h3>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────── HOW IT WORKS (100% PIXEL-PERFECT MATCH WITH REFERENCE SCREENSHOT) ─────────────────────────── */
function HowItWorks() {
  return (
    <section className="py-20 px-5 sm:px-8 max-w-[1200px] mx-auto text-left">
      {/* Top Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
          HOW DOES IT WORK?
        </span>
      </div>

      {/* Section Headline */}
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white leading-[1.1] tracking-tight mb-12">
        Go live within 1 hour, not<br />months, weeks or even days.
      </h2>

      {/* 3-Step Unified Bento Grid Box */}
      <div className="rounded-3xl bg-[#050507] border border-zinc-800/80 overflow-hidden grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/80 shadow-2xl">
        
        {/* CARD 1 (STEP 1: Pick a template) - CLEAN FULL BLEED LOOPING VIDEO */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group">
          {/* Autoplay Video Stream (No image overlay) */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={(e) => e.currentTarget.play()}
            className="absolute inset-0 w-full h-full object-cover opacity-85 z-0 transition-transform duration-700 group-hover:scale-105"
          >
            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
          </video>

          {/* Gradient Overlay for Readable Text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10" />

          {/* STEP 1 Badge at top left */}
          <div className="relative z-20 self-start">
            <span className="px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 1
            </span>
          </div>

          {/* Bottom Copy */}
          <div className="space-y-1.5 relative z-20 text-left">
            <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Pick a template.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed max-w-[280px]">
              Browse the collection of expert-crafted templates and select one best for you.
            </p>
          </div>
        </div>

        {/* CARD 2 (STEP 2: Make it yours) */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group text-left">
          {/* Top Graphic Area: Framer Studio Canvas Mockup with Video */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0b0c10] border border-zinc-800 p-2.5 mb-6 shadow-2xl flex flex-col justify-between">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={(e) => e.currentTarget.play()}
              className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
            >
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

            {/* Framer Studio Interface Top Header */}
            <div className="flex items-center justify-between text-[8px] text-zinc-400 font-mono border-b border-zinc-800 pb-1.5 relative z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-600"></span>
                <span className="text-white font-bold">Framer Studio</span>
              </div>
              <span className="text-zinc-500">Canvas 100%</span>
            </div>

            {/* Framer Canvas Content */}
            <div className="space-y-1 py-1 relative z-20">
              <div className="text-[10px] font-extrabold text-white">DESIGNING + BUILDING</div>
              <div className="text-[9px] font-extrabold text-white">HIGH-PERFORMING WEBSITES</div>
              <div className="inline-block px-2 py-0.5 rounded bg-orange-600 text-[6px] font-bold text-white uppercase shadow">
                LET'S START BUILDING YOURS
              </div>
            </div>

            {/* Framer Color Picker Bar */}
            <div className="bg-[#14151c]/90 p-2 rounded-lg border border-zinc-800 flex items-center justify-between relative z-20 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500 border border-white/20"></span>
                <span className="text-[9px] text-zinc-200 font-medium">Accent Color #3B82F6</span>
              </div>
              <span className="text-[8px] text-zinc-500 font-mono">Variables</span>
            </div>
          </div>

          {/* STEP 2 Badge & Bottom Copy */}
          <div className="space-y-3 relative z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 2
            </span>
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Make it yours.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Change text, customize colors, and swap images with ease.
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3 (STEP 3: Go live instantly) */}
        <div className="p-6 md:p-8 flex flex-col justify-between min-h-[480px] bg-[#050507] relative overflow-hidden group text-left">
          {/* STEP 3 Badge & Top Copy */}
          <div className="space-y-3 mb-4 relative z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-950/90 text-amber-400 border border-amber-800/80 text-[10px] font-extrabold uppercase tracking-wider shadow">
              STEP 3
            </span>
            <div className="space-y-1.5">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Go live instantly.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Launch your site in seconds with just one click, all in one platform.
              </p>
            </div>
          </div>

          {/* Bottom Graphic Area: Framer Publish Editor Mockup with Video */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#0b0c10] border border-zinc-800 p-2.5 shadow-2xl flex flex-col justify-end">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={(e) => e.currentTarget.play()}
              className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
            >
              <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/50 pointer-events-none z-10" />

            {/* Publish Toolbar UI at bottom */}
            <div className="bg-[#14151c]/95 p-2.5 rounded-lg border border-zinc-800 flex items-center justify-between relative z-20 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] text-white font-medium">Domain: browser.supply</span>
              </div>
              <button className="px-3.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold shadow-md flex items-center gap-1 transition">
                Publish
              </button>
              {/* Mouse Cursor Graphic */}
              <div className="absolute right-4 -bottom-1 z-30 pointer-events-none transform translate-x-1 translate-y-1">
                <svg className="w-5 h-5 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.64 21.97C13.14 22.21 12.54 22 12.31 21.5L9.34 15.02L5.88 18.48C5.46 18.9 4.75 18.6 4.75 18.01V2.99C4.75 2.4 5.46 2.1 5.88 2.52L17.38 14.02C17.8 14.44 17.5 15.15 16.91 15.15H12.44L15.41 21.63C15.65 22.13 15.44 22.73 14.94 22.97L13.64 21.97Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────── TESTIMONIALS GRID ─────────────────────────── */
function TestimonialsSection() {
  return <TestimonialsGrid />;
}

/* ─────────────────────────── PRICING ─────────────────────────── */
function PricingSection() {
  return <PricingSectionComponent />;
}

/* ─────────────────────────── QUIZ CTA BANNER ─────────────────────────── */
function QuizBanner({ onQuiz }: { onQuiz: () => void }) {
  return <QuizCTA />;
}

/* ─────────────────────────── CREATOR ─────────────────────────── */
function Creator() {
  return <AboutCreator />;
}

/* ─────────────────────────── FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer className="bg-black py-12 px-5 sm:px-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /></svg>
              <span className="text-sm font-semibold text-white">Browser.supply</span>
            </div>
            <p className="text-[13px] text-zinc-500 max-w-xs leading-relaxed">High-converting Framer & Webflow templates built for modern startups.</p>
          </div>
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Products</div>
            <div className="space-y-2">
              {["Templates", "Bundle", "Custom Project"].map(l => (
                <a key={l} href="#" className="block text-[13px] text-zinc-500 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Resources</div>
            <div className="space-y-2">
              {["Live examples", "Support", "Blog"].map(l => (
                <a key={l} href="#" className="block text-[13px] text-zinc-500 hover:text-white transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-zinc-600">
          <span>© 2026 Browser Supply. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="https://x.com" target="_blank" className="hover:text-white transition-colors"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg></a>
            <a href="https://youtube.com" target="_blank" className="hover:text-white transition-colors"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function Home() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header onQuiz={() => setQuizOpen(true)} />

      <main>
        <Hero onQuiz={() => setQuizOpen(true)} />
        <FeaturedTemplates />
        <BentoSection />
        <HowItWorks />
        <TestimonialsSection />
        <PricingSection />
        <QuizBanner onQuiz={() => setQuizOpen(true)} />
        <Creator />
      </main>

      <Footer />

      {quizOpen && <QuizModal onClose={() => setQuizOpen(false)} />}
    </div>
  );
}
