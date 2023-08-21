import Swal from "sweetalert2";
import axiosTypeAndAuth from "@/api/axiosTypeAndAuth";

export default function useUpdateSchedule(id) {
  const updateSchedule = async (schedule) => {
    console.log("create schedule");
    try {
      const response = await axiosTypeAndAuth.put(`/schedules/${id}`, schedule);
      console.log("create schedule response", response.data.data.schedule);
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

  return { updateSchedule };
}
