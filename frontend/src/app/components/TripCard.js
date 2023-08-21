import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "@/styles/css-modules/tripcard.module.scss";

export default function TripCard({ trip, changeToDetail }) {
  return (
    <div className={styles.tripCard}>
      <div className={styles.cover}>
        <Link href="/" onClick={changeToDetail}>
          <Image
            src={trip.picture ? trip.picture : " /default-cover.svg"}
            alt="cover"
            fill
            objectFit="cover"
          />
        </Link>
      </div>
      <div className={styles.tripInfo}>
        <div className={styles.tripInfoTop}>
          <h2>{trip.name}</h2>
          <p>目的地：{trip.destination}</p>
        </div>
        <div className={styles.tripInfoBottom}>
          <p>
            日期:{" "}
            {trip.start_date
              ? dayjs(trip.start_date).format("YYYY/MM/DD")
              : "unknown"}{" "}
            ~{" "}
            {trip.end_date
              ? dayjs(trip.end_date).format("YYYY/MM/DD")
              : "unknown"}{" "}
          </p>
          <p>參與人數: {trip.member_count}</p>
        </div>
      </div>
    </div>
  );
}
