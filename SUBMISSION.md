# Submission — Technical Test UI/UX & Frontend: Purchase Requests

**Name**: Dunstan
**Repository**: https://github.com/dunstan24/front-end-test
**Figma Link**: *(insert Figma link here)*

---

## 1. Technologies Used

I chose **Next.js 14** with the App Router as the core framework. The reason is straightforward — Next.js gives me everything I need out of the box: clean routing, solid SSR capabilities, and built-in image optimization via `next/image`. For an internal application like this that might expand over time, Next.js is also much easier to maintain in the long run compared to a plain React setup.

For the language, I used **TypeScript**. Not just because it's standard practice, but because it lets me define clear "contracts" between components — for example, specifying exact props for `ProductCard` or the return signature of `useCart`. This makes a huge difference in catching bugs early and keeping the codebase maintainable as features grow.

For styling, I went with **Tailwind CSS 3.4**. It makes building modern, responsive interfaces significantly faster. I don't have to jump back and forth creating arbitrary CSS class names; all utility styles stay colocated with the components, making them easy to tweak and refactor.

For typography, I used **Inter** via `next/font` — meaning the font files are self-hosted automatically, eliminating external Google Fonts requests and preventing any Flash of Unstyled Text (FOUT) on initial page load.

---

## 2. Component Structure

I followed a simple architectural principle: every file should have a single clear responsibility, and components shouldn't know more than they need to.

Here is an overview of the structure:

```text
src/
├── app/                      → global routing & layout
├── components/
│   ├── ui/                   → reusable base primitives
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   ├── QuantityInput.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Toast.tsx
│   │   ├── Icons.tsx
│   │   └── ScrollReveal.tsx
│   └── layout/
│       ├── Header.tsx
│       └── PageContainer.tsx
└── features/
    └── purchase-request/
        ├── types/index.ts        → all TypeScript interfaces
        ├── data/products.ts      → mock product data & payment methods
        ├── hooks/useCart.ts      → business logic & centralized state
        └── components/
            ├── CartItem.tsx
            ├── CartPanel.tsx
            ├── OrderSummary.tsx
            ├── PaymentMethod.tsx
            ├── PaymentModal.tsx
            ├── ProductCard.tsx
            └── ProductCatalog.tsx
```

The core element here is `useCart.ts`. I centralized all business logic inside this custom hook — subtotal & VAT calculations, stock validation, live stock deduction, order submission, history management, and `localStorage` persistence. The components below it simply receive data via props and trigger callbacks. No presentation component directly mutates state or touches `localStorage` on its own.

I also centralized all SVG icons in `Icons.tsx`. Having a single source of truth for icons makes updating or swapping icons clean and painless across the app.

---

## 3. Key UI/UX Decisions

**A sticky cart panel on desktop.** This was the very first UX decision I made. If an outlet coordinator is browsing through multiple items and the cart is hidden at the top or bottom of the page, they have to constantly scroll back and forth. Making the cart panel `sticky` on the right side ensures they can always monitor their items, quantities, and running total without context switching.

**Highly visual stock indicators.** I implemented three distinct visual states: green for normal stock, amber/yellow for low stock (≤3 items), and red with a grayscaled product image for out-of-stock items. Branch coordinators need to scan available items quickly without reading tiny stock numbers one by one.

**Live stock deduction after purchase.** To make the ordering simulation feel realistic, successful purchases deduct product stock in real time. If a coordinator orders 3 units of an item with 3 remaining stock, that item immediately turns to "Out of Stock" after submission. This state is persisted in `localStorage` so it survives page refreshes.

**Tailored payment simulation modal.** Rather than just using radio buttons and instantly finishing, I built an interactive modal that provides a realistic experience for each payment option:
- **Bank Transfer**: Shows selectable Virtual Accounts (BCA / Mandiri / BNI) with copyable VA numbers, copyable total amounts, and a live 24-hour countdown timer.
- **Cash on Delivery**: Displays branch outlet delivery address, recipient contact info, and an exact cash reminder.
- **Company Credit**: Displays monthly credit allocation, deduction breakdown, and remaining credit balance.

**Immediate order history update & auto-scroll.** Once an order is submitted, it immediately appears at the top of the Order History table with a green highlight and a "New" badge. The page also smoothly scrolls down to the Order History section so the user gets instant visual confirmation that their request was recorded.

**Mobile-first responsiveness.** On smaller screens, the layout gracefully stacks into a single column (catalog on top, cart below). Category filters, search, and action buttons remain touch-friendly and easily accessible.

---

## 4. Key Assumptions Made

Since some real-world backend specs were unspecified in the brief, I made the following practical assumptions:

**Taxation** — Applied a standard 11% VAT (PPN) to all orders, matching current Indonesian business regulations. This is clearly itemized in the Order Summary so coordinators see the full breakdown.

**Stock Deduction Timing** — Assumed stock is deducted upon order confirmation (submission) rather than when added to the cart. This reflects typical e-commerce / procurement workflows where items are reserved upon order placement.

**Product Data** — Created 12 mock products across 4 operational categories (Modules, Stationery, Equipment, Uniforms) representing branch outlet needs. I intentionally included products with low stock and one out-of-stock item by default to showcase edge-case UI states during review.

**Backend & Persistence** — In the absence of a live backend API, I used `localStorage` for state persistence. While not a substitute for a real database in production, it provides a solid experience for testing where cart items, live stock levels, and order history survive page refreshes.

**Target User Profile** — Assumed users are busy branch outlet coordinators or owners placing orders from desktop computers or smartphones on the go. Therefore, I prioritized clean typography, high visual contrast, and straightforward controls over unnecessary decorative clutter.

**Mock Payment Details** — Virtual Account numbers, delivery addresses, and credit limits in the payment modal are mock data. In a production build, these would be fetched dynamically from backend endpoints.

---

Thank you for reviewing my technical test submission! I really enjoyed building this project and focusing on making the user experience as smooth and realistic as possible.
