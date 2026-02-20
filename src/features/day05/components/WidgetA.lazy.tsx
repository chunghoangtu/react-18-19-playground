import * as React from "react";

function randomSeries(n: number) {
  const arr: number[] = [];
  let x = 42;
  for (let i = 0; i < n; i += 1) {
    x = (x * 1664525 + 1013904223) % 4294967296; // LCG
    arr.push(x / 4294967296);
  }
  return arr;
}

export default function WidgetA() {
  // giả lập “widget nặng”
  const data = React.useMemo(() => randomSeries(2000), []);

  const avg = React.useMemo(() => data.reduce((s, v) => s + v, 0) / data.length, [data]);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-semibold">Widget A (lazy)</div>
      <div className="mt-1 text-xs text-white/60">Heavy compute on mount</div>

      <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/30 p-3">
        <div className="text-xs text-white/60">Average</div>
        <div className="mt-1 text-2xl font-semibold">{avg.toFixed(4)}</div>
      </div>

      <div className="mt-3 text-xs text-white/60">
        Data points: <b>{data.length.toLocaleString()}</b>
      </div>
    </div>
  );
}