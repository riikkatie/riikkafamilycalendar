import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { deleteEvent, getEvents, updateEvent } from "@/lib/repository";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const calendarId = cookieStore.get("family_calendar_id")?.value;

  if (!calendarId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getEvents();
  const event = events.find((item) => item.id === params.id);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.calendarId !== calendarId) {
    return NextResponse.json({ error: "You can only edit your own calendar" }, { status: 403 });
  }

  const payload = await request.json();
  const updated = await updateEvent(params.id, payload);

  return NextResponse.json(updated);
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const calendarId = cookieStore.get("family_calendar_id")?.value;

  if (!calendarId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getEvents();
  const event = events.find((item) => item.id === params.id);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  if (event.calendarId !== calendarId) {
    return NextResponse.json({ error: "You can only edit your own calendar" }, { status: 403 });
  }

  await deleteEvent(params.id);
  return NextResponse.json({ success: true });
}
