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
- **Animation & Transitions**: CSS GPU Acceleration Keyframes, Hover Micro-interactions, Auto-scrolling Marquee
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
    │   ├── globals.css        # CSS variables, glassmorphism, grid pattern, reset
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
   git clone <repository-url>
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

## 📋 Jawaban 7 Pertanyaan Tambahan (MindiMedia Technical Test)

### 1. Kalau pakai data JSON, bagaimana strukturnya supaya scalable & maintainable ke depan?
**Jawaban**:
- **Pemisahan Data & Abstraksi Data Layer (`/src/lib/data.ts`)**: Data JSON tidak diimpor langsung oleh komponen UI, melainkan diabstraksikan melalui data layer `/src/lib/data.ts`. Jika di masa mendatang data berpindah ke PostgreSQL atau Headless CMS, komponen frontend maupun API route tidak perlu diubah sama sekali — cukup mengubah fungsi fetcher di `/src/lib/data.ts`.
- **Pemisahan Modular per Section**: Data dipecah per section (`hero.json`, `templates.json`, `pricing.json`, `testimonials.json`) untuk menghindari monolithic file lock dan memudahkan tim bekerja secara paralel.
- **Strict TypeScript Interfaces**: Struktur data divalidasi dengan type definition TypeScript (`TemplatesData`, `PricingData`, dll) untuk mencegah kesalahan runtime dan memberikan auto-completion yang akurat.

### 2. Kalau bikin API sendiri, teknologi/framework apa dan kenapa?
**Jawaban**:
- **Pilihan Teknologi**: **Next.js 14 Route Handlers (`/src/app/api/.../route.ts`)**.
- **Alasan Pemilihan**:
  1. **Zero Configuration & Zero Extra Overhead**: Tidak memerlukan server/framework terpisah (Express/Fastify) sehingga menghindari kerumitan infrastruktur dan dependensi tambahan.
  2. **Serverless Auto-scaling di Vercel**: API route otomatis dideploy sebagai Vercel Edge/Serverless Functions yang dapat melakukan auto-scale tanpa konfigurasi devops tambahan.
  3. **Shared Types & Unified Codebase**: Frontend (React) dan Backend (API) berada dalam 1 repository TypeScript, memungkinkan berbagi interface dan mengurangi pemborosan waktu sinkronisasi tipe data.
  4. **Single Source of Truth**: Logika pembacaan data ditempatkan di `src/lib/data.ts`. Server Component memanggil fungsi ini secara langsung (zero HTTP round-trip internal), sedangkan publik memanggilnya via HTTP melalui Route Handler.

### 3. Bagaimana cara arahkan custom domain (mis. www.clientwebsite.com) ke project Vercel ini?
**Jawaban**:
1. **Tambahkan Domain di Dashboard Vercel**: Masuk ke menu *Project Settings > Domains*, lalu masukkan domain `www.clientwebsite.com` dan apex domain `clientwebsite.com`.
2. **Konfigurasi DNS Record di Provider Domain** (Cloudflare / Namecheap / GoDaddy / Niagahoster):
   - **Apex domain (`clientwebsite.com`)**: Buat **A Record** dengan Host `@` dan Value IP Vercel `76.76.21.21`.
   - **Subdomain (`www.clientwebsite.com`)**: Buat **CNAME Record** dengan Host `www` dan Value `cname.vercel-dns.com`.
3. **SSL & TLS Automated Verification**: Vercel akan otomatis melakukan validasi DNS dan menerbitkan sertifikat SSL/TLS gratis via Let's Encrypt secara otomatis dalam beberapa menit.

### 4. Kalau butuh admin panel untuk kelola konten, teknologi & pendekatan apa yang dipilih?
**Jawaban**:
- **Pendekatan Headless CMS**: Menggunakan **Sanity.io** atau **Strapi / Payload CMS**.
  - *Alasan*: Headless CMS memisahkan backend manajemen konten dari frontend tampilan. Tim non-teknis (copywriter/marketer) dapat mengubah teks headline, mengunggah screenshot template baru, atau memperbarui harga melalui UI visual yang nyaman.
- **On-Demand Incremental Static Revalidation (ISR)**: Ketika konten di-update di admin panel, Webhook Headless CMS akan memanggil endpoint Next.js `revalidatePath('/')` atau `revalidateTag('templates')`. Website publik akan langsung ter-update secara instant tanpa perlunya full rebuild/redeploy project di Vercel.

### 5. Teknik apa yang dipakai supaya website tetap cepat di koneksi internet lambat?
**Jawaban**:
- **React Server Components (RSC)**: Komponen utama di-render di server sehingga JavaScript bundle yang dikirim ke browser sangat kecil.
- **CSS-Only GPU Acceleration Animation**: Animasi marquee, transition hover, dan glassmorphic backdrop dibuat menggunakan CSS transform/opacity murni tanpa mengandalkan runtime library JavaScript yang berat.
- **Font Display & Subsetting**: Menggunakan `font-display: swap` agar teks langsung muncul menggunakan font sistem lokal terlebih dahulu tanpa mengalami Flash of Unstyled Text (FOUT) atau render-blocking.
- **Asset Resource Hints**: Menambahkan `<link rel="preconnect">` untuk domain gambar eksternal (Unsplash/Framer CDN) agar DNS lookup dan handshake TLS dilakukan lebih awal.

### 6. Kalau ada form, bagaimana cara kirim data ke backend dengan aman?
**Jawaban**:
- **Server Actions & API Route Isolation**: Pengiriman data form menggunakan Next.js Server Actions atau API Route POST request dengan enkripsi HTTPS mandatory.
- **Input Sanitization & Schema Validation**: Validasi data form di sisi server menggunakan **Zod** schema untuk mencegah XSS (Cross-Site Scripting) dan SQL Injection.
- **Rate Limiting**: Memasang middleware rate limiting (misal menggunakan `@upstash/ratelimit`) berdasarkan IP address pengirim untuk mencegah bot spam submission.
- **CSRF & Secret Token Management**: Menyimpan API Key/Secret token backend strictly di Environment Variable server (`process.env.SECRET_KEY`) tanpa pernah mengeksposnya ke JavaScript client bundle (`NEXT_PUBLIC_`).

### 7. Strategi apa untuk optimasi gambar tanpa mengorbankan kualitas?
**Jawaban**:
- **Penggunaan Component `<Image>` Next.js**: Komponen `next/image` otomatis melakukan konversi gambar ke format Next-Gen modern yang sangat efisien (**AVIF** dan **WebP**), kompresi otomatis berdasarkan device pixel ratio, dan generasi `srcset` responsif.
- **Penggunaan Format Vector (SVG)**: Untuk logo, ikon interface, dan badge visual menggunakan SVG murni (Lucide React) yang ukurannya sangat kecil (<1KB) dan tidak pecah di layar Retina 4K.
- **LCP Optimization vs Below-the-Fold Lazy Loading**: Gambar hero utama diberi atribut `priority={true}` agar langsung di-preload untuk skor LCP tinggi, sedangkan seluruh gambar kartu template di bawah fold dipasang `loading="lazy"`.
- **Dimension Bounding**: Selalu memberikan ukuran width/height atau `aspect-ratio` container yang pasti untuk mencegah Cumulative Layout Shift (CLS).
