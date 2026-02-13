import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-02")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 02 — Transitions</h1>
        <p className="mt-1 text-sm text-white/70">
          useTransition and startTransition for non-urgent updates.
        </p>
      </div>
    </div>
  ),
});
