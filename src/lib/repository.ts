import { randomUUID } from "crypto";
import { localCategories, localEvents, localSettings } from "@/lib/localStore";
import { AppSettings, Category, FamilyEvent } from "@/types";

export async function getEvents(from?: string, to?: string): Promise<FamilyEvent[]> {
  return localEvents
    .filter((event) => {
      const start = new Date(event.start).getTime();
      const afterFrom = from ? start >= new Date(from).getTime() : true;
      const beforeTo = to ? start <= new Date(to).getTime() : true;
      return afterFrom && beforeTo;
    })
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}

export async function createEvent(event: Omit<FamilyEvent, "id">): Promise<FamilyEvent> {
  const created = { ...event, id: randomUUID() };
  localEvents.push(created);
  return created;
}

export async function updateEvent(id: string, payload: Partial<FamilyEvent>): Promise<FamilyEvent | null> {
  const index = localEvents.findIndex((event) => event.id === id);
  if (index < 0) {
    return null;
  }

  localEvents[index] = {
    ...localEvents[index],
    ...payload,
  };

  return localEvents[index];
}

export async function deleteEvent(id: string): Promise<boolean> {
  const index = localEvents.findIndex((event) => event.id === id);
  if (index < 0) {
    return false;
  }

  localEvents.splice(index, 1);
  return true;
}

export async function getCategories(): Promise<Category[]> {
  return localCategories;
}

export async function addCategory(category: Omit<Category, "id">): Promise<Category> {
  const created = {
    ...category,
    id: randomUUID(),
  };

  localCategories.push(created);
  return created;
}

export async function getSettings(): Promise<AppSettings> {
  return localSettings;
}

export async function updateSettings(settings: Partial<AppSettings>): Promise<AppSettings> {
  localSettings.conflictsEnabled = settings.conflictsEnabled ?? localSettings.conflictsEnabled;
  return localSettings;
}
