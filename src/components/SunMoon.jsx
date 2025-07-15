import React from "react";

// Función declarada fuera del componente para poder exportarla
export function getBackgroundAndPosition(hour) {
  let bgColor = "";
  let isDay = true;

  if (hour >= 24) hour -= 24;
  if (hour < 0) hour += 24;

  if (hour >= 6 && hour < 8) {
    bgColor = "linear-gradient(90deg, #FFA17F, #00223E)";
  } else if (hour >= 8 && hour < 17) {
    bgColor = "linear-gradient(90deg, #87CEEB, #00BFFF)";
  } else if (hour >= 17 && hour < 20) {
    bgColor = "linear-gradient(90deg, #FF7E5F, #FEB47B)";
  } else {
    bgColor = "linear-gradient(90deg, #0F2027, #203A43, #2C5364)";
    isDay = false;
  }

  let pos = 0;
  if (isDay) {
    pos = ((hour - 6) / 14) * 100;
  } else {
    if (hour >= 20) pos = ((30 - hour) / 10) * 100;
    else pos = ((6 - hour) / 6) * 100;
  }

  return { bgColor, pos, isDay };
}

export default function SunMoon({ hourDecimal }) {
  const { bgColor, pos, isDay } = getBackgroundAndPosition(hourDecimal);

  return (
    <div
      style={{
        position: "fixed",
        top: 40,
        left: `${pos}%`,
        transform: "translateX(-50%)",
        transition: "left 1min linear",
        fontSize: 50,
        userSelect: "none",
        pointerEvents: "none",
        zIndex: 10,
      }}
      aria-label={isDay ? "Sol" : "Luna"}
    >
      {isDay ? "☀️" : "🌙"}
    </div>
  );
}
