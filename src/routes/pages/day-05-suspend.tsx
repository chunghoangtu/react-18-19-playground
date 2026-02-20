import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "../../features/day05/components/Skeleton";
import { sleep } from "../../features/day05/utils/sleep";

const DashboardLazy = React.lazy(async () => {
  await sleep(1200); // fake delay để thấy rõ route-level fallback
  return import("../../features/day05/components/Dashboard").then((m) => ({
    default: m.Dashboard,
  }));
});

export const Route = createFileRoute("/pages/day-05-suspend")({
  component: () => (
    <div className="space-y-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Day 05 — Route-level Suspense</h1>
          <p className="mt-1 text-sm text-white/70">
            Lazy load cả page (so sánh với widget-level ở /day-05).
          </p>
        </div>

        <a
          href="/day-05"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Go to widget-level →
        </a>
      </div>

      <React.Suspense
        fallback={
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-sm font-semibold">Loading whole page…</div>
            <div className="mt-3">
              <Skeleton lines={12} />
            </div>
          </div>
        }
      >
        <DashboardLazy />
      </React.Suspense>
    </div>
  ),
});