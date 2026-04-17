import styles from "./tournois.module.scss";
import EventsList from "../components/EventList/Eventlist";

export const metadata = {
  title: "Tournois",
};

async function getEvents() {
  try {
    const res = await fetch("/api/events", {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
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
