import type { Item } from "../data/generateItems";

type Category = Item["category"] | "All";

type Props = {
  value: Category;
  onChange: (next: Category) => void;
};

export function CategorySelect({ value, onChange }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
      <label className="text-xs font-semibold text-white/70">Category</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as Category)}
        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none focus:border-white/20"
      >
        <option value="All">All</option>
        <option value="Alpha">Alpha</option>
        <option value="Beta">Beta</option>
        <option value="Gamma">Gamma</option>
        <option value="Delta">Delta</option>
      </select>
    </div>
  );
}
