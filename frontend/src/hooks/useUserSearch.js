"use client";

import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";

const useUserSearch = (accessToken) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchUsers = async (keyword) => {
    setLoading(true);
    try {
      axiosInstance.defaults.headers.common.Authorization = accessToken;
      const response = await axiosInstance.get(
        `/users/search?keyword=${keyword}`,
      );

      if (response.status === 200) {
        console.log("搜尋用戶成功");
        setSearchResults(response.data.users);
        // console.log("searchResults: ", response.data);
        return response.data.data.users;
      }
      return [];
    } catch (error) {
      console.error("搜尋用戶失敗", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, searchUsers };
};

export default useUserSearch;
