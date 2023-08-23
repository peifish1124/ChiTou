import { useEffect, useState } from "react";
import {Client} from "@googlemaps/google-maps-services-js";

export default function useGetTravelTime() {
  const [travelTime, setTravelTime] = useState("");
  async function getTravelTime() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    const client = new Client({});

    const response = await client.directions({
      params: {
        origin: "台北火車站",
        destination: "台北101",
        key: apiKey,
      },
    });

    if (response.data.routes.length > 0) {
      const duration = response.data.routes[0].legs[0].duration_in_traffic.text;
      console.log("交通时间：", duration);
      setTravelTime(duration);
    } else {
      console.error("没有获取到交通时间信息。");
    }
  }

  useEffect(() => {
    getTravelTime();
  }, []);

  return { travelTime,getTravelTime };
}
