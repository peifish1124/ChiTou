"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import Image from "next/image";
import ScheduleNote from "@/components/TravelDetail/ScheduleNote";
import useUpdateSchedule from "@/hooks/schedules/useUpdateSchedule";
import useDeleteSchedule from "@/hooks/schedules/useDeleteSchedule";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function EditSchedule({
  schedule,
  tripId,
  userIds,
  getTripDetail,
}) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [DragDisabled, setDragDisabled] = useState(isDragDisabled);
  const [editSchedule, setEditSchedule] = useState(schedule);
  const { updateSchedule } = useUpdateSchedule(schedule.id, tripId, userIds);
  const { deleteSchedule } = useDeleteSchedule(schedule.id);

  const handleEditClick = () => {
    setIsEdit(true);
  };
  const handleDeleteClick = async () => {
    await deleteSchedule();
    getTripDetail();
  };
  const handleCancelEditClick = () => {
    setIsEdit(false);
  };
  const handleEditConfirmClick = async () => {
    setIsEdit(false);
    await updateSchedule(editSchedule);
    getTripDetail();
  };
  return (
    <li
      className={styles.scheduleListItem}
      key={schedule.id}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isEdit ? (
        <div className={styles.createSchedule}>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              value={schedule.place}
              variant="standard"
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              value={editSchedule.duration}
              variant="standard"
              style={{ width: "50%" }}
              onChange={(e) => {
                setEditSchedule({
                  ...editSchedule,
                  duration: e.target.value,
                });
              }}
            />
          </div>
          <div style={{ width: "40%" }}>
            <TextField
              id="outlined-basic"
              value={editSchedule.note}
              variant="outlined"
              multiline
              style={{ width: "100%", minHeight: "4rem" }}
              onChange={(e) => {
                setEditSchedule({
                  ...editSchedule,
                  note: e.target.value,
                });
              }}
            />
          </div>
          <div className={styles.scheduleBtn}>
            <button type="button" onClick={handleEditConfirmClick}>
              <Image src="/check2.svg" alt="check button" fill />
            </button>
            <button type="button" onClick={handleCancelEditClick}>
              <Image src="/cancelEdit.svg" alt="remove button" fill />
            </button>
          </div>
        </div>
      ) : (
        <>
          {isHover && (
            <div className={styles.hiddenDragBtn}>
              <button type="button" className={styles.editbutton}>
                <Image src="/dragBtn.svg" alt="drag button" fill />
              </button>
            </div>
          )}
          <p style={{ width: "25%" }}>{schedule.place}</p>
          <p
            style={{
              width: "25%",
              paddingRight: "calc(25% - 4rem)",
              textAlign: "center",
            }}
          >
            {schedule.duration} hrs
          </p>
          <ScheduleNote schedule={schedule} style={{ width: "40%" }} />
          <div
            className={styles.hiddenBtn}
            style={{ display: isHover ? "flex" : "none" }}
          >
            <button
              type="button"
              className={styles.editbutton}
              onClick={handleEditClick}
            >
              <Image src="/editBtn2.svg" alt="edit button" fill />
            </button>
            <button
              type="button"
              className={styles.removebutton}
              onClick={handleDeleteClick}
            >
              <Image src="/trashcan.svg" alt="remove button" fill />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
