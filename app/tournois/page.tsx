import styles from "./tournois.module.scss";
import EventsList from "../components/EventList/Eventlist";

export const metadata = {
  title: "Tournois",
};

export default async function TournoisPage() {
  return (
    <main>
      <div className={styles.title}>GameJams et Tournois gaming</div>
      <EventsList />
    </main>
  );
}
