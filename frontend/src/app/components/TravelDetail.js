"use client";

import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import DaySchedules from "./TravelDetail/DaySchedules";
import EditPageSkeleton from "./EditPageSkeleton";
import useTripDetail from "@/hooks/trip/useTripDetail";
import tripcard from "@/styles/css-modules/tripcard.module.scss";

export default function TripDetail({ tripId }) {
  const { tripDetail, loading } = useTripDetail(tripId);
  if (loading) {
    return <EditPageSkeleton />;
  }
  const startDate = dayjs(tripDetail.start_date);
  const endDate = dayjs(tripDetail.end_date);
  const daysCount = endDate.diff(startDate, "day") + 1;
  const dayList = Array.from({ length: daysCount }, (_, index) => index + 1);
  const groupedSchedules = dayList.reduce((groups, tripDay) => {
    const schedulesOnDay = tripDetail.schedules.filter(
      (schedule) => schedule.trip_day === tripDay,
    );
    return { ...groups, [tripDay]: schedulesOnDay };
  }, {});
  console.log(groupedSchedules);
  return (
    <div
      className={tripcard.tripCard}
      style={{
        height: "100%",
        minHeight: "13rem",
        background: "#F8FAF0",
      }}
    >
      <div className={tripcard.cover}>
        <Image
          src={tripDetail.picture ? tripDetail.picture : "/default-cover.svg"}
          alt="cover"
          fill
          objectFit="cover"
        />
      </div>
      <div className={tripcard.tripInfo}>
        <div className={tripcard.tripInfoTop}>
          <h2>{tripDetail.name}</h2>
          <p>目的地： {tripDetail.destination}</p>
        </div>
        <div className={tripcard.tripInfoBottom}>
          <p>
            日期： {dayjs(tripDetail.start_date).format("YYYY/MM/DD")} ~{" "}
            {dayjs(tripDetail.end_date).format("YYYY/MM/DD")}
          </p>
          <p>
            參與者: {tripDetail.members.map((member) => member.name).join(", ")}
          </p>
        </div>
        {Object.keys(groupedSchedules).map((tripDay) => (
          <DaySchedules
            key={tripDay}
            startDate={tripDetail.start_date}
            tripDay={tripDay}
            daySchedules={groupedSchedules[tripDay]}
          />
        ))}
      </div>
      <div className={tripcard.editBtn}>
        <Link href={`/trip/${tripDetail.id}/edit`}>
          <Image src="/editBtn.svg" alt="cover" fill objectFit="cover" />
        </Link>
      </div>
    </div>
  );
}
