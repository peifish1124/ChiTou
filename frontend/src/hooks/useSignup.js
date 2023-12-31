// useSignup.js
import { useState } from "react";
import Swal from "sweetalert2";
import axiosInstance from "@/api/axiosInstance";

const useSignup = (handleSwitchMode) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const handleSignup = (userData) => {
    setIsLoading(true); // 開始 API 請求時設置 isLoading 為 true
    axiosInstance
      .post("/users/signup", userData)
      .then((response) => {
        if (response.status === 200) {
          // console.log("註冊成功");
          handleSwitchMode();
        } else {
          // console.log("註冊失敗");
          setError(response.data.message);
          if (error.status >= 500 && error.status < 600) {
            alert("伺服器出現問題，請稍後再試或通知我們的工程團隊。");
          }
        }
      })
      .catch((signupError) => {
        setError(signupError.response);
        // console.log(signupError.response);
        if (
          signupError.response.status >= 500 &&
          signupError.response.status < 600
        ) {
          Swal.fire({
            icon: "error",
            title: "伺服器出現問題",
            text: "請稍後再試或通知我們的工程團隊。",
          });
        }
        if (
          signupError.response.status >= 400 &&
          signupError.response.status < 500
        ) {
          Swal.fire({
            icon: "error",
            title: "註冊失敗",
            text: signupError.response.data.error,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { handleSignup, isLoading, error };
};

export default useSignup;
