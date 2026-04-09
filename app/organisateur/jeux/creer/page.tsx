"use client";

import Button from "@/app/components/Button/Button";
import { BulbIcon, JoystickIcon, PlusIcon } from "@/app/components/Icons/Icons";
import Input from "@/app/components/Input/Input";
import { Game } from "@/generated/prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function CreerJeuPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [titleExists, setTitleExists] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!title.trim()) {
      setTitleExists(false);
      return;
    }

    const checkTitle = async () => {
      setIsChecking(true);
      try {
        const response = await fetch(
          `/api/games?search=${encodeURIComponent(title)}`
        );
        if (response.ok) {
          const games = await response.json();
          const exists = games.some(
            (g: Game) => g.title.toLowerCase() === title.trim().toLowerCase()
          );
          setTitleExists(exists);
        }
      } catch (err) {
        console.error("Error checking game title:", err);
      } finally {
        setIsChecking(false);
      }
    };

    const timeoutId = setTimeout(checkTitle, 500);
    return () => clearTimeout(timeoutId);
  }, [title]);

  const handleSubmit = async () => {
    if (!title) {
      setError("Le titre est requis");
      return;
    }

    if (titleExists) {
      setError("Ce jeu existe déjà");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title.trim(),
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue");
      }

      router.push("/jeu");
      router.refresh();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur est survenue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Ajouter un Jeu</h1>
        <p>Référencez un nouveau jeu pour vos futurs événements</p>
      </header>

      <div className={styles.layout}>
        <main className={styles.main}>
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIcon}>
                <JoystickIcon
                  width={22}
                  height={22}
                  color="var(--color-icon-dark)"
                />
              </span>
              <div>
                <h3>Informations du jeu</h3>
                <p>Les informations principales du jeu</p>
              </div>
            </div>

            {error && (
              <p style={{ color: "var(--color-error)", fontSize: "1.4rem" }}>
                {error}
              </p>
            )}

            <Input
              label="Nom du jeu"
              placeholder="Ex: Counter-Strike 2, League of Legends..."
              value={title}
              onChange={setTitle}
              obligatory
              error={titleExists}
              errorMessage="Ce jeu est déjà répertorié"
            />
            {isChecking && (
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "var(--color-text-dark)",
                  marginTop: "-1rem",
                  marginBottom: "1rem",
                }}
              >
                Vérification de la disponibilité...
              </p>
            )}

            <Input
              label="Description"
              type="textarea"
              placeholder="Une courte description du jeu..."
              value={description}
              onChange={setDescription}
            />
          </section>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <BulbIcon width={18} height={18} color="var(--color-primary)" />
              <h3 className={styles.cardTitle}>Conseils</h3>
            </div>
            <ul className={styles.tips}>
              <li>Utilisez le nom officiel du jeu</li>
              <li>Précisez la version si nécessaire</li>
              <li>Une description claire aide les participants</li>
            </ul>
          </div>

          <Button
            label={isLoading ? "Création..." : "Ajouter le jeu"}
            type="primary"
            fullWidth
            icon={<PlusIcon width={14} height={14} color="currentColor" />}
            iconPosition="left"
            onClick={handleSubmit}
            disabled={isLoading || !title || titleExists || isChecking}
          />
        </aside>
      </div>
    </div>
  );
}
