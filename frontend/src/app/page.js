"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SearchTripCard from "@/components/SearchTripCard";
import TripCard from "@/components/TripCard";
import StartMode from "@/components/StartMode";
import CreateMode from "@/components/CreateMode";
import styles from "@/styles/css-modules/page.module.scss";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function Home() {
  return (
    <main className={styles.main}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* navbar */}
        <Nav />
        
        {/* main */}
        <div className={styles.page}>
          <div className={styles.leftPage}>
            {/* search box */}
            <div className={styles.searchTripCard}>
              <SearchTripCard />
            </div>

            {/* trip card */}
            <div className={styles.tripcard}>
              <TripCard />
              <TripCard />
            </div>

            {/* + button */}
            <div className={styles.AddBtn}>
              <Image
                src="/addBtn.svg"
                alt="cover"
                fill={true}
                objectFit="cover"
              />
            </div>
          </div>

          <div className={styles.rightPage}>
            {/* start mode */}
            {/* <StartMode /> */}

            {/* detailed mode */}

            {/* create mode */}
            <CreateMode />
          </div>
        </div>
      </LocalizationProvider>

      {/* footer */}
      <footer className={styles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
