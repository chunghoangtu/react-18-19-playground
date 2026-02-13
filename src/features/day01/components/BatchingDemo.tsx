/* eslint-disable react-hooks/refs */
import * as React from "react";

type LogItem = { id: string; text: string };

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function BatchingDemo() {
  const [a, setA] = React.useState(0);
  const [b, setB] = React.useState(0);
  const [logs, setLogs] = React.useState<LogItem[]>([]);

  const renderRef = React.useRef(0);
  renderRef.current += 1;

  const pushLog = React.useCallback((text: string) => {
    setLogs((prev) => [{ id: uid(), text }, ...prev].slice(0, 8));
  }, []);

  const reset = () => {
    setA(0);
    setB(0);
    setLogs([]);
    pushLog("Reset state");
  };

  const syncUpdate = () => {
    // 2 setState trong cùng event handler => batching
    setA((x) => x + 1);
    setB((x) => x + 1);
    pushLog("SYNC: setA + setB (same click)");
  };

  const microtaskUpdate = () => {
    // promise.then => vẫn batching trong React 18
    Promise.resolve().then(() => {
      setA((x) => x + 1);
      setB((x) => x + 1);
      pushLog("MICROTASK: Promise.then setA + setB");
    });
  };

  const timeoutUpdate = () => {
    // setTimeout => cũng batching trong React 18 (automatic batching)
    setTimeout(() => {
      setA((x) => x + 1);
      setB((x) => x + 1);
      pushLog("TIMEOUT: setTimeout setA + setB");
    }, 0);
  };

  React.useEffect(() => {
    // mỗi render log 1 dòng (nhìn render count tăng)
    // NOTE: StrictMode dev có thể làm effect chạy lại, coi StrictModeNote.
    // eslint-disable-next-line no-console
    console.log(`[BatchingDemo] render #${renderRef.current}`, { a, b });
  });

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Automatic batching demo</div>
          <div className="text-sm text-white/70">
            Observe renders in console. React 18 batches updates across async boundaries.
          </div>
        </div>

        <button
          onClick={reset}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Reset
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-sm text-white/70">State A</div>
          <div className="mt-1 text-2xl font-semibold">{a}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-sm text-white/70">State B</div>
          <div className="mt-1 text-2xl font-semibold">{b}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900/40 p-3">
          <div className="text-sm text-white/70">Render count (local)</div>
          <div className="mt-1 text-2xl font-semibold">{renderRef.current}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={syncUpdate}
          className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          Sync update
        </button>
        <button
          onClick={microtaskUpdate}
          className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          Promise.then update
        </button>
        <button
          onClick={timeoutUpdate}
          className="rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          setTimeout update
        </button>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold">Recent logs</div>
        <ul className="mt-2 space-y-1 text-sm text-white/80">
          {logs.length === 0 ? (
            <li className="text-white/60">No logs yet.</li>
          ) : (
            logs.map((l) => (
              <li key={l.id} className="rounded-lg border border-white/10 bg-slate-900/30 px-3 py-2">
                {l.text}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
