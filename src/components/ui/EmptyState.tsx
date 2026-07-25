/**
 * EmptyState — Displayed when the cart is empty.
 *
 * Shows an illustration, message, and CTA button to browse products.
 * Matches the dark theme aesthetic.
 */

import React from "react";
import Button from "./Button";

interface EmptyStateProps {
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** CTA button text */
  actionText?: string;
  /** CTA click handler */
  onAction?: () => void;
  /** Icon variant */
  icon?: "cart" | "order" | "search";
}

export default function EmptyState({
  title = "Your cart is empty",
  description = "Browse our product catalog and add items to your purchase request.",
  actionText = "Browse Products",
  onAction,
  icon = "cart",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center space-y-4">
      {/* Icon */}
      <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
        {icon === "cart" && (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
        )}
        {icon === "order" && (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        )}
        {icon === "search" && (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-white">{title}</h3>
        <p className="text-xs text-zinc-500 leading-relaxed max-w-xs">{description}</p>
      </div>

      {/* CTA */}
      {onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
