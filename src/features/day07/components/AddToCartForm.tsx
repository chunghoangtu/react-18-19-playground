import * as React from "react";
import { useActionState, useOptimistic } from "react";
import type { Product } from "../data/products";
import { SubmitButton } from "./SubmitButton";
import {
  addToCartAction,
  initialAddCartState,
  addToCartOptimistic,
  type CartItem,
} from "../actions/cartActions";

type Props = {
  product: Product;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

export function AddToCartForm({ product, cart, setCart }: Props) {
  const [state, formAction] = useActionState(
    addToCartAction,
    initialAddCartState,
  );

  const [optimisticCart, dispatchOptimistic] = useOptimistic(
    cart,
    (
      current: CartItem[],
      action:
        | { type: "add"; productId: string; qty: number }
        | { type: "noop" },
    ) => {
      if (action.type === "add")
        return addToCartOptimistic(current, action.productId, action.qty);
      return current;
    },
  );

  React.useEffect(() => {
    if (state.ok && state.productId && state.qty) {
      setCart((prev) =>
        addToCartOptimistic(prev, state.productId!, state.qty!),
      );
    }
  }, [state.ok, state.productId, state.qty, setCart]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">Add to cart (Action form)</div>
      <div className="mt-1 text-xs text-white/60">
        useActionState + useFormStatus + useOptimistic
      </div>

      <form
        action={(fd) => {
          const qty = Number(fd.get("qty") ?? 1);
          dispatchOptimistic({
            type: "add",
            productId: product.id,
            qty: Number.isFinite(qty) ? qty : 1,
          });
          formAction(fd);
        }}
        className="mt-3 flex flex-wrap items-center gap-2"
      >
        <input type="hidden" name="productId" value={product.id} />
        <input
          name="qty"
          defaultValue={1}
          className="w-20 rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
        />
        <SubmitButton idle="Add" pending="Adding…" />
      </form>

      {!state.ok ? (
        <div className="mt-3 rounded-xl border border-rose-300/20 bg-rose-300/10 px-3 py-2 text-sm text-rose-100">
          {state.message}
        </div>
      ) : null}

      <div className="mt-3 text-xs text-white/50">
        Optimistic cart items: <b>{optimisticCart.length}</b>
      </div>
    </div>
  );
}
