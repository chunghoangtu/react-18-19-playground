import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-03")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 03 — Deferred & useId</h1>
        <p className="mt-1 text-sm text-white/70">
          useDeferredValue for deferred rendering and useId for unique identifiers.
        </p>
      </div>
    </div>
  ),
});
