import Image from "next/image";

export default function SelectedMarker({ mapZoom = 15 }) {
  const iconWidth = (27 * mapZoom) / 15;
  const iconHeight = (43 * mapZoom) / 15;
  const xOffset = iconWidth / 2;
  const yOffset = iconHeight;
  return (
    <button
      type="button"
      style={{
        position: "absolute",
        transform: `translate(-${xOffset}px, -${yOffset}px)`,
      }}
    >
      <Image
        src="/Spotlight_Marker_Green.svg"
        alt="Icon"
        width={iconWidth || 27}
        height={iconHeight || 43}
      />
    </button>
  );
}
