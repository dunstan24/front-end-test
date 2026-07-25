/**
 * Core type definitions for the Purchase Request system.
 * 
 * Used across all feature components to ensure type safety
 * for products, cart items, orders, and payment methods.
 */

export interface Product {
  /** Unique product identifier */
  id: string;
  /** Display name */
  name: string;
  /** Product category for filtering */
  category: string;
  /** Price per unit in IDR */
  price: number;
  /** Available stock quantity (0 = out of stock) */
  stock: number;
  /** Product image URL */
  image: string;
  /** Short product description */
  description: string;
  /** Unit of measurement (e.g., "pcs", "box", "set", "pack") */
  unit: string;
}

export interface CartItem {
  /** The product in the cart */
  product: Product;
  /** Quantity ordered (1 ≤ quantity ≤ product.stock) */
  quantity: number;
}

export type PaymentMethodType = "bank_transfer" | "cod" | "company_credit";

export interface PaymentMethodOption {
  id: PaymentMethodType;
  label: string;
  description: string;
  icon: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentMethod: PaymentMethodType;
  status: "pending" | "processing" | "shipped" | "completed";
}

/** Product categories for filtering */
export type ProductCategory = "all" | "modules" | "stationery" | "equipment" | "uniforms";
