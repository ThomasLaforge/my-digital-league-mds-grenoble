import styles from "./tournois.module.scss";
import EventsList from "../components/EventList/Eventlist";
import { getAppUrl } from "@/lib/getAppUrl";

export const metadata = {
  title: "Tournois",
};

async function getEvents() {
  const baseUrl = getAppUrl();
  const res = await fetch(`${baseUrl}/api/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function TournoisPage() {
  const events = await getEvents();

  return (
    <main>
      <div className={styles.title}>GameJams et Tournois gaming</div>
      <EventsList events={events} />
    </main>
  );
}
