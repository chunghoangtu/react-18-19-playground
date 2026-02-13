import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-06")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 06 — Actions & Forms</h1>
        <p className="mt-1 text-sm text-white/70">
          Server actions and form handling in React 19.
        </p>
      </div>
    </div>
  ),
});
