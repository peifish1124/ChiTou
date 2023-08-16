"use client";

import { useState } from "react";
import dayjs from "dayjs";
import Schedule from "./Schedule";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function DaySchedules({ startDate, tripDay, daySchedules }) {
  const [expanded, setExpanded] = useState(true);
  const targetDate = dayjs(startDate).add(tripDay - 1, "day");
  const sortedDaySchedules = [...daySchedules].sort(
    (a, b) => a.sequence - b.sequence,
  );
  return (
    <div className={styles.daySchedules}>
      <div className={styles.daySchedules__header}>
        <h2>
          {`Day 
        ${tripDay} (
        ${targetDate.format("MM/DD")} )`}
        </h2>
        <div className={styles.weather}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path d="M6.875 6.875H23.125V23.125H6.875V6.875Z" fill="#FF9800" />
            <path
              d="M3.74994 15.0002L14.9998 3.74992L26.2501 14.9998L15.0002 26.2501L3.74994 15.0002Z"
              fill="#FF9800"
            />
            <path
              d="M8.125 15C8.125 18.7981 11.2019 21.875 15 21.875C18.7975 21.875 21.875 18.7981 21.875 15C21.875 11.2019 18.7975 8.125 15 8.125C11.2019 8.125 8.125 11.2019 8.125 15Z"
              fill="#FFEB3B"
            />
          </svg>
        </div>
        <button
          type="button"
          className={styles.daySchedules__header__button}
          onClick={() => setExpanded(!expanded)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            {expanded ? (
              // up arrow
              <path
                d="M5 12.5L10 7.5L15 12.5"
                stroke="#525252"
                stroke-width="2.66667"
              />
            ) : (
              // down arrow
              <path
                d="M15 7.5L10 12.5L5 7.5"
                stroke="#525252"
                stroke-width="2.66667"
              />
            )}
          </svg>
        </button>
      </div>
      {expanded && (
        <>
          <div className={styles.schedule__key}>
            <p style={{ width: "25%" }}>地點</p>
            <p style={{ width: "25%" }}>停留時間</p>
            <p style={{ width: "50%" }}>備註</p>
          </div>
          <ul class={styles.timeline}>
            {sortedDaySchedules.map((schedule) => (
              <Schedule key={schedule.id} schedule={schedule} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
