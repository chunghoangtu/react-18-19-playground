import * as React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  ref?: React.Ref<HTMLInputElement> | undefined;
};

export function TextInput({ label, ref, className, ...rest }: Props) {
  // ✅ React 19: ref is a regular prop (no forwardRef needed in many cases)
  return (
    <div className="space-y-1">
      {label ? (
        <div className="text-xs font-semibold text-white/70">{label}</div>
      ) : null}
      <input
        ref={ref}
        className={[
          "w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/20",
          className ?? "",
        ].join(" ")}
        {...rest}
      />
    </div>
  );
}
