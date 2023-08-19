"use client";

import Image from "next/image";
import dayjs from "dayjs";
import DaySchedules from "./TravelDetail/EditDaySchedules";
import tripcard from "@/styles/css-modules/tripcard.module.scss";

export default function EditTrip({
  trip,
  schedules,
  isNewSchedule,
  isDragDisabled,
  newSchedule,
  removeNewSchedule,
  addSchedule,
}) {
  const groupedSchedules = schedules.reduce((groups, schedule) => {
    const tripDay = schedule.trip_day;
    const newGroups = { ...groups };
    if (!newGroups[tripDay]) {
      newGroups[tripDay] = [];
    }
    newGroups[tripDay].push(schedule);
    return newGroups;
  }, {});

  // console.log("dggdgd", groupedSchedules);
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
        <Image src="/default-cover.svg" alt="cover" fill objectFit="cover" />
      </div>
      <div className={tripcard.tripInfo}>
        <div className={tripcard.tripInfoTop}>
          <h2>{trip.name}</h2>
          <p>目的地： {trip.destination}</p>
        </div>
        <div className={tripcard.tripInfoBottom}>
          <p>
            日期： {dayjs(trip.start_date).format("YYYY/MM/DD")} ~{" "}
            {dayjs(trip.end_date).format("YYYY/MM/DD")}
          </p>
          <p>參與者: 胡抽抽,聖鬥士,羅志祥</p>
        </div>
        {Object.keys(groupedSchedules).map((tripDay) => (
          <DaySchedules
            key={tripDay}
            startDate={trip.start_date}
            tripDay={tripDay}
            daySchedules={groupedSchedules[tripDay]}
            isNewSchedule={isNewSchedule}
            isDragDisabled={isDragDisabled}
            newSchedule={newSchedule}
            removeNewSchedule={removeNewSchedule}
            addSchedule={addSchedule}
          />
        ))}
      </div>
      <div className={tripcard.returnBtn}>
        <button type="button">
          <Image src="/returnBtn.svg" alt="return" fill />
        </button>
      </div>
    </div>
  );
}
