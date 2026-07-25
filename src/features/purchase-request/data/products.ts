/**
 * Mock product data for the Purchase Request system.
 *
 * 12 products across 4 categories:
 * - Modules: Training/learning materials
 * - Stationery: Office supplies
 * - Equipment: Operational tools
 * - Uniforms: Staff clothing
 *
 * Includes varied stock levels:
 * - Normal stock (10-50+)
 * - Low stock (1-3)
 * - Out of stock (0)
 */

import { Product, PaymentMethodOption, Order } from "../types";

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "modules", label: "Modules" },
  { id: "stationery", label: "Stationery" },
  { id: "equipment", label: "Equipment" },
  { id: "uniforms", label: "Uniforms" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "mod-001",
    name: "Basic English Module Level 1",
    category: "modules",
    price: 85000,
    stock: 50,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    description: "Comprehensive English learning module for beginner students. Includes workbook and audio materials.",
    unit: "pcs",
  },
  {
    id: "mod-002",
    name: "Advanced Mathematics Module",
    category: "modules",
    price: 120000,
    stock: 25,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=600&auto=format&fit=crop",
    description: "Advanced math curriculum module covering algebra, geometry, and calculus fundamentals.",
    unit: "pcs",
  },
  {
    id: "mod-003",
    name: "Science Experiment Kit Module",
    category: "modules",
    price: 175000,
    stock: 3,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop",
    description: "Hands-on science experiment kit with lab manual. Covers physics, chemistry, and biology basics.",
    unit: "set",
  },
  {
    id: "sta-001",
    name: "Premium Ballpoint Pen (Box of 12)",
    category: "stationery",
    price: 45000,
    stock: 100,
    image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=600&auto=format&fit=crop",
    description: "Smooth-writing ballpoint pens in black ink. Box contains 12 pens.",
    unit: "box",
  },
  {
    id: "sta-002",
    name: "A4 Printing Paper (500 sheets)",
    category: "stationery",
    price: 65000,
    stock: 40,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=600&auto=format&fit=crop",
    description: "High-quality 80gsm A4 printing paper. 500 sheets per ream.",
    unit: "pack",
  },
  {
    id: "sta-003",
    name: "Whiteboard Marker Set",
    category: "stationery",
    price: 35000,
    stock: 0,
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=600&auto=format&fit=crop",
    description: "Set of 4 whiteboard markers in assorted colors. Non-toxic, easy to erase.",
    unit: "set",
  },
  {
    id: "eqp-001",
    name: "Portable Projector Mini",
    category: "equipment",
    price: 2500000,
    stock: 5,
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=600&auto=format&fit=crop",
    description: "Compact HD projector for classroom presentations. 1080p resolution, HDMI input.",
    unit: "pcs",
  },
  {
    id: "eqp-002",
    name: "Standing Whiteboard 120x90cm",
    category: "equipment",
    price: 850000,
    stock: 2,
    image: "https://images.unsplash.com/photo-1596496050827-8299e0220de1?q=80&w=600&auto=format&fit=crop",
    description: "Magnetic whiteboard on mobile stand with wheels. Includes marker tray.",
    unit: "pcs",
  },
  {
    id: "eqp-003",
    name: "Student Desk & Chair Set",
    category: "equipment",
    price: 750000,
    stock: 0,
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=600&auto=format&fit=crop",
    description: "Ergonomic student desk with attached chair. Adjustable height, durable construction.",
    unit: "set",
  },
  {
    id: "uni-001",
    name: "Staff Polo Shirt",
    category: "uniforms",
    price: 150000,
    stock: 30,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=600&auto=format&fit=crop",
    description: "Official staff polo shirt with embroidered logo. Available in S, M, L, XL sizes.",
    unit: "pcs",
  },
  {
    id: "uni-002",
    name: "Staff Name Badge with Lanyard",
    category: "uniforms",
    price: 25000,
    stock: 1,
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=600&auto=format&fit=crop",
    description: "Personalized staff ID badge with printed name and role. Includes branded lanyard.",
    unit: "pcs",
  },
  {
    id: "uni-003",
    name: "Branded Tote Bag",
    category: "uniforms",
    price: 55000,
    stock: 15,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop",
    description: "Canvas tote bag with company branding. Perfect for daily use and events.",
    unit: "pcs",
  },
];

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: "bank_transfer",
    label: "Bank Transfer",
    description: "Transfer to company bank account. Order processed after payment confirmation.",
    icon: "bank",
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Pay when items are delivered to your outlet branch.",
    icon: "cash",
  },
  {
    id: "company_credit",
    label: "Company Credit",
    description: "Deducted from your outlet's monthly credit allocation.",
    icon: "credit",
  },
];

/** Mock order history for display */
export const ORDER_HISTORY: Order[] = [
  {
    id: "ORD-2026-001",
    date: "2026-07-20",
    items: [
      { product: PRODUCTS[0], quantity: 10 },
      { product: PRODUCTS[3], quantity: 5 },
    ],
    total: 1075000,
    paymentMethod: "company_credit",
    status: "completed",
  },
  {
    id: "ORD-2026-002",
    date: "2026-07-18",
    items: [
      { product: PRODUCTS[6], quantity: 1 },
      { product: PRODUCTS[4], quantity: 3 },
    ],
    total: 2695000,
    paymentMethod: "bank_transfer",
    status: "shipped",
  },
  {
    id: "ORD-2026-003",
    date: "2026-07-15",
    items: [
      { product: PRODUCTS[9], quantity: 5 },
      { product: PRODUCTS[11], quantity: 10 },
    ],
    total: 1300000,
    paymentMethod: "cod",
    status: "processing",
  },
];

/**
 * Format price in Indonesian Rupiah
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
