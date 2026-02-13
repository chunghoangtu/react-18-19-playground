import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-05")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 05 — Suspense</h1>
        <p className="mt-1 text-sm text-white/70">
          Suspense for data fetching and code splitting.
        </p>
      </div>
    </div>
  ),
});
