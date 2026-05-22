import { DayView } from "@/components/DayView";
import { getConflictsEnabled, getEventsForDay } from "@/lib/eventQueries";

export default async function DayPage() {
  const [events, conflictsEnabled] = await Promise.all([getEventsForDay(new Date()), getConflictsEnabled()]);

  return (
    <DayView
      dateLabel={new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
      events={events}
      conflictsEnabled={conflictsEnabled}
    />
  );
}
