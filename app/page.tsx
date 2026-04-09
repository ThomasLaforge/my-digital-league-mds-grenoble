import DynamicHome from "./DynamicHome";

type EventApi = {
  id: string;
  name: string;
  date: string;
  inscriptionDeadline: string;
  rules: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
  game: { id: string; title: string };
  _count: { participants: number };
};

export default async function HomePage() {
  let events: EventApi[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
      cache: "no-store",
    });

    if (res.ok) {
      events = await res.json();
    }
  } catch {
    events = [];
  }

  return <DynamicHome events={events} />;
}
