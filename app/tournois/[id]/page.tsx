import DynamicEventPageId from "@/app/evenements/[id]/DynamicEventPageId";
import { cookies } from "next/headers";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TournoisDetailPage({ params }: Props) {
  const { id } = await params;
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events/${id}`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return <div>Événement introuvable</div>;
  }

  return <DynamicEventPageId event={data} />;
}
