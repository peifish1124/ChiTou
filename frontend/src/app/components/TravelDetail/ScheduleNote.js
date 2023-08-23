"use client";

import { useState } from "react";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function ScheduleNote({ schedule }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className={`${styles.note} ${expanded ? styles.expand : ""}`}>
        {schedule.note}
      </p>
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
            // down arrow
            <path
              d="M13.5 6.75L9 11.25L4.5 6.75"
              stroke="#BDBEB9"
              strokeWidth="2.66667"
            />
          ) : (
            // up arrow
            <path
              d="M4.5 11.25L9 6.75L13.5 11.25"
              stroke="#BDBEB9"
              strokeWidth="2.66667"
            />
          )}
        </svg>
      </button>
    </>
  );
}
