/**
 * PurchaseRequestPage — Main page component assembling all purchase request features.
 *
 * Layout:
 * - Desktop: Two-column (Product Catalog | Cart + Summary + Payment + Notes + Submit)
 * - Mobile: Single-column stacked (catalog first, cart panel second)
 *
 * State managed centrally via useCart hook and passed down via props.
 * Uses centralized icon components from @/components/ui/Icons.
 */

"use client";

import React, { useRef, useCallback, useState } from "react";
import Header from "@/components/layout/Header";
import PageContainer from "@/components/layout/PageContainer";
import ProductCatalog from "./components/ProductCatalog";
import CartPanel from "./components/CartPanel";
import OrderSummary from "./components/OrderSummary";
import PaymentMethod from "./components/PaymentMethod";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Textarea } from "@/components/ui/Input";
import {
  CheckIcon,
  ChevronDownIcon,
  PackageIcon,
} from "@/components/ui/Icons";
import { useCart } from "./hooks/useCart";
import { formatPrice, ORDER_HISTORY } from "./data/products";

/** Maps order status to Badge variant */
function getStatusVariant(status: string) {
  if (status === "completed") return "success";
  if (status === "shipped") return "info";
  if (status === "processing") return "warning";
  return "neutral";
}

export default function PurchaseRequestPage() {
  const cart = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const catalogRef = useRef<HTMLDivElement>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [orderNotes, setOrderNotes] = useState("");

  const scrollToCart = useCallback(() => {
    cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const scrollToCatalog = useCallback(() => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleSubmit = async () => {
    await cart.submitOrder();
    setOrderNotes("");
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header cartCount={cart.itemCount} onCartClick={scrollToCart} />

      <main className="pt-20 pb-16">
        <PageContainer>

          {/* ── Success State ── */}
          {cart.isSubmitted && (
            <div className="mb-8 rounded-2xl border border-emerald-800/50 bg-emerald-950/30 p-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <CheckIcon className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-extrabold text-white">
                  Purchase Request Submitted!
                </h2>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Your order has been sent to Head Office for processing. You will receive a confirmation shortly.
                </p>
              </div>
              <Button variant="primary" size="md" onClick={cart.resetOrder}>
                Place New Order
              </Button>
            </div>
          )}

          {/* ── Main Two-Column Layout ── */}
          {!cart.isSubmitted && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

              {/* Left Column — Product Catalog */}
              <div className="lg:col-span-7 xl:col-span-8" ref={catalogRef}>
                <ProductCatalog
                  isInCart={cart.isInCart}
                  getCartQuantity={cart.getCartQuantity}
                  onAddToCart={cart.addToCart}
                  onUpdateQuantity={cart.updateQuantity}
                />
              </div>

              {/* Right Column — Cart + Summary + Notes + Payment + Submit */}
              <aside
                className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-20 space-y-4"
                ref={cartRef}
                aria-label="Cart and order details"
              >
                {/* Cart Panel */}
                <div className="rounded-2xl border border-zinc-800/80 bg-[#050507] p-4">
                  <CartPanel
                    items={cart.cartItems}
                    onUpdateQuantity={cart.updateQuantity}
                    onRemove={cart.removeFromCart}
                    onClearAll={cart.clearCart}
                    onBrowseProducts={scrollToCatalog}
                  />
                </div>

                {/* Order Summary */}
                <OrderSummary
                  subtotal={cart.subtotal}
                  tax={cart.tax}
                  total={cart.total}
                  totalQuantity={cart.totalQuantity}
                  itemCount={cart.itemCount}
                />

                {/* Payment Method + Notes — only shown when cart has items */}
                {cart.itemCount > 0 && (
                  <>
                    {/* Payment Method */}
                    <div className="rounded-2xl border border-zinc-800/80 bg-[#050507] p-4">
                      <PaymentMethod
                        selected={cart.paymentMethod}
                        onSelect={cart.setPaymentMethod}
                        disabled={cart.isSubmitting}
                      />
                    </div>

                    {/* Order Notes (uses the Input/Textarea component) */}
                    <div className="rounded-2xl border border-zinc-800/80 bg-[#050507] p-4 space-y-3">
                      <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                        Order Notes
                      </h3>
                      <Textarea
                        id="order-notes"
                        label="Notes for Head Office"
                        placeholder="e.g. urgent delivery, specific size requirements, delivery instructions..."
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        disabled={cart.isSubmitting}
                        helperText="Optional — leave a message for the Head Office team."
                      />
                    </div>

                    {/* Submit */}
                    <div className="space-y-2">
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        loading={cart.isSubmitting}
                        disabled={!cart.canSubmit}
                        onClick={handleSubmit}
                        id="submit-order-btn"
                      >
                        {cart.isSubmitting
                          ? "Submitting Order..."
                          : `Submit Purchase Request — ${formatPrice(cart.total)}`}
                      </Button>

                      {!cart.paymentMethod && cart.itemCount > 0 && (
                        <p className="text-[10px] text-amber-400 text-center font-medium" role="alert">
                          Please select a payment method to continue
                        </p>
                      )}
                    </div>
                  </>
                )}
              </aside>
            </div>
          )}

          {/* ── Order History Section ── */}
          <section className="mt-16" aria-label="Order History">
            {/* Toggle Button */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-3 mb-6 group"
              aria-expanded={showHistory}
              aria-controls="order-history-panel"
              id="order-history-toggle"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                Order History
              </span>
              <ChevronDownIcon
                className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                  showHistory ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* History Panel */}
            {showHistory && (
              <div
                id="order-history-panel"
                className="rounded-2xl border border-zinc-800/80 bg-[#050507] overflow-hidden"
              >
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-800/80">
                        {["Order ID", "Date", "Items", "Total", "Payment", "Status"].map((h) => (
                          <th key={h} className="px-5 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60">
                      {ORDER_HISTORY.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-900/50 transition-colors">
                          <td className="px-5 py-3.5 font-mono font-semibold text-white">{order.id}</td>
                          <td className="px-5 py-3.5 text-zinc-400">
                            {new Date(order.date).toLocaleDateString("id-ID", {
                              day: "numeric", month: "short", year: "numeric",
                            })}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-400 max-w-[220px]">
                            <span className="line-clamp-2">
                              {order.items.map((item) => `${item.product.name} (×${item.quantity})`).join(", ")}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-white tabular-nums">
                            {formatPrice(order.total)}
                          </td>
                          <td className="px-5 py-3.5 text-zinc-400 capitalize">
                            {order.paymentMethod.replace(/_/g, " ")}
                          </td>
                          <td className="px-5 py-3.5">
                            <Badge variant={getStatusVariant(order.status)} dot>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden divide-y divide-zinc-800/60">
                  {ORDER_HISTORY.map((order) => (
                    <div key={order.id} className="p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-semibold text-white">{order.id}</span>
                        <Badge variant={getStatusVariant(order.status)} dot>
                          {order.status}
                        </Badge>
                      </div>
                      <div className="text-[10px] text-zinc-500">
                        {new Date(order.date).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-zinc-400">
                        {order.items.map((item) => `${item.product.name} (×${item.quantity})`).join(", ")}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-bold text-white">{formatPrice(order.total)}</span>
                        <span className="text-[10px] text-zinc-500 capitalize">
                          {order.paymentMethod.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </PageContainer>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 px-5 sm:px-8 border-t border-zinc-900">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-4 h-4" />
            <span className="font-semibold text-zinc-500">OrderHub</span>
          </div>
          <span>© 2026 OrderHub — Internal Purchase Request System</span>
        </div>
      </footer>
    </div>
  );
}
