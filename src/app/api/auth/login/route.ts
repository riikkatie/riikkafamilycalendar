import { NextRequest, NextResponse } from "next/server";

const OWNER_TO_CALENDAR: Record<string, string> = {
  calendar1: "calendar-1",
  calendar2: "calendar-2",
  calendar3: "calendar-3",
};

export async function POST(request: NextRequest) {
  const { password, owner } = await request.json();

  if (!password || password !== (process.env.APP_PASSWORD ?? "family-pin-here")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!OWNER_TO_CALENDAR[owner]) {
    return NextResponse.json({ error: "Invalid owner" }, { status: 400 });
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("family_auth", "true", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  response.cookies.set("family_owner", owner, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  response.cookies.set("family_calendar_id", OWNER_TO_CALENDAR[owner], {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
