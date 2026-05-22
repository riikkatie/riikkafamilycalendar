interface ConflictBadgeProps {
  count: number;
}

export function ConflictBadge({ count }: ConflictBadgeProps) {
  if (count === 0) {
    return null;
  }

  return (
    <span className="inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
      {count} conflict{count === 1 ? "" : "s"}
    </span>
  );
}
