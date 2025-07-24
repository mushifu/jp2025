import { useState, useEffect, useRef } from "react";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MapMarkerFilter = ({ types, activeTypes, toggleType, selectAll, clearAll }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeCount = activeTypes.size;

  const panelRef = useRef(null);      // Referencia al panel
  const buttonRef = useRef(null);     // Referencia al botón del filtro

  const togglePanel = () => setIsOpen(!isOpen);

  // 🧩 Detectar clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Limpieza
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="absolute top-4 left-4 z-20">
      {/* Botón de filtro */}
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={togglePanel}
          className={`p-2 rounded-full shadow bg-white hover:shadow-md transition-all border ${
            activeCount > 0 ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-400"
          }`}
        >
          <Filter size={20} />
        </button>

        {/* Burbuja contador */}
        {activeCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold px-1.5 rounded-full">
            {activeCount}
          </span>
        )}
      </div>

      {/* Panel animado */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mt-2 bg-white bg-opacity-95 p-4 rounded shadow max-h-[70vh] overflow-y-auto w-64"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-sm">Filtrar por tipo</h3>
              <button onClick={togglePanel} className="text-gray-500 hover:text-black">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3">
              {types.map((type) => {
                const isActive = activeTypes.has(type);
                return (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-sm">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                    {/* Switch */}
                    <button
                      onClick={() => toggleType(type)}
                      className={`w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                        isActive ? "bg-blue-500" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform ${
                          isActive ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-between text-xs">
              <button
                onClick={selectAll}
                className="text-blue-500 hover:underline font-medium"
              >
                Seleccionar todos
              </button>
              <button
                onClick={clearAll}
                className="text-red-500 hover:underline font-medium"
              >
                Ninguno
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapMarkerFilter;
