"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import Swal from "sweetalert2";
// eslint-disable-next-line import/no-extraneous-dependencies
import QRCode from "qrcode.react";
import useEvent from "@/hooks/useEvent";
import nav from "@/styles/css-modules/nav.module.scss";
import EventBar from "./Nav/EventBar.jsx";

export default function Nav({ changeToStart, userName }) {
  const qrCodeData = "https://lin.ee/OwSvgjI";
  const router = useRouter();
  const [name, setName] = useState("");
  const { events, eventCounts, unreadEvents, fetchEvent, handleEventRead } =
    useEvent();
  const [showReadEvents, setShowReadEvents] = useState(false);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const toggleShowReaded = () => {
    fetchEvent();
    setShowReadEvents(!showReadEvents);
  };
  useEffect(() => {
    setName(userName);
    // console.log(name);
  }, [userName]);

  const handleLogout = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "確定",
      cancelButtonText: "取消",
    }).then((result) => {
      if (result.isConfirmed) {
        destroyCookie(null, "accessToken");
        destroyCookie(null, "userId");
        destroyCookie(null, "userName");
        // console.log("登出");
        router.push("/login");
        // console.log("登出且轉向至 /login");
      }
    });
  };
  return (
    <nav className={nav.navbar}>
      <Link href="/" className={nav.logo} onClick={changeToStart}>
        ChiTou
      </Link>
      <div className={nav.user}>
        <div className={nav.userNameBox}>{name}</div>
        <div className={nav.userPic}>
          <Image
            className="image"
            // src={user.picture || "/user-chou.png"}
            src="/user.svg"
            width={36}
            height={36}
            alt="user picture"
          />
        </div>
        <div className={nav.notifIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
          >
            <ellipse
              cx="18.0001"
              cy="18.0001"
              rx="18.0001"
              ry="18.0001"
              fill="#919D84"
            />
            <path
              d="M13.5206 26.1521C14.5568 26.1521 16.2605 26.0569 18.5645 25.6325C18.166 26.7159 17.1275 27.4923 15.9077 27.4923C14.8936 27.4923 14.0052 26.9552 13.5039 26.1521H13.5206ZM26.531 20.2412C26.7192 21.2104 26.0395 22.0675 24.5096 22.7906C23.6715 23.186 21.8079 23.9388 18.7298 24.5376C16.3557 24.9986 14.6163 25.1045 13.5214 25.1045C13.1961 25.1045 12.9271 25.0953 12.7153 25.0832C11.0269 24.9864 10.0745 24.4454 9.88633 23.4763C9.60062 22.0081 10.0524 21.4412 10.8014 20.5026L10.9987 20.2549C11.5039 19.6142 11.7012 18.9848 11.3781 17.3247C10.6551 13.6065 12.3298 11.0656 15.9717 10.354C19.6151 9.65072 22.1203 11.3772 22.8433 15.0961C23.1656 16.7563 23.5847 17.2652 24.2932 17.6698V17.6706L24.5691 17.8267C25.6144 18.4165 26.2452 18.7723 26.531 20.2412Z"
              fill="white"
            />
          </svg>
          {eventCounts > 0 && (
            <div className={nav.notifHint}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <circle cx="11.3332" cy="10.6667" r="10.6667" fill="#DE3F4F" />
                <text
                  x="50%"
                  y="50%"
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  dy=".35em"
                >
                  {eventCounts}
                </text>
              </svg>
            </div>
          )}
          <div
            className={nav.notifMenu}
            style={showAllEvents ? { border: "none" } : {}}
          >
            <div className={nav.notifMenuBox}>
              <div
                className={`${nav.colorDarkGreen} ${nav.notifiBox} ${nav.noeffect}`}
              >
                <div className={nav.notifIconHov}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                  >
                    <circle cx="18" cy="18" r="18" fill="white" />
                    <path
                      d="M13.5209 26.1521C14.5571 26.1521 16.2607 26.0568 18.5647 25.6324C18.1662 26.7159 17.1277 27.4922 15.9079 27.4922C14.8938 27.4922 14.0054 26.9551 13.5041 26.1521H13.5209ZM26.5312 20.2412C26.7193 21.2103 26.0397 22.0675 24.5098 22.7905C23.6717 23.186 21.8081 23.9387 18.73 24.5376C16.3559 24.9985 14.6165 25.1044 13.5216 25.1044C13.1963 25.1044 12.9273 25.0953 12.7155 25.0831C11.0271 24.9863 10.0748 24.4454 9.88658 23.4762C9.60086 22.0081 10.0527 21.4412 10.8016 20.5025L10.999 20.2549C11.5041 19.6141 11.7014 18.9848 11.3784 17.3246C10.6553 13.6065 12.33 11.0656 15.9719 10.354C19.6153 9.65072 22.1205 11.3772 22.8435 15.0961C23.1658 16.7562 23.5849 17.2652 24.2934 17.6698V17.6705L24.5692 17.8267C25.6146 18.4164 26.2454 18.7722 26.5312 20.2412Z"
                      fill="#3D4A35"
                    />
                  </svg>
                </div>
                <div className={nav.notifiBoxTitle}>我的通知</div>
                <button
                  type="button"
                  onClick={toggleShowReaded}
                  className={nav.notifiReaded}
                >
                  {showReadEvents ? "全部" : "未讀"}
                </button>
              </div>
              {Object.keys(events).length === 0 ||
              (showReadEvents && unreadEvents.length === 0) ? (
                <div className={nav.notifiBox}>
                  <div className={nav.notifiBoxBtn}>
                    {showReadEvents && unreadEvents.length === 0
                      ? "暫無未讀通知"
                      : "沒有通知 "}
                  </div>
                </div>
              ) : (
                <>
                  {showAllEvents
                    ? (!showReadEvents ? events : unreadEvents).map((event) => (
                        <EventBar
                          key={event.id}
                          event={event}
                          onRead={handleEventRead}
                        />
                      ))
                    : (!showReadEvents ? events : unreadEvents)
                        .slice(0, 4)
                        .map((event) => (
                          <EventBar
                            key={event.id}
                            event={event}
                            onRead={handleEventRead}
                          />
                        ))}
                  <div className={nav.notifiBox}>
                    <button
                      type="button"
                      className={nav.notifiBoxBtn}
                      onClick={() => setShowAllEvents(!showAllEvents)}
                    >
                      {!showAllEvents ? "查看全部通知" : "收起通知"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={nav.chatIcon}>
          <Image
            className="image"
            // src={user.picture || "/user-chou.png"}
            src="/line.svg"
            width={36}
            height={36}
            alt="user picture"
          />
          <div className={nav.joinLinebot}>
            <div className={nav.joinLinebotBox}>
              <div className={nav.inviteTitle}>邀請 Line Bot</div>
              <div className={nav.inviteCode}>
                <Link href={qrCodeData}>{qrCodeData}</Link>
                <QRCode value={qrCodeData} />
              </div>
            </div>
          </div>
        </div>
        <button className={nav.userPic} type="button" onClick={handleLogout}>
          <Image
            // className="image"
            src="/logout.svg"
            width={36}
            height={36}
            alt="user picture"
          />
        </button>
      </div>
    </nav>
  );
}
