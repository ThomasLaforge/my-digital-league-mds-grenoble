"use client";

import { useState } from "react";
import Input from "@/app/components/Input/Input";
import Toggle from "@/app/components/Toggle/Toggle";
import Button from "@/app/components/Button/Button";
import {
  CupIcon,
  ClockIcon,
  JoystickIcon,
  LightbulbIcon,
  MegaphoneIcon,
  RocketIcon,
  DiceIcon,
  GamepadIcon,
  BoltIcon,
  AlienIcon,
  BullseyArrowIcon,
  PlusIcon,
} from "@/app/components/Icons/Icons";
import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const MOCK_CATEGORIES = [
  "FPS",
  "RPG",
  "Platformer",
  "Puzzle",
  "Simulation",
  "Stratégie",
  "Autre",
];
const MOCK_FORMATS = ["Solo", "Duo", "Équipe (3-5)", "Équipe (6+)"];
const MOCK_NIVEAUX = ["Débutant", "Intermédiaire", "Avancé", "Expert"];
const MOCK_MAX_PART = ["50", "100", "200", "500", "1000", "Illimité"];

const errorDateFin =
  "La date et l'heure de fin doivent être postérieures à la date et l'heure de début";

const AVATARS = [
  {
    id: "lightbulb",
    icon: <LightbulbIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "megaphone",
    icon: <MegaphoneIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "rocket",
    icon: <RocketIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "dice",
    icon: <DiceIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "gamepad",
    icon: <GamepadIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "joystick",
    icon: <JoystickIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "bolt",
    icon: <BoltIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "alien",
    icon: <AlienIcon width={22} height={22} color="var(--color-light)" />,
  },
  {
    id: "target",
    icon: (
      <BullseyArrowIcon width={22} height={22} color="var(--color-light)" />
    ),
  },
];

export default function CreerGameJamPage() {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [format, setFormat] = useState("");
  const [niveau, setNiveau] = useState("");
  const [maxPart, setMaxPart] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [avatar, setAvatar] = useState("dice");
  const [publier, setPublier] = useState(false);
  const [inscriptions, setInscriptions] = useState(true);

  const isDateFinInvalid = (): boolean => {
    if (!dateDebut || !heureDebut || !dateFin || !heureFin) return false;
    return (
      new Date(`${dateFin}T${heureFin}`).getTime() <=
      new Date(`${dateDebut}T${heureDebut}`).getTime()
    );
  };

  const duree = (): string => {
    if (!dateDebut || !heureDebut || !dateFin || !heureFin) return "";
    const diff =
      new Date(`${dateFin}T${heureFin}`).getTime() -
      new Date(`${dateDebut}T${heureDebut}`).getTime();
    const h = Math.floor(diff / 3_600_000);
    return h > 0 ? `${h} heures` : "";
  };

  const handleSubmit = () => {
    if (isDateFinInvalid()) return;
    console.log({
      titre,
      description,
      categorie,
      format,
      niveau,
      maxPart,
      dateDebut,
      heureDebut,
      dateFin,
      heureFin,
      avatar,
      publier,
      inscriptions,
    });
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Créer une Game Jam</h1>
        <p>Organisez votre propre compétition de développement de jeux</p>
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
                <h3>Informations générales</h3>
                <p>Les informations principales de votre événement</p>
              </div>
            </div>

            <Input
              label="Titre de l'événement"
              placeholder="Ex: winterGameJam 2025"
              value={titre}
              onChange={setTitre}
              obligatory
            />
            <Input
              label="Description"
              type="textarea"
              placeholder="Décrivez votre game jam en quelques phrases..."
              value={description}
              onChange={setDescription}
              obligatory
            />

            <div className={styles.grid2}>
              <Input
                label="Catégorie"
                type="select"
                value={categorie}
                onChange={setCategorie}
                options={MOCK_CATEGORIES}
                placeholder="Sélectionner une catégorie"
                obligatory
              />
              <Input
                label="Format"
                type="select"
                value={format}
                onChange={setFormat}
                options={MOCK_FORMATS}
                placeholder="Sélectionner un format"
                obligatory
              />
            </div>

            <div className={styles.grid2}>
              <Input
                label="Niveau de difficulté"
                type="select"
                value={niveau}
                onChange={setNiveau}
                options={MOCK_NIVEAUX}
                placeholder="Sélectionner le niveau"
                obligatory
              />
              <Input
                label="Nombre maximum de participants"
                type="select"
                value={maxPart}
                onChange={setMaxPart}
                options={MOCK_MAX_PART}
                placeholder="Ex: 500"
                obligatory
              />
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
                <h3>Dates et horaires</h3>
                <p>Définissez la période de votre événement</p>
              </div>
            </div>

            <div className={styles.grid2}>
              <Input
                label="Date de début"
                type="date"
                value={dateDebut}
                onChange={setDateDebut}
                obligatory
              />
              <Input
                label="Heure de début"
                type="time"
                value={heureDebut}
                onChange={setHeureDebut}
                obligatory
              />
            </div>

            <div className={styles.grid2}>
              <Input
                label="Date de fin"
                type="date"
                value={dateFin}
                onChange={setDateFin}
                obligatory
                error={isDateFinInvalid()}
                errorMessage={errorDateFin}
              />
              <Input
                label="Heure de fin"
                type="time"
                value={heureFin}
                onChange={setHeureFin}
                obligatory
                error={isDateFinInvalid()}
                errorMessage={errorDateFin}
              />
            </div>

            <Input
              label="Durée de l'événement"
              placeholder="Ex : 48 heures"
              value={duree()}
              disabled
            />
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
                <h3>Édition avatar</h3>
                <p>Choisissez dans la galerie</p>
              </div>
            </div>

            <div className={styles.avatarGrid}>
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  type="button"
                  aria-label={av.id}
                  className={`${styles.avatarBtn} ${avatar === av.id ? styles.avatarActive : ""}`}
                  onClick={() => setAvatar(av.id)}
                >
                  {av.icon}
                  {avatar === av.id && (
                    <span className={styles.avatarCheck}>
                      <FontAwesomeIcon icon={faCheck} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>
        </main>

        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Options de publication</h3>
            <Toggle
              id="publier"
              label="Publier immédiatement"
              helperText="Rendre visible publiquement"
              checked={publier}
              onChange={setPublier}
            />
            <Toggle
              id="inscriptions"
              label="Inscriptions ouvertes"
              helperText="Autoriser les inscriptions"
              checked={inscriptions}
              onChange={setInscriptions}
            />
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Conseils</h3>
            <ul className={styles.tips}>
              <li>Choisissez un avatar représentatif</li>
              <li>Définissez des règles claires et précises</li>
              <li>
                Proposez des prix attractifs pour motiver les participants
              </li>
              <li>Prévoyez un planning détaillé avec tous les moments clés</li>
            </ul>
          </div>

          <Button
            label="Publier la Game Jam"
            type="primary"
            fullWidth
            icon={<PlusIcon width={14} height={14} color="currentColor" />}
            iconPosition="left"
            onClick={handleSubmit}
            disabled={isDateFinInvalid()}
          />
        </aside>
      </div>
    </div>
  );
}
