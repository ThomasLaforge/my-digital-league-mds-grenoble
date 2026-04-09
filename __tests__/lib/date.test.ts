import { describe, expect, it } from "vitest";

import { calculateDaysUntilEvent, formatDate } from "@/lib/date";

describe("calculateDaysUntilEvent", () => {
  it("retourne 'Aujourd\'hui' pour la même date", () => {
    const today = new Date(2026, 2, 17, 10, 30);
    const eventDate = new Date(2026, 2, 17, 18, 0);

    expect(calculateDaysUntilEvent(eventDate, today)).toBe("Aujourd'hui");
  });

  it("retourne 'un jour' pour le lendemain", () => {
    const today = new Date(2026, 2, 17, 10, 30);
    const eventDate = new Date(2026, 2, 18, 8, 0);

    expect(calculateDaysUntilEvent(eventDate, today)).toBe("un jour");
  });

  it("retourne le nombre de jours au pluriel", () => {
    const today = new Date(2026, 2, 17, 10, 30);
    const eventDate = new Date(2026, 2, 20, 8, 0);

    expect(calculateDaysUntilEvent(eventDate, today)).toBe("3 jours");
  });

  it("retourne 'Aujourd\'hui' pour une date passée", () => {
    const today = new Date(2026, 2, 17, 10, 30);
    const eventDate = new Date(2026, 2, 16, 23, 59);

    expect(calculateDaysUntilEvent(eventDate, today)).toBe("Aujourd'hui");
  });
});

describe("formatDate", () => {
  it("retourne 'Inconnu' pour une date invalide", () => {
    expect(formatDate("invalid-date")).toBe("Inconnu");
  });

  it("formate correctement un objet Date", () => {
    const date = new Date(2026, 2, 17, 10, 30);
    const expected = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    expect(formatDate(date)).toBe(expected);
  });

  it("formate correctement une date string valide", () => {
    const date = "2026-03-17T10:30:00";
    const expected = new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

    expect(formatDate(date)).toBe(expected);
  });
});
