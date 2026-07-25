/**
 * CartPanel — Lists all items in the shopping cart.
 *
 * Shows EmptyState when cart is empty, otherwise renders
 * a scrollable list of CartItem components.
 */

"use client";

import React from "react";
import CartItemComponent from "./CartItem";
import EmptyState from "@/components/ui/EmptyState";
import type { CartItem } from "@/features/purchase-request/types";

interface CartPanelProps {
  /** Cart items to display */
  items: CartItem[];
  /** Update quantity handler */
  onUpdateQuantity: (productId: string, quantity: number) => void;
  /** Remove from cart handler */
  onRemove: (productId: string) => void;
  /** Clear all items */
  onClearAll: () => void;
  /** Scroll to product catalog */
  onBrowseProducts?: () => void;
}

export default function CartPanel({
  items,
  onUpdateQuantity,
  onRemove,
  onClearAll,
  onBrowseProducts,
}: CartPanelProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800/80 bg-[#050507]">
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Browse the product catalog and add items to your purchase request."
          actionText="Browse Products"
          onAction={onBrowseProducts}
        />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Cart Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h3>
        <button
          onClick={onClearAll}
          className="text-[10px] font-medium text-zinc-500 hover:text-red-400 transition-colors uppercase tracking-wider"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1 scrollbar-thin">
        {items.map((item) => (
          <CartItemComponent
            key={item.product.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
    </div>
  );
}
