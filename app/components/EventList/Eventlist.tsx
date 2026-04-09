"use client";

import { useState } from "react";
import { BulbIcon } from "../Icons/Icons";
import Card from "../Card/Card";
import styles from "./EventList.module.scss";
import Button from "../Button/Button";
import { EventWithGame } from "@/app/tournois/inscription/page";

export default function EventsList({ events }: { events: EventWithGame[] }) {
  const [showAll, setShowAll] = useState(false);

  const visibleEvents = showAll ? events : events.slice(0, 6);

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

      {events.length > 6 && (
        <Button
          label={showAll ? "Voir moins" : "Voir plus"}
          onClick={() => setShowAll(!showAll)}
          type="primary"
        />
      )}
    </div>
  );
}
