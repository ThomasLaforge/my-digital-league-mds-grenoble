"use client";

import { Game } from "@/generated/prisma/client";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import Card from "./components/Card/Card";
import Hero from "./components/Hero/Hero";
import {
  BulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./components/Icons/Icons";
import styles from "./page.module.scss";
import type { EventWithRegistration } from "./page";

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

type DynamicHomeProps = {
  events: EventWithRegistration[];
  games: Game[];
};

export default function DynamicHome({ events, games }: DynamicHomeProps) {
  const tournamentsSliderRef = useRef<SplideController | null>(null);

  const now = new Date();
  // Tournois en cours: la date du tournoi est passée (date <= maintenant)
  const tournaments = events
    .filter((e) => new Date(e.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  // Prochains tournois: la date du tournoi est dans le futur (date > maintenant)
  const upcomingTournaments = events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <main className={styles.main}>
      <Hero />
      {tournaments.length > 0 && (
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
                  <Card
                    icon={<BulbIcon />}
                    id={event.id}
                    variant="register"
                    status="ongoing"
                    name={event.name}
                    description={event.rules}
                    date={new Date(event.date)}
                    inscriptionDeadline={new Date(event.inscriptionDeadline)}
                    heure={undefined}
                    lieu={undefined}
                    rules={event.rules}
                    gameId={event.gameId}
                    createdAt={new Date(event.createdAt)}
                    updatedAt={new Date(event.updatedAt)}
                    isSolo={event.isSolo}
                    isRegistered={event.isUserRegistered}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        </HomeSection>
      )}

      {upcomingTournaments.length > 0 && (
        <HomeSection
          title="Prochains tournois"
          previousLabel="Tournois précédents"
          nextLabel="Tournois suivants"
        >
          <div className={styles.upcomingList}>
            {upcomingTournaments.map((event) => (
              <div key={event.id} className={styles.upcomingItem}>
                <Card
                  icon={<BulbIcon />}
                  id={event.id}
                  variant="register"
                  status="upcoming"
                  name={event.name}
                  description={event.rules}
                  date={new Date(event.date)}
                  inscriptionDeadline={new Date(event.inscriptionDeadline)}
                  heure={undefined}
                  lieu={undefined}
                  rules={event.rules}
                  gameId={event.gameId}
                  createdAt={new Date(event.createdAt)}
                  updatedAt={new Date(event.updatedAt)}
                  isSolo={event.isSolo}
                  isRegistered={event.isUserRegistered}
                />
              </div>
            ))}
          </div>
        </HomeSection>
      )}

      {games.length > 0 && (
        <HomeSection
          title="Jeux populaires"
          previousLabel="Jeux précédents"
          nextLabel="Jeux suivants"
          showControls={false}
        >
          <div className={styles.rowImage}>
            {games.map((game) => {
              if (!game.imageUrl) return null;
              return (
                <article key={game.id} className={styles.logoCard}>
                  <Image
                    className={styles.logo}
                    src={game.imageUrl}
                    alt={`logo ${game.title}`}
                    width={160}
                    height={120}
                    unoptimized={!game.imageUrl.startsWith("/")}
                  />
                </article>
              );
            })}
          </div>
        </HomeSection>
      )}
    </main>
  );
}
