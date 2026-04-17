"use client";

import { Game } from "@/generated/prisma/client";
import Image from "next/image";
import Link from "next/link";
import Button from "@/app/components/Button/Button";
import {
  JoystickIcon,
  PlusIcon,
  PencilIcon,
} from "@/app/components/Icons/Icons";
import styles from "./page.module.scss";

type DynamicGamesListProps = {
  games: Game[];
  isOrganizer: boolean;
};

export default function DynamicGamesList({
  games,
  isOrganizer,
}: DynamicGamesListProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Tous les Jeux</h1>
        <p>Découvrez nos jeux et participez à des événements</p>
      </header>

      {games.length === 0 ? (
        <div className={styles.empty}>
          <JoystickIcon width={48} height={48} color="var(--color-text-dark)" />
          <p>Aucun jeu disponible pour le moment</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {games.map((game) => (
            <article key={game.id} className={styles.card}>
              {game.imageUrl && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className={styles.image}
                    unoptimized={!game.imageUrl.startsWith("/")}
                  />
                </div>
              )}

              <div className={styles.content}>
                <h3 className={styles.title}>{game.title}</h3>

                {game.description && (
                  <p className={styles.description}>{game.description}</p>
                )}

                <div className={styles.actions}>
                  <Link
                    href={`/tournois?game=${game.id}`}
                    className={styles.linkButton}
                  >
                    <Button
                      label="Voir les événements"
                      type="primary"
                      fullWidth
                    />
                  </Link>
                  {isOrganizer && (
                    <>
                      <Link
                        href={`/organisateur/jeux/modifier/${game.id}`}
                        className={styles.linkButton}
                      >
                        <Button
                          label="Modifier le jeu"
                          type="secondary"
                          icon={
                            <PencilIcon
                              width={14}
                              height={14}
                              color="currentColor"
                            />
                          }
                          iconPosition="left"
                          fullWidth
                        />
                      </Link>
                      <Link
                        href="/organisateur/evenements/creer"
                        className={styles.linkButton}
                      >
                        <Button
                          label="Créer un événement"
                          type="secondary"
                          icon={
                            <PlusIcon
                              width={14}
                              height={14}
                              color="currentColor"
                            />
                          }
                          iconPosition="left"
                          fullWidth
                        />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
