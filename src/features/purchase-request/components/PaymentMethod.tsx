/**
 * PaymentMethod — Radio group for selecting a payment method.
 *
 * Options: Bank Transfer, Cash on Delivery, Company Credit
 * Each option shows icon + label + description + realistic status badge when selected.
 * Selected state has highlight border and expanded info hint.
 * Uses centralized icon components from Icons.tsx.
 */

"use client";

import React from "react";
import { PAYMENT_METHODS } from "@/features/purchase-request/data/products";
import type { PaymentMethodType } from "@/features/purchase-request/types";
import { BankIcon, CashIcon, CreditCardIcon, CheckIcon } from "@/components/ui/Icons";

interface PaymentMethodProps {
  /** Currently selected payment method */
  selected: PaymentMethodType | null;
  /** Selection handler */
  onSelect: (method: PaymentMethodType) => void;
  /** Disable selection */
  disabled?: boolean;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  bank: <BankIcon className="w-5 h-5" />,
  cash: <CashIcon className="w-5 h-5" />,
  credit: <CreditCardIcon className="w-5 h-5" />,
};

const SIMULATION_HINTS: Record<PaymentMethodType, { title: string; detail: string; badge: string }> = {
  bank_transfer: {
    title: "Virtual Account Simulation",
    detail: "Generates BCA, Mandiri, or BNI VA with live 24-hour expiry timer & copyable amount.",
    badge: "BCA / Mandiri / BNI VA",
  },
  cod: {
    title: "Outlet Delivery Verification",
    detail: "Sent to Outlet Branch 04 (South Jakarta) with driver receipt & cash verification.",
    badge: "Pay to Logistics Driver",
  },
  company_credit: {
    title: "Head Office Credit Balance",
    detail: "Current Available Credit: Rp 28.500.000 (Pre-approved by Finance System).",
    badge: "Limit: Rp 50.000.000",
  },
};

export default function PaymentMethod({ selected, onSelect, disabled = false }: PaymentMethodProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
          Payment Method
        </h3>
        <span className="text-[10px] text-zinc-500 font-medium">Select 1 option</span>
      </div>

      <div className="space-y-2.5" role="radiogroup" aria-label="Select payment method">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selected === method.id;
          const hint = SIMULATION_HINTS[method.id];

          return (
            <div key={method.id} className="space-y-0">
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={disabled}
                onClick={() => onSelect(method.id)}
                className={`w-full p-3.5 rounded-xl border text-left transition-all select-none ${
                  disabled
                    ? "opacity-50 cursor-not-allowed"
                    : isSelected
                    ? "bg-blue-600/10 border-blue-500/60 shadow-md shadow-blue-500/5 rounded-b-none"
                    : "bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <div className="flex items-center gap-3">
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
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-xs font-bold transition-colors ${isSelected ? "text-white" : "text-zinc-300"}`}>
                        {method.label}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/20 border border-blue-400/30 text-[9px] font-bold text-blue-300 uppercase tracking-wider">
                          {hint.badge}
                        </span>
                      )}
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
                </div>
              </button>

              {/* Realistic Info Detail Box when selected */}
              {isSelected && (
                <div className="p-3 rounded-b-xl bg-blue-950/20 border border-t-0 border-blue-500/40 text-[11px] space-y-1 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-blue-400 font-bold">
                    <CheckIcon className="w-3.5 h-3.5" />
                    {hint.title}
                  </div>
                  <p className="text-zinc-400 leading-relaxed text-[10.5px]">
                    {hint.detail}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
