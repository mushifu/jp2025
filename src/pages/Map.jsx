import { useEffect, useState, useCallback } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh"
};

const center = {
  lat: 35.6762,
  lng: 139.6503
};

const markerStyles = {
  restaurant: {
    url: "/icons/restaurant.png",
    size: [32, 32]
  },
  hotel: {
    url: "/icons/hotel.png",
    size: [32, 32]
  },
  monumento: {
    url: "/icons/monumento.png",
    size: [32, 32]
  },
  templo: {
    url: "/icons/templos.png",
    size: [32, 32]
  },
  fotos: {
    url: "/icons/fotos.png",
    size: [32, 32]
  },
  compras: {
    url: "/icons/compras.png",
    size: [32, 32]
  },
  ocio: {
    url: "/icons/ocio.png",
    size: [32, 32]
  },
  default: {
    url: "/icons/default.png",
    size: [32, 32]
  }
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      <MarkerClustererF>
        {(clusterer) =>
          markers.map((marker, idx) => {
            const style = markerStyles[marker.type] || markerStyles.default;

            return (
              <Marker
                key={idx}
                position={{ lat: marker.lat, lng: marker.lng }}
                clusterer={clusterer}
                icon={{
                  url: style.url,
                  scaledSize: new window.google.maps.Size(...style.size)
                }}
                onClick={() => setSelectedMarker(marker)}
              />
            );
          })
        }
      </MarkerClustererF>

      {selectedMarker && (
        <InfoWindow
          position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div style={{ maxWidth: "300px" }}>
            {selectedMarker.image && (
              <img
                src={selectedMarker.image}
                alt={String(selectedMarker.title)}
                style={{ width: "100%", marginBottom: "8px" }}
              />
            )}
            <h3><strong>{String(selectedMarker.title)}</strong></h3>
            <p>{String(selectedMarker.description)}</p>
            <br />
            <a href="">Ver más</a>
          </div>
        </InfoWindow>

      )}
    </GoogleMap>
  );
};

export default Map;
