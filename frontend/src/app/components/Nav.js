"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import Swal from "sweetalert2";
import nav from "@/styles/css-modules/nav.module.scss";

export default function Nav({ changeToStart, userName }) {
  const router = useRouter();
  const [name, setName] = useState("");
  useEffect(() => {
    setName(userName);
    console.log(name);
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
            src="/user-chou.png"
            width={36}
            height={36}
            alt="user picture"
          />
        </div>
        <button className={nav.logout} type="button" onClick={handleLogout}>
          <Image src="/logout-color.png" fill alt="user picture" />
        </button>
      </div>
      <div className={nav.notifIcon} style={{ display: "none" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
        >
          <circle cx="18" cy="18" r="18" fill="#A3C3D3" />
          <path
            d="M13.5206 26.1521C14.5568 26.1521 16.2604 26.0568 18.5644 25.6324C18.166 26.7159 17.1275 27.4922 15.9077 27.4922C14.8936 27.4922 14.0052 26.9551 13.5039 26.1521H13.5206ZM26.5309 20.2412C26.7191 21.2103 26.0395 22.0675 24.5096 22.7905C23.6715 23.186 21.8079 23.9387 18.7298 24.5376C16.3557 24.9985 14.6162 25.1044 13.5214 25.1044C13.196 25.1044 12.9271 25.0953 12.7153 25.0831C11.0269 24.9863 10.0745 24.4454 9.88633 23.4762C9.60062 22.0081 10.0524 21.4412 10.8014 20.5025L10.9987 20.2549C11.5039 19.6141 11.7012 18.9848 11.3781 17.3246C10.6551 13.6065 12.3298 11.0656 15.9717 10.354C19.6151 9.65072 22.1202 11.3772 22.8433 15.0961C23.1656 16.7562 23.5846 17.2652 24.2932 17.6698V17.6705L24.569 17.8267C25.6143 18.4164 26.2452 18.7722 26.5309 20.2412Z"
            fill="white"
          />
        </svg>
      </div>
    </nav>
  );
}
