import { fetchGoogleEvents } from "@/lib/googleCalendar";
import { parseIcalFeed } from "@/lib/icalParser";
import { fetchOutlookEvents } from "@/lib/outlookCalendar";
import { createEvent, getEvents } from "@/lib/repository";
import { FamilyEvent } from "@/types";

export async function syncAllCalendars() {
  const [googleEvents, skatingEvents, outlook2, outlook3] = await Promise.all([
    fetchGoogleEvents(process.env.GOOGLE_CALENDAR_ID ?? ""),
    parseIcalFeed(process.env.ICAL_SKATING_URL ?? ""),
    fetchOutlookEvents(process.env.OUTLOOK_CALENDAR_2_USER ?? "", "calendar-2"),
    fetchOutlookEvents(process.env.OUTLOOK_CALENDAR_3_USER ?? "", "calendar-3"),
  ]);

  const merged = dedupeByExternalId([...googleEvents, ...skatingEvents, ...outlook2, ...outlook3]);
  const existingEvents = await getEvents();

  const existingExternalIds = new Set(existingEvents.map((event) => event.externalId).filter(Boolean));

  const inserted: FamilyEvent[] = [];

  for (const event of merged) {
    if (event.externalId && existingExternalIds.has(event.externalId)) {
      continue;
    }

    inserted.push(
      await createEvent({
        calendarId: event.calendarId,
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
        categoryId: event.categoryId,
        categoryName: event.categoryName,
        isPrivate: event.isPrivate,
        location: event.location,
        externalId: event.externalId,
      }),
    );
  }

  return {
    fetched: merged.length,
    inserted: inserted.length,
  };
}

function dedupeByExternalId(events: FamilyEvent[]) {
  const unique = new Map<string, FamilyEvent>();

  events.forEach((event) => {
    const key = `${event.calendarId}-${event.externalId ?? event.id}`;
    unique.set(key, event);
  });

  return Array.from(unique.values());
}
