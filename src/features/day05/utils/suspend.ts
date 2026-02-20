import { sleep } from "./sleep";

type Entry = {
  promise: Promise<void>;
  done: boolean;
};

const cache = new Map<string, Entry>();

export function suspend(key: string, ms: number) {
  let entry = cache.get(key);

  if (!entry) {
    const e: Entry = {
      done: false,
      promise: sleep(ms).then(() => {
        e.done = true;
      }),
    };
    cache.set(key, e);
    entry = e;
  }

  // ✅ Nếu đã resolve thì cho render tiếp
  if (entry.done) return;

  // ❌ Chỉ throw khi còn pending
  throw entry.promise;
}

export function clearSuspend(keyPrefix: string) {
  for (const k of cache.keys()) {
    if (k.startsWith(keyPrefix)) cache.delete(k);
  }
}