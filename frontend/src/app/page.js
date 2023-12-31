"use client";

import { useState } from "react";
import Image from "next/image";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Nav from "@/components/Nav";
import SearchTripCard from "@/components/SearchTripCard";
import TripCard from "@/components/TripCard";
import StartMode from "@/components/StartMode";
import CreateMode from "@/components/CreateMode";
import TravelDetail from "@/components/TravelDetail";
import useGetTrips from "@/hooks/trip/useGetTrips";
import useSearchTrip from "@/hooks/trip/useSearchTrip";
import styles from "@/styles/css-modules/page.module.scss";
import getCookies from "@/utils/getCookies";

export default function Home() {
  const { accessToken, userName, userId } = getCookies();
  const [mode, setMode] = useState("start");
  const [tripId, setTripId] = useState(null);
  const { trips, getTrips } = useGetTrips();
  const { tripsSearchKeyword, tripsSearchResult, handleInputChange } =
    useSearchTrip();
  return (
    <main className={styles.main}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Nav userName={userName} changeToStart={() => setMode("start")} />

        <div className={styles.page}>
          <div className={styles.leftPage}>
            <div className={styles.searchTripCard}>
              <SearchTripCard handleInputChange={handleInputChange} />
            </div>

            {tripsSearchKeyword && tripsSearchResult.length > 0 && (
              <div className={styles.tripcard}>
                {tripsSearchResult.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    changeToDetail={() => {
                      setMode("detailed");
                      setTripId(trip.id);
                    }}
                  />
                ))}
              </div>
            )}
            {tripsSearchKeyword && tripsSearchResult.length === 0 && (
              // <div className={styles.noSearch}>查無結果，請重新輸入</div>
              <div className={styles.noSearch}>
                <Image
                  src="/airplain.png"
                  alt="loading"
                  width={100}
                  height={100}
                />
              </div>
            )}
            {!tripsSearchKeyword && (
              <div className={styles.tripcard}>
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    changeToDetail={() => {
                      setMode("detailed");
                      setTripId(trip.id);
                    }}
                  />
                ))}
              </div>
            )}

            <button
              type="button"
              className={styles.AddBtn}
              onClick={() => setMode("create")}
            >
              <Image src="/addBtn.svg" alt="cover" fill objectFit="cover" />
            </button>
          </div>

          <div className={styles.rightPage}>
            {mode === "start" && <StartMode />}
            {mode === "detailed" && <TravelDetail tripId={tripId} />}
            {mode === "create" && (
              <CreateMode
                accessToken={accessToken}
                userName={userName}
                userId={userId}
                getTrips={getTrips}
              />
            )}
          </div>
        </div>
      </LocalizationProvider>

      <footer className={styles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
