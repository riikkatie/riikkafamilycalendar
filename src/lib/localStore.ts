import { AppSettings, Category, FamilyEvent } from "@/types";
import { DEFAULT_CATEGORIES } from "@/lib/constants";

const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

const toISO = (date: Date) => date.toISOString();

const addHours = (date: Date, hours: number) => {
  const next = new Date(date);
  next.setHours(next.getHours() + hours);
  return next;
};

export const localEvents: FamilyEvent[] = [
  {
    id: "event-1",
    calendarId: "calendar-1",
    title: "Skating Training",
    start: toISO(addHours(today, 17)),
    end: toISO(addHours(today, 19)),
    categoryName: "Training",
    categoryId: "training",
    location: "Ice Hall",
  },
  {
    id: "event-2",
    calendarId: "calendar-2",
    title: "Work Trip to Stockholm",
    start: toISO(addHours(today, 16)),
    end: toISO(addHours(today, 22)),
    categoryName: "Travel",
    categoryId: "travel",
    location: "Airport",
  },
  {
    id: "event-3",
    calendarId: "calendar-3",
    title: "Evening Program",
    start: toISO(addHours(today, 19)),
    end: toISO(addHours(today, 21)),
    categoryName: "Evening Program",
    categoryId: "evening-program",
    location: "City Center",
  },
];

export const localCategories: Category[] = [...DEFAULT_CATEGORIES];

export const localSettings: AppSettings = {
  conflictsEnabled: false,
};
