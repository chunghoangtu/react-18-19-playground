import * as React from "react"

export function StrictModeNote() {
  return (
    <div className="rounded-2xl border border-white/10 bg-amber-400/10 p-4">
      <div className="text-sm font-semibold text-amber-200">Note about StrictMode (dev only)</div>
      <p className="mt-2 text-sm text-white/80">
        Nếu bạn thấy component/effect/log bị chạy “2 lần” khi dev: đó là behavior của
        React StrictMode để giúp bạn phát hiện side-effects không an toàn. Build production
        sẽ không double như vậy.
      </p>
    </div>
  );
}
