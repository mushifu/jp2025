import React from "react";

import amanecer from "../assets/bridge-theme/amanecer.png";
import manana from "../assets/bridge-theme/manana.png";
import dia from "../assets/bridge-theme/dia.png";
import tarde from "../assets/bridge-theme/tarde.png";
import atardecer from "../assets/bridge-theme/atardecer.png";
import anochecer from "../assets/bridge-theme/anochecer.png";
import noche from "../assets/bridge-theme/noche.png";

// Función para obtener la imagen según la hora
function getBackgroundImage(hour) {
  if (hour >= 24) hour -= 24;
  if (hour < 0) hour += 24;

  if (hour >= 5 && hour < 9) {
    return amanecer;
  } else if (hour >= 9 && hour < 13) {
    return manana;
  } else if (hour >= 12 && hour < 17) {
      return dia;
  } else if (hour >= 17 && hour < 20) {
        return tarde;
  } else if (hour >= 20 && hour < 21) {
        return atardecer;
  } else if (hour >= 21 && hour < 23) {
        return anochecer;
  } else {
    return noche;
  }
}

export default function BackgroundWrapper({ children, hour = null }) {
  const now = new Date();
  const hourDecimal = hour !== null ? hour : now.getHours() + now.getMinutes() / 60;
  const bgImage = getBackgroundImage(hourDecimal);

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
          backgroundPosition: "20% center",
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
