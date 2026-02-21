export type SearchMode = "deferred" | "transition";

export function ModeToggle(props: Readonly<{
  mode: SearchMode;
  onChange: (m: SearchMode) => void;
  pending?: boolean;
}>) {
  const { mode, onChange, pending } = props;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
        <button
          onClick={() => onChange("deferred")}
          className={[
            "rounded-md px-3 py-1.5",
            mode === "deferred" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
          ].join(" ")}
        >
          Deferred
        </button>
        <button
          onClick={() => onChange("transition")}
          className={[
            "rounded-md px-3 py-1.5",
            mode === "transition" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
          ].join(" ")}
        >
          Transition
        </button>
      </div>

      <span
        className={[
          "rounded-full border px-3 py-1 text-xs",
          mode === "transition"
            ? pending
              ? "border-amber-300/20 bg-amber-300/10 text-amber-200"
              : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
            : "border-white/10 bg-white/5 text-white/70",
        ].join(" ")}
      >
        {mode === "transition" ? (pending ? "Pending…" : "Idle") : "Deferred mode"}
      </span>
    </div>
  );
}