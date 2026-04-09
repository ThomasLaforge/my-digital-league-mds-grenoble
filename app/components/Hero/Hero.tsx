"use client";
import Button from "../Button/Button";
import CardIcon from "../CardIcon/CardIcon";
import { CupIcon, GroupIcon, PodiumIcon } from "../Icons/Icons";
import styles from "./Hero.module.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

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
          <Button type="primary" label="Créer un évenement" />
          <Button type="secondary" label="Rejoindre une team" />
        </div>
      </div>
      <div className={styles.carouselContainer}>
        <Splide
          options={{
            arrows: true,
            pagination: true,
            rewind: true,
            autoplay: true,
            interval: 3000,
          }}
        >
          <SplideSlide className={styles.slide}>
            <CardIcon
              icon={<GroupIcon color="grey" />}
              title="Rassemblez vos coéquipiers"
              subtitle="Faites équipe avec vos amis et participez ensemble à des tournois communautaires !"
            />
          </SplideSlide>
          <SplideSlide className={styles.slide}>
            <CardIcon
              icon={<CupIcon color="grey" />}
              title="Tournois communautaires"
              subtitle="Devenez organisateur et contribuez à bâtir la communauté Rematch"
            />
          </SplideSlide>
          <SplideSlide className={styles.slide}>
            <CardIcon
              icon={<PodiumIcon color="grey" />}
              title="Participez pour gagner des prix"
              subtitle="You will soon be able to compete in tournaments and earn in-game rewards"
            />
          </SplideSlide>
        </Splide>
      </div>
    </div>
  );
}
