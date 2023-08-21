import Image from "next/image";

export default function MyPositionMarker({ mapZoom }) {
  const iconWidth = (40 * mapZoom) / 15;
  const iconHeight = (40 * mapZoom) / 15;
  const xOffset = iconWidth / 2;
  const yOffset = iconHeight;
  return (
    <div
      style={{
        position: "absolute",
        transform: `translate(-${xOffset}px, -${yOffset}px)`,
      }}
    >
      <Image
        src="/my_position.svg"
        alt="Icon"
        width={iconWidth || 40}
        height={iconHeight || 40}
      />
    </div>
  );
}
