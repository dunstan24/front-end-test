/**
 * PaymentModal — Interactive, realistic payment simulation modal.
 *
 * Simulates realistic checkout flows for each payment method:
 * 1. Bank Transfer: Virtual Account number (BCA/Mandiri/BNI), copy buttons, expiry countdown, and verification steps.
 * 2. Cash on Delivery (COD): Outlet delivery address, recipient contact, exact cash reminder, and delivery window.
 * 3. Company Credit: Monthly credit limit breakdown, deduction summary, and remaining balance.
 */

"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  BankIcon,
  CashIcon,
  CreditCardIcon,
  CloseIcon,
  CheckIcon,
} from "@/components/ui/Icons";
import type { PaymentMethodType } from "../types";
import { formatPrice } from "../data/products";

interface PaymentModalProps {
  /** Modal open state */
  isOpen: boolean;
  /** Selected payment method */
  paymentMethod: PaymentMethodType;
  /** Grand total amount */
  totalAmount: number;
  /** Total item count */
  totalItems: number;
  /** Close modal callback */
  onClose: () => void;
  /** Confirm order callback */
  onConfirm: () => Promise<void>;
  /** Show toast feedback callback */
  onCopyToast: (msg: string) => void;
}

type BankType = "bca" | "mandiri" | "bni";

const VA_NUMBERS: Record<BankType, string> = {
  bca: "8839 0192 8472 9012",
  mandiri: "8902 3847 1029 4812",
  bni: "9880 1293 8471 0023",
};

const BANK_NAMES: Record<BankType, string> = {
  bca: "BCA Virtual Account",
  mandiri: "Mandiri Virtual Account",
  bni: "BNI Virtual Account",
};

