import type { Item } from "../data/generateItems";

type BigListProps = {
  items: Item[];
  pending: boolean;
};

export function BigList({ items, pending }: BigListProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold">Results</div>
        <div className="text-xs text-white/60">{items.length.toLocaleString()} items</div>
      </div>

      {/* overlay nhẹ khi pending */}
      {pending ? (
        <div className="pointer-events-none absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]">
          <div className="p-4">
            <div className="h-3 w-40 rounded bg-white/10" />
            <div className="mt-3 space-y-2">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="h-8 rounded-lg bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="max-h-[520px] overflow-auto p-3">
        <ul className="space-y-2">
          {items.slice(0, 500).map((item) => (
            <li
              key={item.id}
              className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-medium">{item.name}</div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/70">
                  {item.category}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-3 text-xs text-white/50">
          (Chỉ render tối đa 500 item để UI dễ nhìn; filter vẫn chạy trên toàn bộ dataset.)
        </div>
      </div>
    </div>
  );
}
