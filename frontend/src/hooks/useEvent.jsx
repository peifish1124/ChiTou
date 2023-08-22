import { useState, useEffect } from "react";
import axiosAuth from "@/api/axiosAuth";

const apiEventGet = async () => {
  const response = await axiosAuth.get("/events");
  return response;
};

const apiEventRead = async (id) => {
  const response = await axiosAuth.put(`/events/${id}/read`);
  return response;
};

export default function useEvent() {
  const [events, setEvent] = useState([]);
  const [eventCounts, setEventCounts] = useState(0);
  const [unreadEvents, setUnreadEvents] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const response = await apiEventGet();
      setEvent(response.data.data.events);
      console.log("獲取活動成功", response.data.data);
      const unreadEventCounts = response.data.data.events.reduce(
        (count, event) => {
          return event.is_read === 0 ? count + 1 : count;
        },
        0,
      );
      console.log("unreadEventCounts", unreadEventCounts);
      const unreads = response.data.data.events.filter(
        (event) => !event.is_read,
      );
      setUnreadEvents(unreads);
      console.log("unreadEvents", unreads);
      setEventCounts(unreadEventCounts);
    } catch (err) {
      console.log("獲取活動失敗", err);
      setEvent([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventRead = async (id) => {
    try {
      const response = await apiEventRead(id);
      console.log("讀取活動成功", response.data.data);
      setEventCounts(eventCounts - 1);
      setUnreadEvents((prevUnreadEvents) =>
        prevUnreadEvents.filter((event) => event.id !== id),
      );
    } catch (err) {
      console.log("讀取活動失敗", err);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return {
    events,
    eventCounts,
    unreadEvents,
    loading,
    fetchEvent,
    handleEventRead,
  };
}
