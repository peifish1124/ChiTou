import { useState } from "react";
import axiosAuth from "@/api/axiosAuth";

export default function useSearchTrip() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTrip = async (trip) => {
    setLoading(true);
    try {
      const response = await axiosAuth.get(`/trips/search?keyword=${trip}`);
      setTrips(response.data);
      setLoading(false);
    } catch (err) {
      console.error("搜尋失敗:", err.response);
      const { status } = err.response;
      console.error("搜尋失敗:", status);
      setLoading(false);
      setError(err);
    }
  };

  return { trips, loading, error, searchTrip };
}
