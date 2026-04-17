import DynamicEventPageId from "@/app/evenements/[id]/DynamicEventPageId";
import { cookies } from "next/headers";
import { getAppUrl } from "@/lib/getAppUrl";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();
  const baseUrl = getAppUrl();

  const res = await fetch(`${baseUrl}/api/events/${id}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return <div>Événement introuvable</div>;
  }

  return <DynamicEventPageId event={data} />;
}
