import * as React from "react";
import { onlineStore } from "../store/onlineStore";
import type { OnlineState } from "../store/onlineStore";

export function useOnline(): OnlineState {
  return React.useSyncExternalStore(onlineStore.subscribe, onlineStore.getSnapshot);
}
