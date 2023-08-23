export default function formatTemperatureRange(originalText) {
  const temperatureRange = originalText.match(/\d+/g);

  if (temperatureRange && temperatureRange.length === 2) {
    const minTemperature = temperatureRange[0];
    const maxTemperature = temperatureRange[1];
    return `${minTemperature}~${maxTemperature}℃`;
  }
  return "25℃";
}
