# Clone Homepage Browser.Supply — Technical Test Front End Programmer (MindiMedia)

Proyek ini adalah implementasi clone homepage [browser.supply](https://browser.supply/) yang dibangun menggunakan **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Data Handling berbasis JSON lokal**, dan **Custom Serverless REST API Handlers**.

---

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

---

## 📋 Technical Questions & Answers (Jawaban 7 Pertanyaan Technical Test)

### 1. Structure JSON Data for Future Scalability and Maintainability
*If you use JSON data, how would you structure it to support future scalability and maintainability?*

**Answer / Jawaban**:
To ensure maximum scalability and clean separation of concerns, we follow a 3-layer architecture:
- **Data Layer Abstraction (`/src/lib/data.ts`)**: UI components do not import raw JSON directly. Instead, they call data fetching functions in `/src/lib/data.ts`. This means if we switch from JSON to a relational database (PostgreSQL, Supabase) or a Headless CMS (Sanity, Strapi), we only need to update the data access methods in `data.ts` without touching a single line of UI component code.
- **Modular JSON Files by Domain/Section**: Data is split into isolated JSON files (`hero.json`, `templates.json`, `pricing.json`, `testimonials.json`) rather than one massive file. This prevents merge conflicts, enables parallel development, and keeps individual data models light.
- **Strict TypeScript Interfaces & Schema Validation**: Every JSON entity is typed via TypeScript interfaces (`TemplatesData`, `PricingData`, etc.) to prevent runtime `undefined` bugs and provide rich IDE IntelliSense.

---

### 2. Custom API Technology & Framework Selection
*If you decide to create your own API, which technology or framework would you use and why?*

**Answer / Jawaban**:
We selected **Next.js 14 Serverless Route Handlers (`/src/app/api/.../route.ts`)**.

**Why Next.js Route Handlers**:
1. **Zero Extra Overhead & Unified Infrastructure**: We do not need a separate Express or NestJS server. Frontend UI and backend API reside in the same project, simplifying deployment and version control.
2. **Serverless Auto-Scaling on Vercel**: Route handlers deploy as Vercel Edge/Serverless Functions that scale dynamically from 0 to thousands of requests automatically.
3. **Shared TypeScript Schemas**: Frontend components and backend API endpoints share identical TypeScript types, eliminating type mismatch errors.
4. **Single Source of Truth Pattern**: Internal Server Components call `/src/lib/data.ts` directly with zero HTTP latency overhead, while external clients fetch data via standard REST API endpoints over HTTP (`/api/templates`).

---

### 3. Custom Domain Configuration on Vercel
*How would you configure a custom domain (for example, www.clientwebsite.com) to point to your deployed project on Vercel?*

**Answer / Jawaban**:
1. **Add Domains in Vercel Dashboard**: Navigate to **Project Settings > Domains** in Vercel, and add both `www.clientwebsite.com` and the apex domain `clientwebsite.com`.
2. **Configure DNS Records at Provider** (Cloudflare / Namecheap / GoDaddy / Niagahoster):
   - **Apex Domain (`clientwebsite.com`)**: Create an **A Record** pointing `@` to Vercel's IP address: `76.76.21.21`.
   - **Subdomain (`www.clientwebsite.com`)**: Create a **CNAME Record** pointing `www` to `cname.vercel-dns.com`.
3. **Automatic SSL/TLS Verification**: Vercel automatically verifies the DNS propagation and issues an SSL certificate via Let's Encrypt within minutes.

---

### 4. Admin Panel & CMS Strategy
*If your project requires an admin panel to manage the website content, what technologies and approaches would you choose?*

**Answer / Jawaban**:
- **Headless CMS Selection**: We recommend **Sanity.io** or **Payload CMS (Next.js native)**.
  - *Why*: Gives content managers and non-technical editors an intuitive visual dashboard to edit titles, update pricing tiers, or upload template media without making code deployments.
- **On-Demand Incremental Static Regeneration (ISR)**: When content is published in the CMS, a CMS Webhook triggers a Next.js revalidation endpoint (`revalidatePath('/')` or `revalidateTag('templates')`). The live production site updates instantly without requiring a full rebuild or redeploy cycle on Vercel.

---

### 5. Website Speed Optimization Techniques for Slow Connections
*What techniques would you use to ensure the website loads quickly even on slow internet connections?*

**Answer / Jawaban**:
- **React Server Components (RSC)**: Renders static layout and data fetching on the server, drastically reducing the client-side JavaScript bundle size.
- **Pure CSS GPU-Accelerated Animations**: Animations (horizontal marquee, vertical video scroll, hover effects) use pure CSS `transform: translate3d()` and `opacity` to run smoothly at 60FPS on GPU without heavy JS animation frameworks.
- **Font Subsetting & Swap**: Uses `font-display: swap` to prevent render-blocking FOUT (Flash of Unstyled Text).
- **Resource Hints & Preconnecting**: Implements `<link rel="preconnect">` for external media domains (Unsplash, Video CDNs) so DNS lookups and TLS handshakes complete early.

---

### 6. Secure Form Submission to Backend Server
*If you implement a form, how would you securely send the data to the backend server?*

**Answer / Jawaban**:
- **Next.js Server Actions & SSL Encryption**: Form data is transmitted securely over HTTPS via Next.js Server Actions or dedicated POST Route Handlers.
- **Server-Side Input Sanitization & Schema Validation**: Validate all payload fields on the server using **Zod** schema validation to prevent XSS (Cross-Site Scripting) and Injection vulnerabilities.
- **Rate Limiting Middleware**: Attach rate limiting middleware (e.g. `@upstash/ratelimit` over Redis) based on client IP to block bot spamming.
- **Secret & API Key Security**: Environment secrets (`DATABASE_URL`, `STRIPE_SECRET_KEY`) are kept strictly in server-side `process.env` without ever exposing them to the client bundle.

---

### 7. Image & Media Optimization Strategies
*What strategies do you use to optimize images for performance without sacrificing quality?*

**Answer / Jawaban**:
- **Next.js `<Image />` Component**: Automatically converts images to next-gen formats (**AVIF** and **WebP**), calculates responsive `srcset` sizes based on device screen width, and applies optimal compression.
- **SVG Vector Graphics**: Logos, badges, and interface icons use native inline vector SVGs (Lucide React) which weigh under 1KB and remain crisp on Retina/4K displays.
- **LCP Optimization & Lazy Loading**: Critical above-the-fold hero media uses `priority={true}` for fast Largest Contentful Paint (LCP), while all below-the-fold images use native `loading="lazy"`.
- **Fixed Aspect Ratios & Layout Stability**: All media containers enforce explicit aspect-ratio or dimensional bounds to eliminate Cumulative Layout Shift (CLS).
