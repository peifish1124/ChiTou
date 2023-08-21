import { useState } from "react";
import cityData from "@/data/taiwan-district-zip-code.json";
import styles from "@/styles/css-modules/components/CityDistrictSelector.module.scss";

export default function CityDistrictSelector({
  destinationCity,
  selectedCityOrDistrictToLatLng,
}) {
  const [selectedCity, setSelectedCity] = useState(destinationCity);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const handleCitySelect = (event) => {
    const selectedCityName = event.target.value;
    selectedCityOrDistrictToLatLng(selectedCityName, 10);
    setSelectedCity(selectedCityName);
    setSelectedDistrict(null);
  };

  const handleDistrictSelect = (event) => {
    const selectedDistrictName = event.target.value;
    if (selectedDistrictName === "return") {
      setSelectedCity(null);
      setSelectedDistrict(null);
      selectedCityOrDistrictToLatLng("台灣", 7);
    } else {
      setSelectedDistrict(selectedDistrictName);
      selectedCityOrDistrictToLatLng(selectedCity + selectedDistrictName, 14);
    }
  };
  console.log(selectedCity);

  return (
    <div className={styles.cityDistrictSelector}>
      {!selectedCity && (
        <select
          value={selectedCity || ""}
          onChange={handleCitySelect}
          className={styles.citySelect}
        >
          <option
            value=""
            disabled
            style={{ color: "#000", background: "#f0f2f5", fontSize: "900" }}
          >
            選擇縣市
          </option>
          <optgroup label="縣市" className={styles.cityGroup}>
            {cityData.map((city) => (
              <option
                key={city.name}
                value={city.name}
                className={styles.cityOption}
              >
                {city.name}
              </option>
            ))}
          </optgroup>
        </select>
      )}

      {selectedCity && (
        <select
          value={selectedDistrict || ""}
          onChange={handleDistrictSelect}
          className={styles.citySelect}
        >
          <option
            value=""
            disabled
            style={{ color: "#000", background: "#f0f2f5", fontSize: "900" }}
          >
            {selectedCity}
          </option>
          <optgroup label="行政區" className={styles.cityGroup}>
            {cityData
              .find(
                (city) =>
                  city.name.toString() === selectedCity.replace("台", "臺"),
              )
              .districts.map((district) => (
                <option key={district.name} value={district.name}>
                  {district.name}
                </option>
              ))}
          </optgroup>
          <option value="return">返回</option>
        </select>
      )}
    </div>
  );
}
