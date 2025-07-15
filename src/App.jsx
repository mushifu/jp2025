import React, { useEffect, useState } from "react";
import Clock from "./components/Clock";
import getBackgroundImage from "./components/getBackgroundImage";

export default function App() {
  const [localTime, setLocalTime] = useState("");
  const [bcnTime, setBcnTime] = useState("");
  const [cityName, setCityName] = useState("Tu zona");
  const [hourDecimal, setHourDecimal] = useState(0);

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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start text-white font-mono px-4 pt-12 transition-colors duration-1000 relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Optional: overlay para contraste de texto */}
      <div className="absolute inset-0 bg-black bg-opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 text-center">
        <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Hora actual</h1>

        <div className="bg-white bg-opacity-20 rounded-2xl p-6 shadow-lg w-full max-w-md backdrop-blur-md">
          <Clock label="🕐 En Barcelona" time={bcnTime} />
          <Clock label={`🗺️ En ${cityName}`} time={localTime} />
        </div>
      </div>
    </div>
  );
}
