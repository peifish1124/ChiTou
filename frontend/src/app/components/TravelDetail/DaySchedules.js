"use client";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Schedule from "./Schedule";
import styles from "@/styles/css-modules/traveldetail.module.scss";
import useGetWeather from "@/hooks/useGetWeather";
import formatTemperatureRange from "@/utils/formatTemperatureRange";
import formatRainProbability from "@/utils/formatRainProbability";
import formatWeatherText from "@/utils/formatWeatherText";
import WeatherIcon from "@/components/WeatherIcon";

export default function DaySchedules({
  startDate,
  tripDay,
  daySchedules,
  destination,
}) {
  const [expanded, setExpanded] = useState(true);
  const [weatherInfoVisible, setWeatherInfoVisible] = useState(false);
  const targetDate = dayjs(startDate).add(tripDay - 1, "day");
  const sortedDaySchedules = [...daySchedules].sort(
    (a, b) => a.sequence - b.sequence,
  );
  // Fetch weather data
  const { getWeather } = useGetWeather();
  const [weatherData, setWeatherData] = useState("");
  useEffect(async () => {
    try {
      const results = await getWeather(
        targetDate.format("YYYY-MM-DD"),
        destination,
      );
      setWeatherData(results);
      // console.log("results", results);
    } catch (error) {
      // console.error("Error fetching weather data:", error);
    }
  }, []);

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
        <button type="button" className={styles.weather}>
          <Image
            src="/weather.png"
            width={30}
            height={30}
            alt="weather icon"
            onClick={toggleWeatherInfo}
          />
        </button>
      </div>
      {/* Weather information */}
      {weatherInfoVisible && (
        <div className={styles.weatherInfoCard}>
          <div className={styles.temperatureBox}>
            <WeatherIcon weatherText={weatherData.summary} />
            <h2>{destination}</h2>
            <p>{formatTemperatureRange(weatherData.temperature)}</p>
          </div>
          <div className={styles.weatherInfoBox}>
            <div className={styles.threeWeather}>
              <div className={styles.threeWeatherItem}>
                <div className={styles.threeWeatherItemInfo}>
                  <p>降雨機率</p>
                  <h2>{formatRainProbability(weatherData.PoP)}</h2>
                </div>
                <Image src="/rain2.svg" width={30} height={30} alt="rain" />
              </div>
              <div className={styles.threeWeatherItem}>
                <div className={styles.threeWeatherItemInfo}>
                  <p>相對濕度</p>
                  <h2>{formatRainProbability(weatherData.humidity)}</h2>
                </div>
                <Image src="/temp2.svg" width={30} height={30} alt="humidity" />
              </div>
              <div className={styles.threeWeatherItem}>
                <div className={styles.threeWeatherItemInfo}>
                  <p>風速</p>
                  <h2>{formatWeatherText(weatherData.wind).windSpeed}m/s</h2>
                </div>
                <Image src="/wind2.svg" width={30} height={30} alt="wind" />
              </div>
            </div>
            <div className={styles.weatherSummary}>
              <p>天氣總結: {weatherData.summary}</p>
              <p>體感描述: {weatherData.feeling}</p>
            </div>
          </div>
        </div>
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
