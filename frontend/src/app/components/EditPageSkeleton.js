import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import tripcard from "@/styles/css-modules/tripcard.module.scss";

export default function EditPageSkeleton() {
  return (
    <div
      className={tripcard.tripCard}
      style={{
        height: "100%",
        minHeight: "13rem",
        background: "#F8FAF0",
      }}
    >
      <Skeleton className={`${tripcard.cover}`} />
      <div className={tripcard.tripInfo}>
        <div className={tripcard.tripInfoTop}>
          <h2>
            <Skeleton />
          </h2>
          <p>
            目的地： <Skeleton />
          </p>
        </div>
        <div className={tripcard.tripInfoBottom}>
          <p>
            日期： <Skeleton />
          </p>
          <p>
            參與者: <Skeleton />
          </p>
        </div>
      </div>
      <Skeleton className={tripcard.returnBtn} />
    </div>
  );
}
