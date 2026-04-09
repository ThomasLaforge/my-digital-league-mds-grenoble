import styles from "./Avatar.module.scss";

export default function Avatar({ letter }: { letter: string }) {
  return (
    <div className={styles.avatarContainer}>
      <span className={styles.avatarLetter}>{letter}</span>
    </div>
  );
}
