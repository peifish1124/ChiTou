import { useState, useEffect } from "react";
import createAxiosAuth from "@/api/axiosAuth";

export default function useTripDetail(id) {
  const [tripDetail, setTripDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getTripDetail = async () => {
    setLoading(true);
    console.log("get trip id", id);
    try {
      const axiosAuth = createAxiosAuth();
      const response = await axiosAuth.get(`/trips/${id}`);
      console.log("get trip detail response", response.data.data.trip);
      setTripDetail(response.data.data.trip);
    } catch (err) {
      console.error("獲取旅行失敗:", err.response);
      const { status } = err.response;
      console.error("獲取旅行失敗:", status);
      setError(status);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      getTripDetail();
    }
    console.log("get trip detail", id);
  }, [id]);
  return { tripDetail, loading, error, getTripDetail };
}
