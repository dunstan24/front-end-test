/**
 * ProductCatalog — Grid of products with search and category filtering.
 *
 * Features:
 * - Search bar for filtering by name/description
 * - Category tabs for filtering by product type
 * - Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
 * - Products rendered via .map() from data (not manually duplicated)
 * - Empty state when no products match filters
 */

"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { SearchIcon, CloseIcon } from "@/components/ui/Icons";
import { PRODUCTS, PRODUCT_CATEGORIES } from "@/features/purchase-request/data/products";
import type { Product, ProductCategory } from "@/features/purchase-request/types";

interface ProductCatalogProps {
  isInCart: (productId: string) => boolean;
  getCartQuantity: (productId: string) => number;
  onAddToCart: (product: Product, quantity: number) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  /** Returns live (post-purchase) stock for a product */
  getLiveStock: (productId: string) => number;
}

export default function ProductCatalog({
  isInCart,
  getCartQuantity,
  onAddToCart,
  onUpdateQuantity,
  getLiveStock,
}: ProductCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("all");

  // Filter products by search query and category
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    return result;
  }, [searchQuery, activeCategory]);

  return (
    <section aria-label="Product Catalog">
      {/* Section Header */}
      <div className="mb-6 space-y-5">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-3">
            Product Catalog
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            Select products for your<br className="hidden sm:block" /> purchase request
          </h2>
        </div>

        {/* Search + Category Filters */}
        <div className="space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-colors"
              aria-label="Search products"
              id="product-search"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded text-zinc-500 hover:text-white transition-colors"
                aria-label="Clear search"
              >
                <CloseIcon className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id as ProductCategory)}
                className={`px-3.5 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat.id
                    ? "bg-white text-black shadow-md"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isInCart={isInCart(product.id)}
              cartQuantity={getCartQuantity(product.id)}
              liveStock={getLiveStock(product.id)}
              onAddToCart={onAddToCart}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800/80 bg-[#050507]">
          <EmptyState
            icon="search"
            title="No products found"
            description={`No products match "${searchQuery || activeCategory}". Try a different search or category.`}
            actionText="Clear Filters"
            onAction={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}
          />
        </div>
      )}

      {/* Results Count */}
      <div className="mt-4 text-[11px] text-zinc-600 font-medium">
        Showing {filteredProducts.length} of {PRODUCTS.length} products
      </div>
    </section>
  );
}
