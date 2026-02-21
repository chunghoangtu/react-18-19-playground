import * as React from "react";
import { TextInput } from "./TextInput";
import type { Product } from "../data/products";
import { ModeToggle, type SearchMode } from "./ModeToggle";

function filterProducts(all: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return all;
  return all.filter((p) => p.name.toLowerCase().includes(q));
}

export function ProductSearch(props: {
  all: Product[];
  onResults: (items: Product[]) => void;
}) {
  const [mode, setMode] = React.useState<SearchMode>("deferred");

  // urgent input
  const [q, setQ] = React.useState("");

  // deferred query
  const deferred = React.useDeferredValue(q);

  // transition query (separate listQuery)
  const [listQuery, setListQuery] = React.useState("");

  const [isPending, startTransition] = React.useTransition();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const effectiveQuery = mode === "deferred" ? deferred : listQuery;

  // Apply filter whenever effectiveQuery changes
  React.useEffect(() => {
    props.onResults(filterProducts(props.all, effectiveQuery));
  }, [effectiveQuery, props]);

  // When switching modes, keep things consistent
  React.useEffect(() => {
    if (mode === "transition") setListQuery(q);
  }, [mode, q]);

  const onChange = (next: string) => {
    setQ(next);

    if (mode === "transition") {
      startTransition(() => {
        setListQuery(next);
      });
    }
    // mode deferred: nothing else needed
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Search</div>
          <div className="text-xs text-white/60">
            Compare <b>useDeferredValue</b> vs <b>useTransition</b>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => inputRef.current?.focus()}
            className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
          >
            Focus
          </button>
        </div>
      </div>

      <ModeToggle mode={mode} onChange={setMode} pending={isPending} />

      <TextInput
        ref={inputRef}
        value={q}
        onChange={(e) => onChange(e.target.value)}
        placeholder='Try: "UI", "Product 0100"...'
      />

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
          <div className="text-xs text-white/60">Urgent query</div>
          <div className="mt-1 font-mono text-sm">{q || "—"}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
          <div className="text-xs text-white/60">Used for list</div>
          <div className="mt-1 font-mono text-sm">{effectiveQuery || "—"}</div>
        </div>
      </div>

      <div className="text-xs text-white/50">
        Deferred: list “đuổi theo” input. Transition: tách state listQuery + có
        pending UI.
      </div>
    </div>
  );
}
