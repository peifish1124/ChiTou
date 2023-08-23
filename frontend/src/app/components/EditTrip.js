"use client";

import Image from "next/image";
import dayjs from "dayjs";
import { useState } from "react";
import Link from "next/link";
import EditDaySchedules from "./TravelDetail/EditDaySchedules";
import useUploadPic from "@/hooks/trip/useUploadPic";
import tripcard from "@/styles/css-modules/tripcard.module.scss";

export default function EditTrip({
  tripDetail,
  isNewSchedule,
  isDragDisabled,
  newSchedule,
  removeNewSchedule,
  addSchedule,
  addDuration,
  addNote,
  submitNewSchedule,
  getTripDetail,
}) {
  const { uploadPic } = useUploadPic(tripDetail.id);
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const [groupedSchedules, setGroupedSchedules] = useState({});
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
  const userIds = tripDetail.members.map((member) => member.id);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    console.log("llllll", file);
    if (file) {
      const previewImageUrl = URL.createObjectURL(file);
      setPreviewUrl(previewImageUrl);
      const formData = new FormData();
      formData.append("picture", file);
      try {
        uploadPic(formData);
      } catch (error) {
        console.error("上傳失敗:", error);
      }
    }
  };
  // useEffect(() => {
  //   setGroupedSchedules(
  //     dayList.reduce((groups, tripDay) => {
  //       const schedulesOnDay = tripDetail.schedules.filter(
  //         (schedule) => schedule.trip_day === tripDay
  //       );
  //       return { ...groups, [tripDay]: schedulesOnDay };
  //     }, {})
  //   );
  // }, [tripDetail]);

  return (
    <div
      className={tripcard.tripCard}
      style={{
        height: "100%",
        minHeight: "13rem",
        background: "#F8FAF0",
      }}
    >
      <div className={`${tripcard.cover}`}>
        <div
          className={`${tripcard.overlay} ${
            isDragging ? tripcard.dragging : ""
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
        >
          拖曳照片到此處以上傳
        </div>
        {!previewUrl ? (
          <Image
            src={tripDetail.picture || "/default-cover.svg"}
            alt="cover"
            fill
            objectFit="cover"
          />
        ) : (
          <Image src={previewUrl} alt="cover" fill objectFit="cover" />
        )}
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
            參與者: {tripDetail.members.map((member) => member.name).join(",")}
          </p>
        </div>
        {Object.keys(groupedSchedules).map((tripDay) => (
          <EditDaySchedules
            key={tripDay}
            tripId={tripDetail.id}
            userIds={userIds}
            startDate={tripDetail.start_date}
            tripDay={tripDay}
            daySchedules={groupedSchedules[tripDay]}
            isNewSchedule={isNewSchedule}
            isDragDisabled={isDragDisabled}
            newSchedule={newSchedule}
            removeNewSchedule={removeNewSchedule}
            addSchedule={addSchedule}
            addDuration={addDuration}
            addNote={addNote}
            submitNewSchedule={submitNewSchedule}
            getTripDetail={getTripDetail}
          />
        ))}
      </div>
      <div className={tripcard.returnBtn}>
        <Link href="/">
          <Image src="/returnBtn.svg" alt="return" fill />
        </Link>
      </div>
    </div>
  );
}
