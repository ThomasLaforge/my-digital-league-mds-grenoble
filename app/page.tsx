import { Game } from "@/generated/prisma/client";
import DynamicHome from "./DynamicHome";
import { getBaseUrl } from "@/lib/getBaseUrl";

export type EventWithRegistration = {
  id: string;
  name: string;
  date: string;
  inscriptionDeadline: string;
  rules: string;
  level?: string | null;
  game: { id: string; title: string; description: string | null };
  _count: { participants: number };
  isUserRegistered: boolean;
  createdAt: string;
  updatedAt: string;
  isSolo: boolean;
  gameId: string;
};

export default async function HomePage() {
  let events: EventWithRegistration[] = [];
  let games: Game[] = [];

  try {
    const baseUrl = await getBaseUrl();

    const [eventsRes, gamesRes] = await Promise.all([
      fetch(`${baseUrl}/api/events`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/games`, { cache: "no-store" }).catch(() => null),
    ]);

    if (eventsRes?.ok) {
      events = await eventsRes.json();
    }

    if (gamesRes?.ok) {
      games = await gamesRes.json();
    }
  } catch (error) {
    console.error(
      "Error fetching home data:",
      error instanceof Error ? error.message : String(error)
    );
  }

  return <DynamicHome events={events} games={games} />;
}
