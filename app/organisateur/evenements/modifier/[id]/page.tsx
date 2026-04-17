import DynamicModifierEvent from "./DynamicModifierEvent";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ModifierEvenementPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.isOrga) {
    return <div>Accès refusé</div>;
  }

  let games = [];
  let event = null;

  try {
    [games, event] = await Promise.all([
      prisma.game.findMany(),
      prisma.event.findUnique({
        where: { id },
        include: { game: { select: { id: true, title: true } } },
      }),
    ]);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }

  if (!event) {
    return <div>Événement introuvable</div>;
  }

  const eventData = {
    ...event,
    date: event.date.toISOString(),
    inscriptionDeadline: event.inscriptionDeadline.toISOString(),
  };

  return <DynamicModifierEvent event={eventData} games={games} />;
}
