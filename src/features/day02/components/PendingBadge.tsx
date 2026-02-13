type PendingBadgeProps = {
  pending: boolean;
};

export function PendingBadge({ pending }: PendingBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs",
        pending
          ? "border-amber-300/20 bg-amber-300/10 text-amber-200"
          : "border-emerald-300/20 bg-emerald-300/10 text-emerald-200",
      ].join(" ")}
    >
      <span
        className={[
          "h-2 w-2 rounded-full",
          pending ? "animate-pulse bg-amber-200" : "bg-emerald-200",
        ].join(" ")}
      />
      {pending ? "Updating…" : "Idle"}
    </span>
  );
}
