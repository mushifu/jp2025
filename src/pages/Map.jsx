import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { GoogleMap, Marker, InfoWindow, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";
import { cleanMapStyle, markerStyles } from "../utils/constants";
import MapMarkerFilter from "../components/MapMarkerFilter";
import { loadAllMarkers } from "../utils/geoUtils";
import RoutePanel from "../components/RoutePanel";


const containerStyle = { width: "100vw", height: "100vh" };
const defaultCenter = { lat: 35.6762, lng: 139.6503 };

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [activeTypes, setActiveTypes] = useState(new Set());
  const [allTypes, setAllTypes] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directions, setDirections] = useState(null);
  const [steps, setSteps] = useState([]);
  const [routeInfo, setRouteInfo] = useState({ duration: "", distance: "" });
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState(false);

  const mapRef = useRef(null);
  const onLoadMap = useCallback(map => { mapRef.current = map; }, []);

  useEffect(() => {
    loadAllMarkers()
      .then(setMarkers)
      .catch(err => console.error("Error cargando marcadores:", err));
  }, []);

  useEffect(() => {
    const types = [...new Set(markers.map(m => m.type))];
    setAllTypes(types);
    setActiveTypes(new Set(types));
  }, [markers]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setOrigin({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => console.error("Error obteniendo ubicación:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const filteredMarkers = useMemo(() => {
    return markers.filter(marker => {
      const matchesType = activeTypes.has(marker.type);
      const matchesText = marker.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          marker.description.toLowerCase().includes(searchText.toLowerCase());
      return matchesType && matchesText;
    });
  }, [markers, activeTypes, searchText]);

  const toggleType = (type) => {
    setActiveTypes(prev => {
      const newSet = new Set(prev);
      newSet.has(type) ? newSet.delete(type) : newSet.add(type);
      return newSet;
    });
  };

  const selectAll = () => setActiveTypes(new Set(allTypes));
  const clearAll = () => setActiveTypes(new Set());

  const startDirections = (marker) => {
    if (origin) {
      setDestination({ lat: marker.lat, lng: marker.lng });
      setDirections(null);
      setSteps([]);
      setRouteInfo({ duration: "", distance: "" });
      setLoadingRoute(true);  // Activa spinner
    } else {
      alert("No se pudo obtener tu ubicación.");
    }
  };

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={5}
        onLoad={onLoadMap}
        options={{
          styles: cleanMapStyle,
          disableDefaultUI: false,
          streetViewControl: false,
          mapTypeControl: false
        }}
      >
        {/* Filtros */}
        <MapMarkerFilter
          types={allTypes}
          activeTypes={activeTypes}
          toggleType={toggleType}
          selectAll={selectAll}
          clearAll={clearAll}
          searchText={searchText}
          setSearchText={setSearchText}
        />

        {/* Clustering */}
        <MarkerClustererF>
          {(clusterer) =>
            filteredMarkers.map((marker, idx) => {
              const style = markerStyles[marker.type] || markerStyles.default;
              return (
                <Marker
                  key={idx}
                  position={{ lat: marker.lat, lng: marker.lng }}
                  clusterer={clusterer}
                  icon={{
                    url: style.url,
                    scaledSize: new window.google.maps.Size(...style.size),
                  }}
                    link = "#"
                  onClick={() => {
                    setSelectedMarker(marker);
                  }}
                />
              );
            })
          }
        </MarkerClustererF>

        {/* InfoWindow */}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
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

              {/* Botones: Ver más + Cómo llegar */}
              <div className="mt-4 flex gap-2">
                {selectedMarker.link && (
                  <a
                    href={selectedMarker.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 transition"
                  >
                    Ver más
                  </a>
                )}
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  onClick={() => startDirections(selectedMarker)}
                >
                  Cómo llegar
                </button>
              </div>
            </div>
          </InfoWindow>

        )}

        {/* DirectionsService */}
        {origin && destination && !directions && (
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: window.google.maps.TravelMode.DRIVING,
            }}
            callback={(result, status) => {
              setLoadingRoute(false);  // Desactiva spinner
              if (status === "OK") {
                setDirections(result);
                const leg = result.routes[0].legs[0];
                const steps = leg.steps.map(step => step.instructions);
                setSteps(steps);
                setRouteInfo({
                  duration: leg.duration.text,
                  distance: leg.distance.text
                });
              } else {
                console.error("Error obteniendo direcciones:", status);
              }
            }}
          />
        )}

        {/* DirectionsRenderer */}
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions,
              suppressMarkers: false,
              preserveViewport: true,
            }}
          />
        )}
      </GoogleMap>

      {/* Overlay de carga */}
      {loadingRoute && (
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center z-20">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Direcciones como llegar */}
      <RoutePanel
        steps={steps}
        routeInfo={routeInfo}
        expandedPanel={expandedPanel}
        setExpandedPanel={setExpandedPanel}
        onClose={() => {
          setDirections(null);
          setDestination(null);
          setSelectedMarker(null);
          setSteps([]);
          setRouteInfo({ duration: "", distance: "" });
          setExpandedPanel(false);
        }}
      />
    </div>
  );
};

export default Map;
