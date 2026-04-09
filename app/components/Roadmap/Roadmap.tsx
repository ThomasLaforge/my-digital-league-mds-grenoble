import styles from "./Roadmap.module.scss";
import { RoadmapStep } from "./Roadmap.types";
import { CalendarIcon } from "../Icons/Icons";
import { formatDate } from "../../../lib/date";

interface RoadmapProps {
  steps: RoadmapStep[];
  title: string;
}

export const Roadmap = ({ steps, title }: RoadmapProps) => {
  return (
    <div className={styles.roadmapContainer}>
      <h2 className={styles.title}>{title}</h2>
      {steps.map((step) => (
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
              {step.isUpcoming && (
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
      ))}
    </div>
  );
};
