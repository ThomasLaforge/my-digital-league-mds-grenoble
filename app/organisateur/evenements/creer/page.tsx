import DynamicCreerGameJamPage from "./DynamicCreationEvent";

export default async function CreerEvenementPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/games`);
  let data = await res.json();

  if (!res.ok) {
    data = [];
  }

  return <DynamicCreerGameJamPage games={data} />;
}
