"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { ReactNode } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Card from "./components/Card/Card";
import {
  BulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./components/Icons/Icons";

const sharedEventData = {
  rules: "Respectez les règles et l'esprit d'équipe.",
  gameId: "game-1",
  createdAt: new Date("2025-01-01T00:00:00"),
  updatedAt: new Date("2025-01-01T00:00:00"),
};

const tournaments = [
  {
    ...sharedEventData,
    id: "event-1",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "Rocket League – Aerial Cup",
    description:
      "Affrontez les meilleurs du campus dans un tournoi Rocket League explosif.",
    date: new Date("2025-03-22T17:00:00"),
    inscriptionDeadline: new Date("2025-03-20T23:59:59"),
    heure: "5h",
    lieu: "MyDigitalSchool",
  },
  {
    ...sharedEventData,
    id: "event-2",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "Counter-Strike 2 – Tactical Strike",
    description:
      "Un tournoi CS2 compétitif basé sur la stratégie et le travail d'équipe.",
    date: new Date("2025-03-29T19:00:00"),
    inscriptionDeadline: new Date("2025-03-26T23:59:59"),
    heure: "7h",
    lieu: "MyDigitalSchool",
  },
  {
    ...sharedEventData,
    id: "event-3",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "Fortnite – Battle Campus",
    description:
      "Plongez dans une bataille Fortnite intense entre étudiants du campus.",
    date: new Date("2025-04-05T15:00:00"),
    inscriptionDeadline: new Date("2025-04-02T23:59:59"),
    heure: "3h",
    lieu: "MyDigitalSchool",
  },
];

const featuredGameJams = [
  {
    ...sharedEventData,
    id: "event-4",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Winter Game Jam 2025 – Create & Play",
    description:
      "48 heures pour créer un jeu vidéo en équipe. Créativité, collaboration et passion au rendez-vous.",
    date: new Date("2025-03-18T10:00:00"),
    inscriptionDeadline: new Date("2025-03-17T23:59:59"),
    animatedBy: "Stella @ Mydigitalschool",
    duration: "2 jours",
  },
  {
    ...sharedEventData,
    id: "event-5",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Winter Game Jam 2025 – Beginner Friendly",
    description: "Découvrez le développement de jeux vidéo en équipe.",
    date: new Date("2025-03-18T10:00:00"),
    inscriptionDeadline: new Date("2025-03-17T23:59:59"),
    animatedBy: "Stella @ Mydigitalschool",
    duration: "8 jours",
  },
  {
    ...sharedEventData,
    id: "event-6",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Winter Game Jam 2025 – Challenge Edition",
    description: "Une game jam pensée pour repousser vos limites créatives.",
    date: new Date("2025-03-18T10:00:00"),
    inscriptionDeadline: new Date("2025-03-17T23:59:59"),
    animatedBy: "Stella @ Mydigitalschool",
    duration: "20 jours",
  },
];

const popularGames = [
  {
    id: "game-fortnite",
    src: "/fortnite.png",
    alt: "Logo Fortnite",
    width: 160,
    height: 59,
  },
  {
    id: "game-r6",
    src: "/rainbowsixsiege.png",
    alt: "Logo Rainbow Six Siege",
    width: 77,
    height: 150,
  },
  {
    id: "game-cs2",
    src: "/counterstrike.png",
    alt: "Logo Counter-Strike",
    width: 160,
    height: 159,
  },
  {
    id: "game-rocket-league",
    src: "/rocketleague.png",
    alt: "Logo Rocket League",
    width: 290,
    height: 105,
  },
];

interface HomeSectionProps {
  title: string;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}

function HomeSection({
  title,
  previousLabel,
  nextLabel,
  children,
}: HomeSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {title}
          <span className={styles.sectionChevron}>
            <ChevronRightIcon color="currentColor" />
          </span>
        </h2>

        <div className={styles.controls}>
          <button
            type="button"
            className={styles.controlButton}
            aria-label={previousLabel}
          >
            <ChevronLeftIcon color="currentColor" />
          </button>
          <button
            type="button"
            className={styles.controlButton}
            aria-label={nextLabel}
          >
            <ChevronRightIcon color="currentColor" />
          </button>
        </div>
      </div>

      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
       <Hero />
      <HomeSection
        title="Tournois en cours"
        previousLabel="Tournois précédents"
        nextLabel="Tournois suivants"
      >
        <div className={styles.row}>
          {tournaments.map((event) => (
            <Card key={event.id} icon={<BulbIcon />} {...event} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Gamejam en vedette"
        previousLabel="Gamejams précédents"
        nextLabel="Gamejams suivants"
      >
        <div className={styles.row}>
          {featuredGameJams.map((event) => (
            <Card key={event.id} icon={<BulbIcon />} {...event} />
          ))}
        </div>
      </HomeSection>

      <HomeSection
        title="Jeux populaires"
        previousLabel="Jeux précédents"
        nextLabel="Jeux suivants"
      >
        <div className={styles.rowImage}>
          {popularGames.map((game) => (
            <article key={game.id} className={styles.logoCard}>
              <Image
                className={styles.logo}
                src={game.src}
                alt={game.alt}
                width={game.width}
                height={game.height}
              />
            </article>
          ))}
        </div>
      </HomeSection>
    </main>
  );
}
