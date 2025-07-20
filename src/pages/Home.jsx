import React, { useEffect, useState } from "react";
import getBackgroundImage from "../components/getBackgroundImage";
import ClockDisplay from "../components/ClockDisplay";
import CurrencyConverter from "../components/CurrencyConverter";
import { haversineDistance, loadAllMarkers } from "../utils/geoUtils";
import NearbyCarousel from "../components/NearbyCarousel";


export default function App() {
  const [localTime, setLocalTime] = useState("");
  const [bcnTime, setBcnTime] = useState("");
  const [cityName, setCityName] = useState("Tu zona");
  const [hourDecimal, setHourDecimal] = useState(0);
  const [dateString, setDateString] = useState("");
  const [isLocalShown, setIsLocalShown] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyMarkers, setNearbyMarkers] = useState([]);


  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const hourDec = now.getHours() + now.getMinutes() / 60;
      setHourDecimal(hourDec);

      const barcelonaTime = now.toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
      });
      setBcnTime(barcelonaTime);

      const localTimeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setLocalTime(localTimeStr);

      const day = now.getDate().toString().padStart(2, "0");
      const month = now.toLocaleString("es-ES", { month: "long" });
      setDateString(`${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`);
    };

    const getLocationData = async () => {
      if (!navigator.geolocation) return;

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          // Establece la localización del usuario
          setUserLocation({ lat: latitude, lng: longitude });

          // Obtiene nombre de la ciudad
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
          );
          const data = await response.json();
          setCityName(data.city || data.locality || "Tu zona");

          // Carga los markers y filtra los cercanos
          const allMarkers = await loadAllMarkers();
          const nearby = allMarkers
            .map((marker) => {
              const dist = haversineDistance(latitude, longitude, marker.lat, marker.lng);
              return { ...marker, distance: dist };
            })
            .filter((marker) => marker.distance <= 1); // 1 km


          setNearbyMarkers(nearby);
        } catch (error) {
          console.error("Error obteniendo ubicación o markers:", error);
          setCityName("Tu zona");
        }
      });
    };

    updateTimes();
    getLocationData();
    const interval = setInterval(updateTimes, 60 * 1000);
    return () => clearInterval(interval);
  }, []);


  const bgImage = getBackgroundImage(hourDecimal);
  const displayedCity = isLocalShown ? cityName : "Barcelona";
  const displayedTime = isLocalShown ? localTime : bcnTime;

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white font-mono transition-colors duration-1000 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CurrencyConverter />
      <ClockDisplay
        city={displayedCity}
        date={dateString}
        time={displayedTime}
        onToggle={() => setIsLocalShown((prev) => !prev)}
      />
     {nearbyMarkers.length > 0 && (
         <NearbyCarousel markers={nearbyMarkers} />
     )}
    </div>
  );
}
