import React from "react";
import { Bus, Train } from "lucide-react"; // Importa los iconos que necesites

const RoutePanel = ({
  steps,               // ahora es leg.steps, tal cual
  routeInfo,
  expandedPanel,
  setExpandedPanel,
  onClose,
  travelMode,
  setTravelMode
}) => {

  const formatStep = (step, index) => {
    if (step.travel_mode === "TRANSIT" && step.transit) {
      const t = step.transit;
      const vehicle = t.line.vehicle.type;
      const lineName = t.line.short_name || t.line.name;

      // Color desde la API Google
      console.log("linea: "+t.line.color);
      console.log("linea texto: "+t.line.textColor);
      const lineColor = t.line.color ? `${t.line.color}` : null;
      const lineTextColor = t.line.textColor ? `${t.line.textColor}` : "#000";

      const { icon } = (() => {
        if (vehicle === "BUS") return { icon: <Bus size={16} /> };
        if (vehicle === "TRAIN") return { icon: <Train size={16} /> };
        if (vehicle === "SUBWAY") return { icon: <Train size={16} /> };
        return { icon: <Bus size={16} /> };
      })();

      const label = vehicle === "SUBWAY" ? `Metro ${lineName}` : `${vehicle.charAt(0).toUpperCase() + vehicle.slice(1).toLowerCase()} ${lineName}`;

      return (
        <li key={index} className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-1 rounded-full text-sm font-semibold flex items-center gap-1"
              style={{
                backgroundColor: lineColor || "#d1d5db", // fallback gris claro
                color: lineTextColor,
              }}
            >
              {icon} {label}
            </span>
          </div>
          <div className="text-sm text-gray-700 ml-6">
            Desde <strong>{t.departure_stop.name}</strong> hasta <strong>{t.arrival_stop.name}</strong> ({t.num_stops} paradas)
          </div>
        </li>
      );
    } else {
      return (
        <li key={index} className="text-gray-800 text-sm">
          {step.instructions && (
            <span dangerouslySetInnerHTML={{ __html: step.instructions }} />
          )}
        </li>
      );
    }
  };


  return (
    steps.length > 0 && (
      <div
        className={`absolute left-0 w-full bg-white shadow-inner overflow-y-auto z-20 transition-all duration-300 ${
          expandedPanel ? "top-0 h-full" : "bottom-0 h-1/2"
        }`}
      >
        {/* CABECERA FIJA */}
        <div className="sticky top-0 bg-white z-30 p-4 border-b flex items-center justify-between shadow-sm">
          {/* Botón cerrar a la izquierda */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 transition text-xl"
            aria-label="Cerrar panel"
          >
            ×
          </button>

          {/* Botón expandir/contraer centrado */}
          <button
            onClick={() => setExpandedPanel((prev) => !prev)}
            className="text-gray-500 hover:text-gray-700 transition text-sm flex items-center gap-1"
            style={{ flexGrow: 1, justifyContent: "center", display: "flex" }}
            aria-label={expandedPanel ? "Minimizar panel" : "Expandir panel"}
          >
            {expandedPanel ? (
              <>
                Minimizar
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 9l7 7 7-7"
                  />
                </svg>
              </>
            ) : (
              <>
                Expandir
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 15l-7-7-7 7"
                  />
                </svg>
              </>
            )}
          </button>

          {/* Espaciador a la derecha para equilibrar */}
          <div style={{ width: 24 }} />
        </div>

        {/* CONTENIDO DE RUTA */}
        <div className="p-4 pt-2">
          <h2 className="text-xl font-bold mb-4">Cómo llegar</h2>

          <div className="mb-4 text-gray-700">
            <p>
              <strong>Duración:</strong> {routeInfo.duration}
            </p>
            <p>
              <strong>Distancia:</strong> {routeInfo.distance}
            </p>
          </div>

          <hr className="mb-4" />

          {/* Selección de modo de transporte */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setTravelMode("WALKING")}
              className={`px-3 py-1 rounded ${
                travelMode === "WALKING"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              A pie
            </button>
            <button
              onClick={() => setTravelMode("TRANSIT")}
              className={`px-3 py-1 rounded ${
                travelMode === "TRANSIT"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Transporte público
            </button>
          </div>

          <ol className="space-y-4 list-decimal list-inside text-gray-800">
            {steps.map((step, index) => formatStep(step, index))}
          </ol>

          <hr className="mt-6" />
        </div>
      </div>
    )
  );
};

export default RoutePanel;
