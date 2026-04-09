"use client";

import Link from "next/link";
import styles from "./Auth.module.scss";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h1>Authentification</h1>
        <p>{headerLabel}</p>
      </div>
      <div className={styles.content}>{children}</div>
      <div className={styles.footer}>
        <Link href={backButtonHref}>{backButtonLabel}</Link>
      </div>
    </div>
  );
};
