import Image from "next/image";
import styles from "@/styles/css-modules/googlemap.module.scss";

export default function FilterMarker({
  mapZoom,
  placeId,
  text,
  getPlaceDetail,
}) {
  const iconWidth = (27 * mapZoom) / 15;
  const iconHeight = (43 * mapZoom) / 15;
  const xOffset = iconWidth / 2;
  const yOffset = iconHeight;
  return (
    <button
      id={placeId}
      type="button"
      style={{
        position: "absolute",
        transform: `translate(-${xOffset}px, -${yOffset}px)`,
      }}
      onClick={() => {
        getPlaceDetail(placeId);
      }}
    >
      {mapZoom > 16 && (
        <div
          className={styles.markerText}
          style={{
            position: "absolute",
            transform: `translate(-${xOffset}px, -${yOffset}px)`,
          }}
        >
          {text}
        </div>
      )}
      <Image
        src="/Spotlight_Marker_Red.svg"
        alt="Icon"
        width={iconWidth || 27}
        height={iconHeight || 43}
        style={{ zIndex: 3 }}
      />
    </button>
  );
}
