export type Item = {
  id: number;
  name: string;
  category: "Alpha" | "Beta" | "Gamma" | "Delta";
};

const categories: Item["category"][] = ["Alpha", "Beta", "Gamma", "Delta"];

export function generateItems(count: number): Item[] {
  const items: Item[] = [];
  for (let i = 1; i <= count; i += 1) {
    const cat = categories[i % categories.length];
    items.push({
      id: i,
      category: cat,
      name: `${cat} Item ${i.toString().padStart(5, "0")}`,
    });
  }
  return items;
}
