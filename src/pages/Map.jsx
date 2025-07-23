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
  comida: {
    url: "/icons/restaurant.png",
    size: [32, 32]
  },
  alojamiento: {
    url: "/icons/hotel.png",
    size: [32, 32]
  },
  visitas: {
    url: "/icons/monumento.png",
    size: [32, 32]
  },
  templos: {
    url: "/icons/templos.png",
    size: [32, 32]
  },
  spots: {
    url: "/icons/fotos.png",
    size: [32, 32]
  },
  rutas: {
      url: "/icons/rutas.png",
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
const cleanMapStyle = [
                        {
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#ebe3cd"
                            }
                          ]
                        },
                        {
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#523735"
                            }
                          ]
                        },
                        {
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "color": "#f5f1e6"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "color": "#c9b2a6"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative.land_parcel",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "color": "#dcd2be"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative.land_parcel",
                          "elementType": "labels",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "administrative.land_parcel",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#ae9e90"
                            }
                          ]
                        },
                        {
                          "featureType": "landscape.natural",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#dfd2ae"
                            }
                          ]
                        },
                        {
                          "featureType": "poi",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#dfd2ae"
                            }
                          ]
                        },
                        {
                          "featureType": "poi",
                          "elementType": "labels.text",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "poi",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#93817c"
                            }
                          ]
                        },
                        {
                          "featureType": "poi.business",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "poi.park",
                          "elementType": "geometry.fill",
                          "stylers": [
                            {
                              "color": "#a5b076"
                            }
                          ]
                        },
                        {
                          "featureType": "poi.park",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#447530"
                            }
                          ]
                        },
                        {
                          "featureType": "road",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#f5f1e6"
                            }
                          ]
                        },
                        {
                          "featureType": "road",
                          "elementType": "labels.icon",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "road.arterial",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#fdfcf8"
                            }
                          ]
                        },
                        {
                          "featureType": "road.highway",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#f8c967"
                            }
                          ]
                        },
                        {
                          "featureType": "road.highway",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "color": "#e9bc62"
                            }
                          ]
                        },
                        {
                          "featureType": "road.highway.controlled_access",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#e98d58"
                            }
                          ]
                        },
                        {
                          "featureType": "road.highway.controlled_access",
                          "elementType": "geometry.stroke",
                          "stylers": [
                            {
                              "color": "#db8555"
                            }
                          ]
                        },
                        {
                          "featureType": "road.local",
                          "elementType": "labels",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "road.local",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#806b63"
                            }
                          ]
                        },
                        {
                          "featureType": "transit",
                          "stylers": [
                            {
                              "visibility": "off"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#dfd2ae"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#8f7d77"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.line",
                          "elementType": "labels.text.stroke",
                          "stylers": [
                            {
                              "color": "#ebe3cd"
                            }
                          ]
                        },
                        {
                          "featureType": "transit.station",
                          "elementType": "geometry",
                          "stylers": [
                            {
                              "color": "#dfd2ae"
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "geometry.fill",
                          "stylers": [
                            {
                              "color": "#b9d3c2"
                            }
                          ]
                        },
                        {
                          "featureType": "water",
                          "elementType": "labels.text.fill",
                          "stylers": [
                            {
                              "color": "#92998d"
                            }
                          ]
                        }
                      ];


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
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5} options={{
                                                                               styles: cleanMapStyle,
                                                                               disableDefaultUI: false, // si quieres quitar todos los controles: true
                                                                               streetViewControl: false,
                                                                               mapTypeControl: false
                                                                             }}>
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
