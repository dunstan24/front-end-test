/**
 * PaymentMethod — Radio group for selecting a payment method.
 *
 * Options: Bank Transfer, Cash on Delivery, Company Credit
 * Each option shows icon + label + description.
 * Selected state has highlight border.
 */

"use client";

import React from "react";
import { PAYMENT_METHODS } from "@/features/purchase-request/data/products";
import type { PaymentMethodType } from "@/features/purchase-request/types";

interface PaymentMethodProps {
  /** Currently selected payment method */
  selected: PaymentMethodType | null;
  /** Selection handler */
  onSelect: (method: PaymentMethodType) => void;
  /** Disable selection */
  disabled?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  bank: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  cash: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  credit: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
};

export default function PaymentMethod({ selected, onSelect, disabled = false }: PaymentMethodProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
        Payment Method
      </h3>

      <div className="space-y-2" role="radiogroup" aria-label="Select payment method">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selected === method.id;
          return (
            <button
              key={method.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onSelect(method.id)}
              className={`w-full p-3.5 rounded-xl border text-left flex items-center gap-3 transition-all select-none ${
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : isSelected
                  ? "bg-blue-600/10 border-blue-500/50 shadow-sm shadow-blue-500/5"
                  : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
            >
              {/* Icon */}
              <div
                className={`shrink-0 transition-colors ${
                  isSelected ? "text-blue-400" : "text-zinc-500"
                }`}
              >
                {ICON_MAP[method.icon]}
              </div>

              {/* Label + Description */}
              <div className="flex-1 min-w-0">
                <div className={`text-xs font-semibold transition-colors ${isSelected ? "text-white" : "text-zinc-300"}`}>
                  {method.label}
                </div>
                <div className="text-[10px] text-zinc-500 leading-relaxed mt-0.5">
                  {method.description}
                </div>
              </div>

              {/* Radio Indicator */}
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? "border-2 border-blue-400 bg-transparent"
                    : "border border-zinc-700 bg-zinc-800/80"
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
