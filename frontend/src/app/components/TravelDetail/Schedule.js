"use client";

import { useState } from "react";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function DaySchedules({ schedule }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li key={schedule.id}>
      <p style={{ width: "25%" }}>{schedule.place}</p>
      <p
        style={{
          width: "25%",
          paddingRight: "calc(25% - 4rem)",
          textAlign: "center",
        }}
      >
        {schedule.duration} hrs
      </p>
      <p className={styles.note}>{schedule.note}</p>
      <button
        className={styles.expandBtn}
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          {!expanded ? (
            <path
              d="M13.5 6.75L9 11.25L4.5 6.75"
              stroke="#BDBEB9"
              stroke-width="2.66667"
            />
          ) : (
            <path
              d="M4.5 11.25L9 6.75L13.5 11.25"
              stroke="#BDBEB9"
              stroke-width="2.66667"
            />
          )}
        </svg>
      </button>
      <div className={styles.vote}>
        <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#BDBEB9"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <div>{schedule.like_count || 0}</div>
        {/* <button type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              fill="#F44336"
            />
          </svg>
        </button> */}
      </div>
    </li>
  );
}
