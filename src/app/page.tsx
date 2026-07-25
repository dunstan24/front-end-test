"use client";

import PurchaseRequestPage from "@/features/purchase-request/PurchaseRequestPage";

/**
 * Root page — renders the Purchase Request ordering system.
 * All state management is handled within PurchaseRequestPage
 * via the useCart custom hook.
 */
export default function HomePage() {
  return <PurchaseRequestPage />;
}
