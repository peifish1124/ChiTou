/* eslint-disable react/jsx-props-no-spreading */

"use client";

import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Image from "next/image";
import useUserSearch from "@/hooks/useUserSearch";
import useCreateTrip from "@/hooks/useCreateTrip";
import styles from "@/styles/css-modules/createmode.module.scss";
import cityData from "@/data/taiwan-district-zip-code.json";

export default function CreateMode({ accessToken, userName, userId }) {
  const { createTrip } = useCreateTrip();
  const { searchUsers } = useUserSearch(accessToken);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [participantsName, setParticipantsName] = useState([userName]);
  const [participantsId, setParticipantsId] = useState([parseInt(userId, 10)]);

  const validationSchema = yup.object().shape({
    end_date: yup.date().min(yup.ref("start_date"), "結束日期必須晚於開始日期"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      destination: "",
      start_date: "",
      end_date: "",
      user_ids: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const tripData = {
        name: values.trip_name,
        destination: values.destination,
        start_date: startDate,
        end_date: endDate,
        user_ids: participantsId,
      };
      // console.log(tripData);
      createTrip(tripData, accessToken);
    },
  });

  // user search
  const handleSearchResult = async (e) => {
    setSearchKeyword(e.target.value);
    const results = await searchUsers(e.target.value);
    setSearchResults(results);
  };
  useEffect(() => {
    // console.log("searchKeyword", searchKeyword);
    // console.log("searchResults: ", searchResults);
  }, [searchResults, searchKeyword]);

  // participants
  const handleSearchResultSelect = async (user) => {
    if (participantsName.includes(user.name)) {
      return; // 不能輸入重複的使用者
    }
    setParticipantsName([...participantsName, user.name]);
    setParticipantsId([...participantsId, user.id]);
    setSearchKeyword("");
  };
  const handleParticipantRemove = (index) => {
    if (index === 0) {
      // 不能刪除自己
      return;
    }
    const updatedParticipantsName = [...participantsName];
    const updatedParticipantsId = [...participantsId];
    updatedParticipantsName.splice(index, 1);
    updatedParticipantsId.splice(index, 1);
    setParticipantsName(updatedParticipantsName);
    setParticipantsId(updatedParticipantsId);
  };
  useEffect(() => {
    console.log(participantsName);
  }, [participantsId, participantsName]);

  // start and end date
  const handleStartDateChange = (date) => {
    const dayjsDate = dayjs(date);
    const formattedDate = dayjsDate.format("YYYY-MM-DD");
    setStartDate(formattedDate);
    formik.setFieldValue("start_date", date);
  };
  const handleEndDateChange = (date) => {
    const dayjsDate = dayjs(date);
    const formattedDate = dayjsDate.format("YYYY-MM-DD");
    setEndDate(formattedDate);
    formik.setFieldValue("end_date", date);
  };

  return (
    <div className={styles.createMode}>
      <div className={styles.cover}>
        <Image src="/default-cover.svg" alt="cover" fill objectFit="cover" />
      </div>
      <div className={styles.createModeContainer}>
        <h3>創建屬於你們的小旅行</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.createTripForm}>
            <div className={styles.tripInfoItem}>
              <p>旅行名稱：</p>
              <div className={styles.tripInfoInput}>
                <input type="text" {...formik.getFieldProps("trip_name")} />
              </div>
            </div>
            <div className={styles.tripInfoItem}>
              <p>目的地：</p>
              <div className={styles.tripInfoInput}>
                <select
                  className={styles.destinationCitySelect}
                  {...formik.getFieldProps("destination")}
                >
                  <option value="" disabled>
                    選擇目的地縣市
                  </option>
                  {cityData.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={styles.dataPickerItem}>
              <p>開始時間：</p>
              {/* <input type="text" placeholder="範例格式: 08/25/2023" /> */}
              <DatePicker
                className={styles.dataPickerInput}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </div>
            <div className={styles.dataPickerItem}>
              <p>結束時間：</p>
              {/* <input type="text" placeholder="範例格式: 08/27/2023" /> */}
              {/* <div className={styles.tripInfoInput}> */}
              <DatePicker
                className={styles.dataPickerInput}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* </div> */}
            </div>
            <div className={styles.tripInfoItem}>
              <p>參與者：</p>
              <div className={styles.participantsItem}>
                <div className={styles.participantsInput}>
                  <input
                    type="text"
                    placeholder="輸入邀請對象"
                    value={searchKeyword}
                    onChange={handleSearchResult}
                  />
                  <div className={styles.participantsBox}>
                    {participantsName.map((participant, index) => {
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
                              width={15}
                              height={15}
                              objectFit="cover"
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={styles.participantsSearchList}>
                  {searchResults && searchResults.length > 0 ? (
                    searchResults.map((user) => (
                      // <div className={styles.participantsSearchItem}
                      //   key={user.id}
                      // >
                      //   <p onClick={() => handleSearchResultSelect(user)}>
                      //     {user.name}
                      //   </p>
                      // </div>
                      <button
                        type="button"
                        className={styles.participantsSearchItem}
                        key={user.id}
                        onClick={() => handleSearchResultSelect(user)}
                      >
                        {user.name}
                      </button>
                    ))
                  ) : (
                    // <div>No search results found.</div>
                    // eslint-disable-next-line react/jsx-no-useless-fragment
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Error Message */}
          <div>
            {formik.touched.end_date && formik.errors.end_date ? (
              <div className={styles.error}>{formik.errors.end_date}</div>
            ) : null}
          </div>
          <div className={styles.formBtn}>
            <button type="button">
              <Image
                src="/cancelBtn.svg"
                alt="cancel button"
                width={30}
                height={30}
                objectFit="cover"
              />
            </button>
            <button type="submit">
              <Image
                src="/checkBtn.svg"
                alt="check button"
                width={30}
                height={30}
                // objectFit="cover"
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
