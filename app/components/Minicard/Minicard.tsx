import styles from "./Minicard.module.scss";

interface MinicardProps {
  title: string;
  text: string;
}

export default function Minicard(props: MinicardProps) {
  return (
    <div className={styles.minicardContainer}>
      <h3 className={styles.minicardTitle}>{props.title}</h3>
      <div className={styles.minicardText}>{props.text}</div>
    </div>
  );
}
