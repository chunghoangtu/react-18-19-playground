export function InsertionEffectNote() {
  return (
    <div className="rounded-2xl border border-white/10 bg-amber-400/10 p-4">
      <div className="text-sm font-semibold text-amber-200">useInsertionEffect (FYI)</div>
      <p className="mt-2 text-sm text-white/80">
        Hook này chủ yếu dành cho thư viện CSS-in-JS để “chèn style” trước khi layout/effect chạy.
        App bình thường (Tailwind) gần như không cần dùng. Biết để nhận diện khi đọc code lib thôi.
      </p>
    </div>
  );
}
