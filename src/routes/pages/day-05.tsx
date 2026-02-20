import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "../../features/day05/components/Dashboard";

export const Route = createFileRoute("/pages/day-05")({
  component: () => (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">Day 05 — Suspense + Code Splitting</h1>
        <p className="mt-1 text-sm text-white/70">
          React.lazy + Suspense boundaries theo vùng.
        </p>
      </div>

      <Dashboard />
    </div>
  ),
});