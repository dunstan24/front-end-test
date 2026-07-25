/**
 * ProductCard — Displays a single product with image, details, stock status,
 * quantity selector, and add-to-cart button.
 *
 * States:
 * - Available: Shows quantity input + "Add to Cart" button
 * - In Cart: Shows "Added ✓" with quantity adjustment
 * - Out of Stock: Grayed out with "Out of Stock" badge, disabled controls
 * - Low Stock: Shows warning badge
 */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import QuantityInput from "@/components/ui/QuantityInput";
import { CheckIcon } from "@/components/ui/Icons";
import type { Product } from "@/features/purchase-request/types";
import { formatPrice } from "@/features/purchase-request/data/products";

interface ProductCardProps {
  product: Product;
  /** Whether this product is already in the cart */
  isInCart: boolean;
  /** Current quantity in cart (0 if not in cart) */
  cartQuantity: number;
  /** Add to cart handler */
  onAddToCart: (product: Product, quantity: number) => void;
  /** Update quantity handler (for when already in cart) */
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export default function ProductCard({
  product,
  isInCart,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
}: ProductCardProps) {
  const [localQty, setLocalQty] = useState(1);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 3;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      onAddToCart(product, localQty);
      setLocalQty(1);
    }
  };

  const getStockBadge = () => {
    if (isOutOfStock) return <Badge variant="danger">Out of Stock</Badge>;
    if (isLowStock) return <Badge variant="warning" dot>Low Stock ({product.stock})</Badge>;
    return <Badge variant="success" dot>In Stock</Badge>;
  };

  return (
    <article
      className={`group rounded-2xl border overflow-hidden bg-[#050507] transition-all duration-300 flex flex-col ${
        isOutOfStock
          ? "border-zinc-800/50 opacity-70"
          : isInCart
          ? "border-blue-800/50 shadow-lg shadow-blue-500/5"
          : "border-zinc-800/80 hover:border-zinc-700 shadow-xl"
      }`}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`object-cover transition-transform duration-500 ${
            isOutOfStock ? "grayscale" : "group-hover:scale-105"
          }`}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Stock Badge (top-right) */}
        <div className="absolute top-3 right-3 z-10">
          {getStockBadge()}
        </div>

        {/* Category Badge (top-left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-zinc-300 uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* In-Cart Indicator overlay */}
        {isInCart && (
          <div className="absolute bottom-3 right-3 z-10 animate-scale-in">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/90 backdrop-blur-md text-[10px] font-bold text-white shadow-lg">
              <CheckIcon className="w-3 h-3" />
              In Cart ({cartQuantity})
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4 flex flex-col flex-1 space-y-3">
        {/* Name + Price */}
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 group-hover:text-zinc-200 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price + Unit */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-white tracking-tight">
            {formatPrice(product.price)}
          </span>
          <span className="text-[10px] text-zinc-500 font-medium uppercase">
            / {product.unit}
          </span>
        </div>

        {/* Spacer to push controls to bottom */}
        <div className="flex-1" />

        {/* Controls */}
        <div className="space-y-3 pt-2 border-t border-zinc-800/60">
          {isInCart ? (
            /* Already in cart — show quantity adjuster */
            <div className="flex items-center justify-between gap-3">
              <QuantityInput
                value={cartQuantity}
                max={product.stock}
                onChange={(qty) => onUpdateQuantity(product.id, qty)}
                compact
              />
              <span className="text-xs font-semibold text-zinc-400">
                {formatPrice(product.price * cartQuantity)}
              </span>
            </div>
          ) : (
            /* Not in cart — show quantity selector + add button */
            <>
              {!isOutOfStock && (
                <QuantityInput
                  value={localQty}
                  max={product.stock}
                  onChange={setLocalQty}
                  disabled={isOutOfStock}
                  compact
                />
              )}
              <Button
                variant={isOutOfStock ? "secondary" : "primary"}
                size="sm"
                fullWidth
                disabled={isOutOfStock}
                onClick={handleAddToCart}
              >
                {isOutOfStock ? "Out of Stock" : "Add to Cart"}
              </Button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
