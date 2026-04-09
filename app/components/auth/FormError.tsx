// Assuming radix icons or I can use react-icons if I installed it.
import { BsExclamationTriangle } from "react-icons/bs";
import styles from "./Auth.module.scss";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className={`${styles.message} ${styles.error}`}>
      <BsExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
