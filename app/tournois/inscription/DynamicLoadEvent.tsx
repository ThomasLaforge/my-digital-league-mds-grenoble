"use client";

import Button from "@/app/components/Button/Button";
import {
  CalendarIcon,
  ChevronRightIcon,
  CircleQuestionIcon,
  ClockIcon,
  EnvelopIcon,
} from "@/app/components/Icons/Icons";
import Input from "@/app/components/Input/Input";
import Radio from "@/app/components/Radio/Radio";
import { EventWithGame } from "@/app/tournois/inscription/page";
import { Participant } from "@/generated/prisma/client";
import { EVENT_LEVEL_OPTIONS } from "@/lib/event-level";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

type DynamicLoadEventProps = {
  eventId: string | null;
  event: EventWithGame | null;
};

export default function DynamicLoadEvent({
  eventId,
  event,
}: DynamicLoadEventProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [existingParticipant, setExistingParticipant] =
    useState<Participant | null>(null);
  const [formData, setFormData] = useState({
    registrationType: "team",
    pseudo: "",
    level: "",
  });

  useEffect(() => {
    const checkRegistration = async () => {
      if (!eventId || !session?.user?.id) return;

      try {
        const res = await fetch(`/api/events/${eventId}/participants`);
        const participants = await res.json();
        const userParticipant = participants.find(
          (p: Participant) => p.userId === session.user.id
        );
        setExistingParticipant(userParticipant || null);
      } catch {
        console.error("Erreur lors de la vérification de l'inscription");
      }
    };

    checkRegistration();
  }, [eventId, session?.user?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return;
    if (!formData.pseudo.trim()) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/events/${eventId}/participants`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pseudo: formData.pseudo,
          level: formData.level || null,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Une erreur est survenue.");
        return;
      }

      router.push(`/tournois/${eventId}`);
    } catch {
      setSubmitError("Une erreur réseau est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnregister = async () => {
    if (!existingParticipant) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch(`/api/participants/${existingParticipant.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setSubmitError(data.error || "Une erreur est survenue.");
        return;
      }

      setExistingParticipant(null);
      router.refresh();
    } catch {
      setSubmitError("Une erreur réseau est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatDateTime = (iso: string) =>
    new Date(iso).toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!eventId) {
    return (
      <main className={styles.main}>
        <p className={styles.errorMsg}>Aucun événement sélectionné.</p>
      </main>
    );
  }

  if (!event) {
    return (
      <main className={styles.main}>
        <p className={styles.errorMsg}>
          Impossible de charger les informations de l&apos;événement.
        </p>
      </main>
    );
  }

  const inscriptionLimit = event.inscriptionDeadline ?? event.date;
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.leftColumn}>
          <div className={styles.hero}>
            <h1 className={styles.title}>Inscription au tournoi</h1>
            <p className={styles.subtitle}>
              {event.name} – {event.game.title}
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>
              Informations de l&apos;événement
            </h2>
            <div className={styles.eventInfos}>
              <div className={styles.eventInfoItem}>
                <CalendarIcon />
                <span>{formatDate(event.date.toString())}</span>
              </div>
              <div className={styles.eventInfoItem}>
                <ClockIcon />
                <span>
                  Inscription avant le{" "}
                  {formatDateTime(inscriptionLimit.toString())}
                </span>
              </div>
            </div>
          </div>

          {!event.isSolo && (
            <div className={styles.highlightCard}>
              <div className={styles.highlightHeader}>
                <CircleQuestionIcon width={16} height={16} color="#FFFFFF" />
                <h2 className={styles.highlightTitle}>
                  Recherche d&apos;équipe activée
                </h2>
              </div>
              <p className={styles.highlightText}>
                Vous serez inscrit en tant que participant en recherche
                d&apos;équipe. Vous pourrez être contacté par d&apos;autres
                joueurs pour compléter leurs équipes.
              </p>
            </div>
          )}

          <div className={styles.formCard}>
            {existingParticipant ? (
              <>
                <div className={styles.alreadyRegisteredMessage}>
                  <p>
                    Déjà inscrit en tant que{" "}
                    <strong>{existingParticipant.pseudo}</strong>
                  </p>
                </div>

                {submitError && (
                  <p className={styles.submitError}>{submitError}</p>
                )}

                <div className={styles.separator} />

                <div className={styles.submitRow}>
                  <Button
                    label={
                      submitting ? "Désinscription en cours…" : "Se désinscrire"
                    }
                    type="primary"
                    disabled={submitting}
                    onClick={handleUnregister}
                  />
                </div>
              </>
            ) : (
              <>
                {!event.isSolo && (
                  <>
                    <h2 className={styles.cardTitle}>
                      Type d&apos;inscription
                    </h2>

                    <div className={styles.registrationTypeRow}>
                      {[
                        { label: "Inscription équipe", value: "team" },
                        { label: "Inscription solo", value: "solo" },
                      ].map((item) => (
                        <Radio
                          key={item.value}
                          label={item.label}
                          name="registrationType"
                          value={item.value}
                          checked={formData.registrationType === item.value}
                          onChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              registrationType: item.value,
                            }))
                          }
                        />
                      ))}
                    </div>
                  </>
                )}

                <h3 className={styles.sectionTitle}>Vos informations</h3>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <Input
                    label="Pseudo in-game"
                    placeholder="Votre pseudo"
                    value={formData.pseudo}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, pseudo: value }))
                    }
                    obligatory
                  />

                  <Input
                    label="Niveau de jeu"
                    type="select"
                    value={formData.level}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, level: value }))
                    }
                    options={EVENT_LEVEL_OPTIONS}
                    placeholder="Sélectionner le niveau"
                  />

                  {submitError && (
                    <p className={styles.submitError}>{submitError}</p>
                  )}

                  <div className={styles.separator} />

                  <div className={styles.submitRow}>
                    <Button
                      label={
                        submitting
                          ? "Inscription en cours…"
                          : "Confirmer l'inscription"
                      }
                      type="primary"
                      disabled={submitting || !formData.pseudo.trim()}
                    />
                  </div>
                </form>
              </>
            )}
          </div>
        </section>

        <aside className={styles.rightColumn}>
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Informations importantes</h2>

            <div className={styles.sidebarBlock}>
              <div className={styles.sidebarRow}>
                <span className={styles.sidebarLabel}>Date limite</span>
                <span className={styles.sidebarValue}>
                  {formatDateTime(inscriptionLimit.toString())}
                </span>
              </div>
            </div>

            {event.rules && (
              <div className={styles.sidebarBlock}>
                <span className={styles.sidebarLabelBlock}>Règlement</span>
                <p className={styles.rulesText}>{event.rules}</p>
              </div>
            )}

            <div className={styles.sidebarBlock}>
              <span className={styles.sidebarLabelBlock}>Documents</span>
              <div className={styles.documentsList}>
                <a href="#" className={styles.documentLink}>
                  <ChevronRightIcon width={10} height={10} color="#D8D9E0" />
                  <span>Règlement complet</span>
                </a>
                <a href="#" className={styles.documentLink}>
                  <ChevronRightIcon width={10} height={10} color="#D8D9E0" />
                  <span>Planning de l&apos;événement</span>
                </a>
                <a href="#" className={styles.documentLink}>
                  <ChevronRightIcon width={10} height={10} color="#D8D9E0" />
                  <span>Guide de préparation</span>
                </a>
              </div>
            </div>

            <div className={styles.helpBlock}>
              <h3 className={styles.helpTitle}>Besoin d&apos;aide ?</h3>
              <Button
                label="Contacter l'organisateur"
                type="tertiary"
                icon={<EnvelopIcon width={16} height={16} color="#FFFFFF" />}
                fullWidth
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
