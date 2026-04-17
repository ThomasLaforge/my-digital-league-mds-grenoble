import DynamicCreerGameJamPage from "./DynamicCreationEvent";
import { prisma } from "@/lib/prisma";

export default async function CreerEvenementPage() {
  let games = [];

  try {
    games = await prisma.game.findMany();
  } catch (error) {
    console.error("Failed to fetch games:", error);
  }

  return <DynamicCreerGameJamPage games={games} />;
}
