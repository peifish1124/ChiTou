"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
  const [travelInfoList, setTravelInfoList] = useState([]);

  useEffect(() => {
    if (sortedDaySchedules.length <= 1) return;

    const processSchedules = async () => {
      const travel = [];

      const promises = [];

      for (let i = 0; i < sortedDaySchedules.length - 1; i += 1) {
        const originPlace = encodeURIComponent(sortedDaySchedules[i].place);
        const destinationPlace = encodeURIComponent(
          sortedDaySchedules[i + 1].place,
        );
        const apiUrl = `/api/googlemap?origin=${originPlace}&destination=${destinationPlace}`;

        const promise = axios
          .get(apiUrl)
          .then((response) => {
            const { data } = response;
            const { distance } = data.data.routes[0].legs[0];
            const { duration } = data.data.routes[0].legs[0];
            const { text: distanceText } = distance;
            const { text: durationText } = duration;
            const travelInfo = {
              originPlace: sortedDaySchedules[i].place,
              distance: distanceText,
              duration: durationText,
            };
            console.log(travelInfo);
            travel.push(travelInfo);
          })
          .catch((error) => {
            console.error(error);
            travel.push({
              originPlace: sortedDaySchedules[i].place,
              distance: "未知",
              duration: "未知",
            });
          });

        promises.push(promise);
      }

      await Promise.all(promises);

      setTravelInfoList(travel);
    };

    processSchedules();
  }, []);
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
          <ul className={styles.timeline}>
            {sortedDaySchedules.map((schedule, index) => (
              <>
                <Schedule key={schedule.id} schedule={schedule} />
                {index < sortedDaySchedules.length - 1 && (
                  <li
                    className={styles.travelInfo}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`info-${index}`}
                  >
                    <p style={{ width: "46%", textAlign: "end" }}>
                      {travelInfoList[index]?.duration || "loading..."}
                    </p>
                    <p
                      style={{
                        width: "52%",
                        textAlign: "start",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M2 5.33333L3.81458 6.84547C3.93439 6.94533 4.08541 7 4.24137 7H11.7586C11.9146 7 12.0656 6.94533 12.1854 6.84547L14 5.33333M4.33333 9.33333H4.34M11.6667 9.33333H11.6733M5.44043 3H10.5596C11.0381 3 11.4799 3.25638 11.7172 3.67181L13.6487 7.0518C13.8789 7.45473 14 7.91073 14 8.37487V12.3333C14 12.7015 13.7015 13 13.3333 13H12.6667C12.2985 13 12 12.7015 12 12.3333V11.6667H4V12.3333C4 12.7015 3.70152 13 3.33333 13H2.66667C2.29848 13 2 12.7015 2 12.3333V8.37487C2 7.91073 2.12111 7.45473 2.35135 7.0518L4.28277 3.67181C4.52016 3.25638 4.96195 3 5.44043 3ZM4.66667 9.33333C4.66667 9.5174 4.51743 9.66667 4.33333 9.66667C4.14924 9.66667 4 9.5174 4 9.33333C4 9.14927 4.14924 9 4.33333 9C4.51743 9 4.66667 9.14927 4.66667 9.33333ZM12 9.33333C12 9.5174 11.8507 9.66667 11.6667 9.66667C11.4826 9.66667 11.3333 9.5174 11.3333 9.33333C11.3333 9.14927 11.4826 9 11.6667 9C11.8507 9 12 9.14927 12 9.33333Z"
                          stroke="#A3A2A2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {travelInfoList[index]?.distance || "loading..."}
                    </p>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
