"use client";

import { useEffect } from "react";
import getCookies from "@/utils/getCookies";
import Nav from "@/components/Nav";
import GoogleMap from "@/components/GoogleMap";
import useAddSchedule from "@/hooks/useAddSchedule";
import useTripDetail from "@/hooks/trip/useTripDetail";
import pagestyles from "@/styles/css-modules/page.module.scss";
import EditTrip from "@/components/EditTrip";
import EditPageSkeleton from "@/components/EditPageSkeleton";

export default function EditPage({ params }) {
  const { tripDetail, loading, getTripDetail } = useTripDetail(params.id);
  const { userName } = getCookies();
  const {
    isNewSchedule,
    isDragDisabled,
    newSchedule,
    removeNewSchedule,
    addSchedule,
    addPlace,
    addDuration,
    addNote,
    submitNewSchedule,
  } = useAddSchedule(tripDetail);
  useEffect(() => {
    console.log(tripDetail);
  }, [tripDetail]);
  return (
    <main className={pagestyles.main}>
      {/* navbar */}
      <Nav userName={userName} />
      {/* main */}
      <div className={pagestyles.page}>
        <div className={pagestyles.leftPage}>
          <GoogleMap
            tripDetail={tripDetail}
            newSchedule={newSchedule}
            removeNewSchedule={removeNewSchedule}
            addPlace={addPlace}
            addNote={addNote}
          />
        </div>

        <div className={pagestyles.rightPage}>
          {loading && Object.keys(tripDetail).length === 0 ? (
            <EditPageSkeleton />
          ) : (
            <EditTrip
              tripDetail={tripDetail}
              isNewSchedule={isNewSchedule}
              isDragDisabled={isDragDisabled}
              newSchedule={newSchedule}
              removeNewSchedule={removeNewSchedule}
              addSchedule={addSchedule}
              addDuration={addDuration}
              addNote={addNote}
              submitNewSchedule={submitNewSchedule}
              getTripDetail={getTripDetail}
              tripId={params.id}
            />
          )}
        </div>
      </div>

      {/* footer */}
      <footer className={pagestyles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
