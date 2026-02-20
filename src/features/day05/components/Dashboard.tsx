import * as React from "react";
import { Skeleton } from "./Skeleton";
import { WidgetB } from "./WidgetB";
import { sleep } from "../utils/sleep";
import { WidgetGate } from "./WidgetGate";
import { clearSuspend } from "../utils/suspend";
// Vite code splitting + fake delay để nhìn rõ fallback
const WidgetA = React.lazy(async () => {
  await sleep(900);
  return import("./WidgetA.lazy");
});

const WidgetC = React.lazy(async () => {
  await sleep(1400);
  return import("./WidgetC.lazy");
});

function WidgetShell(props: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/20 p-3">
      <div className="text-xs font-semibold text-white/70">{props.title}</div>
      <div className="mt-2">{props.children}</div>
    </div>
  );
}

export function Dashboard() {
  const [reloadKey, setReloadKey] = React.useState(0);
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-lg font-semibold">Suspense + Code Splitting</div>
        <p className="mt-1 text-sm text-white/70">
          Mỗi widget có Suspense boundary riêng → widget nào load chậm thì chỉ
          widget đó fallback.
        </p>
        <button
          onClick={() => {
            const next = reloadKey + 1;
            // clear gate cache cho key prefix để chắc chắn suspend lại
            clearSuspend("widget-gate:");
            setReloadKey(next);
          }}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Reload widgets A
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-6 space-y-4">
          <WidgetShell title="A boundary">
            <React.Suspense fallback={<Skeleton lines={8} />}>
              <WidgetGate gateKey={`A-${reloadKey}`} delayMs={900}>
                <WidgetA key={reloadKey} />
              </WidgetGate>
            </React.Suspense>
          </WidgetShell>

          <WidgetShell title="B (no boundary needed)">
            <WidgetB />
          </WidgetShell>
        </div>

        <div className="lg:col-span-6">
          <WidgetShell title="C boundary">
            <React.Suspense fallback={<Skeleton lines={10} />}>
              <WidgetC />
            </React.Suspense>
          </WidgetShell>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="font-semibold text-white/80">Key takeaways</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>React.lazy</b> tách code theo chunk (Vite tự split).
          </li>
          <li>
            <b>Suspense</b> hiển thị fallback cho phần chưa sẵn sàng.
          </li>
          <li>Đặt boundary nhỏ giúp UX tốt hơn (không block toàn trang).</li>
        </ul>
      </div>
    </div>
  );
}
