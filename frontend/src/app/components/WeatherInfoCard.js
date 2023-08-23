import Image from "next/image";
import formatTemperatureRange from "@/utils/formatTemperatureRange";
import formatRainProbability from "@/utils/formatRainProbability";
import formatWeatherText from "@/utils/formatWeatherText";
import WeatherIcon from "@/components/WeatherIcon";
import styles from "@/styles/css-modules/traveldetail.module.scss";

export default function WeatherInfoCard({ destination, weatherData }) {
  return (
    <div className={styles.weatherInfoCard}>
      <div className={styles.temperatureBox}>
        <WeatherIcon weatherText={weatherData.summary} />
        <h2>{destination}</h2>
        <p>{formatTemperatureRange(weatherData.temperature)}</p>
      </div>
      <div className={styles.weatherInfoBox}>
        <div className={styles.threeWeather}>
          <div className={styles.threeWeatherItem}>
            <div className={styles.threeWeatherItemInfo}>
              <p>降雨機率</p>
              <h2>{formatRainProbability(weatherData.PoP)}</h2>
            </div>
            <Image src="/rain2.svg" width={30} height={30} alt="rain" />
          </div>
          <div className={styles.threeWeatherItem}>
            <div className={styles.threeWeatherItemInfo}>
              <p>相對濕度</p>
              <h2>{formatRainProbability(weatherData.humidity)}</h2>
            </div>
            <Image src="/temp2.svg" width={30} height={30} alt="humidity" />
          </div>
          <div className={styles.threeWeatherItem}>
            <div className={styles.threeWeatherItemInfo}>
              <p>風速</p>
              <h2>{formatWeatherText(weatherData.wind).windSpeed}m/s</h2>
            </div>
            <Image src="/wind2.svg" width={30} height={30} alt="wind" />
          </div>
        </div>
        <div className={styles.weatherSummary}>
          <p>天氣總結: {weatherData.summary}</p>
          <p>體感描述: {weatherData.feeling}</p>
        </div>
      </div>
    </div>
  );
}
