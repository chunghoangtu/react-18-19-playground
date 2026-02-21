// Fake API utility for day07 MiniApp
import type { Product } from "../data/products";

export type ProductDetails = Product & {
  description: string;
  stock: number;
};

const cache = new Map<string, Promise<ProductDetails>>();

export function fetchProductDetails(p: Product): Promise<ProductDetails> {
  if (cache.has(p.id)) return cache.get(p.id)!;

  const promise = new Promise<ProductDetails>((resolve) => {
    setTimeout(() => {
      resolve({
        ...p,
        stock: (Number(p.id.slice(2)) * 7) % 42,
        description: `Details for ${p.name}. This is a fake API response.`,
      });
    }, 700);
  });

  cache.set(p.id, promise);
  return promise;
}
