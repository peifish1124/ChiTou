import { useState } from "react";
import axiosAuth from "@/api/axiosAuth";

export default function useTripDetail() {
  const [tripDetail, setTripDetail] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTripDetail = async (id) => {
    setLoading(true);
    console.log("get trip id", id);
    try {
      const response = await axiosAuth.get(`/trips/${id}`);
      console.log("get trip detail response", response.data.data.trip);
      setTripDetail(response.data.data.trip);
      setLoading(false);
    } catch (err) {
      console.error("獲取旅行失敗:", err.response);
      const { status } = err.response;
      console.error("獲取旅行失敗:", status);
      setLoading(false);
      setError(status);
    }
  };

  return { tripDetail, loading, error, getTripDetail };
}
