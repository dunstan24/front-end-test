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
import { CartIcon } from "@/components/ui/Icons";
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
          <CartIcon className="w-4 h-4 text-zinc-400" />
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
