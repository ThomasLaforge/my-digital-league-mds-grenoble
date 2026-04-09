import NextLink from "next/link";
import { ReactNode } from "react";
import styles from "./Link.module.scss";

interface LinkProps {
  href: string;
  children: ReactNode;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} className={styles.link}>
      {children}
    </NextLink>
  );
}
