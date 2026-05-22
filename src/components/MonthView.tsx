import { FamilyEvent } from "@/types";
import { CALENDARS } from "@/lib/constants";

interface MonthViewProps {
  events: FamilyEvent[];
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function MonthView({ events }: MonthViewProps) {
  const grouped = events.reduce<Record<string, FamilyEvent[]>>((acc, event) => {
    const key = new Date(event.start).toISOString().slice(0, 10);
    acc[key] = [...(acc[key] ?? []), event];
    return acc;
  }, {});

  const start = new Date();
  start.setDate(1);
  const currentMonth = start.getMonth();

  const days: Date[] = [];
  const cursor = new Date(start);
  while (cursor.getMonth() === currentMonth) {
    days.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Month view</h1>
      <div className="grid grid-cols-7 gap-2 text-sm font-semibold text-gray-600">
        {DAYS.map((day) => (
          <div key={day} className="rounded bg-gray-100 p-2 text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-7">
        {days.map((day) => {
          const key = day.toISOString().slice(0, 10);
          const dayEvents = grouped[key] ?? [];
          return (
            <div key={key} className="min-h-28 rounded border bg-white p-2">
              <p className="font-semibold text-gray-900">{day.getDate()}</p>
              <div className="mt-2 space-y-1">
                {dayEvents.slice(0, 3).map((event) => {
                  const calendar = CALENDARS.find((item) => item.id === event.calendarId);
                  return (
                    <div
                      key={event.id}
                      className="truncate rounded px-1 py-0.5 text-xs text-white"
                      style={{ backgroundColor: calendar?.color ?? "#9CA3AF" }}
                    >
                      {event.isPrivate ? "Busy" : event.title}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
