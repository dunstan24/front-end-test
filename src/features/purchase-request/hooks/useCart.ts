/**
 * useCart — Custom hook managing all cart state and operations.
 *
 * Provides:
 * - Cart CRUD operations (add, remove, update quantity, clear)
 * - Derived values (subtotal, tax, total, item count)
 * - Stock validation (prevents exceeding available stock)
 * - Submit simulation with loading state
 * - localStorage persistence for cart AND order history
 * - Live order history: new orders are prepended on every successful submit
 *
 * Centralizes all business logic away from presentation components.
 */

"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import type { CartItem, Product, PaymentMethodType, Order } from "../types";
import { ORDER_HISTORY as SEED_HISTORY, PRODUCTS } from "../data/products";

const TAX_RATE = 0.11; // PPN 11%
const CART_STORAGE_KEY    = "orderhub_cart_v1";
const HISTORY_STORAGE_KEY = "orderhub_history_v1";
const STOCK_STORAGE_KEY   = "orderhub_stock_v1";

/** productId → current live stock */
type StockMap = Record<string, number>;

/** Build initial stock map from static product list */
function buildDefaultStockMap(): StockMap {
  return Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]));
}

/** Generate a sequential order ID based on existing history length */
function generateOrderId(existingCount: number): string {
  const seq = String(existingCount + 1).padStart(3, "0");
  return `ORD-2026-${seq}`;
}

/** Today's date in YYYY-MM-DD format (local time) */
function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Safe JSON parse — returns fallback on any error */
function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export interface UseCartReturn {
  /** Current cart items */
  cartItems: CartItem[];
  /** Selected payment method */
  paymentMethod: PaymentMethodType | null;
  /** Whether submit is in progress */
  isSubmitting: boolean;
  /** Whether order was submitted successfully */
  isSubmitted: boolean;
  /** The most recently submitted order (shown in success banner) */
  lastOrder: Order | null;
  /** Full order history (newest first) */
  orderHistory: Order[];
  /** Get the current live stock for a product (decreases after purchases) */
  getLiveStock: (productId: string) => number;
  /** Add a product to cart (or increase quantity if already in cart) */
  addToCart: (product: Product, quantity?: number) => void;
  /** Remove a product from cart entirely */
  removeFromCart: (productId: string) => void;
  /** Update quantity for a product (validates against stock) */
  updateQuantity: (productId: string, quantity: number) => void;
  /** Clear entire cart */
  clearCart: () => void;
  /** Check if a product is already in cart */
  isInCart: (productId: string) => boolean;
  /** Get quantity of a specific product in cart */
  getCartQuantity: (productId: string) => number;
  /** Select payment method */
  setPaymentMethod: (method: PaymentMethodType) => void;
  /** Simulate order submission — creates new order entry in history */
  submitOrder: () => Promise<void>;
  /** Reset submitted state to place new order */
  resetOrder: () => void;
  /** Reset all stock and order history data back to initial demo state */
  resetDemoData: () => void;
  /** Cart subtotal (before tax) */
  subtotal: number;
  /** Tax amount (PPN 11%) */
  tax: number;
  /** Grand total (subtotal + tax) */
  total: number;
  /** Total number of distinct items in cart */
  itemCount: number;
  /** Total quantity of all items */
  totalQuantity: number;
  /** Whether the order can be submitted (cart non-empty + payment selected) */
  canSubmit: boolean;
}

