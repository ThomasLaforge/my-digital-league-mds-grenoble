export function calculateDaysUntilEvent(
  eventDate: Date,
  currentDate: Date = new Date()
): string {
  const today = new Date(currentDate);
  today.setHours(0, 0, 0, 0);

  const event = new Date(eventDate);
  event.setHours(0, 0, 0, 0);

  const diffTime = event.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Aujourd'hui";
  if (diffDays === 1) return "un jour";
  return `${diffDays} jours`;
}

export function formatDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  if (Number.isNaN(parsedDate.getTime())) {
    return "Inconnu";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsedDate);
}
