"use client";

import styles from "./Header.module.scss";
import Button from "../Button/Button";
import UserMenu from "./UserMenu";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

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
            <a className={styles.navLink} href="/jeu">
              Jeu
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="/tournois">
              Tournois
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="/communaute">
              Communauté
            </a>
          </li>
          <li>
            <a className={styles.navLink} href="/support">
              Support
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          {session?.user ? (
            <UserMenu />
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
