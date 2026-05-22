import { CalendarDefinition, Category } from "@/types";

export const CALENDARS: CalendarDefinition[] = [
  {
    key: "calendar1",
    id: "calendar-1",
    ownerName: "Calendar 1",
    color: "#E91E7B",
    syncType: "google",
  },
  {
    key: "calendar2",
    id: "calendar-2",
    ownerName: "Calendar 2",
    color: "#4CAF50",
    syncType: "outlook",
  },
  {
    key: "calendar3",
    id: "calendar-3",
    ownerName: "Calendar 3",
    color: "#2196F3",
    syncType: "outlook",
  },
];

export const DEFAULT_CATEGORIES: Category[] = [
  { id: "training", name: "Training", color: "#E91E7B", icon: "⛸️" },
  { id: "work", name: "Work", color: "#7E57C2", icon: "💼" },
  { id: "travel", name: "Travel", color: "#4CAF50", icon: "✈️" },
  { id: "evening-program", name: "Evening Program", color: "#2196F3", icon: "🌙" },
];
