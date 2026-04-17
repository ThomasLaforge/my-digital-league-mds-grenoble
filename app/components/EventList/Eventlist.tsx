"use client";

import { useState } from "react";
import { BulbIcon } from "../Icons/Icons";
import Card from "../Card/Card";
import styles from "./EventList.module.scss";
import Button from "../Button/Button";
import type { EventWithRegistration } from "@/app/page";

export default function EventsList({
  events,
}: {
  events: EventWithRegistration[];
}) {
  const [showAll, setShowAll] = useState(false);

  const now = new Date();
  // Tournois en cours: la date du tournoi est passée (date <= maintenant)
  const tournaments = events
    .filter((e) => new Date(e.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Prochains tournois: la date du tournoi est dans le futur (date > maintenant)
  const upcomingTournaments = events
    .filter((e) => new Date(e.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const visibleTournaments = showAll ? tournaments : tournaments.slice(0, 6);
  const visibleUpcoming = showAll
    ? upcomingTournaments
    : upcomingTournaments.slice(0, 6);

  const renderEventCard = (event: EventWithRegistration) => {
    const eventDate = new Date(event.date);
    const deadline = new Date(event.inscriptionDeadline);

    return (
      <Card
        key={event.id}
        id={event.id}
        variant={deadline < now ? "register" : "featured"}
        status={deadline < now ? "ongoing" : "upcoming"}
        duration="5 heures"
        animatedBy="Admin @ MyDigitalSchool"
        icon={<BulbIcon />}
        name={event.name}
        description={event.rules}
        date={eventDate}
        inscriptionDeadline={deadline}
        heure={eventDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        lieu="MyDigitalSchool Grenoble"
        rules={event.rules}
        gameId={event.gameId}
        createdAt={new Date(event.createdAt)}
        updatedAt={new Date(event.updatedAt)}
        isSolo={event.isSolo}
        isRegistered={event.isUserRegistered}
      />
    );
  };

  return (
    <div className={styles.container}>
      {tournaments.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Tournois en cours</h2>
          <div className={styles.listContainer}>
            {visibleTournaments.map(renderEventCard)}
          </div>
          {tournaments.length > 6 && (
            <Button
              label={showAll ? "Voir moins" : "Voir plus"}
              onClick={() => setShowAll(!showAll)}
              type="primary"
            />
          )}
        </>
      )}

      {upcomingTournaments.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Prochains tournois</h2>
          <div className={styles.listContainer}>
            {visibleUpcoming.map(renderEventCard)}
          </div>
          {upcomingTournaments.length > 6 && (
            <Button
              label={showAll ? "Voir moins" : "Voir plus"}
              onClick={() => setShowAll(!showAll)}
              type="primary"
            />
          )}
        </>
      )}
    </div>
  );
}
