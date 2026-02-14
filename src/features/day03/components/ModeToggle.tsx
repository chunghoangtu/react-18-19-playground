type Mode = "transition" | "deferred";

type Props = {
  mode: Mode;
  onChange: (m: Mode) => void;
};

export function ModeToggle({ mode, onChange }: Props) {
  return (
    <div className="inline-flex rounded-lg border border-white/10 bg-white/5 p-1 text-sm">
      <button
        onClick={() => onChange("transition")}
        className={[
          "rounded-md px-3 py-1.5",
          mode === "transition" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
        ].join(" ")}
      >
        useTransition
      </button>
      <button
        onClick={() => onChange("deferred")}
        className={[
          "rounded-md px-3 py-1.5",
          mode === "deferred" ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
        ].join(" ")}
      >
        useDeferredValue
      </button>
    </div>
  );
}

export type { Mode };
