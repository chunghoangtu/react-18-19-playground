import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-04")({
  component: () => (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Day 04 — External Store</h1>
        <p className="mt-1 text-sm text-white/70">
          useSyncExternalStore for external state synchronization.
        </p>
      </div>
    </div>
  ),
});
