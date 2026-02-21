import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "../../features/day07/components/AppShell";

export const Route = createFileRoute("/pages/day-07")({
  component: () => (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Day 07 — React 19 Wrap-up</h1>
      <AppShell />
    </div>
  ),
});
