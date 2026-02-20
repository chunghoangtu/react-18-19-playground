import * as React from "react";

type Stat = { label: string; value: number };

export default function WidgetC() {
  const stats = React.useMemo<Stat[]>(
    () => [
      { label: "Requests", value: 12834 },
      { label: "Errors", value: 42 },
      { label: "Latency (ms)", value: 187 },
      { label: "Uptime (%)", value: 99.98 },
    ],
    [],
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">Widget C (lazy)</div>
      <div className="mt-1 text-xs text-white/60">Stats tiles</div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
            <div className="text-xs text-white/60">{s.label}</div>
            <div className="mt-1 text-lg font-semibold">{s.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}