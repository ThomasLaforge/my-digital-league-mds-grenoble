"use client";

import { useState, useEffect } from "react";
import { BulbIcon } from "../Icons/Icons";
import Card from "../Card/Card";
import styles from "./EventList.module.scss";
import Button from "../Button/Button";

type EventType = {
  id: string;
  name: string;
  rules: string;
  date: string;
  inscriptionDeadline: string;
  createdAt: string;
  updatedAt: string;
  game: { id: string; title: string };
};

export default function EventsList() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) =>
        console.error("Erreur lors du chargement des événements :", err)
      );
  }, []);

  const visibleEvents = showAll ? events : events.slice(0, 1);

  return (
    <div className={styles.container}>
      <div className={styles.listContainer}>
        {visibleEvents.map((event) => {
          const eventDate = new Date(event.date);
          const deadline = new Date(event.inscriptionDeadline);
          const now = new Date();

          return (
            <Card
              key={event.id}
              id={event.id}
              variant={deadline < now ? "register" : "featured"}
              status={deadline < now ? "upcoming" : "ongoing"}
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
              gameId={event.game.id}
              createdAt={new Date(event.createdAt)}
              updatedAt={new Date(event.updatedAt)}
            />
          );
        })}
      </div>

      {events.length > 1 && (
        <Button
          label={showAll ? "Voir moins" : "Voir plus"}
          onClick={() => setShowAll(!showAll)}
          type="primary"
        />
      )}
    </div>
  );
}
