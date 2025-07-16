import React, { useEffect, useState } from "react";
import getBackgroundImage from "./components/getBackgroundImage";
import ClockDisplay from "./components/ClockDisplay";

export default function App() {
  const [localTime, setLocalTime] = useState("");
  const [bcnTime, setBcnTime] = useState("");
  const [cityName, setCityName] = useState("Tu zona");
  const [hourDecimal, setHourDecimal] = useState(0);
  const [dateString, setDateString] = useState("");
  const [isLocalShown, setIsLocalShown] = useState(true);

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      const hourDec = now.getHours() + now.getMinutes() / 60;
      setHourDecimal(hourDec);

      const barcelonaTime = now.toLocaleTimeString("es-ES", {
        timeZone: "Europe/Madrid",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setBcnTime(barcelonaTime);

      const localTimeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setLocalTime(localTimeStr);

      const day = now.getDate().toString().padStart(2, "0");
      const month = now.toLocaleString("es-ES", { month: "long" });
      setDateString(`${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
          );
          const data = await response.json();
          setCityName(data.city || data.locality || "Tu zona");
        } catch {
          setCityName("Tu zona");
        }
      });
    }

    updateTimes();
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
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none z-0" />
      <ClockDisplay
        city={displayedCity}
        date={dateString}
        time={displayedTime}
        onToggle={() => setIsLocalShown((prev) => !prev)}
      />
    </div>
  );
}
