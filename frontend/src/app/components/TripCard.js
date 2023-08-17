import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/css-modules/tripcard.module.scss";

export default function TripCard({ changeToDetail }) {
  return (
    <div className={styles.tripCard}>
      <div className={styles.cover}>
        <Link href="/" onClick={changeToDetail}>
          <Image src="/default-cover.svg" alt="cover" fill objectFit="cover" />
        </Link>
      </div>
      <div className={styles.tripInfo}>
        <div className={styles.tripInfoTop}>
          <h2>台南小旅行</h2>
          <p>目的地: 台南市</p>
        </div>
        <div className={styles.tripInfoBottom}>
          <p>日期: 2023/08/15 ~ 2023/08/1 </p>
          <p>參與人數: 3</p>
        </div>
      </div>
    </div>
  );
}