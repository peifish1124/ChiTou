"use client";

import Image from "next/image";
import styles from "@/styles/css-modules/googlemap.module.scss";

export default function InfoCard({ placeDetails, setPlaceDetails }) {
  return (
    <div className={styles.selectPlace}>
      <div className={styles.placeName}>{placeDetails.name}</div>
      <div className={styles.placeRating}>
        <div className={styles.ratingStar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 0L12.2452 6.47214H19.7553L13.4904 10.4721L15.7356 16.9443L10 12.9443L4.26438 16.9443L6.50958 10.4721L0.244721 6.47214H7.75479L10 0Z"
              fill="#FFC107"
            />
          </svg>
        </div>
        <div className={styles.ratingTitle}>評分</div>
        <div className={styles.ratingScore}>{placeDetails.rating}</div>

        <div className={styles.ratingCount}>
          ({placeDetails.user_ratings_total})
        </div>
      </div>
      <div className={styles.placePic}>
        <Image
          src={placeDetails.photos[0].getUrl()}
          alt={placeDetails.name}
          fill
          objectFit="cover"
        />
      </div>
      <div className={styles.placeOperating}>
        {placeDetails.current_opening_hours ? (
          <div
            style={{
              color: placeDetails.current_opening_hours.open_now
                ? "green"
                : "red",
            }}
          >
            {placeDetails.current_opening_hours.open_now ? "營業中" : "休息中"}
          </div>
        ) : (
          <div>營業時間資訊不可用</div>
        )}
        <div className={styles.placeTime}>
          {placeDetails.current_opening_hours
            ? `營業時間：${placeDetails.current_opening_hours.periods[0].open.time} - ${placeDetails.current_opening_hours.periods[0].close.time}`
            : ""}
        </div>
      </div>
      <div className={styles.funcBtn}>
        <button type="button" className={styles.addBtn}>
          新增
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setPlaceDetails(null)}
        >
          取消
        </button>
      </div>
    </div>
  );
}
