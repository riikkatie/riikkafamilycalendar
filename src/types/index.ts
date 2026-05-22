export type CalendarKey = "calendar1" | "calendar2" | "calendar3";

export type CategoryName =
  | "Training"
  | "Work"
  | "Travel"
  | "Evening Program"
  | string;

export interface CalendarDefinition {
  key: CalendarKey;
  id: string;
  ownerName: string;
  color: string;
  syncType: "google" | "outlook" | "ical";
  syncSource?: string;
}

export interface Category {
  id: string;
  name: CategoryName;
  icon?: string;
  color?: string;
}

export interface FamilyEvent {
  id: string;
  calendarId: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  allDay?: boolean;
  categoryId?: string;
  categoryName?: string;
  isPrivate?: boolean;
  location?: string;
  externalId?: string;
}

export interface AppSettings {
  conflictsEnabled: boolean;
}

export interface Conflict {
  eventAId: string;
  eventBId: string;
}
