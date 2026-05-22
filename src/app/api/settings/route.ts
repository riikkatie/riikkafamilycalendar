import { NextRequest, NextResponse } from "next/server";
import { getSettings, updateSettings } from "@/lib/repository";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PATCH(request: NextRequest) {
  const payload = await request.json();

  const updated = await updateSettings({
    conflictsEnabled: Boolean(payload.conflictsEnabled),
  });

  return NextResponse.json(updated);
}
