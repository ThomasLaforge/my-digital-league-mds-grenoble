import { auth } from "@/auth";
import { getBaseUrl } from "@/lib/getBaseUrl";
import DynamicGamesList from "./DynamicGamesList";

export const metadata = {
  title: "Jeux",
};

async function getGames() {
  try {
    const baseUrl = await getBaseUrl();
    const res = await fetch(`${baseUrl}/api/games`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch games:", error);
    return [];
  }
}

export default async function JeuxPage() {
  const [games, session] = await Promise.all([getGames(), auth()]);

  const isOrganizer = session?.user?.isOrga || false;

  return <DynamicGamesList games={games} isOrganizer={isOrganizer} />;
}
