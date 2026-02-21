import * as React from "react";
import { useActionState, useOptimistic } from "react";
import type { Todo } from "../utils/fakeApi";
import { apiSeedTodos } from "../utils/fakeApi";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";
import { addTodoAction, initialAddTodoState } from "../actions/todoActions";

const initialTodos: Todo[] = [
  {
    id: "seed-1",
    text: "Day 6: Actions & Forms",
    createdAt: Date.now() - 60_000,
  },
  { id: "seed-2", text: "Try optimistic UI", createdAt: Date.now() - 30_000 },
];

export function TodoApp() {
  const [todos, setTodos] = React.useState<Todo[]>(initialTodos);

  // 1) React 19: useActionState binds state to an action
  const [addState, formAction] = useActionState(
    addTodoAction,
    initialAddTodoState,
  );

  // 2) Optimistic UI: maintain an optimistic view of todos
  // const [optimisticTodos, addOptimistic] = useOptimistic(
  //   todos,
  //   (current: Todo[], optimisticTodo: Todo) => [optimisticTodo, ...current],
  // );

  // EX 1
  type OptimisticAction =
    | { type: "add"; todo: Todo }
    | { type: "remove"; id: string }
    | { type: "replace"; tempId: string; real: Todo };

  const [optimisticTodos, dispatchOptimistic] = useOptimistic(
    todos,
    (current: Todo[], action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [action.todo, ...current];

        case "remove":
          return current.filter((t) => t.id !== action.id);

        case "replace":
          return current.map((t) => (t.id === action.tempId ? action.real : t));

        default:
          return current;
      }
    },
  );

  // // When server action returns success, commit real todo into base state
  // React.useEffect(() => {
  //   if (addState.ok && addState.lastAdded) {
  //     setTodos((prev) => [addState.lastAdded!, ...prev]);
  //   }
  //   // If failed: we don't auto-remove the temp item here (simple demo).
  //   // In real apps you might reconcile/rollback by tracking temp ids.
  // }, [addState.ok, addState.lastAdded]);

  // Ex 1
  React.useEffect(() => {
    if (!addState.tempId) return;

    if (addState.ok && addState.lastAdded) {
      // ✅ commit base state (source of truth)
      setTodos((prev) => [addState.lastAdded!, ...prev]);

      // ✅ replace temp in optimistic view (no flicker)
      dispatchOptimistic({
        type: "replace",
        tempId: addState.tempId,
        real: addState.lastAdded,
      });
    }

    if (!addState.ok) {
      // ✅ rollback
      dispatchOptimistic({ type: "remove", id: addState.tempId });
    }
  }, [addState.ok, addState.lastAdded, addState.tempId, dispatchOptimistic]);

  React.useEffect(() => {
    apiSeedTodos(initialTodos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      {/* <TodoForm
        onOptimisticAdd={(t) => addOptimistic(t)}
        formAction={(fd) => formAction(fd)}
      /> */}
      <TodoForm
        dispatchOptimistic={dispatchOptimistic}
        formAction={(fd) => formAction(fd)}
      />

      {/* Error / status from useActionState */}
      {!addState.ok ? (
        <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
          {addState.message}
          <div className="mt-1 text-xs text-rose-100/80">
            (Demo: optimistic item không rollback. Day 6 bài tập sẽ làm
            rollback.)
          </div>
        </div>
      ) : null}

      <TodoList todos={optimisticTodos} title="Todos (optimistic view)" />

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
        <div className="font-semibold text-white/80">What you just used</div>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>
            <b>&lt;form action&gt;</b>: submit chạy action function
          </li>
          <li>
            <b>useFormStatus</b>: pending/disable button
          </li>
          <li>
            <b>useActionState</b>: nhận ok/error + result từ action
          </li>
          <li>
            <b>useOptimistic</b>: update UI ngay khi submit
          </li>
        </ul>
      </div>
    </div>
  );
}
