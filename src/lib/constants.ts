/**
 * Centralized constants — single source of truth for URLs, image arrays,
 * and video sources used across multiple components.
 *
 * Eliminates the ~9 duplicate Unsplash URL arrays scattered across
 * HeroSection, QuizCTA, QuizModal, and other files.
 */

/* ─── External Video Sources ─── */

export const VIDEO_SOURCES = {
  oceans: "https://vjs.zencdn.net/v/oceans.mp4",
  flower: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
} as const;

/* ─── Template Preview Screenshots ─── */

export const TEMPLATE_SCREENSHOTS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=600&auto=format&fit=crop",
] as const;

/* ─── Avatar URLs (used in Hero social proof & review cycling) ─── */

export const AVATAR_URLS = {
  seyed: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  alex: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
  maya: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=100&auto=format&fit=crop",
  daniel: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
} as const;

/* ─── Social Links ─── */

export const SOCIAL_LINKS = {
  x: "https://x.com",
  youtube: "https://youtube.com",
} as const;

/* ─── Layout Constants ─── */

export const SECTION_CONTAINER = "max-w-[1200px] mx-auto px-5 sm:px-8" as const;
export const SECTION_PADDING = "py-20" as const;
