/**
 * QuantityInput — Increment/decrement control with stock validation.
 *
 * Features:
 * - Plus/minus buttons
 * - Current value display
 * - Min 0, max = stock validation
 * - Warning indicator when at max stock
 * - Disabled state when product is out of stock
 */

"use client";

import React from "react";
import { PlusIcon, MinusIcon } from "@/components/ui/Icons";

interface QuantityInputProps {
  /** Current quantity value */
  value: number;
  /** Maximum allowed value (usually product stock) */
  max: number;
  /** Minimum allowed value */
  min?: number;
  /** Callback when quantity changes */
  onChange: (newValue: number) => void;
  /** Disabled state (e.g., out of stock) */
  disabled?: boolean;
  /** Compact size for cart rows */
  compact?: boolean;
}

export default function QuantityInput({
  value,
  max,
  min = 1,
  onChange,
  disabled = false,
  compact = false,
}: QuantityInputProps) {
  const isAtMin = value <= min;
  const isAtMax = value >= max;

  const handleDecrement = () => {
    if (!disabled && value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (!disabled && value < max) {
      onChange(value + 1);
    }
  };

  const btnSize = compact ? "w-7 h-7" : "w-8 h-8";
  const textSize = compact ? "text-xs w-8" : "text-sm w-10";

  return (
    <div className="flex flex-col items-start gap-1">
      <div
        className={`inline-flex items-center rounded-xl border transition-colors ${
          disabled
            ? "border-zinc-800 bg-zinc-900/50 opacity-50"
            : "border-zinc-700 bg-zinc-900/80"
        }`}
      >
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isAtMin}
          className={`${btnSize} flex items-center justify-center text-zinc-400 transition-colors rounded-l-xl
            ${disabled || isAtMin ? "opacity-30 cursor-not-allowed" : "hover:text-white hover:bg-zinc-800"}`}
          aria-label="Decrease quantity"
        >
          <MinusIcon className="w-3.5 h-3.5" />
        </button>

        {/* Value Display */}
        <span
          className={`${textSize} text-center font-semibold tabular-nums select-none ${
            disabled ? "text-zinc-600" : "text-white"
          }`}
        >
          {value}
        </span>

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || isAtMax}
          className={`${btnSize} flex items-center justify-center text-zinc-400 transition-colors rounded-r-xl
            ${disabled || isAtMax ? "opacity-30 cursor-not-allowed" : "hover:text-white hover:bg-zinc-800"}`}
          aria-label="Increase quantity"
        >
          <PlusIcon className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Stock Warning */}
      {!disabled && isAtMax && max > 0 && (
        <span className="text-[10px] text-amber-400 font-medium animate-fade-in">
          Max stock reached ({max} {max === 1 ? "item" : "items"})
        </span>
      )}
    </div>
  );
}
