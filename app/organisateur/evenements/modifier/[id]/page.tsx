import DynamicModifierEvent from "./DynamicModifierEvent";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import type { Game } from "@/generated/prisma/client";

type Props = {
  params: Promise<{ id: string }>;
};

type EventWithGame = {
  id: string;
  name: string;
  date: Date;
  inscriptionDeadline: Date;
  rules: string;
  gameId: string;
  createdAt: Date;
  updatedAt: Date;
  isSolo: boolean;
  game: { id: string; title: string } | null;
};

export default async function ModifierEvenementPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.isOrga) {
    return <div>Accès refusé</div>;
  }

  let games: Game[] = [];
  let event: EventWithGame | null = null;

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

  if (!event.game) {
    return <div>Jeu non trouvé pour cet événement</div>;
  }

  const eventData = {
    id: event.id,
    name: event.name,
    date: event.date.toISOString(),
    inscriptionDeadline: event.inscriptionDeadline.toISOString(),
    rules: event.rules,
    gameId: event.gameId,
    game: event.game,
  };

  return <DynamicModifierEvent event={eventData} games={games} />;
}
