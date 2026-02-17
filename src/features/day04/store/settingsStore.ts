// import { createStore } from "./createStore";

// export type Theme = "dark" | "light";

// export type SettingsState = {
//   theme: Theme;
//   compact: boolean;
//   fontScale: 0.9 | 1 | 1.1;
// };

// const initial: SettingsState = {
//   theme: "dark",
//   compact: false,
//   fontScale: 1,
// };

// export const settingsStore = createStore<SettingsState>(initial);

// export const settingsActions = {
//   toggleTheme() {
//     settingsStore.setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));
//   },
//   toggleCompact() {
//     settingsStore.setState((s) => ({ ...s, compact: !s.compact }));
//   },
//   setFontScale(fontScale: SettingsState["fontScale"]) {
//     settingsStore.setState((s) => ({ ...s, fontScale }));
//   },
//   reset() {
//     settingsStore.setState(initial);
//   },
// };

import { createStore } from "./createStore";

export type Theme = "dark" | "light";

export type SettingsState = {
  theme: Theme;
  compact: boolean;
  fontScale: 0.9 | 1 | 1.1;
};

const STORAGE_KEY = "series.settings.v1";

const initial: SettingsState = {
  theme: "dark",
  compact: false,
  fontScale: 1,
};

function isSettingsState(x: unknown): x is SettingsState {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;

  const themeOk = o.theme === "dark" || o.theme === "light";
  const compactOk = typeof o.compact === "boolean";
  const fontOk = o.fontScale === 0.9 || o.fontScale === 1 || o.fontScale === 1.1;

  return themeOk && compactOk && fontOk;
}

function loadFromStorage(): SettingsState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initial;

    const parsed = JSON.parse(raw) as unknown;
    if (!isSettingsState(parsed)) return initial;

    return parsed;
  } catch {
    return initial;
  }
}

function saveToStorage(state: SettingsState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

// hydrate ngay lúc tạo store
const hydrated = typeof window !== "undefined" ? loadFromStorage() : initial;

export const settingsStore = createStore<SettingsState>(hydrated);

export const settingsActions = {
  toggleTheme() {
    settingsStore.setState((s) => {
      const next = { ...s, theme: (s.theme === "dark" ? "light" : "dark") as Theme };
      saveToStorage(next);
      return next;
    });
  },
  toggleCompact() {
    settingsStore.setState((s) => {
      const next = { ...s, compact: !s.compact };
      saveToStorage(next);
      return next;
    });
  },
  setFontScale(fontScale: SettingsState["fontScale"]) {
    settingsStore.setState((s) => {
      const next = { ...s, fontScale };
      saveToStorage(next);
      return next;
    });
  },
  reset() {
    settingsStore.setState(() => {
      saveToStorage(initial);
      return initial;
    });
  },
};
