import ical from "node-ical";
import { FamilyEvent } from "@/types";

function toText(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "object" && value && "val" in value) {
    const typedValue = value as { val?: unknown };
    if (typeof typedValue.val === "string") {
      return typedValue.val;
    }
  }

  return fallback;
}

export async function parseIcalFeed(url: string): Promise<FamilyEvent[]> {
  if (!url) {
    return [];
  }

  const data = await ical.async.fromURL(url);

  const events = Object.values(data).filter(
    (entry) => entry && (entry as ical.VEvent).type === "VEVENT",
  ) as ical.VEvent[];

  return events.map((event) => ({
      id: `ical-${event.uid}`,
      externalId: event.uid,
      calendarId: "calendar-1",
      title: toText(event.summary, "Skating"),
      description: toText(event.description) || undefined,
      start: event.start.toISOString(),
      end: (event.end ?? event.start).toISOString(),
      allDay: event.datetype === "date",
      location: toText(event.location) || undefined,
    }));
}
