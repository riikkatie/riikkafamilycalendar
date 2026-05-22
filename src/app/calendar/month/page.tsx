import { MonthView } from "@/components/MonthView";
import { getEventsForMonth } from "@/lib/eventQueries";

export default async function MonthPage() {
  const events = await getEventsForMonth(new Date());
  return <MonthView events={events} />;
}
