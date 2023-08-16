"use client";

import { useState, useEffect } from "react";
import { TextField } from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Image from "next/image";
import styles from "@/styles/css-modules/createmode.module.scss";

export default function CreateMode() {
  const [participantName, setParticipantName] = useState("");
  const [participantsList, setParticipantsList] = useState([]);

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter" && participantName.trim() !== "") {
      e.preventDefault();
      setParticipantsList([...participantsList, participantName]);
      setParticipantName("");
    }
  };
  useEffect(() => {
    console.log(participantsList);
  }, [participantsList]);

  const handleParticipantRemove = (index) => {
    const updatedParticipants = [...participantsList];
    updatedParticipants.splice(index, 1);
    setParticipantsList(updatedParticipants);
  };

  // Error handling
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState(false);
  console.log(error);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate && date > endDate) {
      setError(true);
    } else {
      setError(false);
    }
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date < startDate) {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div className={styles.createMode}>
      <div className={styles.cover}>
        <Image src="/default-cover.svg" alt="cover" fill objectFit="cover" />
      </div>
      <h3>創建屬於你們的小旅行</h3>
      <form className={styles.createTripForm}>
        <div className={styles.tripInfoItem}>
          <p>旅行名稱：</p>
          <div className={styles.tripInfoInput}>
            <input type="text" />
          </div>
        </div>
        <div className={styles.tripInfoItem}>
          <p>目的地：</p>
          <div className={styles.tripInfoInput}>
            <input type="text" placeholder="請填入縣市名稱" />
          </div>
        </div>
        <div className={styles.dataPickerItem}>
          <p>開始時間：</p>
          {/* <input type="text" placeholder="範例格式: 08/25/2023" /> */}
          <DatePicker
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
              />
            )}
          />
        </div>
        <div className={styles.dataPickerItem}>
          <p>結束時間：</p>
          {/* <input type="text" placeholder="範例格式: 08/27/2023" /> */}
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
              />
            )}
          />
        </div>
        <div className={styles.tripInfoItem}>
          <p>參與者：</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="輸入姓名並按 Enter"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
            <div className={styles.participantsBox}>
              {participantsList.map((participant, index) => {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className={styles.participantTag} key={index}>
                    {participant}
                    <button
                      type="button"
                      onClick={() => handleParticipantRemove(index)}
                    >
                      <Image
                        src="/tag-cancel.svg"
                        alt="cancel"
                        width={20}
                        height={20}
                        objectFit="cover"
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
