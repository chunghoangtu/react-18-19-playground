import { settingsActions } from "../store/settingsStore";
import { useSettings } from "../hooks/useSettings";
import type { SettingsState } from "../store/settingsStore";

const fontOptions: SettingsState["fontScale"][] = [0.9, 1, 1.1];

export function SettingsPanel() {
  const s = useSettings();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">External Store Settings</div>
          <div className="text-sm text-white/70">
            Dùng useSyncExternalStore để subscribe store ngoài React.
          </div>
        </div>

        <button
          onClick={settingsActions.reset}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm hover:bg-white/5"
        >
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          onClick={settingsActions.toggleTheme}
          className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-3 text-left hover:bg-white/5"
        >
          <div className="text-xs text-white/60">Theme</div>
          <div className="mt-1 text-sm font-semibold">{s.theme}</div>
        </button>

        <button
          onClick={settingsActions.toggleCompact}
          className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-3 text-left hover:bg-white/5"
        >
          <div className="text-xs text-white/60">Compact</div>
          <div className="mt-1 text-sm font-semibold">{s.compact ? "On" : "Off"}</div>
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/20 p-3">
        <div className="text-xs font-semibold text-white/70">Font scale</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {fontOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => settingsActions.setFontScale(opt)}
              className={[
                "rounded-lg border px-3 py-2 text-sm",
                s.fontScale === opt
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
