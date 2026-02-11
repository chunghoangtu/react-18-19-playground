import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="text-white/80">Dùng sidebar để chuyển qua Day 01–Day 07.</p>
    </div>
  ),
});
