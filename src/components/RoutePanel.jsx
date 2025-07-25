import React from "react";

const RoutePanel = ({
  steps,
  routeInfo,
  expandedPanel,
  setExpandedPanel,
  onClose,
}) => {
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

          <ol className="space-y-4 list-decimal list-inside text-gray-800">
            {steps.map((instruction, index) => (
              <li
                key={index}
                dangerouslySetInnerHTML={{ __html: instruction }}
              />
            ))}
          </ol>

          <hr className="mt-6" />
        </div>
      </div>
    )
  );
};

export default RoutePanel;
