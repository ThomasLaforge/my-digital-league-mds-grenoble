"use client";

import { formatDate } from "@/lib/date";
import { Options } from "@splidejs/splide";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import Card from "../components/Card/Card";
import Avatar from "../components/Avatar/Avatar";
import {
  BulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../components/Icons/Icons";
import {
  ReactNode,
  KeyboardEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import styles from "./page.module.scss";

type ProfileEvent = {
  id: string;
  name: string;
  date: string;
  gameTitle: string;
  score: number | null;
};

type ApiMeResponse = {
  name: string | null;
  email: string;
  image: string | null;
  isOrga: boolean;
  createdAt: string;
  participations: Array<{
    event: {
      id: string;
      name: string;
      date: string;
      game: {
        title: string;
      };
    };
    results: Array<{
      score: number;
      updatedAt: string;
    }>;
  }>;
};

type ProfileCardEvent = ProfileEvent & {
  heure: string;
  lieu: string;
  description: string;
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

function formatEventHour(date: string): string {
  const parsedDate = new Date(date);
  const hours = parsedDate.getHours();
  const minutes = parsedDate.getMinutes();

  if (Number.isNaN(parsedDate.getTime())) {
    return "--";
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h${minutes.toString().padStart(2, "0")}`;
}

interface ProfileSectionProps {
  title: string;
  previousLabel: string;
  nextLabel: string;
  onPrevious: () => void;
  onNext: () => void;
  children: ReactNode;
}

function ProfileSection({
  title,
  previousLabel,
  nextLabel,
  onPrevious,
  onNext,
  children,
}: ProfileSectionProps) {
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
      </div>

      {children}
    </section>
  );
}

export default function ProfileClient() {
  const [name, setName] = useState("");
  const [draftName, setDraftName] = useState("");
  const [email, setEmail] = useState("");
  const [isOrga, setIsOrga] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [events, setEvents] = useState<ProfileEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();
  const ongoingSliderRef = useRef<SplideController | null>(null);
  const upcomingSliderRef = useRef<SplideController | null>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
      nameInputRef.current?.select();
    }
  }, [isEditingName]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = (await response.json()) as
          | ApiMeResponse
          | { error?: string };

        if (!response.ok || "error" in data) {
          if (!active) return;
          setFeedback({
            type: "error",
            message:
              ("error" in data && data.error) ||
              "Impossible de charger le profil.",
          });
          return;
        }

        if (!active) return;

        const userData = data as ApiMeResponse;
        const mappedEvents: ProfileEvent[] = userData.participations
          .map((participation) => ({
            id: participation.event.id,
            name: participation.event.name,
            date: participation.event.date,
            gameTitle: participation.event.game.title,
            score: participation.results[0]?.score ?? null,
          }))
          .sort((a, b) => +new Date(b.date) - +new Date(a.date));

        setName(userData.name ?? "");
        setDraftName(userData.name ?? "");
        setEmail(userData.email);
        setIsOrga(userData.isOrga);
        setCreatedAt(userData.createdAt);
        setEvents(mappedEvents);
      } catch {
        if (!active) return;
        setFeedback({
          type: "error",
          message: "Une erreur est survenue.",
        });
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, []);

  const cardEvents = useMemo<ProfileCardEvent[]>(
    () =>
      [...events]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((event) => ({
          ...event,
          heure: formatEventHour(event.date),
          lieu: "MyDigitalSchool",
          description:
            event.score !== null
              ? `Jeu : ${event.gameTitle} • Score : ${event.score}`
              : `Jeu : ${event.gameTitle}`,
        })),
    [events]
  );

  const now = new Date();
  const oneWeekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  const ongoingCardEvents = cardEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= now && eventDate < oneWeekFromNow;
  });

  const futureCardEvents = cardEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate >= oneWeekFromNow;
  });

  const recentPastCardEvents = cardEvents
    .filter((event) => new Date(event.date) < now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const displayOngoingEvents =
    ongoingCardEvents.length > 0 ? ongoingCardEvents : recentPastCardEvents;
  const displayFutureEvents = futureCardEvents;

  const saveName = (value: string) => {
    const nextName = value.trim();

    if (!nextName) {
      setFeedback({
        type: "error",
        message: "Le nom est obligatoire.",
      });
      setDraftName(name);
      setIsEditingName(false);
      return;
    }

    if (nextName === name.trim()) {
      setDraftName(nextName);
      setIsEditingName(false);
      return;
    }

    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/me", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nextName,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setFeedback({
            type: "error",
            message: data.error || "Impossible de mettre à jour le profil.",
          });
          setDraftName(name);
          setIsEditingName(false);
          return;
        }

        setName(data.name ?? nextName);
        setDraftName(data.name ?? nextName);
        setFeedback({
          type: "success",
          message: "Nom mis à jour avec succès.",
        });
        setIsEditingName(false);
      } catch {
        setFeedback({
          type: "error",
          message: "Une erreur est survenue.",
        });
        setDraftName(name);
        setIsEditingName(false);
      }
    });
  };

  const handleNameKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.currentTarget.blur();
    }

    if (event.key === "Escape") {
      setDraftName(name);
      setIsEditingName(false);
    }
  };

  return (
    <main className={styles.main}>
      <section className={styles.profileCard}>
        <div className={styles.profileBanner} />

        <div className={styles.profileHeader}>
          <Avatar
            letter={name || email || "U"}
            variant="profile"
            textColor="primary"
          />

          <div className={styles.identity}>
            {isEditingName ? (
              <input
                ref={nameInputRef}
                className={styles.nameInput}
                value={draftName}
                onChange={(event) => setDraftName(event.target.value)}
                onBlur={() => saveName(draftName)}
                onKeyDown={handleNameKeyDown}
                disabled={isPending}
                aria-label="Nom du profil"
              />
            ) : (
              <h1
                className={styles.editableName}
                onDoubleClick={() => {
                  setDraftName(name);
                  setIsEditingName(true);
                }}
                title="Double-clique pour modifier le nom"
              >
                {name || "Utilisateur"}
              </h1>
            )}
            <p>{email}</p>
            <p className={styles.createdAt}>
              Inscrit le {createdAt ? formatDate(createdAt) : "-"}
            </p>
            {isOrga && <span className={styles.badge}>Organisateur</span>}
          </div>
        </div>

        {isLoading && (
          <p className={styles.emptyState}>Chargement du profil...</p>
        )}
      </section>

      <ProfileSection
        title="Tournois en cours"
        previousLabel="Tournois en cours précédents"
        nextLabel="Tournois en cours suivants"
        onPrevious={() => ongoingSliderRef.current?.go("<")}
        onNext={() => ongoingSliderRef.current?.go(">")}
      >
        {displayOngoingEvents.length === 0 ? (
          <p className={styles.emptyState}>Aucun tournoi disponible.</p>
        ) : (
          <Splide
            options={cardSliderOptions}
            hasTrack={false}
            className={styles.slider}
            ref={ongoingSliderRef}
            aria-label="Slider des tournois en cours"
          >
            <SplideTrack className={styles.sliderTrack}>
              {displayOngoingEvents.map((event) => (
                <SplideSlide key={event.id} className={styles.cardSlide}>
                  <Card
                    id={event.id}
                    icon={<BulbIcon />}
                    name={event.name}
                    date={new Date(event.date)}
                    description={event.description}
                    heure={event.heure}
                    lieu={event.lieu}
                    variant="register"
                    status="ongoing"
                    inscriptionDeadline={new Date(event.date)}
                    rules={event.description}
                    gameId=""
                    createdAt={new Date()}
                    updatedAt={new Date()}
                    isSolo={false}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        )}
      </ProfileSection>

      <ProfileSection
        title="Tournois à venir"
        previousLabel="Tournois à venir précédents"
        nextLabel="Tournois à venir suivants"
        onPrevious={() => upcomingSliderRef.current?.go("<")}
        onNext={() => upcomingSliderRef.current?.go(">")}
      >
        {displayFutureEvents.length === 0 ? (
          <p className={styles.emptyState}>Aucun tournoi à venir.</p>
        ) : (
          <Splide
            options={cardSliderOptions}
            hasTrack={false}
            className={styles.slider}
            ref={upcomingSliderRef}
            aria-label="Slider des tournois à venir"
          >
            <SplideTrack className={styles.sliderTrack}>
              {displayFutureEvents.map((event) => (
                <SplideSlide key={event.id} className={styles.cardSlide}>
                  <Card
                    id={event.id}
                    icon={<BulbIcon />}
                    name={event.name}
                    date={new Date(event.date)}
                    description={event.description}
                    heure={event.heure}
                    lieu={event.lieu}
                    variant="register"
                    status="upcoming"
                    inscriptionDeadline={new Date(event.date)}
                    rules={event.description}
                    gameId=""
                    createdAt={new Date()}
                    updatedAt={new Date()}
                    isSolo={false}
                  />
                </SplideSlide>
              ))}
            </SplideTrack>
          </Splide>
        )}
      </ProfileSection>

      {feedback && (
        <div
          className={`${styles.toast} ${
            feedback.type === "success"
              ? styles.toastSuccess
              : styles.toastError
          }`}
          role="status"
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}
    </main>
  );
}
