import { useEffect, useState, useCallback, useRef } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { MarkerClustererF } from "@react-google-maps/api";
import { cleanMapStyle, markerStyles } from "../utils/constants"
import MapMarkerFilter from "../components/MapMarkerFilter";
import { haversineDistance, loadAllMarkers } from "../utils/geoUtils";


const containerStyle = {width: "100vw", height: "100vh"};   //Contendor del mapa
const center = { lat: 35.6762, lng: 139.6503 };     //Centro del mapa

const Map = () => {
  const [markers, setMarkers] = useState([]);   //Objeto para cargar los marcadores
  const [selectedMarker, setSelectedMarker] = useState(null);   //Objeto para controlar el marcador seleccioando
  const [activeTypes, setActiveTypes] = useState(new Set());    //Objeto para filtrar los marcadores
  const [allTypes, setAllTypes] = useState([]);     //Objeto para almcenar los filtros por tipo
  const [searchText, setSearchText] = useState("");     //Objeto para la barra de búsqueda


  // Función para cargar los marcadores desde ficheros JSON
  useEffect(() => {
    loadAllMarkers()
      .then(setMarkers)
      .catch(err => console.error("Error cargando marcadores:", err));
  }, []);


  //Calcula los filtros y activa todos por defecto
  useEffect(() => {
    const types = [...new Set(markers.map(m => m.type))];
    setAllTypes(types);
    setActiveTypes(new Set(types)); // activar todos por defecto
  }, [markers]);

  //Función para activar/desactivar filtros
  const toggleType = (type) => {
    setActiveTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  //Función para seleccionar todos los filtros
  const selectAll = () => {
    setActiveTypes(new Set(allTypes));
  };

  //Función para deseleccionar todos los filtros
  const clearAll = () => {
    setActiveTypes(new Set());
  };


  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5} options={{
       styles: cleanMapStyle,
       disableDefaultUI: false,
       streetViewControl: false,
       mapTypeControl: false
     }}>
        <MapMarkerFilter
          types={allTypes}
          activeTypes={activeTypes}
          toggleType={toggleType}
          selectAll={selectAll}
          clearAll={clearAll}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      <MarkerClustererF key={[...activeTypes].sort().join(",")}>
        {(clusterer) =>
          markers
            .filter((marker) => {
                const matchesType = activeTypes.has(marker.type);
                const matchesText = marker.title.toLowerCase().includes(searchText.toLowerCase()) || marker.description.toLowerCase().includes(searchText.toLowerCase());
                return matchesText && matchesType;
            }) // FILTRA por tipo activo y texto de búsqueda
            .map((marker, idx) => {
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