export function useCart(): UseCartReturn {
  // ── Cart state ──────────────────────────────────────────────────────────
  const [cartItems,     setCartItems]     = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(null);
  const [isSubmitting,  setIsSubmitting]  = useState(false);
  const [isSubmitted,   setIsSubmitted]   = useState(false);
  const [lastOrder,     setLastOrder]     = useState<Order | null>(null);
  
  // ── Order history state ─────────────────────────────────────────────────
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  // ── Stock state ─────────────────────────────────────────────────────────
  const [stockMap, setStockMap] = useState<StockMap>({});

  // ── Hydration: load from localStorage after first paint ─────────────────
  useEffect(() => {
    // Cart
    const storedCart = safeJsonParse<CartItem[]>(
      localStorage.getItem(CART_STORAGE_KEY),
      []
    );
    if (storedCart.length > 0) setCartItems(storedCart);

    // Order history
    const storedHistory = safeJsonParse<Order[]>(
      localStorage.getItem(HISTORY_STORAGE_KEY),
      []
    );
    setOrderHistory(storedHistory.length > 0 ? storedHistory : SEED_HISTORY);

    // Stock map
    const storedStock = safeJsonParse<StockMap>(
      localStorage.getItem(STOCK_STORAGE_KEY),
      {}
    );
    setStockMap(Object.keys(storedStock).length > 0 ? storedStock : buildDefaultStockMap());
  }, []);

  // ── Persist state on change ─────────────────────────────────────────────
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems]);

  useEffect(() => {
    if (orderHistory.length > 0) {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(orderHistory));
    }
  }, [orderHistory]);

  useEffect(() => {
    if (Object.keys(stockMap).length > 0) {
      localStorage.setItem(STOCK_STORAGE_KEY, JSON.stringify(stockMap));
    }
  }, [stockMap]);

  /** Returns the current live stock for a product */
  const getLiveStock = useCallback(
    (productId: string): number => stockMap[productId] ?? 0,
    [stockMap]
  );

  // ── Cart operations ──────────────────────────────────────────────────────

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const liveStock = stockMap[product.id] ?? product.stock;
    if (liveStock <= 0) return;
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.product.id === product.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = {
          ...updated[idx],
          quantity: Math.min(updated[idx].quantity + quantity, liveStock),
        };
        return updated;
      }
      return [...prev, { product, quantity: Math.min(Math.max(1, quantity), liveStock) }];
    });
  }, [stockMap]);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const liveStock = stockMap[productId] ?? Infinity;
    setCartItems((prev) => {
      if (quantity <= 0) return prev.filter((item) => item.product.id !== productId);
      return prev.map((item) =>
        item.product.id !== productId
          ? item
          : { ...item, quantity: Math.min(quantity, liveStock) }
      );
    });
  }, [stockMap]);

  const clearCart = useCallback(() => setCartItems([]), []);

  const isInCart = useCallback(
    (productId: string) => cartItems.some((item) => item.product.id === productId),
    [cartItems]
  );

  const getCartQuantity = useCallback(
    (productId: string) => cartItems.find((item) => item.product.id === productId)?.quantity ?? 0,
    [cartItems]
  );

  // ── Submit order ─────────────────────────────────────────────────────────

  const submitOrder = useCallback(async () => {
    if (!paymentMethod) return;

    const snapshot = [...cartItems];
    const orderTotal = snapshot.reduce(
      (sum, item) => sum + item.product.price * item.quantity, 0
    );
    const tax = Math.round(orderTotal * TAX_RATE);

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Reduce live stock for each purchased product
    setStockMap((prev) => {
      const updated = { ...prev };
      for (const item of snapshot) {
        const current = updated[item.product.id] ?? item.product.stock;
        updated[item.product.id] = Math.max(0, current - item.quantity);
      }
      return updated;
    });

    const newOrder: Order = {
      id: "TEMP",
      date: todayIso(),
      items: snapshot,
      total: orderTotal + tax,
      paymentMethod,
      status: "processing",
    };

    setOrderHistory((prev) => {
      const correctedOrder: Order = { ...newOrder, id: generateOrderId(prev.length) };
      setLastOrder(correctedOrder);
      return [correctedOrder, ...prev];
    });

    setIsSubmitting(false);
    setIsSubmitted(true);
    setCartItems([]);
    setPaymentMethod(null);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, [cartItems, paymentMethod]);

  const resetOrder = useCallback(() => {
    setIsSubmitted(false);
    setLastOrder(null);
  }, []);

  const resetDemoData = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      localStorage.removeItem(STOCK_STORAGE_KEY);
    }
    setCartItems([]);
    setPaymentMethod(null);
    setIsSubmitting(false);
    setIsSubmitted(false);
    setLastOrder(null);
    setOrderHistory(SEED_HISTORY);
    setStockMap(buildDefaultStockMap());
  }, []);

  // ── Derived values ───────────────────────────────────────────────────────

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );
  const tax          = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);
  const total        = useMemo(() => subtotal + tax, [subtotal, tax]);
  const itemCount    = cartItems.length;
  const totalQuantity = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  const canSubmit = cartItems.length > 0 && paymentMethod !== null && !isSubmitting;

  return {
    cartItems,
    paymentMethod,
    isSubmitting,
    isSubmitted,
    lastOrder,
    orderHistory,
    getLiveStock,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartQuantity,
    setPaymentMethod,
    submitOrder,
    resetOrder,
    resetDemoData,
    subtotal,
    tax,
    total,
    itemCount,
    totalQuantity,
    canSubmit,
  };
}
