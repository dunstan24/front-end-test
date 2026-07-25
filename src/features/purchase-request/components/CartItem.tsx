/**
 * CartItem — Single item row in the cart panel.
 *
 * Shows product thumbnail, name, unit price, quantity controls,
 * line total, and remove button.
 */

"use client";

import React from "react";
import Image from "next/image";
import QuantityInput from "@/components/ui/QuantityInput";
import { TrashIcon } from "@/components/ui/Icons";
import type { CartItem as CartItemType } from "@/features/purchase-request/types";
import { formatPrice } from "@/features/purchase-request/data/products";

interface CartItemProps {
  item: CartItemType;
  /** Update quantity handler */
  onUpdateQuantity: (productId: string, quantity: number) => void;
  /** Remove from cart handler */
  onRemove: (productId: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <div className="flex gap-3 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-colors group">
      {/* Product Thumbnail */}
      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="56px"
          className="object-cover"
        />
      </div>

      {/* Product Info + Controls */}
      <div className="flex-1 min-w-0 space-y-2">
        {/* Name + Remove Button */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h4 className="text-xs font-semibold text-white truncate">
              {product.name}
            </h4>
            <span className="text-[10px] text-zinc-500">
              {formatPrice(product.price)} / {product.unit}
            </span>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(product.id)}
            className="p-1 rounded-md text-zinc-600 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0 opacity-0 group-hover:opacity-100"
            aria-label={`Remove ${product.name} from cart`}
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quantity + Line Total */}
        <div className="flex items-center justify-between gap-2">
          <QuantityInput
            value={quantity}
            max={product.stock}
            onChange={(qty) => onUpdateQuantity(product.id, qty)}
            compact
          />
          <span className="text-xs font-bold text-white tabular-nums">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
