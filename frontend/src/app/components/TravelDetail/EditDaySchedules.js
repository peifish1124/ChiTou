/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TextField } from "@mui/material";
import WeatherIcon from "../Button/WeatherIcon";
import EditSchedule from "./EditSchedule";
import useChangeSequence from "@/hooks/trip/useChangeSequence";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function EditDaySchedules({
  tripId,
  tripMember,
  startDate,
  tripDay,
  daySchedules,
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
  const [expanded, setExpanded] = useState(true);
  const { changeSequence } = useChangeSequence(tripId, tripDay, tripMember);
  const targetDate = dayjs(startDate).add(tripDay - 1, "day");
  // draggable
  const [sortedDaySchedules, setSortedDaySchedules] = useState(
    [...daySchedules].sort((a, b) => a.sequence - b.sequence),
  );
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const newSortedSchedules = Array.from(sortedDaySchedules);
    const [movedItem] = newSortedSchedules.splice(source.index, 1);
    newSortedSchedules.splice(destination.index, 0, movedItem);
    console.log("haha ggggdrag", newSortedSchedules);
    changeSequence(newSortedSchedules);
    setSortedDaySchedules(newSortedSchedules);
    // getTripDetail();
  };
  const handleCheckButtonClick = async () => {
    await submitNewSchedule();
    getTripDetail();
  };
  useEffect(() => {
    setSortedDaySchedules(
      [...daySchedules].sort((a, b) => a.sequence - b.sequence),
    );
  }, [daySchedules]);
  const handleRemoveButtonClick = () => {
    removeNewSchedule();
  };
  return (
    <div className={styles.daySchedules}>
      <div className={styles.editDaySchedules__header}>
        <div className={styles.daySchedules__header}>
          <h2>
            {`Day 
          ${tripDay} (
          ${targetDate.format("MM/DD")} )`}
          </h2>
          <WeatherIcon />
          <button
            type="button"
            className={styles.daySchedules__header__button}
            onClick={() => setExpanded(!expanded)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              {expanded ? (
                // up arrow
                <path
                  d="M5 12.5L10 7.5L15 12.5"
                  stroke="#525252"
                  stroke-width="2.66667"
                />
              ) : (
                // down arrow
                <path
                  d="M15 7.5L10 12.5L5 7.5"
                  stroke="#525252"
                  stroke-width="2.66667"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={styles.addBtn}>
          <button
            type="button"
            onClick={() => {
              addSchedule(daySchedules, tripDay);
            }}
          >
            <Image src="/addBtn.svg" alt="add button" fill />
          </button>
        </div>
      </div>
      {expanded && (
        <div className={styles.scheduleTitle}>
          <div style={{ width: "25%", fontSize: "700" }}>
            <p>地點</p>
          </div>
          <div style={{ width: "25%", fontSize: "700" }}>
            <p>停留時間</p>
          </div>
          <div style={{ width: "25%", fontSize: "700" }}>
            <p>筆記</p>
          </div>
        </div>
      )}
      {expanded && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isDragDisabled ? (
            <ul class={styles.schedule}>
              {sortedDaySchedules.map((schedule) => (
                <EditSchedule
                  key={schedule.id}
                  schedule={schedule}
                  getTripDetail={getTripDetail}
                />
              ))}
            </ul>
          ) : (
            <DragDropContext
              onDragEnd={onDragEnd}
              isDragDisabled={isDragDisabled}
            >
              <Droppable droppableId="scheduleList">
                {(provided) => (
                  <ul
                    className={styles.schedule}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {sortedDaySchedules.map((schedule, index) => (
                      <Draggable
                        key={schedule.id}
                        draggableId={schedule.id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <EditSchedule
                              key={schedule.id}
                              schedule={schedule}
                              isDragDisabled={isDragDisabled}
                              getTripDetail={getTripDetail}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </>
      )}
      {isNewSchedule === tripDay && (
        <div className={styles.createSchedule}>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              placeholder="左方搜尋"
              variant="standard"
              style={{ width: "80%" }}
              value={newSchedule.place}
              disabled
            />
          </div>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              // label="停留時間"
              variant="standard"
              type="number"
              style={{ width: "50%" }}
              autoComplete="off"
              onChange={(e) => addDuration(e.target.value)}
            />
          </div>
          <div style={{ width: "40%" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              placeholder="輸入筆記"
              multiline
              style={{ width: "100%", minHeight: "4rem" }}
              autoComplete="off"
              onChange={(e) => addNote(e.target.value)}
            />
          </div>
          <div className={styles.scheduleBtn}>
            <button type="button" onClick={handleCheckButtonClick}>
              <Image src="/check2.svg" alt="check button" fill />
            </button>
            <button type="button" onClick={handleRemoveButtonClick}>
              <Image src="/cancelEdit.svg" alt="remove button" fill />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
