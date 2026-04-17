/**
 * Récupère l'URL de l'application automatiquement
 * - En production Vercel: utilise VERCEL_URL
 * - Sinon: utilise NEXT_PUBLIC_APP_URL
 * - En local: utilise http://localhost:3000
 */
export function getAppUrl(): string {
  // En production Vercel, VERCEL_URL est automatiquement injecté
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Variable d'environnement personnalisée (pour staging, etc.)
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // Par défaut en local
  return "http://localhost:3000";
}
