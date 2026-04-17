import { EventGetPayload } from "@/generated/prisma/models/Event";
import { notFound, redirect } from "next/navigation";
import DynamicLoadEvent from "./DynamicLoadEvent";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { auth } from "@/auth";

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
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const { eventId } = await searchParams;

  if (!eventId) {
    return notFound();
  }

  let event: EventWithGame | null = null;

  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/events/${eventId}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return notFound();
    }
    event = await res.json();
  } catch {
    return notFound();
  }

  return <DynamicLoadEvent eventId={eventId} event={event} />;
}
