import * as React from "react";
import { startOnlineListener } from "../../features/day04/store/onlineStore";

import { createFileRoute } from "@tanstack/react-router";
import { SettingsPanel } from "../../features/day04/components/SettingsPanel";
import { PreviewCard } from "../../features/day04/components/PreviewCard";
import { InsertionEffectNote } from "../../features/day04/components/InsertionEffectNote";
import { OnlineBadge } from "../../features/day04/components/OnlineBadge";

const Day04Route = () => {
  React.useEffect(() => startOnlineListener(), []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">
          Day 04 — useSyncExternalStore
        </h1>
        <p className="mt-1 text-sm text-white/70">
          Tự viết external store và subscribe bằng useSyncExternalStore (chuẩn
          React 18+).
        </p>
      </div>
      <OnlineBadge />

      <InsertionEffectNote />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SettingsPanel />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <PreviewCard />
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            <div className="font-semibold text-white/80">Key idea</div>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>External store không nằm trong React state.</li>
              <li>
                useSyncExternalStore giúp React đọc snapshot + subscribe an toàn
                cho concurrent.
              </li>
              <li>Pattern này là nền tảng của nhiều state libs.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/pages/day-04")({
  component: Day04Route,
});
