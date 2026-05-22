import { getEvents, getSettings } from "@/lib/repository";
import { FamilyEvent } from "@/types";

export async function getEventsForDay(date = new Date()) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return getEvents(start.toISOString(), end.toISOString());
}

export async function getEventsForWeek(anchor = new Date()) {
  const start = new Date(anchor);
  start.setDate(anchor.getDate() - ((anchor.getDay() + 6) % 7));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return getEvents(start.toISOString(), end.toISOString());
}

export async function getEventsForMonth(anchor = new Date()): Promise<FamilyEvent[]> {
  const start = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const end = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0, 23, 59, 59, 999);

  return getEvents(start.toISOString(), end.toISOString());
}

export async function getConflictsEnabled() {
  const settings = await getSettings();
  return settings.conflictsEnabled;
}
