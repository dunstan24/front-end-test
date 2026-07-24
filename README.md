1. How would you structure JSON data for future scalability and maintainability?

I'd keep it normalized instead of deeply nested — each section of the homepage (hero, features, testimonials, pricing, etc.) gets its own object with a stable id, rather than everything crammed into one giant blob. That way if two sections need to reference the same data (like a product used in both the hero and a comparison table), I just reference the id instead of duplicating the content. I'd also separate "content" from "config" — text/copy in one place, layout/display settings (like which sections are enabled, ordering, feature flags) in another. That split matters a lot here specifically because I built the first version off local JSON and I'm now wiring in a real API — since I kept the shape of the JSON close to what a REST/GraphQL response would look like (flat-ish, predictable keys, no weird one-off fields), swapping the data source didn't require touching the components at all, just the fetch layer.

2. If you decide to create your own API, which technology/framework would you use and why?

Since the whole project already lives in Next.js and deploys on Vercel, I went with Next.js API Routes (Route Handlers if I'm on the App Router) instead of spinning up a separate Express server somewhere. Main reason is simplicity — it ships in the same repo, deploys with the same vercel push, no extra hosting/CORS config, and I get serverless functions for free without managing infrastructure. If this were a bigger project that needed to serve multiple frontends or had heavier backend logic, I'd probably reach for something like Fastify or NestJS on its own service — but for a single-site project where the API's only job is to feed data to this frontend, keeping it inside Next.js is just less to maintain.

3. How would you configure a custom domain (e.g. www.clientwebsite.com) to point to a Vercel deployment?

In the Vercel dashboard, under the project's Settings → Domains, I'd add www.clientwebsite.com. Vercel then gives you the DNS records to add on the domain registrar's side — usually a CNAME record pointing www to cname.vercel-dns.com, and if the client also wants the bare domain (clientwebsite.com) to work, an A record pointing to Vercel's IP, or I'd just set up a redirect from the apex to the www version (or vice versa, depending on which one they want as canonical). Once DNS propagates, Vercel auto-provisions an SSL cert via Let's Encrypt, so HTTPS is handled without me touching anything manually.

4. If the project needs an admin panel to manage content, what would you use?

For something like this — a marketing/landing page where non-technical people need to edit text, images, and maybe reorder sections — I'd lean toward a headless CMS rather than building a custom admin panel from scratch. Something like Sanity or Contentful gives you a ready-made editing UI, image handling, and a content API out of the box, and it plugs straight into the Next.js frontend. If the client specifically wanted everything self-hosted and fully custom, the alternative would be a small admin app built with Next.js + Prisma + a database (Postgres/MongoDB), with auth handled through NextAuth — but that's a lot more to build and maintain just for content editing, so I'd only go that route if there were real requirements pushing me there (e.g. very custom workflows, no third-party data storage allowed).

5. What techniques would you use to keep the site fast on slow connections?

A few things I actually applied here: using next/image so images are automatically resized, lazy-loaded, and served in modern formats; code-splitting with dynamic imports so heavy components (like the quiz modal) don't get pulled into the initial bundle; trimming third-party scripts since those are often the biggest hit on slow networks; and relying on Vercel's edge caching/CDN so static assets are served from somewhere close to the user instead of a single origin. On top of that — preloading key fonts with font-display: swap so text doesn't stay invisible while fonts load, minimizing render-blocking CSS, and adding skeleton/placeholder states so the page feels responsive even while data is still coming in.

6. If you implement a form, how would you securely send data to the backend?

The form always posts to my own API route rather than calling any third-party service directly from the client, so nothing sensitive (API keys, secrets) is ever exposed in the browser. Everything's over HTTPS by default on Vercel. On the server side I re-validate and sanitize the input even though the frontend already validates it — client-side validation is just UX, never security. I'd add basic rate limiting on the endpoint to cut down on spam/bots, and for anything public-facing I'd throw in something like hCaptcha. Error responses stay generic (no leaking stack traces or internal details), and any secrets the API route needs (email service keys, etc.) live in Vercel's environment variables, not in the codebase.

7. What strategies do you use to optimize images without sacrificing quality?

next/image does most of the heavy lifting — automatic resizing per breakpoint, serving WebP/AVIF where the browser supports it, and lazy-loading anything below the fold. Beyond that, I make sure source images aren't wildly oversized for where they're actually displayed (no dropping a 4000px hero image into a 600px container), use SVG for icons/logos since they're resolution-independent and tiny, and keep compression around 75-80% quality, which is usually indistinguishable from the original but noticeably smaller. I'll also add a blur placeholder on larger images so the layout doesn't jump and the page feels like it's loading faster even before the full image arrives.

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js 14 (App Router, React 18, TypeScript)
- **Backend Custom API**: Next.js Serverless Route Handlers (`/src/app/api/.../route.ts`)
- **Single Source of Truth**: `/src/lib/data.ts` (Data fetcher layer yang melayani Server Components dan Route Handlers)
- **Styling**: Tailwind CSS + Custom CSS Variables (Design Tokens extracted from browser.supply)
- **Icons**: Lucide React
- **Data Handling**: Modular Local JSON Data (`/src/data/*.json`)
- **Animation & Transitions**: CSS GPU Acceleration Keyframes, Hover Micro-interactions, Auto-scrolling Marquee & Video Streams
- **Deployment**: Vercel Serverless Production Ready

---

## 📄 API Documentation

Dokumentasi lengkap mengenai 12 endpoint Custom REST API yang tersedia dapat dibaca di file [API_DOCS.md](file:///c:/Users/USER/Desktop/Front%20end%20test/API_DOCS.md).

### Ringkasan Endpoint API Utama:
- `GET /api/templates?category=SaaS` — Daftar template unggulan (dengan filter kategori & search query)
- `GET /api/testimonials?template=Aura` — Daftar ulasan testimoni pelanggan (dengan filter template)
- `GET /api/hero` — Headline, CTA, rating & media hero section
- `GET /api/pricing` — 3 tier harga & fasilitas lisensi
- `GET /api/navigation` — Navigasi header & link sosial
- `GET /api/features` — Fitur bento grid ("Why choose a template?")
- `GET /api/how-it-works` — Galeri interaktif 3-step process
- `GET /api/case-study` — Metrik & cerita sukses customer
- `GET /api/quiz` — Pertanyaan kuis interaktif
- `GET /api/creator` — Bio & 4 counter statistik pembuat
- `GET /api/footer` — Link footer & copyright

---

## 📁 Struktur Folder Project

```text
c:/Users/USER/Desktop/Front end test/
├── PROGRESS.md                # Progress tracker 21 Fase & Custom API Phase
├── README.md                  # Dokumentasi & jawaban 7 pertanyaan teknis
├── API_DOCS.md                # Dokumentasi lengkap 12 Custom REST API endpoints
├── package.json               # Dependensi Next.js, Tailwind, Lucide Icons
├── tailwind.config.ts         # Extended design tokens (colors, font, animations)
├── postcss.config.mjs
├── tsconfig.json
├── next.config.mjs            # Image domain rules & React strict mode
└── src/
    ├── app/
    │   ├── api/               # 12 Custom Serverless REST API Route Handlers
    │   │   ├── navigation/route.ts
    │   │   ├── hero/route.ts
    │   │   ├── marquee-testimonials/route.ts
    │   │   ├── templates/route.ts (filtering support)
    │   │   ├── features/route.ts
    │   │   ├── how-it-works/route.ts
    │   │   ├── testimonials/route.ts (filtering support)
    │   │   ├── case-study/route.ts
    │   │   ├── pricing/route.ts
    │   │   ├── quiz/route.ts
    │   │   ├── creator/route.ts
    │   │   └── footer/route.ts
    │   ├── globals.css        # CSS variables, glassmorphic effects, keyframes
    │   ├── layout.tsx         # Root layout + SEO Metadata
    │   └── page.tsx           # Server Component merakit 12 section utama via /lib/data.ts
    ├── components/
    │   ├── layout/            # HeaderNav, Footer
    │   └── sections/          # HeroSection, TestimonialsMarquee, FeaturedGrid,
    │                          # WhyTemplates, HowItWorks, TestimonialsGrid,
    │                          # CaseStudy, PricingSection, QuizCTA, AboutCreator
    ├── lib/
    │   └── data.ts            # Single Source of Truth Data Fetching Layer
    └── data/                  # File JSON data per section (0 string hardcoded)
```

---

## 🚀 Cara Menjalankan Project Secara Lokal

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/dunstan24/browser-supply-clone.git
   cd "Front end test"
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browser Anda.

4. **Uji coba Endpoint REST API**:
   - `http://localhost:3000/api/templates`
   - `http://localhost:3000/api/templates?category=SaaS`
   - `http://localhost:3000/api/testimonials`

5. **Build untuk produksi**:
   ```bash
   npm run build
   npm run start
   ```

