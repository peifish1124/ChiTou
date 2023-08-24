"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Schedule from "./Schedule";
import styles from "@/styles/css-modules/traveldetail.module.scss";
import useGetWeather from "@/hooks/useGetWeather";
import WeatherInfoCard from "../WeatherInfoCard";

export default function DaySchedules({
  startDate,
  tripDay,
  daySchedules,
  destination,
}) {
  const [expanded, setExpanded] = useState(true);
  const [weatherIconVisible, setWeatherIconVisible] = useState(true);
  const [weatherInfoVisible, setWeatherInfoVisible] = useState(false);
  const targetDate = dayjs(startDate).add(tripDay - 1, "day");
  const sortedDaySchedules = [...daySchedules].sort(
    (a, b) => a.sequence - b.sequence,
  );
  // Fetch weather data
  const { getWeather } = useGetWeather();
  const [weatherData, setWeatherData] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const currentDate = dayjs();
    const sixDaysFromNow = currentDate.add(6, "days");
    if (
      targetDate.isBefore(currentDate) ||
      targetDate.isAfter(sixDaysFromNow)
    ) {
      setWeatherIconVisible(false);
      return () => {
        isMounted = false;
      };
    }
    const fetchWeather = async () => {
      try {
        const results = await getWeather(
          targetDate.format("YYYY-MM-DD"),
          destination,
        );
        if (isMounted) {
          setWeatherData(results);
        }
      } catch (error) {
        if (isMounted) {
          setWeatherData(null);
        }
        // Handle error
      }
    };
    fetchWeather();
    return () => {
      isMounted = false;
    };
  }, []);
  // console.log(weatherData);

  const toggleWeatherInfo = () => {
    setWeatherInfoVisible(!weatherInfoVisible);
  };
  return (
    <div className={styles.daySchedules}>
      <div className={styles.daySchedules__header}>
        <div className={styles.daySchedules__title}>
          <h2>
            {`Day 
          ${tripDay} (
          ${targetDate.format("MM/DD")} )`}
          </h2>
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
        {weatherIconVisible && (
          <button type="button" className={styles.weather}>
            <Image
              src="/weather.png"
              width={30}
              height={30}
              alt="weather icon"
              onClick={toggleWeatherInfo}
            />
          </button>
        )}
      </div>
      {/* Weather information */}
      {weatherInfoVisible &&
        weatherData &&
        Object.keys(weatherData).length > 0 && (
          <WeatherInfoCard
            destination={destination}
            weatherData={weatherData}
          />
        )}
      {expanded && (
        <>
          <div className={styles.schedule__key}>
            <p style={{ width: "25%", fontWeight: "700" }}>地點</p>
            <p style={{ width: "25%", fontWeight: "700" }}>停留時間</p>
            <p style={{ width: "50%", fontWeight: "700" }}>備註</p>
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
