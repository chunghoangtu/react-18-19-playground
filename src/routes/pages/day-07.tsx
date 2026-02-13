import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-07")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 07 — React 19 & MiniApp</h1>
        <p className="mt-1 text-sm text-white/70">
          React 19 features and building a mini application.
        </p>
      </div>
    </div>
  ),
});
