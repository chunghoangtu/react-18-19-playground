import { useSettings } from "../hooks/useSettings";

export function PreviewCard() {
  const s = useSettings();

  const bg =
    s.theme === "dark"
      ? "bg-slate-950/40 border-white/10 text-white"
      : "bg-white/70 border-black/10 text-slate-900";

  const padding = s.compact ? "p-3" : "p-6";
  const scale = s.fontScale;

  return (
    <div className={`rounded-2xl border ${bg} ${padding}`}>
      <div style={{ fontSize: `${scale}rem` }}>
        <div className="text-sm opacity-70">Preview</div>
        <div className="mt-1 text-xl font-semibold">Settings applied from external store</div>
        <p className="mt-2 text-sm opacity-80">
          Theme: <b>{s.theme}</b> · Compact: <b>{String(s.compact)}</b> · FontScale: <b>{s.fontScale}</b>
        </p>
      </div>
    </div>
  );
}
