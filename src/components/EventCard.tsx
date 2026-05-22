import { CALENDARS } from "@/lib/constants";
import { FamilyEvent } from "@/types";

interface EventCardProps {
  event: FamilyEvent;
  isConflict?: boolean;
  showPrivateDetails?: boolean;
}

export function EventCard({ event, isConflict, showPrivateDetails = true }: EventCardProps) {
  const calendar = CALENDARS.find((item) => item.id === event.calendarId);
  const title = event.isPrivate && !showPrivateDetails ? "Busy" : event.title;

  return (
    <article
      className="rounded-md border-l-4 bg-white p-3 shadow-sm"
      style={{ borderLeftColor: calendar?.color ?? "#9CA3AF" }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {isConflict ? <span className="text-xs font-semibold text-red-600">Conflict</span> : null}
      </div>
      <p className="text-sm text-gray-600">
        {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} -{" "}
        {new Date(event.end).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
      {event.location && !(event.isPrivate && !showPrivateDetails) ? (
        <p className="text-sm text-gray-500">📍 {event.location}</p>
      ) : null}
      {event.categoryName ? (
        <p className="mt-1 text-xs font-medium uppercase text-gray-500">{event.categoryName}</p>
      ) : null}
    </article>
  );
}
