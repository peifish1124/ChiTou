import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import SearchTripCard from "@/components/SearchTripCard";
import TripCard from "@/components/TripCard";
import StartMode from "@/components/StartMode"
import CreateMode from "@/components/CreateMode"
import TravelDetail from "@/components/TravelDetail";
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
  return (
    <main className={styles.main}>
      {/* navbar */}
      {/* <nav className={styles.navbar}></nav> */}
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
          <TravelDetail trip={trip} schedules={schedules} />
          {/* create mode */}
          <CreateMode />
        </div>
      </div>

      {/* footer */}
      <footer className={styles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
