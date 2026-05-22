import { Conflict, FamilyEvent } from "@/types";

export function detectConflicts(events: FamilyEvent[]): Conflict[] {
  const conflicts: Conflict[] = [];

  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime(),
  );

  for (let i = 0; i < sortedEvents.length; i += 1) {
    const current = sortedEvents[i];

    for (let j = i + 1; j < sortedEvents.length; j += 1) {
      const next = sortedEvents[j];

      if (current.calendarId === next.calendarId) {
        continue;
      }

      const currentStart = new Date(current.start).getTime();
      const currentEnd = new Date(current.end).getTime();
      const nextStart = new Date(next.start).getTime();

      if (nextStart >= currentEnd) {
        break;
      }

      if (currentStart < new Date(next.end).getTime() && currentEnd > nextStart) {
        conflicts.push({ eventAId: current.id, eventBId: next.id });
      }
    }
  }

  return conflicts;
}
