import * as React from "react";
import { SubmitButton } from "./SubmitButton";
import type { Todo } from "../utils/fakeApi";

// type Props = {
//   onOptimisticAdd: (todo: Todo) => void;
//   formAction: (formData: FormData) => void;
// };

type OptimisticAction =
  | { type: "add"; todo: Todo }
  | { type: "remove"; id: string };

type Props = {
  dispatchOptimistic: (action: OptimisticAction) => void;
  formAction: (formData: FormData) => void;
};

// function tempTodo(text: string): Todo {
//   return {
//     id: `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`,
//     text: text.trim() || "(empty)",
//     createdAt: Date.now(),
//   };
// }

function makeTempTodo(text: string) {
  const id = `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const todo: Todo = {
    id,
    text: text.trim() || "(empty)",
    createdAt: Date.now(),
  };
  return { id, todo };
}

// export function TodoForm({ onOptimisticAdd, formAction }: Props) {
export function TodoForm({ dispatchOptimistic, formAction }: Props) {
  const formRef = React.useRef<HTMLFormElement | null>(null);

  return (
    <form
      ref={formRef}
      // action={async (formData) => {
      //   const text = String(formData.get("text") ?? "");

      //   // optimistic: add immediately
      //   onOptimisticAdd(tempTodo(text));

      //   // run the actual action (useActionState action wrapper)
      //   formAction(formData);

      //   // reset input UI right away
      //   formRef.current?.reset();
      // }}
      action={(formData) => {
        const text = String(formData.get("text") ?? "");
        const { id: tempId, todo } = makeTempTodo(text);

        formData.set("tempId", tempId); // ✅ gửi tempId cho action

        dispatchOptimistic({ type: "add", todo }); // ✅ optimistic add
        formAction(formData);

        formRef.current?.reset();
      }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4"
    >
      <div className="text-sm font-semibold">Add todo (React 19 Action)</div>
      <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-center">
        <input
          name="text"
          placeholder='Try: "Learn useActionState"'
          className="w-full rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/20"
        />
        <SubmitButton />
      </div>

      <div className="mt-2 text-xs text-white/60">
        Submit sẽ optimistic add ngay, pending state lấy từ{" "}
        <code>useFormStatus()</code>.
      </div>
    </form>
  );
}