export default function PaymentModal({
  isOpen,
  paymentMethod,
  totalAmount,
  totalItems,
  onClose,
  onConfirm,
  onCopyToast,
}: PaymentModalProps) {
  const [selectedBank, setSelectedBank] = useState<BankType>("bca");
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  // Countdown timer for Bank Transfer (23 hours 59 mins)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    if (!isOpen || paymentMethod !== "bank_transfer") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentMethod]);

  if (!isOpen) return null;

  const handleCopyVA = () => {
    navigator.clipboard.writeText(VA_NUMBERS[selectedBank].replace(/\s/g, ""));
    setCopiedVA(true);
    onCopyToast(`Copied ${BANK_NAMES[selectedBank]} VA Number`);
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(totalAmount.toString());
    setCopiedAmount(true);
    onCopyToast("Copied Total Payment Amount");
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    await onConfirm();
    setIsProcessing(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div className="relative w-full max-w-lg rounded-2xl border border-zinc-800 bg-[#0a0a0f] p-6 shadow-2xl space-y-5 overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              {paymentMethod === "bank_transfer" && <BankIcon className="w-5 h-5" />}
              {paymentMethod === "cod" && <CashIcon className="w-5 h-5" />}
              {paymentMethod === "company_credit" && <CreditCardIcon className="w-5 h-5" />}
            </div>
            <div>
              <h2 id="payment-modal-title" className="text-base font-extrabold text-white">
                {paymentMethod === "bank_transfer" && "Bank Transfer Payment"}
                {paymentMethod === "cod" && "Cash on Delivery Confirmation"}
                {paymentMethod === "company_credit" && "Company Credit Authorization"}
              </h2>
              <p className="text-[11px] text-zinc-400">
                {totalItems} item{totalItems > 1 ? "s" : ""} • Total:{" "}
                <span className="font-bold text-white">{formatPrice(totalAmount)}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50"
            aria-label="Close payment modal"
          >
            <CloseIcon className="w-4 h-4" />
          </button>
        </div>

        {/* ── METHOD 1: Bank Transfer View ── */}
        {paymentMethod === "bank_transfer" && (
          <div className="space-y-4">
            {/* Bank Selector Tabs */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Select Destination Bank:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["bca", "mandiri", "bni"] as BankType[]).map((bank) => (
                  <button
                    key={bank}
                    onClick={() => setSelectedBank(bank)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      selectedBank === bank
                        ? "bg-blue-600/20 border-blue-500 text-blue-400 shadow-sm"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {bank.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Virtual Account Box */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>{BANK_NAMES[selectedBank]}</span>
                <span className="font-mono text-[10px] text-amber-400 flex items-center gap-1">
                  ⏳ Expires in {String(timeLeft.hours).padStart(2, "0")}:
                  {String(timeLeft.minutes).padStart(2, "0")}:
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>

              {/* VA Number + Copy */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                    Virtual Account Number
                  </span>
                  <span className="font-mono text-base font-extrabold text-white tracking-wider">
                    {VA_NUMBERS[selectedBank]}
                  </span>
                </div>
                <Button variant="secondary" size="sm" onClick={handleCopyVA}>
                  {copiedVA ? "Copied! ✓" : "Copy"}
                </Button>
              </div>

              {/* Total Amount + Copy */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-black/60 border border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-bold block">
                    Exact Amount to Transfer
                  </span>
                  <span className="font-extrabold text-emerald-400 text-base">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <Button variant="secondary" size="sm" onClick={handleCopyAmount}>
                  {copiedAmount ? "Copied! ✓" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Transfer Instructions */}
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-3 space-y-1.5 text-[11px] text-zinc-400">
              <span className="font-bold text-zinc-300 block">Transfer Steps:</span>
              <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                <li>Open your Mobile Banking or ATM app</li>
                <li>Select <strong className="text-white">Transfer → Virtual Account</strong></li>
                <li>Enter VA number: <strong className="text-white font-mono">{VA_NUMBERS[selectedBank]}</strong></li>
                <li>Confirm amount matches <strong className="text-emerald-400">{formatPrice(totalAmount)}</strong></li>
              </ol>
            </div>
          </div>
        )}

        {/* ── METHOD 2: Cash on Delivery View ── */}
        {paymentMethod === "cod" && (
          <div className="space-y-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">
                  Delivery Destination
                </span>
                <p className="text-xs font-semibold text-white">
                  Outlet Cabang Jakarta Selatan (Branch 04)
                </p>
                <p className="text-[11px] text-zinc-400">
                  Jl. Sultan Hasanuddin No. 45, Kebayoran Baru, Jakarta Selatan
                </p>
              </div>

              <div className="space-y-1 border-t border-zinc-800/80 pt-2.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase">
                  Recipient Contact
                </span>
                <p className="text-xs text-zinc-300">
                  Budi Santoso (Outlet Coordinator) • +62 812-9876-5432
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-zinc-800/80 pt-2.5 text-xs">
                <span className="text-zinc-400">Estimated Delivery:</span>
                <span className="font-bold text-white">Tomorrow, 09:00 - 12:00 WIB</span>
              </div>
            </div>

            {/* COD Cash Reminder Box */}
            <div className="rounded-xl border border-amber-800/40 bg-amber-950/20 p-3.5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                💵
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-amber-400 block">
                  Prepare Exact Cash Amount
                </span>
                <p className="text-[11px] text-zinc-400">
                  Please prepare <strong className="text-white">{formatPrice(totalAmount)}</strong> in cash. Pay directly to the Head Office logistics driver upon arrival.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── METHOD 3: Company Credit View ── */}
        {paymentMethod === "company_credit" && (
          <div className="space-y-4">
            {/* Credit Allocation Card */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">Monthly Credit Limit</span>
                <Badge variant="info">Outlet Allocation</Badge>
              </div>

              <div className="space-y-2 border-t border-b border-zinc-800/80 py-3 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Current Available Credit:</span>
                  <span className="font-semibold text-white">Rp 28.500.000</span>
                </div>
                <div className="flex justify-between text-red-400 font-semibold">
                  <span>Deduction Amount:</span>
                  <span>- {formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold pt-1 border-t border-zinc-800/50">
                  <span>New Remaining Balance:</span>
                  <span>{formatPrice(Math.max(0, 28500000 - totalAmount))}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
                <CheckIcon className="w-3.5 h-3.5" />
                Pre-approved by Head Office Finance System
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            variant="secondary"
            size="md"
            onClick={onClose}
            disabled={isProcessing}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleConfirmPayment}
            loading={isProcessing}
            fullWidth
          >
            {isProcessing ? "Processing Order..." : "Confirm & Submit Order"}
          </Button>
        </div>

      </div>
    </div>
  );
}
