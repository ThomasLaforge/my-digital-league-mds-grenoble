"use client";

import styles from "./page.module.scss";
import { CupIcon, ClockIcon, JoystickIcon } from "@/app/components/Icons/Icons";
import Button from "@/app/components/Button/Button";
import { Roadmap } from "@/app/components/Roadmap/Roadmap";
import Minicard from "@/app/components/Minicard/Minicard";
import { FaUser } from "react-icons/fa";

type EventPageClientProps = {
  event: {
    id: string;
    name: string;
    date: string;
    inscriptionDeadline: string;
    rules: string;
    game: { id: string; title: string; description: string | null };
    _count: { participants: number };
  };
};

export default function EventPageClient({ event }: EventPageClientProps) {
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
      title: "Ouverture officielle & Révélation du thème",
      description: "Cérémonie d'ouverture en direct avec l'annonce du thème.",
      date: startDate,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Clôture des inscriptions",
      description:
        "Fin des inscriptions pour les participants souhaitant rejoindre l'événement.",
      date: deadline,
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
                <p>
                  {event.game.description ??
                    "Découvrez cet événement de création de jeux vidéo intensif et rejoignez une communauté de créateurs passionnés."}
                </p>
              </div>
            </div>

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
                  Blocs visuels fixes pour l’instant (en attendant le back).
                </p>
              </div>
            </div>

            <div className={styles.grid2}>
              <Minicard
                title="Gameplay"
                text="Fun, mécaniques de jeu et équilibre"
              />
              <Minicard
                title="Innovation"
                text="Originalité et créativité du concept"
              />
              <Minicard
                title="Art & Design"
                text="Direction artistique et visuelle"
              />
              <Minicard
                title="Audio"
                text="Musique, effets sonores et ambiance"
              />
            </div>
          </section>

          {/* Planning */}
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

          {/* Règles */}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <FaUser width={18} height={18} color="var(--color-icon-dark)" />
              </span>
              <div>
                <h3>Règles de l&apos;événement</h3>
                <p>Les règles officielles définies par l&apos;organisateur.</p>
              </div>
            </div>

            <p className={styles.rules}>{event.rules}</p>
          </section>
        </main>

        {/* Bannière de droite, calquée sur la création */}
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
              label="S'inscrire maintenant"
              type="primary"
              fullWidth
              onClick={() => {
                // TODO: route d'inscription
              }}
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
