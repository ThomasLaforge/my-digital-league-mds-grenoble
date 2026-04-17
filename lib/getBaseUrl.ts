import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  // En production sur Vercel, utiliser VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // En local, essayer d'utiliser les headers
  try {
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") || "http";

    if (host) {
      return `${protocol}://${host}`;
    }
  } catch (error) {
    console.error("Error getting headers:", error);
  }

  // Fallback
  return "http://localhost:3000";
}
