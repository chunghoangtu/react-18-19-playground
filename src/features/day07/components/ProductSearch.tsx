import * as React from "react";
import { TextInput } from "./TextInput";
import type { Product } from "../data/products";

export function ProductSearch(props: {
  all: Product[];
  onResults: (items: Product[]) => void;
}) {
  const [q, setQ] = React.useState("");
  const deferred = React.useDeferredValue(q);

  React.useEffect(() => {
    const query = deferred.trim().toLowerCase();
    if (!query) {
      props.onResults(props.all);
      return;
    }
    props.onResults(
      props.all.filter((p) => p.name.toLowerCase().includes(query)),
    );
  }, [deferred, props]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Search (useDeferredValue)</div>
          <div className="text-xs text-white/60">
            List follows input smoothly
          </div>
        </div>
        <button
          onClick={() => inputRef.current?.focus()}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Focus
        </button>
      </div>

      <TextInput
        ref={inputRef}
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder='Try: "UI", "Product 0100"...'
      />
      <div className="text-xs text-white/50">
        Urgent: input state. Deferred: filtering state.
      </div>
    </div>
  );
}
