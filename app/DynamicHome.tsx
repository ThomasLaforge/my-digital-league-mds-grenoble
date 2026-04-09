"use client";

import styles from "./page.module.scss";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import Hero from "./components/Hero/Hero";
import Card from "./components/Card/Card";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import type { Options } from "@splidejs/splide";
import {
  BulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "./components/Icons/Icons";

type EventApi = {
  id: string;
  name: string;
  date: string;
  inscriptionDeadline: string;
  rules: string;
  gameId: string;
  createdAt: string;
  updatedAt: string;
  game: { id: string; title: string };
  _count: { participants: number };
};

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
  events: EventApi[];
};

export default function DynamicHome({ events }: DynamicHomeProps) {
  const tournamentsSliderRef = useRef<SplideController | null>(null);
  const gameJamsSliderRef = useRef<SplideController | null>(null);

  // si plus tard tu veux filtrer différemment:
  const tournaments = events.filter((e) => true);
  const featuredGameJams = events.filter((e) => true);

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
                />
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
                <Card
                  icon={<BulbIcon />}
                  id={event.id}
                  variant="featured"
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
                />
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
