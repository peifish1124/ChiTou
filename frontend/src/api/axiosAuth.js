import axios from "axios";
import getCookies from "@/utils/getCookies";

const { accessToken } = getCookies();
const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export default axiosAuth;
