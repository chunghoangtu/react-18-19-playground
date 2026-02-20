import { createFileRoute } from "@tanstack/react-router";
import { TodoApp } from "../../features/day06/components/TodoApp";

export const Route = createFileRoute("/pages/day-06")({
  component: () => (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">
          Day 06 — React 19 Actions & Forms
        </h1>
        <p className="mt-1 text-sm text-white/70">
          useActionState + useFormStatus + useOptimistic (client-side demo).
        </p>
      </div>

      <TodoApp />
    </div>
  ),
});
