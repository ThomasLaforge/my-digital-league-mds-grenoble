import DynamicLoadEvent from "./DynamicLoadEvent";
import { EventGetPayload } from "@/generated/prisma/models/Event";

type PageProps = {
  searchParams: Promise<{ eventId?: string }>;
};

export type EventWithGame = EventGetPayload<{
  include: {
    game: { select: { id: true; title: true } };
    _count: { select: { participants: true } };
  };
}>;
export default async function InscriptionPage({ searchParams }: PageProps) {
  const { eventId } = await searchParams;

  if (!eventId) {
    return <DynamicLoadEvent eventId={null} event={null} />;
  }

  let event: EventWithGame | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/events/${eventId}`,
      { cache: "no-store" }
    );

    if (res.ok) {
      event = await res.json();
    }
  } catch {
    event = null;
  }

  return <DynamicLoadEvent eventId={eventId} event={event} />;
}
