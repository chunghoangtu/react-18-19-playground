import * as React from "react";
import type { Product } from "../data/products";
import { PRODUCTS } from "../data/products";
import { ProductSearch } from "./ProductSearch";
import { ProductList } from "./ProductList";
import { CartPanel } from "./CartPanel";
import { AddToCartForm } from "./AddToCartForm";
import type { CartItem } from "../actions/cartActions";

const ProductDetails = React.lazy(() => import("./ProductDetails.lazy"));

function SkeletonBox() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 animate-pulse space-y-2">
      <div className="h-4 w-32 rounded bg-white/10" />
      <div className="h-6 w-2/3 rounded bg-white/10" />
      <div className="h-4 w-full rounded bg-white/10" />
      <div className="h-4 w-5/6 rounded bg-white/10" />
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="h-16 rounded bg-white/10" />
        <div className="h-16 rounded bg-white/10" />
      </div>
    </div>
  );
}

export function AppShell() {
  const [results, setResults] = React.useState<Product[]>(PRODUCTS);
  const [selected, setSelected] = React.useState<Product | null>(
    PRODUCTS[0] ?? null,
  );

  const [cart, setCart] = React.useState<CartItem[]>([]);

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-lg font-semibold">Day 07 — Mini App</div>
        <div className="text-sm text-white/70">
          Deferred search + lazy details (Suspense) + action form + optimistic
          cart + ref as prop + use(promise).
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4 space-y-4">
          <ProductSearch all={PRODUCTS} onResults={setResults} />
          <CartPanel products={PRODUCTS} cart={cart} />
        </div>

        <div className="lg:col-span-4">
          <ProductList
            products={results.slice(0, 200)}
            selectedId={selected?.id}
            onSelect={(p) => setSelected(p)}
          />
          <div className="mt-2 text-xs text-white/50">
            (Render top 200 results để UI gọn.)
          </div>
        </div>

        <div className="lg:col-span-4 space-y-4">
          {selected ? (
            <>
              <React.Suspense fallback={<SkeletonBox />}>
                <ProductDetails product={selected} />
              </React.Suspense>

              <AddToCartForm product={selected} cart={cart} setCart={setCart} />
            </>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
              Select a product.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
