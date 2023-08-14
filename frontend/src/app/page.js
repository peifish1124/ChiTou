import Image from 'next/image'
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      {/* navbar */}
      <nav className={styles.navbar}>
      </nav>

      {/* main */}
      <div className={styles.page}>
        <div className={styles.leftPage}>

          {/* search box */}

          {/* trip card */}

          {/* + buttom */}
          
        </div>
          
        <div className={styles.rightPage}>

          {/* start mode */}

          {/* detailed mode */}

          {/* create mode */}

        </div>
      </div>
      

      {/* footer */}
      <footer className={styles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
