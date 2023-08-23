import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-tw";

dayjs.extend(relativeTime);
dayjs.locale("zh-tw");

function getRelativeTime(createdAt) {
  try {
    const createdDate = dayjs(createdAt);
    const currentDate = dayjs();
    const fiveDaysAgo = currentDate.subtract(5, "day");
    const timeAgo = createdDate.fromNow();
    if (fiveDaysAgo.isAfter(createdDate)) {
      return createdAt;
    }
    return timeAgo;
  } catch (error) {
    console.log(error);
    return createdAt;
  }
}

export default getRelativeTime;
