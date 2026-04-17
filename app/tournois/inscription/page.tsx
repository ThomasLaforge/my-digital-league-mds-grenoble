import { EventGetPayload } from "@/generated/prisma/models/Event";
import { notFound } from "next/navigation";
import DynamicLoadEvent from "./DynamicLoadEvent";

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
    return notFound();
  }

  let event: EventWithGame | null = null;

  try {
    const res = await fetch(`/api/events/${eventId}`, { cache: "no-store" });

    if (!res.ok) {
      return notFound();
    }
    event = await res.json();
  } catch {
    return notFound();
  }

  return <DynamicLoadEvent eventId={eventId} event={event} />;
}
