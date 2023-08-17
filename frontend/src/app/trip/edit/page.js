"use client";

import Nav from "@/components/Nav";
import GoogleMap from "@/components/GoogleMap";
import pagestyles from "@/styles/css-modules/page.module.scss";

export default function EditPage() {
  return (
    <main className={pagestyles.main}>
      {/* navbar */}
      <Nav />
      {/* main */}
      <div className={pagestyles.page}>
        <div className={pagestyles.leftPage}>
          <GoogleMap />
        </div>

        <div className={pagestyles.rightPage}>
          <div
            style={{ width: "100%", height: "100%", backgroundColor: "red" }}
          >
            ffff
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className={pagestyles.footer}>
        <p>關於我們 · 隱私權條款 · Cookie 條款 · © 2023 ChiTou, Inc.</p>
      </footer>
    </main>
  );
}
