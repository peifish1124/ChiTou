import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useCreateSchedule from "./schedules/useCreateSchedule";

export default function useAddSchedule(tripDetail) {
  console.log("useAddSchedule");
  const [isNewSchedule, setIsNewSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    trip_id: "",
    user_ids: [],
    place: "",
    trip_day: "",
    sequence: "",
    duration: "",
    note: "",
  });
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const { createSchedule } = useCreateSchedule();
  const addSchedule = (daySchedules, tripDay) => {
    const maxSequence =
      daySchedules.length !== 0
        ? daySchedules.reduce((max, schedule) => {
            return schedule.sequence > max ? schedule.sequence : max;
          }, -Infinity)
        : 0;
    const userIds = tripDetail.members.map((member) => member.id);
    setIsNewSchedule(tripDay);
    setNewSchedule({
      trip_id: tripDetail.id,
      user_ids: userIds,
      place: "",
      trip_day: parseInt(tripDay, 10) || 1,
      sequence: maxSequence + 1,
      duration: "",
      note: "",
    });
    setIsDragDisabled(true);
  };
  const addPlace = (place) => {
    setNewSchedule((prev) => ({ ...prev, place }));
  };
  const addDuration = (duration) => {
    setNewSchedule((prev) => ({ ...prev, duration }));
  };
  const addNote = (note) => {
    setNewSchedule((prev) => ({ ...prev, note }));
  };
  const submitNewSchedule = () => {
    if (!newSchedule.place) {
      Swal.fire({
        icon: "error",
        title: "請輸入行程地點",
        text: "請重新輸入。",
      });
      setIsNewSchedule(null);
      setIsDragDisabled(false);
      return;
    }
    console.log("submitNewSchedule");
    createSchedule(newSchedule);
    setIsNewSchedule(null);
    setIsDragDisabled(false);
  };
  const removeNewSchedule = () => {
    setIsNewSchedule(null);
    setIsDragDisabled(false);
  };
  useEffect(() => {
    console.log("useAddSchedule useEffect");
    console.log(newSchedule);
  }, [newSchedule]);
  return {
    isNewSchedule,
    isDragDisabled,
    newSchedule,
    removeNewSchedule,
    setNewSchedule,
    addSchedule,
    addPlace,
    addDuration,
    addNote,
    submitNewSchedule,
  };
}
