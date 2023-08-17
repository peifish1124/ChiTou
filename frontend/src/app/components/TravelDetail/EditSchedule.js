"use client";

import { useState } from "react";
import { TextField } from "@mui/material";
import Image from "next/image";
import ScheduleNote from "@/components/TravelDetail/ScheduleNote";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function EditSchedule({ schedule }) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // const [DragDisabled, setDragDisabled] = useState(isDragDisabled);

  const handleEditClick = () => {
    setIsEdit(true);
    // setDragDisabled(!isDragDisabled);
  };
  const handleCancelEditClick = () => {
    setIsEdit(false);
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
              value={schedule.duration}
              variant="standard"
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ width: "40%" }}>
            <TextField
              id="outlined-basic"
              value={schedule.note}
              variant="outlined"
              multiline
              style={{ width: "100%", minHeight: "4rem" }}
            />
          </div>
          <div className={styles.scheduleBtn}>
            <button type="button">
              <Image src="/check2.svg" alt="check button" fill />
            </button>
            <button type="button" onClick={handleCancelEditClick}>
              <Image src="/trashcan.svg" alt="remove button" fill />
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
            <button type="button" className={styles.removebutton}>
              <Image src="/trashcan.svg" alt="remove button" fill />
            </button>
          </div>
        </>
      )}
    </li>
  );
}
