# Technical Test UI/UX & Frontend — Purchase Requests

Halaman aplikasi web internal **Purchase Requests** yang digunakan oleh koordinator/pemilik outlet cabang untuk memesan kebutuhan operasional langsung ke Head Office (seperti modul pembelajaran, perlengkapan kantor, peralatan, dan seragam).

---

## 🔗 Links & Submissions

- **GitHub Repository**: [https://github.com/dunstan24/front-end-test](https://github.com/dunstan24/front-end-test)
- **Figma Design Link**: *(Cantumkan link Figma UI/UX Design di sini)*

---

## 🛠️ Teknologi yang Digunakan

1. **Core Framework**: **Next.js 14** (App Router, React 18, TypeScript)
   - Dipilih karena memberikan arsitektur modern berbasis komponen, type safety yang kuat, serta routing dan performa yang optimal.
2. **Styling & Design System**: **Tailwind CSS 3.4** + Custom CSS Tokens & Animations
   - Menggunakan Tailwind CSS untuk styling utilitas yang cepat, dipadukan dengan tema gelap premium (zinc/dark palette), font Inter, dan mikro-interaksi responsif.
3. **State Management & Persistence**: **Custom React Hook (`useCart`) + `localStorage`**
   - Logika bisnis keranjang (tambah/kurang produk, validasi stok, pengurangan stok otomatis, penyimpanan riwayat pesanan dinamis, penghitungan PPN 11%, subtotal, grand total, pilihan pembayaran, catatan pesanan, dan simulasi submit) dikelola secara terpusat di `useCart.ts` agar terpisah dari komponen visual dan tersimpan di `localStorage`.
4. **Icons & UI Primitives**: Centralized Icon Components (`Icons.tsx`) & Accessible UI Primitives.

---

## 📁 Struktur Komponen & Fitur

Struktur folder mengikuti pendekatan **Component-Based Architecture** dengan pemisahan tanggung jawab (*separation of concerns*) yang jelas:

```text
src/
├── app/
│   ├── globals.css              # Global design tokens, keyframes animasi, utility classes
│   ├── layout.tsx               # Root layout + SEO Metadata & Inter font subsetting
│   └── page.tsx                 # Page entrypoint (Server Component wrapper)
├── components/
│   ├── ui/                      # Base UI Primitives (Reusable, Presentation components)
│   │   ├── Button.tsx           # Tombol reusable dengan state loading, disabled, & 4 varian
│   │   ├── Input.tsx            # Component Input & Textarea reusable dengan label & helper text
│   │   ├── QuantityInput.tsx    # Kontrol +/- jumlah produk dengan validasi stok
│   │   ├── Badge.tsx            # Badge status (In Stock, Low Stock, Out of Stock, In Cart, Status)
│   │   ├── EmptyState.tsx       # Tampilan ilustrasi & pesan saat keranjang/pencarian kosong
│   │   ├── Toast.tsx            # Notifikasi toast mengambang saat produk ditambahkan ke keranjang
│   │   ├── Icons.tsx            # Centralized SVG Icon components
│   │   └── ScrollReveal.tsx     # IntersectionObserver reveal animation wrapper
│   └── layout/                  # Layout Frame Components
│       ├── Header.tsx           # Header navigasi sticky dengan indikator badge keranjang
│       └── PageContainer.tsx    # Container pembungkus halaman (max-width 1200px)
└── features/
    └── purchase-request/        # Modul Fitur Utama Purchase Request
        ├── types/index.ts       # TypeScript interfaces (Product, CartItem, Order, PaymentMethod)
        ├── data/products.ts     # Data statis 12 produk, metode pembayaran, & data awal
        ├── hooks/useCart.ts     # Custom hook pengelola state keranjang, live stock, & history
        ├── components/
        │   ├── ProductCard.tsx      # Kartu produk (gambar, harga, badge stok live, tombol aksi)
        │   ├── ProductCatalog.tsx   # Grid produk dengan bilah pencarian & filter kategori
        │   ├── CartItem.tsx         # Baris item di keranjang dengan kontrol jumlah & hapus
        │   ├── CartPanel.tsx        # Container daftar keranjang dengan empty state
        │   ├── OrderSummary.tsx     # Ringkasan subtotal, PPN 11%, dan total biaya
        │   └── PaymentMethod.tsx    # Pilihan radio group metode pembayaran
        └── PurchaseRequestPage.tsx  # Halaman utama yang mengintegrasikan seluruh fitur
```

---

## 💡 Keputusan UI/UX Utama

1. **Layout 2-Kolom yang Efisien (Desktop & Mobile Responsive)**:
   - **Kiri**: Katalog produk responsif (1 kolom pada mobile, 2 kolom pada tablet, 3 kolom pada desktop) dengan fitur pencarian live dan filter kategori.
   - **Kanan**: Panel keranjang belanja sticky yang selalu terlihat saat pengguna melakukan *scroll*, mempermudah koordinator outlet memantau pesanan tanpa harus berpindah halaman.

2. **Pengurangan Stok Real-Time (*Live Stock Reduction*)**:
   - Setiap pembelian yang berhasil disubmit akan mengurangi sisa stok produk secara otomatis.
   - Jika sisa stok produk mencapai 0, produk otomatis berubah menjadi **Out of Stock** (kartu ter-greyscale, tombol disabled), dan tersimpan secara presisten di `localStorage`.

3. **Riwayat Pesanan Dinamis (*Live Order History*)**:
   - Pesanan yang berhasil dibuat langsung ditambahkan ke bagian teratas **Order History** dengan status *processing*, highlight warna hijau, dan badge "New".
   - Tampilan otomatis melakukan *auto-open* dan *smooth scroll* ke bagian Order History setelah pesanan berhasil dikirim.

4. **Kejelasan Alur & Hirarki Visual**:
   - Pengguna utama adalah koordinator/pemilik outlet dengan tingkat pemahaman teknologi yang beragam. Antarmuka dirancang bersih, langsung (*straightforward*), dan bebas dari elemen mengganggu.
   - Tombol aksi utama (*Add to Cart* / *Submit*) menggunakan kontras tinggi dengan visual status yang sangat jelas.

5. **Status Produk & Stok Terlihat Jelas**:
   - **Produk Tersedia**: Indikator titik hijau + badge "In Stock" + jumlah unit tersedia.
   - **Stok Menipis (1-3 pcs)**: Indikator titik amber + badge "Low Stock (jumlah)".
   - **Stok Habis (0 pcs)**: Gambar produk ter-greyscale, badge merah "Out of Stock", dan tombol/input jumlah otomatis nonaktif (*disabled*).
   - **Produk di Keranjang**: Kartu produk menampilkan border biru dan badge "In Cart (jumlah)".

6. **Validasi & Proteksi Kesalahan Pengguna**:
   - Input jumlah produk tidak bisa kurang dari 1 atau melebihi sisa stok live yang tersedia. Pesan peringatan "Max stock reached" muncul otomatis jika jumlah mencapai batas stok.
   - Tombol submit dinonaktifkan (*disabled*) jika keranjang kosong atau metode pembayaran belum dipilih, dilengkapi pesan petunjuk visual.
   - Tombol submit menampilkan state *loading* (spinner) saat pengiriman disimulasikan untuk mencegah pengiriman berulang (*double submit*).

7. **Aksesibilitas & Semantik HTML**:
   - Menggunakan elemen HTML5 semantik (`<article>`, `<section>`, `<aside>`, `<header>`, `<footer>`).
   - Tag ARIA (`role="radiogroup"`, `role="tab"`, `aria-label`, `aria-checked`, `aria-live`) diterapkan untuk mendukung navigasi keyboard dan *screen reader*.

---

## 📌 Asumsi yang Dibuat Selama Pengerjaan

1. **Pengguna Target**: Koordinator atau owner cabang outlet yang membutuhkan alat pemesanan cepat, akurat, dan dapat diakses baik dari laptop maupun smartphone.
2. **Pajak & Biaya**: Diaplikasikan pajak PPN 11% sesuai standar operasional usaha di Indonesia.
3. **Mata Uang**: Menggunakan format Rupiah (IDR) terstandarisasi via `Intl.NumberFormat("id-ID")`.
4. **Kategori Produk**: 12 sampel produk dikelompokkan ke dalam 4 kategori operasional utama: **Modules** (modul belajar), **Stationery** (alat tulis), **Equipment** (peralatan), dan **Uniforms** (seragam & identitas staf).
5. **Metode Pembayaran**: Disediakan 3 pilihan pembayaran internal cabang: **Bank Transfer**, **Cash on Delivery (COD)**, dan **Company Credit** (potongan alokasi kredit bulanan cabang).
6. **Simulasi Backend**: Proses pengiriman pesanan disimulasikan dengan *delay* 2 detik untuk memberikan umpan balik *real-time* kepada pengguna sebelum menampilkan layar sukses.

---

## 🚀 Petunjuk Menjalankan Project

### Prasyarat
- **Node.js**: versi `18.x` atau lebih baru
- **npm** / **yarn** / **pnpm**

### Langkah-langkah Running:

1. **Clone repository ini**:
   ```bash
   git clone https://github.com/dunstan24/front-end-test.git
   cd "front-end-test"
   ```

2. **Install dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` pada browser Anda.

4. **Build untuk produksi**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 Interaksi Minimum yang Didukung

- ✅ Menambah dan mengurangi jumlah produk (dengan batas stok).
- ✅ Menambahkan produk ke keranjang & mengubah jumlah langsung dari kartu produk.
- ✅ Menghapus produk dari keranjang.
- ✅ Memperbarui subtotal, PPN 11%, dan total biaya secara otomatis.
- ✅ Memilih metode pembayaran & memberikan catatan pesanan (notes).
- ✅ Menambahkan notifikasi Toast saat produk dimasukkan ke keranjang.
- ✅ Pengurangan stok otomatis (*Live Stock Deduction*) setelah pesanan berhasil.
- ✅ Update otomatis dan auto-scroll ke Riwayat Pesanan (*Live Order History*) setelah pesanan berhasil.
- ✅ Mempersistensikan keranjang, stok, dan riwayat pesanan ke `localStorage`.
- ✅ Menampilkan keadaan keranjang kosong (*empty state*).
- ✅ Menampilkan peringatan & validasi ketika jumlah melebihi stok.
- ✅ Menampilkan simulasi proses submit dengan state loading & disabled.
- ✅ Menampilkan riwayat pesanan (*order history*) yang dapat di-expand/collapse.
