import { CardWrapper } from "../../../app/components/auth/CardWrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import styles from "./Auth.module.scss";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className={styles.header}>
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};
