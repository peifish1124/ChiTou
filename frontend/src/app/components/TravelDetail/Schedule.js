"use client";

import { useState } from "react";
import createAxiosAuth from "@/api/axiosAuth";
import styles from "@/styles/css-modules/traveldetail.module.scss";
import debounce from "@/utils/debounce";

export default function DaySchedules({ schedule }) {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(schedule.is_like || false);
  const [likeCount, setLikeCount] = useState(schedule.like_count || 0);
  const createLike = async (id) => {
    const axiosAuth = createAxiosAuth();
    try {
      const result = await axiosAuth.post(`/schedules/${id}/like`);
      console.log("create like result", result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteLike = async (id) => {
    try {
      const axiosAuth = createAxiosAuth();
      const result = await axiosAuth.delete(`/schedules/${id}/like`);
      console.log("delete like result", result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);

    if (isLiked) {
      deleteLike(schedule.id);
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
    } else {
      createLike(schedule.id);
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
    }
  };
  const debouncedHandleLike = debounce(handleLike, 500);

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
              stroke-width="2.66667"
            />
          ) : (
            // up arrow
            <path
              d="M4.5 11.25L9 6.75L13.5 11.25"
              stroke="#BDBEB9"
              stroke-width="2.66667"
            />
          )}
        </svg>
      </button>
      <div className={styles.vote}>
        <button type="button" onClick={debouncedHandleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            {!isLiked ? (
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke="#BDBEB9"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            ) : (
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                fill="#F44336"
              />
            )}
          </svg>
        </button>

        <div>{likeCount}</div>
      </div>
    </li>
  );
}
