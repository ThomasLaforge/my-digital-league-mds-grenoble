"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Input from "@/app/components/input/Input";
import Radio from "@/app/components/Radio/Radio";
import Button from "@/app/components/Button/Button";
import {
  CalendarIcon,
  ClockIcon,
  LocationIcon,
  TeamIcon,
  CircleQuestionIcon,
  EnvelopIcon,
  ChevronRightIcon,
} from "@/app/components/Icons/Icons";
import styles from "./page.module.scss";

type EventData = {
  id: string;
  name: string;
  date: string;
  inscriptionDeadline: string;
  rules: string | null;
  game: { id: string; title: string };
  _count: { participants: number };
  location?: string | null;
  maxParticipants?: number | null;
  isFree?: boolean | null;
  format?: string | null;
  rewards?: string | null;
};

function InscriptionContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("eventId");

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    registrationType: "team",
    pseudo: "",
    level: "",
  });

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    try {
      const res = await fetch(`/api/events/${eventId}`);
      if (!res.ok) throw new Error("Événement introuvable");
      const data = await res.json();
      setEvent(data);
    } catch {
      setError("Impossible de charger les informations de l'événement.");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      router.push(`/tournois/${eventId}/confirmation`);
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

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <section className={styles.leftColumn}>
          {loading ? (
            <div className={styles.skeleton}>
              <div className={styles.skeletonTitle} />
              <div className={styles.skeletonSubtitle} />
            </div>
          ) : error ? (
            <p className={styles.errorMsg}>{error}</p>
          ) : event ? (
            <>
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
                    <span>{formatDate(event.date)}</span>
                  </div>
                  {event.location && (
                    <div className={styles.eventInfoItem}>
                      <LocationIcon />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {typeof event.maxParticipants === "number" && (
                    <div className={styles.eventInfoItem}>
                      <TeamIcon />
                      <span>
                        {event._count.participants}/{event.maxParticipants}{" "}
                        participants
                      </span>
                    </div>
                  )}
                  <div className={styles.eventInfoItem}>
                    <ClockIcon />
                    <span>
                      Inscription avant le{" "}
                      {formatDateTime(event.inscriptionDeadline)}
                    </span>
                  </div>
                </div>
              </div>

              {event._count.participants <
                (event.maxParticipants ?? Infinity) && (
                <div className={styles.highlightCard}>
                  <div className={styles.highlightHeader}>
                    <CircleQuestionIcon
                      width={16}
                      height={16}
                      color="#FFFFFF"
                    />
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
                <h2 className={styles.cardTitle}>Type d&apos;inscription</h2>

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
                    placeholder="Ex: Débutant, Gold, Diamond…"
                    value={formData.level}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, level: value }))
                    }
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
              </div>
            </>
          ) : null}
        </section>

        <aside className={styles.rightColumn}>
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Informations importantes</h2>

            {loading ? (
              <div className={styles.sidebarSkeleton} />
            ) : event ? (
              <>
                <div className={styles.sidebarBlock}>
                  <div className={styles.sidebarRow}>
                    <span className={styles.sidebarLabel}>Date limite</span>
                    <span className={styles.sidebarValue}>
                      {formatDateTime(event.inscriptionDeadline)}
                    </span>
                  </div>
                </div>

                <div className={styles.sidebarBlock}>
                  <div className={styles.sidebarRow}>
                    <span className={styles.sidebarLabel}>Participation</span>
                    <span className={styles.sidebarValue}>
                      {event.isFree === false ? "Payant" : "Gratuit"}
                    </span>
                  </div>
                </div>

                {event.format && (
                  <div className={styles.sidebarBlock}>
                    <div className={styles.sidebarRowTop}>
                      <span className={styles.sidebarLabel}>Format</span>
                      <span className={styles.sidebarValue}>
                        {event.format}
                      </span>
                    </div>
                  </div>
                )}

                {event.rewards && (
                  <div className={styles.sidebarBlock}>
                    <div className={styles.sidebarRowTop}>
                      <span className={styles.sidebarLabel}>Récompenses</span>
                      <span className={styles.sidebarValue}>
                        {event.rewards}
                      </span>
                    </div>
                  </div>
                )}

                {event.rules && (
                  <div className={styles.sidebarBlock}>
                    <span className={styles.sidebarLabelBlock}>Règlement</span>
                    <p className={styles.rulesText}>{event.rules}</p>
                  </div>
                )}
              </>
            ) : null}

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

export default function InscriptionPage() {
  return (
    <Suspense fallback={null}>
      <InscriptionContent />
    </Suspense>
  );
}
