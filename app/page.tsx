import { Event, Game } from "@/generated/prisma/client";
import DynamicHome from "./DynamicHome";

export default async function HomePage() {
  let events: Event[] = [];
  let games: Game[] = [];

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

    const [eventsRes, gamesRes] = await Promise.all([
      fetch(`${baseUrl}/api/events`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/games`, { cache: "no-store" }),
    ]);

    if (eventsRes.ok) {
      events = await eventsRes.json();
    }
    if (gamesRes.ok) {
      games = (await gamesRes.json()) as Game[];
      games = games.filter((g: Game) => g.imageUrl); // Filtrer les jeux sans image
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return <DynamicHome events={events} games={games} />;
}
