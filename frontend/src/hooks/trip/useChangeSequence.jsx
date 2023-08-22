import Swal from "sweetalert2";
import axiosTypeAndAuth from "@/api/axiosTypeAndAuth";

export default function useChangeSequence(tripId, tripDay, tripMember) {
  const changeSequence = async (daySchedules) => {
    const sequenceData = daySchedules.map((item, index) => ({
      id: item.id,
      sequence: index + 1,
    }));
    const requestBody = {
      user_ids: tripMember,
      sequence_data: sequenceData,
    };
    console.log("change sequence", requestBody);
    try {
      const response = await axiosTypeAndAuth.put(
        `/trips/${tripId}/days/${tripDay}/sequence`,
        requestBody,
      );
      console.log("change sequence response", response.data.data.trip);
    } catch (err) {
      const { status } = err.response;
      console.error("新增更新失敗:", status);
      if (status === 403) {
        Swal.fire({
          icon: "error",
          title: "Token 過期或無效",
          text: "請重新登入。",
        });
      } else if (status === 400) {
        Swal.fire({
          icon: "error",
          title: "請輸入行程地點",
          text: "請重新輸入。",
        });
      }
    }
  };

  return { changeSequence };
}
