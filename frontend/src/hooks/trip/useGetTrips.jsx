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
      console.log("get trips response", response.data.data.trips);
      setTrips(response.data.data.trips);
      setLoading(false);
    } catch (err) {
      const { status } = err.response;
      console.error("獲取旅行失敗:", status);
      setLoading(false);
      setError(status);
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
          title: "Token expired or not valid",
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
          title: "Error",
          text: "Please try again later or contact the administrator.",
        });
      }
      setError(null);
    }
  }, [error]);

  return { trips, loading, error, getTrips };
}
