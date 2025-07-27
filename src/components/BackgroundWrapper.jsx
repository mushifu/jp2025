import React from "react";
import { THEMES } from "../utils/themes";
import { useTheme } from "../components/ThemeContext";

// Función para obtener la imagen según la hora
function getBackgroundImage(hour, themeImages) {
  if (hour >= 24) hour -= 24;
  if (hour < 0) hour += 24;

  if (hour >= 5 && hour < 9) {
    return themeImages.amanecer;
  } else if (hour >= 9 && hour < 13) {
    return themeImages.manana;
  } else if (hour >= 12 && hour < 17) {
      return themeImages.dia;
  } else if (hour >= 17 && hour < 20) {
        return themeImages.tarde;
  } else if (hour >= 20 && hour < 21) {
        return themeImages.atardecer;
  } else if (hour >= 21 && hour < 23) {
        return themeImages.anochecer;
  } else {
    return themeImages.noche;
  }
}

export default function BackgroundWrapper({ children, hour = null }) {
    const { theme } = useTheme();
  const now = new Date();
  const hourDecimal = hour !== null ? hour : now.getHours() + now.getMinutes() / 60;
  const themeImages = THEMES[theme] || THEMES.bridgeTheme;
  const bgImage = getBackgroundImage(hourDecimal, themeImages);
  const mobilePositionX = themeImages.mobilePositionX || "center";

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white font-mono transition-colors duration-1000 relative
                 bg-cover"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundPositionX: "center", // valor por defecto, se sobreescribe en mobile
      }}
    >
      <div
        className="w-full"
        style={{
          // Esta parte solo afecta al fondo en móviles
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: `${mobilePositionX} center`,
        }}
      >
        {/* En móvil se muestra esta capa con el fondo ajustado */}
        <div className="md:hidden min-h-screen flex items-center justify-center">
          {children}
        </div>
      </div>

      {/* En escritorio se muestra este fondo normal */}
      <div className="hidden md:flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
