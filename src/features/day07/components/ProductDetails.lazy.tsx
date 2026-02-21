import * as React from "react";
import { use } from "react";
import type { Product } from "../data/products";
import { fetchProductDetails } from "../utils/fakeApi";

export default function ProductDetails(props: { product: Product }) {
  // ✅ React 19: use(Promise) integrates with Suspense
  const details = use(fetchProductDetails(props.product));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">Details (lazy)</div>
      <div className="mt-2 text-lg font-semibold">{details.name}</div>
      <div className="mt-1 text-sm text-white/70">{details.description}</div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
          <div className="text-xs text-white/60">Price</div>
          <div className="mt-1 font-semibold">${details.price}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
          <div className="text-xs text-white/60">Stock</div>
          <div className="mt-1 font-semibold">{details.stock}</div>
        </div>
      </div>
    </div>
  );
}
