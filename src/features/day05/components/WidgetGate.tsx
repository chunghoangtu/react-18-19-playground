import * as React from "react";
import { suspend } from "../utils/suspend";

type Props = {
  gateKey: string;   // thay đổi => suspend lại
  delayMs: number;
  children: React.ReactNode;
};

export function WidgetGate({ gateKey, delayMs, children }: Props) {
  // Khi gateKey thay đổi, component render sẽ "throw promise" -> Suspense fallback
  suspend(`widget-gate:${gateKey}`, delayMs);
  return <>{children}</>;
}
