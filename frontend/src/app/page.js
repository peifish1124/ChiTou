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
import EditTrip from "@/components/EditTrip";
import styles from "@/styles/css-modules/page.module.scss";

const trip = {
  id: 1,
  name: "台北一日遊",
  picture: "/trip-cover.jpg",
  destination: "台北",
  start_date: "2023-08-10",
  end_date: "2023-08-12",
  member_count: 5,
};
const schedules = [
  {
    // 之後改成 trip_id
    id: 1,
    place: "台北101",
    duration: 2,
    note: "台北101好高好高好好玩",
    sequence: 1,
    trip_day: 1,
  },
  {
    id: 2,
    place: "台北車站",
    duration: 2,
    note: "台北車站好好玩",
    sequence: 3,
    trip_day: 1,
  },
  {
    id: 3,
    place: "台北動物園",
    duration: 2,
    note: "台北動物園好好玩",
    sequence: 2,
    trip_day: 1,
  },
  {
    id: 4,
    place: "台中一中街",
    duration: 2,
    note: "台中一中街好好玩",
    sequence: 1,
    trip_day: 2,
  },
  {
    id: 5,
    place: "台中火車站",
    duration: 2,
    note: "台中火車站好好玩",
    sequence: 2,
    trip_day: 2,
  },
  {
    id: 6,
    place: "台中逢甲夜市",
    duration: 2,
    note: "台中逢甲夜市好好玩",
    sequence: 3,
    trip_day: 2,
  },
  {
    id: 7,
    place: "高雄六合夜市",
    duration: 2,
    note: "高雄六合夜市好好玩",
    sequence: 2,
    trip_day: 3,
  },
  {
    id: 8,
    place: "高雄車站",
    duration: 2,
    note: "高雄車站好好玩",
    sequence: 1,
    trip_day: 3,
  },
];

export default function Home() {
  const [mode, setMode] = useState("start");

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
              <TripCard changeToDetail={() => setMode("detailed")} />
              <TripCard />
              <TripCard />
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
            {mode === "detailed" && (
              <EditTrip trip={trip} schedules={schedules} />
            )}
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
