type SearchBoxProps = {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
};

export function SearchBox({ value, onChange, placeholder }: SearchBoxProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/30 p-3">
      <label className="text-xs font-semibold text-white/70">Search</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Type to filter…"}
        className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/20"
      />
      <div className="mt-2 text-xs text-white/50">
        Tip: gõ nhanh để cảm nhận sự khác biệt khi list update trong transition.
      </div>
    </div>
  );
}
