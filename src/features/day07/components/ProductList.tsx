import type { Product } from "../data/products";

export function ProductList(props: {
  products: Product[];
  selectedId?: string;
  onSelect: (p: Product) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold">Products</div>
        <div className="text-xs text-white/60">
          {props.products.length.toLocaleString()}
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto p-3">
        <ul className="space-y-2">
          {props.products.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => props.onSelect(p)}
                className={[
                  "w-full rounded-xl border px-3 py-2 text-left",
                  props.selectedId === p.id
                    ? "border-white/20 bg-white/10"
                    : "border-white/10 bg-slate-900/30 hover:bg-white/5",
                ].join(" ")}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-xs text-white/60">${p.price}</div>
                </div>
                <div className="mt-1 text-xs text-white/50">{p.category}</div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
