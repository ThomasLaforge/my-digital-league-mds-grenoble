import styles from "./tournois.module.scss";
import EventsList from "../components/EventList/Eventlist";

export const metadata = {
  title: "Tournois",
};

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des événements");
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
