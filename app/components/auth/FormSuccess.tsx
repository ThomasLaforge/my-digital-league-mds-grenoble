import { BsCheckCircle } from "react-icons/bs";
import styles from "./Auth.module.scss";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className={`${styles.message} ${styles.success}`}>
      <BsCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
