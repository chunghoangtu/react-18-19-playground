import type { Product } from "../data/products";
import type { CartItem } from "../actions/cartActions";
import { cartCount, getProductName } from "../actions/cartActions";

export function CartPanel(props: { products: Product[]; cart: CartItem[] }) {
  const total = cartCount(props.cart);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold">Cart</div>
        <div className="text-xs text-white/60">{total} items</div>
      </div>

      <div className="p-3">
        {props.cart.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-3 text-sm text-white/70">
            Cart is empty.
          </div>
        ) : (
          <ul className="space-y-2">
            {props.cart.map((c) => (
              <li
                key={c.productId}
                className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2"
              >
                <div className="text-sm font-medium">
                  {getProductName(props.products, c.productId)}
                </div>
                <div className="mt-1 text-xs text-white/60">Qty: {c.qty}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
