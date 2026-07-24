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

