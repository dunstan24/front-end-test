import PurchaseRequestPage from "@/features/purchase-request/PurchaseRequestPage";

/**
 * Root page — renders the Purchase Request ordering system.
 *
 * Note: No "use client" here. PurchaseRequestPage declares its own
 * "use client" boundary — this keeps the page shell as a Server Component
 * for correct SSR metadata and layout behaviour in Next.js App Router.
 *
 * All state management is handled within PurchaseRequestPage via useCart.
 */
export default function HomePage() {
  return <PurchaseRequestPage />;
}
