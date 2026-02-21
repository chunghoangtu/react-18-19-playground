export type Product = {
  id: string;
  name: string;
  price: number;
  category: "UI" | "DevTools" | "Magic";
  description?: string;
  image?: string;
};

const cats: Product["category"][] = ["UI", "DevTools", "Magic"];

export function generateProducts(count: number): Product[] {
  const list: Product[] = [];
  for (let i = 1; i <= count; i += 1) {
    const c = cats[i % cats.length];
    list.push({
      id: `p-${i}`,
      category: c,
      name: `${c} Product ${i.toString().padStart(4, "0")}`,
      price: 10 + (i % 97),
    });
  }
  return list;
}

export const PRODUCTS = generateProducts(5000);
