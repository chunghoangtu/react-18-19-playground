import type { Todo } from "../utils/fakeApi";
import { apiCreateTodo } from "../utils/fakeApi";

export type AddTodoState = {
  ok: boolean;
  message?: string;
  lastAdded?: Todo;
  tempId?: string; // ✅ để rollback/commit đúng item
};

export const initialAddTodoState: AddTodoState = {
  ok: true,
  message: undefined,
  lastAdded: undefined,
  tempId: undefined,
};

// React 19 action signature: (prevState, formData) => nextState (can be async)
export async function addTodoAction(
  _prev: AddTodoState,
  formData: FormData,
): Promise<AddTodoState> {
  const tempId = String(formData.get("tempId") ?? "");

  try {
    const text = String(formData.get("text") ?? "");
    const todo = await apiCreateTodo({ text });

    return {
      ok: true,
      message: undefined,
      lastAdded: todo,
      tempId,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return {
      ok: false,
      message,
      lastAdded: undefined,
      tempId,
    };
  }
}