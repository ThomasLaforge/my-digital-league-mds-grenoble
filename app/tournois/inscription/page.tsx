import DynamicLoadEvent from "./DynamicLoadEvent";

type PageProps = {
  searchParams: Promise<{ eventId?: string }>;
};

export default async function InscriptionPage({ searchParams }: PageProps) {
  const { eventId } = await searchParams;

  if (!eventId) {
    return <DynamicLoadEvent eventId={null} event={null} />;
  }

  let event = null;

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
