export default function formatWeatherText(originalText) {
  const parts = originalText.split(" ");
  const windDirection = parts[0];
  const windSpeed = parts[1].replace(/\D/g, "");

  return {
    windDirection,
    windSpeed,
  };
}
