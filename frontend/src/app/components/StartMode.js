import Image from "next/image";
import styles from "@/styles/css-modules/startmode.module.scss";

export default function StartMode() {
  return (
    <div className={styles.startMode}>
      <div className={styles.createTrip}>
        <h1>點擊</h1>
        <Image
            src="/addBtn.svg"
            alt="addBtn"
            width={30}
            height={30}
            objectFit="cover"
        />
        <h1>創建新的旅行</h1>
      </div>
      <div className={styles.detailedTrip}>
        <h1>點擊旅行卡片可以查看詳細行程</h1>
      </div>
    </div>
  );
}