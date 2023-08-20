/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { useState } from "react";
import styles from "@/styles/css-modules/LoginSignupPage.module.scss";
import nav from "@/styles/css-modules/nav.module.scss";
import LoginSignupPage from "./LoginSignupPage";

export default function Login() {
  const [isLoginMode, setLoginMode] = useState(true); // true 為登入頁面

  // 註冊登入頁面切換用
  const handleSwitchMode = () => {
    setLoginMode(!isLoginMode);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main} style={{ minHeight: "64.4%" }}>
        <div className={styles.leftside}>
          <h1 className={nav.logo} style={{ fontSize: "3.2rem" }}>
            ChiTou
          </h1>
          <h2>會員{isLoginMode ? "登入" : "註冊"}</h2>
          <div className={styles.enterBox}>
            <LoginSignupPage
              isLoginMode={isLoginMode}
              handleSwitchMode={handleSwitchMode}
            />
          </div>
          <div className={styles.bottomtext}>
            <span className={styles.lefttext}>
              {isLoginMode ? "尚未成為" : "已經成為"}會員？
            </span>
            <span className={styles.righttext} onClick={handleSwitchMode}>
              會員{isLoginMode ? "註冊" : "登入"}
            </span>
          </div>
        </div>
        <div className={styles.rightside} />
      </div>
      <div className={styles.copyright}>
        關於我們 · 隱私權條款 · Cookie 條款 · © 2023 CanChu, Inc.
      </div>
    </div>
  );
}
