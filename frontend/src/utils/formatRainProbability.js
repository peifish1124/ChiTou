export default function formatRainProbability(originalText) {
  const probability = originalText.match(/\d+/);

  if (probability) {
    return `${probability}%`;
  }
  return "50%";
}
