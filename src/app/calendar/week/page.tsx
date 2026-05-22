import { WeekView } from "@/components/WeekView";
import { getConflictsEnabled, getEventsForWeek } from "@/lib/eventQueries";

export default async function WeekPage() {
  const [events, conflictsEnabled] = await Promise.all([getEventsForWeek(new Date()), getConflictsEnabled()]);

  return <WeekView events={events} conflictsEnabled={conflictsEnabled} />;
}
