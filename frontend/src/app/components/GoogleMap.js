"use client";

import { useState } from "react";
import Image from "next/image";
import GoogleMapReact from "google-map-react";
import InfoCard from "./GoogleMap/InfoCard";
import useTextSearch from "@/hooks/useTextSearch";
import styles from "@/styles/css-modules/googlemap.module.scss";

function MyPositionMarker({ mapZoom }) {
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

function FilterMarker({ mapZoom, setClickPlace }) {
  console.log("mapZoom", mapZoom);
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
      onClick={() => setClickPlace(true)}
    >
      <Image
        src="/Spotlight_Marker_Red.svg"
        alt="Icon"
        width={iconWidth || 27}
        height={iconHeight || 43}
      />
    </button>
  );
}

export default function GoogleMap() {
  // 預設位置
  const [myPosition, setMyPosition] = useState({
    lat: 25.0533789,
    lng: 121.604905,
  });
  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [mapZoom, setMapZoom] = useState(15);
  const [showPlaceInfo, setShowPlaceInfo] = useState(false);
  const [clickPlace, setClickPlace] = useState(false);
  const {
    searchText,
    searchTextResults,
    setAutoMapApi,
    handleSearchTextChange,
  } = useTextSearch();
  const handleApiLoaded = (map, maps) => {
    const geocoder = new maps.Geocoder();
    console.log("map", map);
    console.log("maps", maps);
    geocoder.geocode({ address: "台北市" }, (results, status) => {
      if (status === "OK") {
        // map.setCenter(results[0].geometry.location);
        // setMyPosition({
        //   lat: results[0].geometry.location.lat(),
        //   lng: results[0].geometry.location.lng(),
        // });
        console.log("lat", results[0].geometry.location.lat());
        console.log("lng", results[0].geometry.location.lng());
      }
    });
    setMapInstance(map);
    setMapApi(maps);
    setAutoMapApi(maps);
    setMapApiLoaded(true);
    console.log("載入完成!");
  };

  const findFilterLocation = () => {
    if (mapApiLoaded) {
      const service = new mapApi.places.PlacesService(mapInstance);

      const request = {
        location: myPosition,
        rankBy: mapApi.places.RankBy.DISTANCE,
        keyword: "餐廳",
      };

      service.nearbySearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          setFilterPlaces(results);
          console.log(results);
        }
      });
    }
    console.log("findFilterLocation");
  };
  const handleSearchKeyDown = (e) => {
    if (e.keyCode === 13) {
      console.log("SearchFor");
      console.log(e.target.value);
      console.log(myPosition);
      const service = new mapApi.places.PlacesService(mapInstance);
      const request = {
        location: myPosition,
        query: e.target.value,
      };
      service.textSearch(request, (results, status) => {
        if (status === mapApi.places.PlacesServiceStatus.OK) {
          console.log(results);
          setFilterPlaces(results);
        }
      });
    }
  };
  const defaultProps = {
    center: {
      lat: 25.0533789,
      lng: 121.604905,
    },
    zoom: 15,
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        placeholder="請輸入地址"
        name="search"
        id="search"
        value={searchText}
        onChange={handleSearchTextChange}
        onKeyDown={handleSearchKeyDown}
        autoComplete="off"
      />
      {searchTextResults && (
        <div className={styles.searchResult}>
          {searchTextResults.map((result) => (
            <button
              type="button"
              key={result.id}
              className={styles.searchResultItem}
              onClick={() => {
                console.log(result);
                setMyPosition({
                  lat: result.geometry.location.lat(),
                  lng: result.geometry.location.lng(),
                });
                setFilterPlaces([]);
              }}
            >
              {result.formatted_address}
            </button>
          ))}
        </div>
      )}
      <div className={styles.filterBar}>
        <button
          type="button"
          className={styles.filter}
          onClick={() => findFilterLocation("cafe")}
        >
          <div className={styles.filterTitle}>coffee</div>
        </button>
        <button
          type="button"
          className={styles.filter}
          onClick={() => findFilterLocation("餐廳")}
        >
          <div className={styles.filterTitle}>餐廳</div>
        </button>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>咖啡廳</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>觀光景點</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>住宿</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>車站</div>
        </div>
        <div className={styles.filter}>
          <div className={styles.filterTitle}>購物</div>
        </div>
      </div>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
          libraries: ["places"],
        }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onChildMouseEnter={() => setShowPlaceInfo(true)}
        onChildMouseLeave={() => setShowPlaceInfo(false)}
        onGoogleApiLoaded={({ map, maps }) => {
          handleApiLoaded(map, maps);
        }}
        onBoundsChange={(zoom) => {
          console.log(zoom);
          setMapZoom(zoom);
        }}
      >
        <MyPositionMarker
          lat={myPosition.lat}
          lng={myPosition.lng}
          text="My Position"
          mapZoom={mapZoom}
        />

        {filterPlaces.map((place) => (
          <FilterMarker
            icon={place.icon}
            key={place.id}
            lat={place.geometry.location.lat()}
            lng={place.geometry.location.lng()}
            text={place.name}
            placeId={place.place_id}
            mapZoom={mapZoom}
            setClickPlace={setClickPlace}
          />
        ))}
      </GoogleMapReact>
      {(showPlaceInfo || clickPlace) && (
        <InfoCard setClickPlace={setClickPlace} />
      )}
    </div>
  );
}
