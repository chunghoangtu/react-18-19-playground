import * as React from "react";

type FieldProps = {
  label: string;
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  helperText?: string;
  error?: string;
};

export function Field({ label, value, onChange, placeholder, helperText, error }: FieldProps) {
  const id = React.useId();
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [helperText ? helpId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs font-semibold text-white/70">
        {label}
      </label>

      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={[
          "w-full rounded-lg border bg-slate-950/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40",
          error ? "border-rose-400/40 focus:border-rose-300/60" : "border-white/10 focus:border-white/20",
        ].join(" ")}
      />

      {helperText ? (
        <div id={helpId} className="text-xs text-white/50">
          {helperText}
        </div>
      ) : null}

      {error ? (
        <div id={errorId} className="text-xs text-rose-200">
          {error}
        </div>
      ) : null}
    </div>
  );
}
