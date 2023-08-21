import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axiosAuth from "@/api/axiosAuth";

export default function useGetTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTrips = async () => {
    setLoading(true);
    console.log("get trips");
    try {
      const response = await axiosAuth.get("/trips");
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      const { status } = err.response;
      console.error("獲取旅行失敗:", status);
      setLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    getTrips();
    console.log("first time get trips");
  }, []);
  useEffect(() => {
    if (error !== null) {
      if (error === 401) {
        Swal.fire({
          icon: "error",
          title: "No Token",
          text: "Please login first.",
        });
      } else if (error === 403) {
        Swal.fire({
          icon: "error",
          title: "Token expired",
          text: "Please login again.",
        });
      } else if (error === 500) {
        Swal.fire({
          icon: "error",
          title: "Server error",
          text: "Please try again later or contact the administrator.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Email or password is incorrect",
          text: "Plaese make sure you have entered the correct email and password.",
        });
      }
      setError(null);
    }
  }, [error]);
  return { trips, loading, error, getTrips };
}
