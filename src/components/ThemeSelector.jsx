import React from "react";
import { useTheme } from "./ThemeContext";
import { THEMES } from "../utils/themes";

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="backdrop-blur-md bg-white bg-opacity-10 p-6 rounded-xl shadow-lg">
      <h2 className="text-white text-2xl font-semibold mb-4">Estilo visual</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(THEMES).map(([key, value]) => (
          <div
            key={key}
            onClick={() => setTheme(key)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
              theme === key
                ? "border-white shadow-lg scale-105"
                : "border-transparent hover:border-white hover:scale-105"
            }`}
          >
            <div className="relative w-full pt-[56.25%]"> {/* 16:9 ratio */}
                          <div
                            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${value.preview})` }}
                          />
                        </div>
            <div className="text-center text-white py-2">
                          {value.name}
                        </div>

          </div>
        ))}
      </div>
    </div>
  );
}
