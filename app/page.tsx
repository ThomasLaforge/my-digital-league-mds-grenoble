import { Event, Game } from "@/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import DynamicHome from "./DynamicHome";

export type EventWithRegistration = Omit<
  Event,
  "date" | "inscriptionDeadline" | "createdAt" | "updatedAt"
> & {
  game: { id: string; title: string; description: string | null };
  _count: { participants: number };
  isUserRegistered: boolean;
  date: string;
  inscriptionDeadline: string;
  createdAt: string;
  updatedAt: string;
};

export default async function HomePage() {
  let events: EventWithRegistration[] = [];
  let games: Game[] = [];

  try {
    const session = await auth();

    const [dbEvents, dbGames] = await Promise.all([
      prisma.event.findMany({
        include: {
          game: { select: { id: true, title: true, description: true } },
          _count: { select: { participants: true } },
        },
        orderBy: { date: "asc" },
      }),
      prisma.game.findMany(),
    ]);

    if (session?.user?.id) {
      events = await Promise.all(
        dbEvents.map(async (event) => {
          const participant = await prisma.participant.findUnique({
            where: {
              userId_eventId: { userId: session.user.id, eventId: event.id },
            },
          });
          return {
            ...event,
            date: event.date.toISOString(),
            inscriptionDeadline: event.inscriptionDeadline.toISOString(),
            createdAt: event.createdAt.toISOString(),
            updatedAt: event.updatedAt.toISOString(),
            isUserRegistered: !!participant,
          };
        })
      );
    } else {
      events = dbEvents.map((event) => ({
        ...event,
        date: event.date.toISOString(),
        inscriptionDeadline: event.inscriptionDeadline.toISOString(),
        createdAt: event.createdAt.toISOString(),
        updatedAt: event.updatedAt.toISOString(),
        isUserRegistered: false,
      }));
    }

    games = dbGames.filter((g) => g.imageUrl);
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return <DynamicHome events={events} games={games} />;
}
