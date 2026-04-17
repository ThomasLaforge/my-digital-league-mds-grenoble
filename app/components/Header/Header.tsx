"use client";

import type { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Header.module.scss";
import UserMenu from "./UserMenu";

export default function Header({ session: initialSession }: { session: Session | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: sessionData } = useSession();
  // Utilise la session passée en prop (SSR) en priorité, sinon utilise celle du hook
  const session = initialSession || sessionData;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.containerLogo}>
        <Link href="/">
          <Image
            className={styles.logo}
            src="/logo.svg"
            alt="Logo"
            width={150}
            height={40}
          />
        </Link>
      </div>

      <button
        className={styles.burgerButton}
        type="button"
        aria-label="Menu"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
      >
        <span
          className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}
        ></span>
        <span
          className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}
        ></span>
        <span
          className={isMenuOpen ? styles.buttonOpen : styles.buttonOpen}
        ></span>
      </button>

      <nav className={styles.containerNav} data-open={isMenuOpen}>
        <ul className={styles.nav}>
          <li>
            <Link className={styles.navLink} href="/jeu">
              Jeux
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/tournois">
              Tournois
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/communaute">
              Communauté
            </Link>
          </li>
          <li>
            <Link className={styles.navLink} href="/support">
              Support
            </Link>
          </li>
        </ul>

        <div className={styles.actions}>
          {session?.user ? (
            <UserMenu session={session} />
          ) : (
            <>
              <Button
                fullWidth
                type="primary"
                href="/auth/login"
                label="Connexion"
              />
              <Button
                fullWidth
                type="secondary"
                href="/auth/register"
                label="Inscription"
              />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
