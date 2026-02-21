// Cart actions for day07 MiniApp
import type { Product } from "../data/products";

export type CartItem = { productId: string; qty: number };

export type AddCartState = {
  ok: boolean;
  message?: string;
  productId?: string;
  qty?: number;
};

export const initialAddCartState: AddCartState = { ok: true };

export async function addToCartAction(_prev: AddCartState, formData: FormData): Promise<AddCartState> {
  const productId = String(formData.get("productId") ?? "");
  const qty = Number(formData.get("qty") ?? 1);

  // fake network
  await new Promise((r) => setTimeout(r, 450));

  if (!productId) return { ok: false, message: "Missing productId" };
  if (!Number.isFinite(qty) || qty <= 0) return { ok: false, message: "qty must be > 0" };

  // fake random failure
  if (Math.random() < 0.12) return { ok: false, message: "Server failed. Try again." };

  return { ok: true, productId, qty };
}

export function addToCartOptimistic(current: CartItem[], productId: string, qty: number) {
  const idx = current.findIndex((c) => c.productId === productId);
  if (idx === -1) return [{ productId, qty }, ...current];
  return current.map((c) => (c.productId === productId ? { ...c, qty: c.qty + qty } : c));
}

export function cartCount(items: CartItem[]) {
  return items.reduce((s, it) => s + it.qty, 0);
}

export function getProductName(products: Product[], id: string) {
  return products.find((p) => p.id === id)?.name ?? id;
}