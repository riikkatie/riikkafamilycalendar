import { FamilyEvent } from "@/types";

export async function fetchOutlookEvents(user: string, calendarId: string): Promise<FamilyEvent[]> {
  const token = process.env.MICROSOFT_CLIENT_SECRET;

  if (!token || !user) {
    return [];
  }

  const url = new URL(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(user)}/calendar/events`);
  url.searchParams.set("$top", "100");
  url.searchParams.set("$orderby", "start/dateTime");

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as {
    value?: Array<{
      id: string;
      subject: string;
      bodyPreview?: string;
      start: { dateTime: string };
      end: { dateTime: string };
      location?: { displayName?: string };
      isAllDay?: boolean;
    }>;
  };

  return (data.value ?? []).map(
    (event: {
      id: string;
      subject: string;
      bodyPreview?: string;
      start: { dateTime: string };
      end: { dateTime: string };
      location?: { displayName?: string };
      isAllDay?: boolean;
    }) => ({
      id: `outlook-${event.id}`,
      externalId: event.id,
      calendarId,
      title: event.subject ?? "Untitled",
      description: event.bodyPreview,
      start: new Date(event.start.dateTime).toISOString(),
      end: new Date(event.end.dateTime).toISOString(),
      allDay: event.isAllDay,
      location: event.location?.displayName,
    }),
  );
}
