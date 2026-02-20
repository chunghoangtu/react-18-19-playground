export type Todo = {
  id: string;
  text: string;
  createdAt: number;
};

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// ✅ giả lập DB unique constraint
const existingTexts = new Set<string>();

function normalize(text: string) {
  return text.trim().toLowerCase();
}

export async function apiCreateTodo(input: { text: string }): Promise<Todo> {
  // fake network
  await new Promise((r) => setTimeout(r, 700));

  const raw = input.text;
  const text = raw.trim();

  // fake validation errors
  if (!text) {
    throw new Error("Todo text is required.");
  }
  if (text.length < 3) {
    throw new Error("Todo must be at least 3 characters.");
  }

  const key = normalize(text);
  if (existingTexts.has(key)) {
    throw new Error("Duplicate todo is not allowed (case-insensitive).");
  }
  
  // fake random error
  if (Math.random() < 0.15) {
    throw new Error("Random server error. Try again.");
  }

  // ✅ commit vào “DB”
  existingTexts.add(key);

  return {
    id: uid(),
    text,
    createdAt: Date.now(),
  };
}

// ✅ optional: seed DB từ todos ban đầu
export function apiSeedTodos(todos: Todo[]) {
  for (const t of todos) existingTexts.add(normalize(t.text));
}