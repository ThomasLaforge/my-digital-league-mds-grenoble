"use client";

import Card, { BaseCard } from "./components/Card/Card";
import { BulbIcon } from "./components/Icons/Icons";
import { Roadmap } from "./components/Roadmap/Roadmap";

export default function Home() {
  const testSteps = [
    {
      id: "1",
      title: "Ouverture des inscriptions - Révélation du Thème",
      description: "Cérémonie d'ouverture en direct à regarder.",
      isCompleted: true,
      date: "20 Mars",
      heure: "18:00",
      isUpcoming: true,
    },
    {
      id: "2",
      title: "Matchs des ouverrtures - test",
      description: "Phase de poules.",
      date: "21 Mars",
      heure: "19:00",
      isCompleted: true,
    },
    {
      id: "3",
      title: "Ouverture des inscriptions - Révélation du Thème",
      description: "Cérémonie d'ouverture en direct à regarder.",
      isCompleted: true,
      date: "20 Mars",
      heure: "18:00",
    },
    {
      id: "4",
      title: "Ouverture des inscriptions - Révélation du Thème",
      description: "Cérémonie d'ouverture en direct à regarder.",
      isCompleted: true,
      date: "20 Mars",
      heure: "18:00",
    },
  ];

  return (
    <div>
      <main>
        <Roadmap steps={testSteps} title="Roadmap" />
        <section style={{ marginBottom: "3rem" }}>
          <h2>Card register</h2>

          <Card
            id="1"
            variant="register"
            status="ongoing"
            icon={<BulbIcon />}
            name="Rocket League – Aerial Cup"
            description="48 heures pour créer un jeu vidéo en équipe. Créativité, collaboration et passion au rendez-vous."
            date={new Date("2025-01-15T14:00:00")}
            inscriptionDeadline={new Date("2025-01-10T23:59:59")}
            heure="14h00"
            lieu="MyDigitalSchool"
            rules="Be respectful and creative"
            gameId="game1"
            createdAt={new Date()}
            updatedAt={new Date()}
          />
        </section>
        <section style={{ marginBottom: "3rem" }}>
          <h2>Card featured</h2>
          <Card
            id="7"
            variant="featured"
            status="upcoming"
            duration="2 jours"
            animatedBy="Stella @ MyDigitalSchool"
            icon={<BulbIcon />}
            name="Winter Game Jam 2025 – Create & Play"
            description="48 heures pour créer un jeu vidéo en équipe. Créativité, collaboration et passion au rendez-vous."
            date={new Date("2025-02-22T14:00:00")}
            inscriptionDeadline={new Date("2025-02-20T23:59:59")}
            rules="Creative rules"
            gameId="game7"
            createdAt={new Date()}
            updatedAt={new Date()}
          />
        </section>

        <section>
          <h2>Card minimale</h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            <Card
              id="4"
              variant="minimale"
              status="upcoming"
              name="Rassemblez vos coéquipiers"
              description="Formez une équipe et participez ensemble."
              date={new Date("2025-01-15T14:00:00")}
              inscriptionDeadline={new Date("2025-01-10T23:59:59")}
              heure="14h"
              lieu="Campus"
              rules="Team rules"
              gameId="game4"
              createdAt={new Date()}
              updatedAt={new Date()}
            />
          </div>
        </section>
        <section>
          <h2>Base Card</h2>
          <BaseCard />
        </section>
      </main>
    </div>
  );
}
