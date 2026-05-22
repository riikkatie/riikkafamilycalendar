import { FamilyEvent } from "@/types";

export async function fetchGoogleEvents(calendarId: string): Promise<FamilyEvent[]> {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !refreshToken || !calendarId) {
    return [];
  }

  const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
  url.searchParams.set("singleEvents", "true");
  url.searchParams.set("orderBy", "startTime");
  url.searchParams.set("maxResults", "250");
  url.searchParams.set("timeMin", new Date().toISOString());

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${refreshToken}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as {
    items?: Array<{
      id?: string;
      summary?: string;
      description?: string;
      location?: string;
      start?: { dateTime?: string; date?: string };
      end?: { dateTime?: string; date?: string };
    }>;
  };

  return (data.items ?? [])
    .filter((event) => event.start?.dateTime || event.start?.date)
    .map((event) => ({
      id: `google-${event.id}`,
      externalId: event.id ?? undefined,
      calendarId: "calendar-1",
      title: event.summary ?? "Untitled",
      description: event.description ?? undefined,
      start: event.start?.dateTime ?? `${event.start?.date}T00:00:00.000Z`,
      end: event.end?.dateTime ?? `${event.end?.date}T00:00:00.000Z`,
      allDay: Boolean(event.start?.date && !event.start?.dateTime),
      location: event.location ?? undefined,
    }));
}
