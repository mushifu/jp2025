import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Map } from "lucide-react";

const TapBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md rounded-full shadow-lg flex gap-6 px-4 py-1 z-50"
      style={{ maxWidth: "200px" }}
    >
      <Link to="/" className="flex flex-col items-center justify-center">
        <Home
          size={42}
          className={`transition-colors duration-300 ease-in-out ${
            currentPath === "/" ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </Link>

      <Link to="/map" className="flex flex-col items-center justify-center">
        <Map
          size={42}
          className={`transition-colors duration-300 ease-in-out ${
            currentPath === "/map" ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </Link>

      <Link to="/wallet" className="flex flex-col items-center justify-center">
        <Wallet
          size={42}
          className={`transition-colors duration-300 ease-in-out ${
            currentPath === "/wallet" ? "text-blue-600" : "text-gray-400"
          }`}
        />
      </Link>
    </nav>
  );
};

export default TapBar;
