import { detectConflicts } from "@/lib/conflictDetector";
import { FamilyEvent } from "@/types";
import { ConflictBadge } from "@/components/ConflictBadge";
import { EventCard } from "@/components/EventCard";

interface CalendarGridProps {
  events: FamilyEvent[];
  conflictsEnabled: boolean;
}

export function CalendarGrid({ events, conflictsEnabled }: CalendarGridProps) {
  const conflicts = conflictsEnabled ? detectConflicts(events) : [];
  const conflictEventIds = new Set(conflicts.flatMap((item) => [item.eventAId, item.eventBId]));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Merged family schedule</h2>
        <ConflictBadge count={conflicts.length} />
      </div>
      {events.length === 0 ? <p className="rounded-lg bg-white p-4 text-gray-600">No events found.</p> : null}
      <div className="space-y-2">
        {events.map((event) => (
          <EventCard key={event.id} event={event} isConflict={conflictEventIds.has(event.id)} />
        ))}
      </div>
    </div>
  );
}
