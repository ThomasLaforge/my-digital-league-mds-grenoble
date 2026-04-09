import styles from "./Roadmap.module.scss";
import { CalendarIcon } from "@/app/components/Icons/Icons";
import { formatDate } from "@/lib/date";

interface RoadmapProps {
  steps: RoadmapStep[];
  title: string;
}

interface RoadmapStep {
  id: string | number;
  title: string;
  description: string;
  date: Date;
  isCompleted?: boolean;
}

export const Roadmap = ({ steps, title }: RoadmapProps) => {
  return (
    <div className={styles.roadmapContainer}>
      <h2 className={styles.title}>{title}</h2>
      {steps.map((step) => {
        const shouldShowUpcomingBadge = step.isCompleted === false;

        return (
          <div key={step.id} className={styles.stepBlock}>
            <div className={styles.leftColumn}>
              <div
                className={`${styles.dot} ${step.isCompleted ? styles.active : ""}`}
              />
              <div
                className={`${styles.verticalLine} ${step.isCompleted ? styles.active : ""}`}
              />
            </div>

            <div className={styles.rightContent}>
              <div className={styles.titleWrapper}>
                <h3 className={styles.title}>{step.title}</h3>
                {/* ÉTIQUETTE CONDITIONNELLE */}
                {shouldShowUpcomingBadge && (
                  <span className={styles.upcomingBadge}>À venir</span>
                )}
              </div>

              <p className={styles.description}>{step.description}</p>

              <div className={styles.dateRow}>
                <CalendarIcon color="#ffffff" />
                <span className={styles.dateText}>
                  {formatDate(step.date)} -{" "}
                  {step.date.toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
