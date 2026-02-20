import * as React from "react";

export function WidgetB() {
  const [count, setCount] = React.useState(0);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">Widget B (normal)</div>
      <div className="mt-1 text-xs text-white/60">No lazy import</div>

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          Click
        </button>
        <span className="text-sm text-white/80">
          Count: <b>{count}</b>
        </span>
      </div>

      <div className="mt-3 text-xs text-white/60">
        Bạn sẽ thấy widget này render ngay cả khi A/C đang fallback.
      </div>
    </div>
  );
}