import { CalendarGrid } from "@/components/CalendarGrid";
import { FamilyEvent } from "@/types";

interface WeekViewProps {
  events: FamilyEvent[];
  conflictsEnabled: boolean;
}

export function WeekView({ events, conflictsEnabled }: WeekViewProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Week view</h1>
      <CalendarGrid events={events} conflictsEnabled={conflictsEnabled} />
    </section>
  );
}
