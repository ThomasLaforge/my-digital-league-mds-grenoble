import DynamicCreerGameJamPage from "./DynamicCreationEvent";
import { prisma } from "@/lib/prisma";
import { Game } from "@/generated/prisma/client";

export default async function CreerEvenementPage() {
  let games: Game[] = [];

  try {
    games = await prisma.game.findMany();
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }

  return <DynamicCreerGameJamPage games={games} />;
}
