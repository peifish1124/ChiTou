import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

function useCreateTrip() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const createTrip = async (tripData, accessToken) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post("/trips", tripData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200) {
        console.log("創建旅行成功");
        router.push("/trip/edit");
      }
    } catch (tripCreatedError) {
      console.error("創建旅行失敗:", tripCreatedError);
      setError("Error creating trip");
    } finally {
      setIsLoading(false);
    }
  };

  return { createTrip, isLoading, error };
}

export default useCreateTrip;
