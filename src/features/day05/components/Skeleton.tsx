type Props = {
  lines?: number;
};

export function Skeleton({ lines = 6 }: Props) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-white/10" />
      ))}
    </div>
  );
}