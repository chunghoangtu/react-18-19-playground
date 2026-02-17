import { useOnline } from "../hooks/useOnline";

export function OnlineBadge() {
  const { online } = useOnline();

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        online
          ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-200"
          : "border-rose-300/20 bg-rose-300/10 text-rose-200",
      ].join(" ")}
    >
      <span className={["h-2 w-2 rounded-full", online ? "bg-emerald-200" : "bg-rose-200"].join(" ")} />
      {online ? "Online" : "Offline"}
    </span>
  );
}
