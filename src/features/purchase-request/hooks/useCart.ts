/**
 * useCart — Custom hook managing all cart state and operations.
 *
 * Provides:
 * - Cart CRUD operations (add, remove, update quantity, clear)
 * - Derived values (subtotal, tax, total, item count)
 * - Stock validation (prevents exceeding available stock)
 * - Submit simulation with loading state
 *
 * Centralizes business logic away from presentation components.
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import type { CartItem, Product, PaymentMethodType } from "../types";

const TAX_RATE = 0.11; // PPN 11%

export interface UseCartReturn {
  /** Current cart items */
  cartItems: CartItem[];
  /** Selected payment method */
  paymentMethod: PaymentMethodType | null;
  /** Whether submit is in progress */
  isSubmitting: boolean;
  /** Whether order was submitted successfully */
  isSubmitted: boolean;
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
  /** Simulate order submission */
  submitOrder: () => Promise<void>;
  /** Reset submitted state to place new order */
  resetOrder: () => void;
  /** Cart subtotal (before tax) */
  subtotal: number;
  /** Tax amount */
  tax: number;
  /** Grand total (subtotal + tax) */
  total: number;
  /** Total number of distinct items in cart */
  itemCount: number;
  /** Total quantity of all items */
  totalQuantity: number;
  /** Validation: can submit order */
  canSubmit: boolean;
}

export function useCart(): UseCartReturn {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (product.stock <= 0) return;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);

      if (existingIndex >= 0) {
        // Product already in cart — increase quantity (capped at stock)
        const updated = [...prev];
        const newQty = Math.min(updated[existingIndex].quantity + quantity, product.stock);
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }

      // New product — add to cart
      const clampedQty = Math.min(Math.max(1, quantity), product.stock);
      return [...prev, { product, quantity: clampedQty }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems((prev) => {
      // If quantity drops to 0 or below, remove item
      if (quantity <= 0) {
        return prev.filter((item) => item.product.id !== productId);
      }

      return prev.map((item) => {
        if (item.product.id !== productId) return item;
        // Cap at available stock
        const clampedQty = Math.min(quantity, item.product.stock);
        return { ...item, quantity: clampedQty };
      });
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string) => cartItems.some((item) => item.product.id === productId),
    [cartItems]
  );

  const getCartQuantity = useCallback(
    (productId: string) => {
      const item = cartItems.find((item) => item.product.id === productId);
      return item?.quantity ?? 0;
    },
    [cartItems]
  );

  const submitOrder = useCallback(async () => {
    setIsSubmitting(true);
    // Simulate API call with 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setCartItems([]);
    setPaymentMethod(null);
  }, []);

  const resetOrder = useCallback(() => {
    setIsSubmitted(false);
  }, []);

  // Derived computed values (memoized for performance)
  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [cartItems]
  );

  const tax = useMemo(() => Math.round(subtotal * TAX_RATE), [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);
  const itemCount = cartItems.length;
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
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartQuantity,
    setPaymentMethod,
    submitOrder,
    resetOrder,
    subtotal,
    tax,
    total,
    itemCount,
    totalQuantity,
    canSubmit,
  };
}
