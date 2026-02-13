import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  generateItems,
  type Item,
} from "../../features/day02/data/generateItems";
import { SearchBox } from "../../features/day02/components/SearchBox";
import { PendingBadge } from "../../features/day02/components/PendingBadge";
import { BigList } from "../../features/day02/components/BigList";
import { CategorySelect } from "../../features/day02/components/CategorySelect";

type Category = Item["category"] | "All";

const ALL_ITEMS: Item[] = generateItems(100_000);

function filterItems(items: Item[], query: string, category: Category): Item[] {
  const q = query.trim().toLowerCase();
  if (!q) return items;

  // Filter nặng hơn một chút để bạn cảm nhận transition rõ (đừng quá nặng kẻo lag máy)
  // return items.filter((it) => it.name.toLowerCase().includes(q));
  return items.filter((it) => {
    const okCategory = category === "All" ? true : it.category === category;
    const okQuery = !q ? true : it.name.toLowerCase().includes(q);
    return okCategory && okQuery;
  });
}

export const Route = createFileRoute("/pages/day-02")({
  component: Day02Transitions,
});

function Day02Transitions() {
  const [query, setQuery] = React.useState("");
  const [filtered, setFiltered] = React.useState<Item[]>(ALL_ITEMS);

  const [isPending, startTransition] = React.useTransition();

  type Category = Item["category"] | "All";

  const [category, setCategory] = React.useState<Category>("All");

  const [useTransitions, setUseTransitions] = React.useState(true);

  const applyFilter = React.useCallback(
    (nextQuery: string, nextCategory: Category) => {
      const run = () =>
        setFiltered(filterItems(ALL_ITEMS, nextQuery, nextCategory));

      if (useTransitions) {
        startTransition(run);
      } else {
        run(); // update ngay (dễ cảm nhận lag hơn nếu filter nặng)
      }
    },
    [startTransition, useTransitions],
  );

  // const onChangeQuery = (next: string) => {
  //   // Urgent update: input phải phản hồi ngay
  //   setQuery(next);

  //   // Non-urgent update: filter list chạy trong transition
  //   startTransition(() => {
  //     setFiltered(filterItems(ALL_ITEMS, next, category));
  //   });
  // };

  const onChangeQuery = (next: string) => {
    setQuery(next);
    // startTransition(() => {
    //   setFiltered(filterItems(ALL_ITEMS, next, category));
    // });

    applyFilter(next, category);
  };

  const onChangeCategory = (next: Category) => {
    setCategory(next);
    // startTransition(() => {
    //   setFiltered(filterItems(ALL_ITEMS, query, next));
    // });

    applyFilter(query, next);
  };

  // Bonus: demo startTransition (API dạng function) cũng tương tự:
  const randomQuery = () => {
    const samples = [
      "alpha",
      "beta",
      "gamma",
      "delta",
      "item 1",
      "item 99",
      "",
    ];
    const next = samples[Math.floor(Math.random() * samples.length)];
    setQuery(next);
    startTransition(() => setFiltered(filterItems(ALL_ITEMS, next, category)));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Day 02 — Transitions</h1>
          <p className="mt-1 text-sm text-white/70">
            Input update là “urgent”, còn filter list là “non-urgent” → dùng
            useTransition để UI mượt.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={useTransitions}
              onChange={(e) => setUseTransitions(e.target.checked)}
              className="h-4 w-4 accent-white"
            />
            Use transition
          </label>

          <PendingBadge pending={isPending} />
          <button
            onClick={randomQuery}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          >
            Random query
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SearchBox
            value={query}
            onChange={onChangeQuery}
            placeholder='Try: "alpha", "item 123", "delta item"...'
          />
          <CategorySelect value={category} onChange={onChangeCategory} />
          <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
            <div className="font-semibold text-white/80">What to observe</div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Gõ nhanh: ô input vẫn mượt.</li>
              <li>Khi list đang update: badge chuyển “Updating…”.</li>
              <li>UI không bị “kẹt” vì render/filter nặng.</li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-8">
          <BigList items={filtered} pending={isPending} />
        </div>
      </div>
    </div>
  );
}
