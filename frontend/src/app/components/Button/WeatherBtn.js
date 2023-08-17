import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function WeatherBtn() {
  return (
    <div className={styles.weather}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
      >
        <path d="M6.875 6.875H23.125V23.125H6.875V6.875Z" fill="#FF9800" />
        <path
          d="M3.74994 15.0002L14.9998 3.74992L26.2501 14.9998L15.0002 26.2501L3.74994 15.0002Z"
          fill="#FF9800"
        />
        <path
          d="M8.125 15C8.125 18.7981 11.2019 21.875 15 21.875C18.7975 21.875 21.875 18.7981 21.875 15C21.875 11.2019 18.7975 8.125 15 8.125C11.2019 8.125 8.125 11.2019 8.125 15Z"
          fill="#FFEB3B"
        />
      </svg>
    </div>
  );
}
