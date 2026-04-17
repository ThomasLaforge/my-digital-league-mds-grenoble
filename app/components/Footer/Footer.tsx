import Link from "next/link";
import Image from "next/image";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { EnvelopIcon, GithubIcon } from "../Icons/Icons";
import styles from "./Footer.module.scss";
import type { Game, Event } from "@/generated/prisma/client";

async function getFooterData() {
  try {
    const baseUrl = await getBaseUrl();

    const [gamesRes, eventsRes] = await Promise.all([
      fetch(`${baseUrl}/api/games`, { cache: "no-store" }).catch(() => null),
      fetch(`${baseUrl}/api/events`, { cache: "no-store" }).catch(() => null),
    ]);

    let games: Game[] = [];
    let events: Event[] = [];

    if (gamesRes?.ok) {
      const allGames = await gamesRes.json();
      games = allGames.slice(0, 5);
    }

    if (eventsRes?.ok) {
      const allEvents = await eventsRes.json();
      events = allEvents.slice(0, 5);
    }

    return { games, events };
  } catch (error) {
    console.error("Failed to fetch footer data:", error);
    return { games: [], events: [] };
  }
}

export default async function Footer() {
  const { games, events } = await getFooterData();

  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Logo"
          width={150}
          height={40}
        />
        <p className={styles.brandText}>
          La plateforme gaming de MyDigitalSchool Grenoble
        </p>
        <div className={styles.socials}>
          <Link
            href="mailto:thomas.laforge.ext@eduservices.org"
            rel="noopener noreferrer"
          >
            <EnvelopIcon width={24} height={24} color="white" />
          </Link>
          <Link
            href="https://github.com/ThomasLaforge/my-digital-league-mds-grenoble"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon width={24} height={24} color="white" />
          </Link>
        </div>
      </div>
      <div className={styles.linksContainer}>
        <div className={styles.linksTop}>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Jeux</p>
            <ul>
              {games.length > 0 ? (
                games.map((game: Game) => (
                  <li key={game.id}>
                    <Link href="/jeux">{game.title}</Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/jeux">Tous les jeux</Link>
                </li>
              )}
            </ul>
          </div>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Tournois</p>
            <ul>
              {events.length > 0 ? (
                events.map((event: Event) => (
                  <li key={event.id}>
                    <Link href={`/tournois/${event.id}`}>{event.name}</Link>
                  </li>
                ))
              ) : (
                <li>
                  <Link href="/tournois">Tous les tournois</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        {/* <div className={styles.linksBottom}>
          <div className={styles.links}>
            <p className={styles.categoryLink}>Support</p>
            <ul>
              <li>
                <Link href="#">FAQ</Link>
              </li>
              <li>
                <Link href="#">Règlements</Link>
              </li>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Mentions légales</Link>
              </li>
              <li>
                <Link href="#">Confidentialité</Link>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
