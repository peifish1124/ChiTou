import Image from "next/image";

export default function WeatherIcon({ weatherText }) {
  let iconSrc = "/sunny.svg";

  if (weatherText.includes("雨") || !weatherText.includes("雲")) {
    iconSrc = "/rainy.svg";
  } else if (weatherText.includes("雲")) {
    iconSrc = "/cloudy.svg";
  }

  return <Image src={iconSrc} width={70} height={70} alt="weather icon" />;
}
