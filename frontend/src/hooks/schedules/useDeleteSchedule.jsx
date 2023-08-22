import Swal from "sweetalert2";
import axiosAuth from "@/api/axiosTypeAndAuth";

export default function useDeleteSchedule(id) {
  const deleteSchedule = async () => {
    console.log("delete schedule");
    try {
      const response = await axiosAuth.delete(`/schedules/${id}`);
      console.log("delete schedule response", response.data.data.schedule);
    } catch (err) {
      const { status } = err.response;
      console.error("刪除失敗:", status);
      if (status === 403) {
        Swal.fire({
          icon: "error",
          title: "Token 過期或無效",
          text: "請重新登入。",
        });
      } else if (status === 401) {
        Swal.fire({
          icon: "error",
          title: "沒有Token",
          text: "請重新登入。",
        });
      } else if (status === 500) {
        Swal.fire({
          icon: "error",
          title: "伺服器錯誤",
          text: "請稍後再試。",
        });
      }
    }
  };

  return { deleteSchedule };
}
