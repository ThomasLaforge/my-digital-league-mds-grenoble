"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Card from "./components/Card/Card";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import {
  BulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./components/Icons/Icons";

type SplideController = {
  go: (control: string | number) => void;
};

const cardSliderOptions: Options = {
  type: "slide",
  perPage: 3,
  perMove: 1,
  gap: "2.4rem",
  arrows: false,
  pagination: false,
  drag: true,
  breakpoints: {
    1199: {
      perPage: 2,
    },
    767: {
      perPage: 1,
    },
  },
};

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
  {
    ...sharedEventData,
    id: "event-7",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "Valorant – Campus Clash",
    description:
      "Affrontez les équipes étudiantes dans un tournoi Valorant intense et stratégique.",
    date: new Date("2025-04-12T18:00:00"),
    inscriptionDeadline: new Date("2025-04-10T23:59:59"),
    heure: "6h",
    lieu: "MyDigitalSchool",
  },
  {
    ...sharedEventData,
    id: "event-8",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "EA FC 25 – Champions Arena",
    description:
      "Montrez vos talents manette en main lors du tournoi EA FC du campus.",
    date: new Date("2025-04-19T16:00:00"),
    inscriptionDeadline: new Date("2025-04-17T23:59:59"),
    heure: "4h",
    lieu: "MyDigitalSchool",
  },
  {
    ...sharedEventData,
    id: "event-9",
    variant: "register" as const,
    status: "ongoing" as const,
    name: "League of Legends – Nexus Battle",
    description:
      "Tournoi LoL en 5v5 avec phase de groupes puis playoffs entre promotions.",
    date: new Date("2025-04-26T13:00:00"),
    inscriptionDeadline: new Date("2025-04-24T23:59:59"),
    heure: "8h",
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
  {
    ...sharedEventData,
    id: "event-10",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Spring Game Jam – Narrative Edition",
    description:
      "Concevez un jeu narratif en équipe autour d’un thème surprise en 72h.",
    date: new Date("2025-04-10T09:00:00"),
    inscriptionDeadline: new Date("2025-04-08T23:59:59"),
    animatedBy: "Léo @ Mydigitalschool",
    duration: "3 jours",
  },
  {
    ...sharedEventData,
    id: "event-11",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Spring Game Jam – Mobile Focus",
    description:
      "Créez un prototype mobile fun et accessible avec votre équipe projet.",
    date: new Date("2025-04-17T09:00:00"),
    inscriptionDeadline: new Date("2025-04-15T23:59:59"),
    animatedBy: "Camille @ Mydigitalschool",
    duration: "4 jours",
  },
  {
    ...sharedEventData,
    id: "event-12",
    variant: "featured" as const,
    status: "upcoming" as const,
    name: "Spring Game Jam – Arcade Challenge",
    description:
      "Un format rapide pour créer un jeu arcade au gameplay nerveux.",
    date: new Date("2025-04-24T10:00:00"),
    inscriptionDeadline: new Date("2025-04-22T23:59:59"),
    animatedBy: "Nina @ Mydigitalschool",
    duration: "2 jours",
  },
];

interface HomeSectionProps {
  title: string;
  previousLabel: string;
  nextLabel: string;
  onPrevious?: () => void;
  onNext?: () => void;
  showControls?: boolean;
  children: ReactNode;
}

function HomeSection({
  title,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  showControls = true,
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

        {showControls && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              aria-label={previousLabel}
              onClick={onPrevious}
            >
              <ChevronLeftIcon color="currentColor" />
            </button>
            <button
              type="button"
              className={styles.controlButton}
              aria-label={nextLabel}
              onClick={onNext}
            >
              <ChevronRightIcon color="currentColor" />
            </button>
          </div>
        )}
      </div>

      {children}
    </section>
  );
}

export default function Home() {
  const tournamentsSliderRef = useRef<SplideController | null>(null);
  const gameJamsSliderRef = useRef<SplideController | null>(null);

  return (
    <main className={styles.main}>
       <Hero />
      <HomeSection
        title="Tournois en cours"
        previousLabel="Tournois précédents"
        nextLabel="Tournois suivants"
        onPrevious={() => tournamentsSliderRef.current?.go("<")}
        onNext={() => tournamentsSliderRef.current?.go(">")}
      >
        <Splide
          options={cardSliderOptions}
          hasTrack={false}
          className={styles.slider}
          ref={tournamentsSliderRef}
          aria-label="Slider des tournois en cours"
        >
          <SplideTrack className={styles.sliderTrack}>
            {tournaments.map((event) => (
              <SplideSlide key={event.id} className={styles.cardSlide}>
                <Card icon={<BulbIcon />} {...event} />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </HomeSection>

      <HomeSection
        title="Gamejam en vedette"
        previousLabel="Gamejams précédents"
        nextLabel="Gamejams suivants"
        onPrevious={() => gameJamsSliderRef.current?.go("<")}
        onNext={() => gameJamsSliderRef.current?.go(">")}
      >
        <Splide
          options={cardSliderOptions}
          hasTrack={false}
          className={styles.slider}
          ref={gameJamsSliderRef}
          aria-label="Slider des gamejams en vedette"
        >
          <SplideTrack className={styles.sliderTrack}>
            {featuredGameJams.map((event) => (
              <SplideSlide key={event.id} className={styles.cardSlide}>
                <Card icon={<BulbIcon />} {...event} />
              </SplideSlide>
            ))}
          </SplideTrack>
        </Splide>
      </HomeSection>

      <HomeSection
        title="Jeux populaires"
        previousLabel="Jeux précédents"
        nextLabel="Jeux suivants"
        showControls={false}
      >
        <div className={styles.rowImage}>
          <article className={styles.logoCard}>
            <Image
              className={styles.logo}
              src="/balatro.jpg"
              alt="logo balatro"
              width={160}
              height={40}
            />
          </article>

          <article className={styles.logoCard}>
            <Image
              className={styles.logo}
              src="/tetris.jpg"
              alt="logo tetris"
              width={160}
              height={80}
            />
          </article>
        </div>
      </HomeSection>
    </main>
  );
}
