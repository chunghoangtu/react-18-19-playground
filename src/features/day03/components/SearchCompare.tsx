import * as React from "react";
import { Field } from "./Field";
import { ModeToggle, type Mode } from "./ModeToggle";
import { generateWords } from "../data/generateWords";

const ALL = generateWords(1000_000);

function heavyFilter(
  list: string[],
  q: string,
  prefixOnly: boolean,
  minLen: number,
) {
  const query = q.trim().toLowerCase();

  return list.filter((w) => {
    if (w.length < minLen) return false;

    if (!query) return true;

    const lw = w.toLowerCase();
    const hit = prefixOnly ? lw.startsWith(query) : lw.includes(query);

    for (let i = 0; i < 10; i += 1) Math.sqrt(i * 999);
    return hit;
  });
}

export function SearchCompare() {
  const [mode, setMode] = React.useState<Mode>("transition");

  // Urgent input state (luôn cập nhật ngay)
  const [query, setQuery] = React.useState("");

  // Transition mode: có separate state cho “list query”
  const [listQuery, setListQuery] = React.useState("");

  const [isPending, startTransition] = React.useTransition();

  const [prefixOnly, setPrefixOnly] = React.useState(false);

  const [minLen, setMinLen] = React.useState("0");

  // Deferred mode: defer query để render list
  const deferredQuery = React.useDeferredValue(query);

  const effectiveQuery = mode === "transition" ? listQuery : deferredQuery;

  const minLenNumber = React.useMemo(() => {
    const n = Number(minLen);
    if (Number.isNaN(n)) return 0;
    return Math.max(0, Math.floor(n));
  }, [minLen]);

  const results = React.useMemo(
    () => heavyFilter(ALL, effectiveQuery, prefixOnly, minLenNumber),
    [effectiveQuery, prefixOnly, minLenNumber],
  );

  const onChange = (next: string) => {
    setQuery(next);

    if (mode === "transition") {
      startTransition(() => {
        setListQuery(next);
      });
    }
    // mode deferred: không cần làm gì thêm, list sẽ dùng deferredQuery
  };

  // Khi đổi mode, sync listQuery để tránh “lệch”
  React.useEffect(() => {
    if (mode === "transition") setListQuery(query);
  }, [mode, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">
            Search: Transition vs Deferred
          </div>
          <div className="text-sm text-white/70">
            Transition: tách state cho list. Deferred: list dùng deferred value.
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle mode={mode} onChange={setMode} />
          <span
            className={[
              "rounded-full border px-3 py-1 text-xs",
              mode === "transition"
                ? isPending
                  ? "border-amber-300/20 bg-amber-300/10 text-amber-200"
                  : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
                : "border-white/10 bg-white/5 text-white/70",
            ].join(" ")}
          >
            {mode === "transition"
              ? isPending
                ? "Pending…"
                : "Idle"
              : "Deferred mode"}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Field
            label="Query"
            value={query}
            onChange={onChange}
            placeholder='Try: "alpha", "magic", "hogwarts-00010"...'
            helperText={
              mode === "transition"
                ? "List updates in startTransition(). Input stays urgent."
                : "List uses useDeferredValue(query). Input stays urgent."
            }
          />

          <Field
            label="Min length"
            value={minLen}
            onChange={setMinLen}
            placeholder="0"
            helperText="Chỉ giữ lại word có độ dài >= min length."
            error={
              minLen.trim() !== "" && Number.isNaN(Number(minLen))
                ? "Please enter a valid number"
                : undefined
            }
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={prefixOnly}
              onChange={(e) => setPrefixOnly(e.target.checked)}
              className="h-4 w-4 accent-white"
            />
            Show only prefix match (startsWith)
          </label>

          <span className="text-xs text-white/50">
            Prefix match thường “ít kết quả hơn”, dễ cảm nhận khác biệt deferred
            vs transition.
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
            <div className="text-xs text-white/60">Urgent query</div>
            <div className="mt-1 font-mono text-sm">{query || "—"}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
            <div className="text-xs text-white/60">Used for list</div>
            <div className="mt-1 font-mono text-sm">
              {effectiveQuery || "—"}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
            <div className="text-xs text-white/60">Results count</div>
            <div className="mt-1 text-lg font-semibold">
              {results.length.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        {/* overlay nhẹ nếu transition pending */}
        {mode === "transition" && isPending ? (
          <div className="pointer-events-none absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]">
            <div className="p-4">
              <div className="h-3 w-40 rounded bg-white/10" />
              <div className="mt-3 space-y-2">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="h-8 rounded bg-white/10" />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="text-sm font-semibold">Preview (top 200)</div>
          <div className="text-xs text-white/60">
            {ALL.length.toLocaleString()} total
          </div>
        </div>

        <div className="max-h-[520px] overflow-auto p-3">
          <ul className="space-y-2">
            {results.slice(0, 200).map((w) => (
              <li
                key={w}
                className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2 text-sm"
              >
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
        <div className="font-semibold text-white/80">Gợi ý dùng khi nào?</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>useTransition</b>: bạn muốn điều khiển pending UI, hoặc tách
            “list state” rõ ràng.
          </li>
          <li>
            <b>useDeferredValue</b>: bạn chỉ cần “list theo sau input”, code
            gọn, ít state hơn.
          </li>
        </ul>
      </div>
    </div>
  );
}
