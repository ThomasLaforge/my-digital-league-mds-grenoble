import DynamicEventPageId from "./DynamicEventPageId";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TournoisDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        game: { select: { id: true, title: true, description: true } },
        _count: { select: { participants: true } },
      },
    });

    if (!event) {
      return <div>Événement introuvable</div>;
    }

    let isUserRegistered = false;
    if (session?.user?.id) {
      const participant = await prisma.participant.findUnique({
        where: {
          userId_eventId: { userId: session.user.id, eventId: event.id },
        },
      });
      isUserRegistered = !!participant;
    }

    const eventData = {
      ...event,
      date: event.date.toISOString(),
      inscriptionDeadline: event.inscriptionDeadline.toISOString(),
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
      isUserRegistered,
    };

    const isOrganizer = session?.user?.isOrga || false;

    return <DynamicEventPageId event={eventData} isOrganizer={isOrganizer} />;
  } catch (error) {
    console.error("Failed to fetch tournament:", error);
    return <div>Événement introuvable</div>;
  }
}
