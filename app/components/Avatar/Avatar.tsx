import styles from "./Avatar.module.scss";

export type TextColor = "white" | "black" | "primary";

export default function Avatar({
  letter,
  variant,
  textColor = "white",
}: {
  letter: string;
  variant?: "header" | "profile" | "compact";
  textColor?: TextColor;
}) {
  const colorClass = variant === "header" ? "white" : textColor;

  return (
    <div
      className={`${styles.avatarContainer} ${variant ? styles["variant-" + variant] : ""}`}
    >
      <span
        className={`${styles.avatarLetter} ${styles["text-" + colorClass]}`}
      >
        {letter[0]?.toUpperCase()}
      </span>
    </div>
  );
}
