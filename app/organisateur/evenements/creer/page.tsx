import DynamicCreerGameJamPage from "./DynamicCreationEvent";
import { getAppUrl } from "@/lib/getAppUrl";

export default async function CreerEvenementPage() {
  const baseUrl = getAppUrl();
  const res = await fetch(`${baseUrl}/api/games`);
  let data = await res.json();

  if (!res.ok) {
    data = [];
  }

  return <DynamicCreerGameJamPage games={data} />;
}
