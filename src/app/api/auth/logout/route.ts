import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("family_auth");
  response.cookies.delete("family_owner");
  response.cookies.delete("family_calendar_id");
  return response;
}
