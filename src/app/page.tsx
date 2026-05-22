import Link from "next/link";
import { CalendarGrid } from "@/components/CalendarGrid";
import { CALENDARS } from "@/lib/constants";
import { getConflictsEnabled, getEventsForDay } from "@/lib/eventQueries";

export default async function Home() {
  const [events, conflictsEnabled] = await Promise.all([getEventsForDay(new Date()), getConflictsEnabled()]);

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-900">What&apos;s happening today</h1>
      <div className="grid gap-2 rounded-lg bg-white p-4 md:grid-cols-3">
        {CALENDARS.map((calendar) => (
          <div key={calendar.id} className="rounded border p-2 text-sm" style={{ borderColor: calendar.color }}>
            <p className="font-semibold" style={{ color: calendar.color }}>
              {calendar.ownerName}
            </p>
            <p className="text-gray-600">{calendar.syncType.toUpperCase()} source</p>
          </div>
        ))}
      </div>
      <CalendarGrid events={events} conflictsEnabled={conflictsEnabled} />
      <div className="flex flex-wrap gap-2 text-sm">
        <Link href="/calendar/day" className="rounded bg-gray-900 px-3 py-2 text-white">
          Open day view
        </Link>
        <Link href="/settings" className="rounded bg-gray-200 px-3 py-2 text-gray-900">
          Open settings
        </Link>
      </div>
    </section>
  );
}
