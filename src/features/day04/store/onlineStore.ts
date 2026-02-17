import { createStore } from "./createStore";

export type OnlineState = {
  online: boolean;
};

export const onlineStore = createStore<OnlineState>({
  online: typeof navigator !== "undefined" ? navigator.onLine : true,
});

export function startOnlineListener() {
  const update = () => onlineStore.setState({ online: navigator.onLine });

  window.addEventListener("online", update);
  window.addEventListener("offline", update);

  // sync ngay lúc start
  update();

  return () => {
    window.removeEventListener("online", update);
    window.removeEventListener("offline", update);
  };
}
