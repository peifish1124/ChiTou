import { useState } from "react";
// import Swal from "sweetalert2";
import axiosAuth from "@/api/axiosAuth";

export default function useGetWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeather = async (date, locationName) => {
    setLoading(true);
    console.log("get weather");
    try {
      const response = await axiosAuth.get(
        `/weathers?date=${date}&location_name=${encodeURIComponent(
          locationName,
        )}`,
      );

      // console.log("get weather response", response.data.data.weather);
      setWeatherData(response.data.data.weather);
      return response.data.data.weather;
      setLoading(false);
    } catch (err) {
      const { status } = err.response;
      console.error("獲取天氣失敗:", status);
      setLoading(false);
      setError(status);
      return null;
    }
  };

  // useEffect(() => {
  //   if (error !== null) {
  //     if (error === 401) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "No Token",
  //         text: "Please login first.",
  //       });
  //     } else if (error === 403) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Token expired or not valid",
  //         text: "Please login again.",
  //       }).then(() => {
  //         handleLogout();
  //       });
  //     } else if (error === 500) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Server error",
  //         text: "Please try again later or contact the administrator.",
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "Please try again later or contact the administrator.",
  //       });
  //     }
  //     setError(null);
  //   }
  // }, [error]);

  return { weatherData, loading, error, getWeather };
}
