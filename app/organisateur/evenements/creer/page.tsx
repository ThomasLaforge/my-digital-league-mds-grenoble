import DynamicCreerGameJamPage from "./DynamicCreationEvent";
import { prisma } from "@/lib/prisma";
import { Game } from "@/generated/prisma/client";

export default async function CreerEvenementPage({
  searchParams,
}: {
  searchParams: Promise<{ gameId?: string }>;
}) {
  let games: Game[] = [];
  const params = await searchParams;
  const gameId = params.gameId;

  try {
    games = await prisma.game.findMany();
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }

  return <DynamicCreerGameJamPage games={games} preSelectedGameId={gameId} />;
}
