"use client";

import Button from "@/app/components/Button/Button";
import { ClockIcon, CupIcon, JoystickIcon } from "@/app/components/Icons/Icons";
import Minicard from "@/app/components/Minicard/Minicard";
import { Roadmap } from "@/app/components/Roadmap/Roadmap";
import { EVENT_LEVEL_OPTIONS, type EventLevel } from "@/lib/event-level";
import { useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import styles from "./page.module.scss";

type EventPageClientProps = {
  event: {
    id: string;
    name: string;
    date: string;
    inscriptionDeadline: string;
    rules: string;
    level?: EventLevel | null;
    game: { id: string; title: string; description: string | null };
    _count: { participants: number };
    isUserRegistered?: boolean;
  };
};

const getLevelLabel = (level?: EventLevel | null) => {
  if (!level) return "Non renseigné";
  return (
    EVENT_LEVEL_OPTIONS.find((option) => option.value === level)?.label ??
    "Non renseigné"
  );
};

export default function DynamicEventPageId({ event }: EventPageClientProps) {
  const router = useRouter();

  const startDate = new Date(event.date);
  const deadline = new Date(event.inscriptionDeadline);

  const formatDate = (d: Date) =>
    d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const roadmapSteps = [
    {
      id: 1,
      title: "Fin des inscriptions",
      description:
        "Clôture des inscriptions avant le lancement officiel de l'événement.",
      date: deadline,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Début de l'événement",
      description: "Lancement officiel de la game jam et début du challenge.",
      date: startDate,
      isCompleted: false,
    },
  ];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>{event.name}</h1>
        <p>Game jam organisée autour du jeu {event.game.title}</p>
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <CupIcon
                  width={18}
                  height={18}
                  color="var(--color-icon-dark)"
                />
              </span>
              <div>
                <h3>À propos de l&apos;événement</h3>
              </div>
            </div>

            <p className={styles.rules}>{event.rules}</p>

            <div className={styles.grid2}>
              <Minicard title="Jeu associé" text={event.game.title} />
              <Minicard
                title="Participants inscrits"
                text={`${event._count.participants} participants`}
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <JoystickIcon
                  width={18}
                  height={18}
                  color="var(--color-icon-dark)"
                />
              </span>
              <div>
                <h3>Catégories de jeu</h3>
                <p>
                  Blocs visuels fixes pour l&apos;instant (en attendant le
                  back).
                </p>
              </div>
            </div>

            <div className={styles.grid2}>
              <Minicard
                title="Catégorie"
                text="Fun, mécaniques de jeu et équilibre"
              />
              <Minicard title="Niveau" text={getLevelLabel(event.level)} />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <ClockIcon
                  width={36}
                  height={36}
                  color="var(--color-icon-dark)"
                />
              </span>
              <div>
                <h3>Planning de l&apos;événement</h3>
                <p>Les grandes étapes clés de votre game jam.</p>
              </div>
            </div>

            <Roadmap title="Planning de l'événement" steps={roadmapSteps} />
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <FaUser color="var(--color-icon-dark)" />
              </span>
              <div>
                <h3>Règles de l&apos;événement</h3>
                <p>Les règles officielles définies par l&apos;organisateur.</p>
              </div>
            </div>

            <p className={styles.rules}>{event.rules}</p>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Rejoignez l&apos;aventure !</h3>
            <ul className={styles.tips}>
              <li>
                Début le {formatDate(startDate)} à {formatTime(startDate)}
              </li>
              <li>
                Clôture des inscriptions le {formatDate(deadline)} à{" "}
                {formatTime(deadline)}
              </li>
              <li>{event._count.participants} participants inscrits</li>
            </ul>

            <Button
              label={
                event.isUserRegistered
                  ? "Modifier mon inscription"
                  : "S'inscrire maintenant"
              }
              type="primary"
              fullWidth
              onClick={() =>
                router.push(`/tournois/inscription?eventId=${event.id}`)
              }
            />
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Organisateur</h3>
            <ul className={styles.tips}>
              <li>GameDev Community</li>
              <li>Organisateur vérifié</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Informations détaillées</h3>
            <ul className={styles.detailList}>
              <li>
                <span>Date</span>
                <span>{formatDate(startDate)}</span>
              </li>
              <li>
                <span>Heure</span>
                <span>{formatTime(startDate)}</span>
              </li>
              <li>
                <span>Inscriptions</span>
                <span>Jusqu&apos;au {formatDate(deadline)}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
