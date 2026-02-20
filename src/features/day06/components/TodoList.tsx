import type { Todo } from "../utils/fakeApi";

type Props = {
  todos: Todo[];
  title?: string;
};

export function TodoList({ todos, title = "Todos" }: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-white/60">{todos.length} items</div>
      </div>

      <div className="p-3">
        {todos.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-3 text-sm text-white/70">
            No items yet.
          </div>
        ) : (
          <ul className="space-y-2">
            {todos.map((t) => (
              <li
                key={t.id}
                className="rounded-xl border border-white/10 bg-slate-900/30 px-3 py-2"
              >
                <div className="text-sm font-medium">{t.text}</div>
                <div className="mt-1 text-xs text-white/50">
                  {new Date(t.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
