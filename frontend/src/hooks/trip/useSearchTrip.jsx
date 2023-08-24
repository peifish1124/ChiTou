import { useState } from "react";
import createAxiosAuth from "@/api/axiosAuth";
import debounce from "@/utils/debounce";

export default function useSearchTrip() {
  const [tripsSearchResult, setTripsSearchResult] = useState([]);
  const [tripsSearchKeyword, setTripsSearchKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchTrip = debounce(async (trip) => {
    setLoading(true);
    try {
      const axiosAuth = createAxiosAuth();
      const response = await axiosAuth.get(`/trips/search?keyword=${trip}`);
      setTripsSearchResult(response.data.data.trips);
      setLoading(false);
    } catch (err) {
      console.error("搜尋失敗:", err.response);
      const { status } = err.response;
      console.error("搜尋失敗:", status);
      setLoading(false);
      setError(err);
    }
  }, 500);

  const handleInputChange = (event) => {
    if (event.target.value.trim() === "") {
      setTripsSearchResult([]);
    }
    setTripsSearchKeyword(event.target.value.trim());
    searchTrip(event.target.value.trim());
  };

  return {
    tripsSearchKeyword,
    tripsSearchResult,
    loading,
    error,
    handleInputChange,
  };
}
