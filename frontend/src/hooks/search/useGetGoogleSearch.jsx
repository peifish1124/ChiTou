import { useState, useEffect } from "react";
import axiosAuth from "@/api/axiosAuth";

export default function useGetGoogleSearch(query) {
  const [googleSearch, setGoogleSearch] = useState("");
  const getGoogleSearch = async () => {
    console.log("get google search");
    try {
      const response = await axiosAuth.get(
        `/searches?place_name=${query.trim()}`,
      );
      console.log("get google search response", response.data.data.search);
      setGoogleSearch(response.data.data.search);
    } catch (err) {
      console.error("獲取失敗:", err.response);
    }
  };
  useEffect(() => {
    getGoogleSearch();
  }, []);
  return { googleSearch, getGoogleSearch };
}
