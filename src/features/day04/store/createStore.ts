export type Unsubscribe = () => void;
export type Listener = () => void;

export type StoreApi<T> = {
  getSnapshot: () => T;
  setState: (updater: T | ((prev: T) => T)) => void;
  subscribe: (listener: Listener) => Unsubscribe;
};

export function createStore<T>(initial: T): StoreApi<T> {
  let state = initial;
  const listeners = new Set<Listener>();

  const getSnapshot = () => state;

  const setState: StoreApi<T>["setState"] = (updater) => {
    const next = typeof updater === "function" ? (updater as (p: T) => T)(state) : updater;
    if (Object.is(next, state)) return;
    state = next;
    listeners.forEach((l) => l());
  };

  const subscribe: StoreApi<T>["subscribe"] = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  return { getSnapshot, setState, subscribe };
}
