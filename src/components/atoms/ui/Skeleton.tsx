export function SkeletonRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded" style={{ width: `${60 + Math.random() * 30}%`, opacity: 0.7 }} />
        </td>
      ))}
    </tr>
  );
}

export function SkeletonKPI() {
  return (
    <div className="bg-white rounded-2xl p-5 border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton w-9 h-9 rounded-xl" />
        <div className="skeleton w-6 h-4 rounded" />
      </div>
      <div className="skeleton h-7 w-16 rounded mb-1.5" />
      <div className="skeleton h-3.5 w-28 rounded" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="skeleton h-36 w-full rounded-none" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-3/4 rounded" />
      </div>
    </div>
  );
}
