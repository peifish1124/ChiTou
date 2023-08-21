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
// import useSearchTrip from "@/hooks/trip/useSearchTrip";
import useTripDetail from "@/hooks/trip/useTripDetail";
import styles from "@/styles/css-modules/page.module.scss";

export default function Home() {
  const [mode, setMode] = useState("start");
  const { trips } = useGetTrips();
  const { tripDetail, getTripDetail } = useTripDetail();

  return (
    <main className={styles.main}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Nav changeToStart={() => setMode("start")} />

        <div className={styles.page}>
          <div className={styles.leftPage}>
            <div className={styles.searchTripCard}>
              <SearchTripCard />
            </div>

            <div className={styles.tripcard}>
              {trips.map((trip) => (
                <TripCard
                  key={trip.id}
                  trip
                  changeToDetail={() => {
                    setMode("detailed");
                    getTripDetail(trip.id);
                  }}
                />
              ))}
            </div>

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
            {mode === "detailed" && <TravelDetail tripDetail={tripDetail} />}
            {mode === "create" && <CreateMode />}
          </div>
        </div>
      </LocalizationProvider>

      <footer className={styles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
