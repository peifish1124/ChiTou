import axios from "axios";
import { parseCookies } from "nookies";

const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${parseCookies().accessToken}`,
  },
});

export default axiosAuth;
