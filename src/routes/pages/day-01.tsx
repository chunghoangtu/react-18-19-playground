import { createFileRoute } from "@tanstack/react-router";
import { RenderCounter } from "../../features/day01/components/RenderCounter";
import { BatchingDemo } from "../../features/day01/components/BatchingDemo";
import { StrictModeNote } from "../../features/day01/components/StrictModeNote";

export const Route = createFileRoute("/pages/day-01")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 01 — React 18 Foundation</h1>
        <p className="mt-1 text-sm text-white/70">
          createRoot, automatic batching, và hiểu đúng StrictMode dev behavior.
        </p>
      </div>

      <StrictModeNote />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <RenderCounter />
        <RenderCounter label="Render count (another instance)" />
      </div>

      <BatchingDemo />
    </div>
  ),
});
