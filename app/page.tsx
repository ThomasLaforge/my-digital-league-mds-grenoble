import { Event, Game } from "@/generated/prisma/client";
import DynamicHome from "./DynamicHome";

export type EventWithRegistration = Event & {
  game: { id: string; title: string };
  _count: { participants: number };
  isUserRegistered: boolean;
};

export default async function HomePage() {
  let events: EventWithRegistration[] = [];
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
      games = games.filter((g: Game) => g.imageUrl);
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return <DynamicHome events={events} games={games} />;
}
