import DynamicEventPage from "@/app/evenements/[id]/EventPageClient";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events/${id}`
  );

  const data = await res.json();

  if (!res.ok) {
    return <div>Événement introuvable</div>;
  }

  return <DynamicEventPage event={data} />;
}
