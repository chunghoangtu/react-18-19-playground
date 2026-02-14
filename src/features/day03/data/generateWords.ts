export function generateWords(count: number): string[] {
  const base = ["arcane", "alpha", "beta", "gamma", "delta", "magic", "merlin", "phoenix", "lux", "hogwarts"];
  const words: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const b = base[i % base.length];
    words.push(`${b}-${(i + 1).toString().padStart(5, "0")}`);
  }
  return words;
}
