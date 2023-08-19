import { useState, useEffect } from "react";

export default function useAddSchedule() {
  const [isNewSchedule, setIsNewSchedule] = useState(false);
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
  const addSchedule = (daySchedules, tripDay) => {
    const maxSequence = daySchedules
      ? daySchedules.reduce((max, schedule) => {
          return schedule.sequence > max ? schedule.sequence : max;
        }, -Infinity)
      : 0;
    setIsNewSchedule(true);
    setNewSchedule({
      trip_id: "",
      user_ids: [],
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
  const removeNewSchedule = () => {
    setIsNewSchedule(false);
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
  };
}
