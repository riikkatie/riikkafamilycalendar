import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const { syncAllCalendars } = await import("@/lib/calendarSync");
    const result = await syncAllCalendars();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Calendar sync failed",
        detail: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
