import { createFileRoute } from "@tanstack/react-router";
import { SearchCompare } from "../../features/day03/components/SearchCompare";

export const Route = createFileRoute("/pages/day-03")({
  component: () => (
    <div className="space-y-3">
      <div>
        <h1 className="text-2xl font-semibold">Day 03 — useDeferredValue + useId</h1>
        <p className="mt-1 text-sm text-white/70">
          So sánh useTransition vs useDeferredValue, và tạo Field component chuẩn a11y với useId.
        </p>
      </div>

      <SearchCompare />
    </div>
  ),
});
