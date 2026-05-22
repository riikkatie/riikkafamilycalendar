import { CalendarGrid } from "@/components/CalendarGrid";
import { FamilyEvent } from "@/types";

interface DayViewProps {
  dateLabel: string;
  events: FamilyEvent[];
  conflictsEnabled: boolean;
}

export function DayView({ dateLabel, events, conflictsEnabled }: DayViewProps) {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Day view · {dateLabel}</h1>
      <CalendarGrid events={events} conflictsEnabled={conflictsEnabled} />
    </section>
  );
}
