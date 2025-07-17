import { useState, useEffect } from "react";
import { RefreshCw, Repeat2 } from "lucide-react";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [converted, setConverted] = useState("");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("JPY");
  const [rate, setRate] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

useEffect(() => {
  const stored = localStorage.getItem("currencyData");
  if (!stored) {
    fetchRate(true).then(success => {
      if (!success) {
        // Si fetchRate falla, usar tasa por defecto
        const defaultRate = 166.0;
        const now = new Date().toISOString();
        localStorage.setItem("currencyData", JSON.stringify({ rate: defaultRate, timestamp: now }));
        setRate(defaultRate);
        setLastUpdate(new Date(now));
      }
    });
  } else {
    const parsed = JSON.parse(stored);
    setRate(parsed.rate);
    setLastUpdate(new Date(parsed.timestamp));
  }
}, []);


  const convert = (val) => {
    if (!rate) return;
    const value = parseFloat(val);
    console.log("value "+value+", rate: "+rate);
    if (isNaN(value)) {
      setConverted("");
      return;
    }
    const result = from === "EUR" ? value * rate : value / rate;
    setConverted(result.toFixed(2));
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setAmount(val);
    convert(val);
  };

  const toggleCurrency = () => {
    const newFrom = to;
    const newTo = from;
    setFrom(newFrom);
    setTo(newTo);
    if (amount) convert(amount);
  };
  const fetchRate = async (force = false) => {
    if (!force && !shouldFetchRate()) return false; // No hace nada si no toca actualizar y no es forzado
    setIsFetching(true);
    try {
      const res = await fetch("https://api.currencylayer.com/live?access_key=a3d03a6c065fdb71ec59865d23f604b8&format=1&source=EUR&currencies=JPY");
            const data = await res.json();
            if (data && data.quotes && data.quotes.EURJPY) {
              const newRate = data.quotes.EURJPY;
              let timestampMillis = Date.now();
                    if (data.timestamp) {
                      timestampMillis = data.timestamp * 1000;
                    }
                    const nowISO = new Date(timestampMillis).toISOString();

                    localStorage.setItem(
                      "currencyData",
                      JSON.stringify({ rate: newRate, timestamp: nowISO })
                    );
        setRate(newRate);
        setLastUpdate(new Date(new Date(timestampMillis)));
        if (amount) convert(amount);
        return true;
      }
    } catch (error) {
      console.error("Error al actualizar la tasa:", error);
    } finally {
      setIsFetching(false);
    }
    return false;
  };



  const shouldFetchRate = () => {
    if (!lastUpdate) return true;
    const now = new Date();
    const diffHours = (now - lastUpdate) / (1000 * 60 * 60);
    return diffHours > 24;
  };

  const isOld = lastUpdate && ((new Date() - lastUpdate) / (1000 * 60 * 60)) > 72;

  return (
    <div className="absolute top-4 right-4 bg-opacity-70 backdrop-blur-sm border border-white rounded-lg p-3 text-white text-sm shadow-lg w-64 max-w-full">
      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center gap-2 font-semibold text-lg justify-center">
          {from}
          <button
            onClick={toggleCurrency}
            className="p-1 hover:text-white transition"
            aria-label="Cambiar divisa"
          >
            <Repeat2 size={20} />
          </button>
          {to}
        </div>
      </div>
      <input
        type="number"
        value={amount}
        onChange={handleChange}
        placeholder={`Cantidad en ${from}`}
        className="w-full p-2 bg-transparent border-0 border-b border-white text-white mb-2 text-sm focus:outline-none"
      />
      <div className="text-lg text-white mb-2 text-center">
        ≈ {converted} {to}
      </div>
      <div className="text-[0.65rem] text-white flex items-center justify-between">
        <span>
          {lastUpdate ? `Actualizado: ${lastUpdate.toLocaleDateString()} ${lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Cargando..."}
          {isOld && <span className="text-red-600 ml-1">⚠️ Antiguo</span>}
        </span>
        <button
          onClick={fetchRate}
          className={`ml-2 ${isFetching ? "animate-spin" : ""}`}
          aria-label="Actualizar tasa"
        >
          <RefreshCw size={14} />
        </button>
      </div>
    </div>
  );
}
