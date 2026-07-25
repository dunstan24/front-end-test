/**
 * Toast — Lightweight notification for instant cart feedback.
 *
 * Shows a brief "Added to cart" confirmation when a product is added.
 * Auto-dismisses after 2.5 seconds. Positioned fixed bottom-right on
 * desktop, bottom-center on mobile.
 *
 * Usage: Render once in PurchaseRequestPage, controlled via props.
 */

"use client";

import React, { useEffect } from "react";
import { CheckIcon } from "@/components/ui/Icons";

interface ToastProps {
  /** Toast message to display */
  message: string;
  /** Whether toast is visible */
  visible: boolean;
  /** Callback to hide toast */
  onHide: () => void;
  /** Auto-dismiss duration in ms (default 2500) */
  duration?: number;
}

export default function Toast({
  message,
  visible,
  onHide,
  duration = 2500,
}: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, onHide, duration]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-50 animate-slide-up"
    >
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl shadow-black/60 text-sm text-white font-medium whitespace-nowrap">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600/20 border border-emerald-500/40 shrink-0">
          <CheckIcon className="w-3 h-3 text-emerald-400" />
        </span>
        {message}
      </div>
    </div>
  );
}
