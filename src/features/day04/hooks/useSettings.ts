import * as React from "react";
import { settingsStore } from "../store/settingsStore";
import type { SettingsState } from "../store/settingsStore";

export function useSettings(): SettingsState {
  return React.useSyncExternalStore(settingsStore.subscribe, settingsStore.getSnapshot);
}
