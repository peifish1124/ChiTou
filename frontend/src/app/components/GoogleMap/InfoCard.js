"use client";

import Image from "next/image";
import styles from "@/styles/css-modules/googlemap.module.scss";

export default function InfoCard({ setClickPlace }) {
  return (
    <div className={styles.selectPlace}>
      <div className={styles.placeName}>星巴克</div>
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
        <div className={styles.ratingScore}>4.5</div>

        <div className={styles.ratingCount}>{`(1000) `}</div>
      </div>
      <div className={styles.placePic}>
        <Image src="/user-chou.png" alt="starbucks" fill objectFit="cover" />
      </div>
      <div className={styles.placeOperating}>
        <p style={{ color: "green" }}>營業中</p>
        <div className={styles.placeTime}>營業時間：10:00 - 22:00</div>
      </div>
      <div className={styles.funcBtn}>
        <button type="button" className={styles.addBtn}>
          新增
        </button>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={() => setClickPlace(false)}
        >
          取消
        </button>
      </div>
    </div>
  );
}
