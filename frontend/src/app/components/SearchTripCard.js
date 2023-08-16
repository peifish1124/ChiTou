import styles from "@/styles/css-modules/searchTripCard.module.scss";

export default function SearchTripCard() {
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.inputBox}
        type="text"
        placeholder="搜尋"
        // value={keyword}
        // onChange={handleChange}
      />
    </div>
  );
}
