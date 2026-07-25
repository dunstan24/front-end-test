/**
 * Input — Reusable text input component.
 *
 * Features:
 * - Label with optional required indicator
 * - Error message display
 * - Helper text support
 * - Disabled state
 * - Textarea variant for multi-line input
 * - Consistent dark theme styling
 *
 * Required by brief spec: src/components/ui/Input
 */

"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label text */
  label?: string;
  /** Error message — shown in red below the input */
  error?: string;
  /** Helper text — shown in muted color below the input */
  helperText?: string;
  /** Show required asterisk on label */
  required?: boolean;
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  required,
  disabled,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-zinc-300"
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <input
        id={inputId}
        disabled={disabled}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm
          bg-zinc-900/80 border text-white
          placeholder:text-zinc-600
          transition-colors duration-150 outline-none
          ${error
            ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
            : "border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30"
          }
          ${disabled ? "opacity-50 cursor-not-allowed bg-zinc-900/40" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-[11px] text-red-400 font-medium" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-[11px] text-zinc-600">{helperText}</p>
      )}
    </div>
  );
}

/**
 * Textarea variant for multi-line input (e.g., order notes).
 * Exported as a named export from the same file.
 */
export function Textarea({
  label,
  error,
  helperText,
  required,
  disabled,
  id,
  className = "",
  ...props
}: TextareaProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold text-zinc-300"
        >
          {label}
          {required && <span className="text-red-400 ml-0.5">*</span>}
        </label>
      )}

      <textarea
        id={inputId}
        disabled={disabled}
        rows={3}
        className={`
          w-full px-3.5 py-2.5 rounded-xl text-sm resize-none
          bg-zinc-900/80 border text-white
          placeholder:text-zinc-600
          transition-colors duration-150 outline-none
          ${error
            ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/30"
            : "border-zinc-800 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600/30"
          }
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="text-[11px] text-red-400 font-medium" role="alert">
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="text-[11px] text-zinc-600">{helperText}</p>
      )}
    </div>
  );
}
