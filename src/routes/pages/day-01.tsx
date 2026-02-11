import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/pages/day-01")({
  component: () => (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Day 01 — Foundation</h1>
      <p className="text-white/80">Stub page. Day 1 sẽ code ở đây.</p>
    </div>
  ),
});
