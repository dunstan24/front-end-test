/**
 * Badge — Status badge component for product availability and order status.
 *
 * Variants: 
 * - success (emerald) — In Stock
 * - warning (amber) — Low Stock
 * - danger (red) — Out of Stock
 * - info (blue) — Added to Cart
 * - neutral (zinc) — Default
 */

import React from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
  /** Show a small pulsing dot indicator */
  dot?: boolean;
}

const VARIANT_CLASSES: Record<string, string> = {
  success: "bg-emerald-950/80 text-emerald-400 border-emerald-800/60",
  warning: "bg-amber-950/80 text-amber-400 border-amber-800/60",
  danger: "bg-red-950/80 text-red-400 border-red-800/60",
  info: "bg-blue-950/80 text-blue-400 border-blue-800/60",
  neutral: "bg-zinc-900 text-zinc-400 border-zinc-800",
};

const DOT_COLORS: Record<string, string> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
  neutral: "bg-zinc-400",
};

export default function Badge({
  variant = "neutral",
  children,
  className = "",
  dot = false,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md
        text-[10px] font-bold uppercase tracking-wider
        border transition-colors
        ${VARIANT_CLASSES[variant]}
        ${className}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${DOT_COLORS[variant]} ${variant === "success" ? "animate-pulse" : ""}`} />
      )}
      {children}
    </span>
  );
}
