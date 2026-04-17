"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Avatar from "../Avatar/Avatar";
import styles from "./UserMenu.module.scss";
import type { Session } from "next-auth";

export default function UserMenu({ session: initialSession }: { session: Session }) {
  const { data: sessionData } = useSession();
  // Utilise la session passée en prop (SSR) en priorité pour éviter le blinking
  const session = initialSession || sessionData;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!session?.user) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className={styles.userMenu} ref={menuRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-expanded={isMenuOpen}
        aria-label="Menu utilisateur"
      >
        <Avatar
          letter={(session.user.name || session.user.email || "U")[0]}
          variant="compact"
        />
        <svg
          className={styles.dotsIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <p className={styles.userName}>
              {session.user.name || "Utilisateur"}
            </p>
            <p className={styles.userEmail}>{session.user.email}</p>
          </div>

          <div className={styles.divider} />

          <button
            className={styles.profileLink}
            onClick={() => {
              window.location.href = "/profil";
              setIsMenuOpen(false);
            }}
          >
            Mon profil
          </button>

          <button
            className={styles.logoutButton}
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}
