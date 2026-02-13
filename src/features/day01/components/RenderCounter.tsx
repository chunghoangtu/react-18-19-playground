import * as React from "react";
import { useRenderCount } from "../hooks/useRenderCount";

type RenderCounterProps = {
  label?: string;
};

export function RenderCounter({ label = "Render count" }: RenderCounterProps) {
  const renders = useRenderCount();

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm text-white/70">{label}</div>
      <div className="mt-1 text-3xl font-semibold">{renders}</div>
      <div className="mt-2 text-xs text-white/60">
        Tip: mở React DevTools Profiler hoặc console để quan sát.
      </div>
    </div>
  );
}
