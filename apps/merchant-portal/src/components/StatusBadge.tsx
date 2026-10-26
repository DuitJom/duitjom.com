export function ActiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold tracking-wide text-emerald-800">
      <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
      ACTIVE
    </span>
  );
}

export function OngoingBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-300 bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-900">
      <span className="h-2 w-2 rounded-full bg-yellow-500" aria-hidden />
      On Going
    </span>
  );
}
