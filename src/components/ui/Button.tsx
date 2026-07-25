/**
 * Button — Reusable button component with loading and disabled states.
 *
 * Variants: primary (white), secondary (dark), danger (red), ghost (transparent)
 * Sizes: sm, md, lg
 * Features: loading spinner, disabled state, full-width option
 */

"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const VARIANT_CLASSES: Record<string, string> = {
  primary:
    "bg-white text-black hover:bg-zinc-100 shadow-md active:scale-[0.98]",
  secondary:
    "bg-zinc-900 border border-zinc-800 text-white hover:bg-zinc-800 hover:border-zinc-700",
  danger:
    "bg-red-600/15 border border-red-500/30 text-red-400 hover:bg-red-600/25 hover:border-red-500/50",
  ghost:
    "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-900",
};

const SIZE_CLASSES: Record<string, string> = {
  sm: "px-3 py-1.5 text-[11px] rounded-lg gap-1.5",
  md: "px-5 py-2.5 text-xs rounded-xl gap-2",
  lg: "px-7 py-3.5 text-sm rounded-xl gap-2.5",
};

export default function Button({
  variant = "primary",
  size = "md",
  loading = false,
  fullWidth = false,
  disabled = false,
  children,
  className = "",
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        inline-flex items-center justify-center font-bold
        transition-all duration-200 select-none
        ${VARIANT_CLASSES[variant]}
        ${SIZE_CLASSES[size]}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "cursor-pointer"}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin w-4 h-4 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
