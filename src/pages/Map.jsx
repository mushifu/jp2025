import { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh"
};

const center = {
  lat: 35.6762,
  lng: 139.6503
};

const Map = () => {
  const [markers, setMarkers] = useState([]);

  const loadMarkers = useCallback(async () => {
    try {
      const res = await fetch("/markers/index.json");
      const files = await res.json();

      const data = await Promise.all(
        files.map(async (filename) => {
          const response = await fetch(`/markers/${filename}`);
          return await response.json();
        })
      );

      setMarkers(data);
    } catch (err) {
      console.error("Error cargando marcadores:", err);
    }
  }, []);

  useEffect(() => {
    loadMarkers();
  }, [loadMarkers]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
    >
      <MarkerClustererF>
        {(clusterer) =>
          markers.map((marker, idx) => (
            <Marker
              key={idx}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.title || ""}
              clusterer={clusterer}
            />
          ))
        }
      </MarkerClustererF>
    </GoogleMap>
  );
};

export default Map;
