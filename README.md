# Technical Test UI/UX & Frontend — Purchase Requests

An internal web application page for **Purchase Requests** used by branch outlet coordinators/owners to order operational supplies directly from the Head Office (such as learning modules, office stationery, equipment, and uniforms).

---

## 🔗 Links & Submissions

- **GitHub Repository**: [https://github.com/dunstan24/front-end-test](https://github.com/dunstan24/front-end-test)
- **Figma Design Link**: *(Insert Figma UI/UX Design link here)*

---

## 🛠️ Technologies Used

1. **Core Framework**: **Next.js 14** (App Router, React 18, TypeScript)
   - Selected for its modern component-based architecture, strong type safety, efficient routing, and built-in performance optimizations.
2. **Styling & Design System**: **Tailwind CSS 3.4** + Custom CSS Tokens & Keyframe Animations
   - Provides utility-first styling combined with a sleek dark theme (zinc/dark palette), Inter font subsetting, and responsive micro-interactions.
3. **State Management & Persistence**: **Custom React Hook (`useCart`) + `localStorage`**
   - Centralizes all business logic (cart CRUD, stock validation, live stock deduction, dynamic order history updates, VAT 11% calculation, subtotal, grand total, payment method selection, order notes, and submit simulation) in `useCart.ts`, separating state management from presentation components and persisting data in `localStorage`.
4. **Icons & UI Primitives**: Centralized Icon Components (`Icons.tsx`) & Accessible UI Primitives.

---

## 📁 Component Structure & Project Architecture

The folder structure follows a **Component-Based Architecture** with a clear separation of concerns:

```text
src/
├── app/
│   ├── globals.css              # Global design tokens, animation keyframes, utility classes
│   ├── layout.tsx               # Root layout + SEO Metadata & Inter font subsetting
│   └── page.tsx                 # Page entrypoint (Server Component wrapper)
├── components/
│   ├── ui/                      # Base UI Primitives (Reusable, Presentation components)
│   │   ├── Badge.tsx            # Status badge (In Stock, Low Stock, Out of Stock, In Cart, Status)
│   │   ├── Button.tsx           # Reusable button with loading, disabled states & variants
│   │   ├── EmptyState.tsx       # Illustration & message for empty cart / search states
│   │   ├── Icons.tsx            # Centralized SVG Icon components
│   │   ├── Input.tsx            # Reusable Input & Textarea components with label & helper text
│   │   ├── QuantityInput.tsx    # +/− quantity control with stock limit validation
│   │   ├── ScrollReveal.tsx     # IntersectionObserver reveal animation wrapper
│   │   └── Toast.tsx            # Floating toast notification component
│   └── layout/                  # Layout Frame Components
│       ├── Header.tsx           # Sticky navigation header with cart badge counter
│       └── PageContainer.tsx    # Page container wrapper (max-width 1200px)
└── features/
    └── purchase-request/        # Main Purchase Request Feature Module
        ├── types/index.ts       # TypeScript interfaces (Product, CartItem, Order, PaymentMethod)
        ├── data/products.ts     # Static mock data for 12 products, payment methods, & seed history
        ├── hooks/useCart.ts     # Custom hook managing cart state, live stock, & history
        ├── components/
        │   ├── CartItem.tsx         # Cart item row with quantity adjuster & remove button
        │   ├── CartPanel.tsx        # Cart list container with empty state & clear option
        │   ├── OrderSummary.tsx     # Summary of subtotal, VAT 11%, and grand total
        │   ├── PaymentMethod.tsx    # Payment method selection with expandable details
        │   ├── PaymentModal.tsx     # Realistic payment simulation modal (VA / COD / Credit)
        │   ├── ProductCard.tsx      # Product card (image, price, live stock badge, actions)
        │   └── ProductCatalog.tsx   # Product grid with search bar & category tabs
        └── PurchaseRequestPage.tsx  # Main page assembling all feature components
```

---

## 💡 Key UI/UX Decisions

1. **Efficient 2-Column Layout (Desktop & Mobile Responsive)**:
   - **Left Column**: Product catalog grid (1 col mobile, 2 col tablet, 3 col desktop) with live search and category tabs.
   - **Right Column**: Sticky cart panel that remains visible during scrolling, enabling coordinators to monitor orders without context switching.

2. **Real-Time Stock Deduction**:
   - Successful orders automatically deduct live product stock.
   - When stock reaches `0`, the product transforms to **Out of Stock** (grayscale image, disabled button) and persists via `localStorage`.

3. **Live Order History**:
   - Completed orders are immediately added to the top of the **Order History** table with a *processing* status, green highlight, and a "New" badge.
   - Auto-expands and smoothly scrolls to the Order History section upon order submission.

4. **Realistic Payment Simulation Modal**:
   - Step-by-step realistic checkout modal tailored for each payment method:
     - **Bank Transfer**: Virtual Account numbers (BCA, Mandiri, BNI) with copy buttons and 24h countdown timer.
     - **Cash on Delivery (COD)**: Outlet delivery address, recipient contact, exact cash reminder.
     - **Company Credit**: Monthly credit limit breakdown, deduction summary, and remaining balance.

5. **Clear Visual Hierarchy & Product Badges**:
   - **In Stock**: Green dot + "In Stock" badge + remaining unit count.
   - **Low Stock (1-3 pcs)**: Amber dot + "Low Stock (count)" badge.
   - **Out of Stock (0 pcs)**: Red "Out of Stock" badge + grayscaled image + disabled controls.
   - **In Cart**: Blue border highlight + "In Cart (qty)" overlay badge.

6. **Validation & Error Prevention**:
   - Quantity selector bounded between 1 and available live stock.
   - Submit button disabled when cart is empty or payment method is unselected, accompanied by clear visual hints.
   - Button loading state (spinner) during submission simulation to prevent double-submitting.

---

## 📌 Key Assumptions

1. **Target Users**: Outlet branch coordinators or owners requiring a fast, clear ordering tool accessible on desktop and mobile.
2. **Taxation**: Standard 11% VAT (PPN) applied to all orders according to Indonesian business regulations.
3. **Currency & Formatting**: Formatted in Indonesian Rupiah (IDR) using standard `Intl.NumberFormat("id-ID")`.
4. **Stock Deduction Timing**: Stock is deducted upon order confirmation (submission) rather than initial cart addition, reflecting standard procurement reservation workflows.
5. **Product Selection & Mock Data**: 12 mock products categorized into 4 operational areas (Modules, Stationery, Equipment, Uniforms). Some items initially feature low or zero stock to showcase edge-case UI states.
6. **Backend & Persistence Simulation**: `localStorage` is used to persist cart items, live stock levels, and order history across browser reloads.

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js**: version `18.x` or higher
- **npm** / **yarn** / **pnpm**

### Setup Steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dunstan24/front-end-test.git
   cd "front-end-test"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` (or `http://localhost:3001`) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 Supported Features & Interactions

- ✅ Increase and decrease product quantities (with stock limits).
- ✅ Add products to cart & modify quantities directly on product cards.
- ✅ Remove individual items or clear entire cart.
- ✅ Automatic real-time calculation of subtotal, VAT 11%, and grand total.
- ✅ Select payment method & provide optional order notes.
- ✅ Floating Toast notifications for cart actions & copy events.
- ✅ Realistic Payment Simulation Modal (Virtual Account, COD, Company Credit).
- ✅ Automatic Live Stock Deduction persisted in `localStorage`.
- ✅ Live Order History update with auto-scroll and highlight for new orders.
- ✅ Demo reset button to restore initial stock and history data.
- ✅ Responsive layout for desktop and mobile viewports.
