/**
 * OrderSummary — Displays subtotal, tax, and grand total.
 *
 * Auto-updates when cart contents change via derived values
 * passed from the useCart hook.
 */

import React from "react";
import { formatPrice } from "@/features/purchase-request/data/products";

interface OrderSummaryProps {
  /** Cart subtotal (before tax) */
  subtotal: number;
  /** Tax amount */
  tax: number;
  /** Grand total */
  total: number;
  /** Total quantity of all items */
  totalQuantity: number;
  /** Number of distinct items */
  itemCount: number;
}

export default function OrderSummary({
  subtotal,
  tax,
  total,
  totalQuantity,
  itemCount,
}: OrderSummaryProps) {
  if (itemCount === 0) return null;

  return (
    <div className="rounded-2xl border border-zinc-800/80 bg-[#050507] p-4 space-y-3">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
        Order Summary
      </h3>

      {/* Line items */}
      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between text-zinc-400">
          <span>Items ({totalQuantity} {totalQuantity === 1 ? "unit" : "units"})</span>
          <span className="tabular-nums">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex items-center justify-between text-zinc-400">
          <span>Tax (PPN 11%)</span>
          <span className="tabular-nums">{formatPrice(tax)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-zinc-800/80" />

        {/* Grand Total */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Total</span>
          <span className="text-lg font-extrabold text-white tabular-nums tracking-tight">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
