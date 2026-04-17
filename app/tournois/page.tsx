import styles from "./tournois.module.scss";
import EventsList from "../components/EventList/Eventlist";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata = {
  title: "Tournois",
};

async function getEvents() {
  try {
    const session = await auth();

    const events = await prisma.event.findMany({
      include: {
        game: { select: { id: true, title: true, description: true } },
        _count: { select: { participants: true } },
      },
      orderBy: { date: "asc" },
    });

    if (session?.user?.id) {
      return await Promise.all(
        events.map(async (event) => {
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
    }

    return events.map((event) => ({
      ...event,
      date: event.date.toISOString(),
      inscriptionDeadline: event.inscriptionDeadline.toISOString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      isUserRegistered: false,
    }));
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
