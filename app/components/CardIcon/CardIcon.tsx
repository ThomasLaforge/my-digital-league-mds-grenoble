import { ReactNode } from "react";
import styles from "./CardIcon.module.scss";

interface CardIconProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function CardIcon(props: CardIconProps) {
  return (
    <div className={styles.cardIconContainer}>
      <div className={styles.cardIcon}>{props.icon}</div>
      <div className={styles.cardIconTitle}>{props.title}</div>
      <div className={styles.cardIconSubtitle}>{props.subtitle}</div>
    </div>
  );
}
