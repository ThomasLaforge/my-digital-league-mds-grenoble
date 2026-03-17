"use client";
import Button from "../Button/Button";
import CardIcon from "../CardIcon/CardIcon";
import { TeamIcon } from "../Icons/Icons";
import styles from "./Hero.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.mainContent}>
        <p className={styles.gameYear}>Tournoi 2026</p>
        <h2 className={styles.heroTitle}>MyDigitalLeague</h2>
        <p className={styles.heroDesc}>
          <span>
            Rejoignez la communauté gaming de MyDigitalSchool Grenoble.
          </span>
          <span>
            Créez, participez et vivez des événements esports inoubliables.
          </span>
        </p>
        <div className={styles.buttons}>
          <Button type="primary" label="Créer une compétition" />
          <Button type="secondary" label="Rejoindre une team" />
        </div>
      </div>
      <div>
        <Splide options={{}}>
          <SplideSlide>
            <CardIcon
              icon={<TeamIcon />}
              titre="Rassemblez vos coéquipiers"
              sousTitre="Faites équipe avec vos amis et affrontez d'autres équipes dans des tournois palpitants."
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
}
