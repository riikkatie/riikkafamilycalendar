import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createEvent, getEvents } from "@/lib/repository";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const from = params.get("from") ?? undefined;
  const to = params.get("to") ?? undefined;

  const events = await getEvents(from, to);
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const calendarId = cookieStore.get("family_calendar_id")?.value;

  if (!calendarId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await request.json();

  if (payload.calendarId !== calendarId) {
    return NextResponse.json({ error: "You can only edit your own calendar" }, { status: 403 });
  }

  const created = await createEvent(payload);
  return NextResponse.json(created, { status: 201 });
}
