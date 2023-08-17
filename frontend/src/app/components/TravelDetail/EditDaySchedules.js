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
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function EditDaySchedules({ startDate, tripDay, daySchedules }) {
  const [expanded, setExpanded] = useState(true);
  const targetDate = dayjs(startDate).add(tripDay - 1, "day");
  const [isNewSchedule, setIsNewSchedule] = useState(false);
  const [isDragDisabled, setIsDragDisabled] = useState(false);
  const newSchedule = () => {
    setIsNewSchedule(true);
    setIsDragDisabled(true);
  };
  const removeNewSchedule = () => {
    setIsNewSchedule(false);
    setIsDragDisabled(false);
  };
  // draggable
  const [sortedDaySchedules, setSortedDaySchedules] = useState(
    [...daySchedules].sort((a, b) => a.sequence - b.sequence),
  );
  useEffect(() => {
    // console.log(sortedDaySchedules);
  }, [sortedDaySchedules]);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    const newSortedSchedules = Array.from(sortedDaySchedules);
    const [movedItem] = newSortedSchedules.splice(source.index, 1);
    newSortedSchedules.splice(destination.index, 0, movedItem);

    setSortedDaySchedules(newSortedSchedules);
  };
  return (
    <div className={styles.daySchedules}>
      <div className={styles.editDaySchedules__header} style={{}}>
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
          <button type="button" onClick={newSchedule}>
            <Image src="/addBtn.svg" alt="add button" fill />
          </button>
        </div>
      </div>
      <div className={styles.scheduleTitle}>
        <div style={{ width: "25%" }}>
          <p>地點</p>
        </div>
        <div style={{ width: "25%" }}>
          <p>停留時間</p>
        </div>
        <div style={{ width: "25%" }}>
          <p>筆記</p>
        </div>
      </div>
      {expanded && (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {isDragDisabled ? (
            <ul class={styles.schedule}>
              {sortedDaySchedules.map((schedule) => (
                <EditSchedule key={schedule.id} schedule={schedule} />
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
      {isNewSchedule && (
        <div className={styles.createSchedule}>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              // label="左方搜尋"
              variant="standard"
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ width: "25%" }}>
            <TextField
              id="standard-basic"
              // label="停留時間"
              variant="standard"
              style={{ width: "50%" }}
            />
          </div>
          <div style={{ width: "40%" }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              multiline
              style={{ width: "100%", minHeight: "4rem" }}
            />
          </div>
          <div className={styles.scheduleBtn}>
            <button type="button">
              <Image src="/check2.svg" alt="check button" fill />
            </button>
            <button type="button" onClick={removeNewSchedule}>
              <Image src="/trashcan.svg" alt="remove button" fill />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
