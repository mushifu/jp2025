import { Link, useLocation } from "react-router-dom";
import { Home, Wallet, Map, Settings } from "lucide-react";

const TapBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white/20 backdrop-blur-sm border-t border-white/30 shadow-lg z-50 rounded-t-xl">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        <Link to="/" className="flex flex-col items-center justify-center">
          <Home
            size={28}
            className={`transition-colors duration-300 ease-in-out ${
              currentPath === "/" ? "text-blue-600" : "text-[#191919]"
            }`}
          />
        </Link>

        <Link to="/map" className="flex flex-col items-center justify-center">
          <Map
            size={28}
            className={`transition-colors duration-300 ease-in-out ${
              currentPath === "/map" ? "text-blue-600" : "text-[#191919]"
            }`}
          />
        </Link>

        <Link to="/wallet" className="flex flex-col items-center justify-center">
          <Wallet
            size={28}
            className={`transition-colors duration-300 ease-in-out ${
              currentPath === "/wallet" ? "text-blue-600" : "text-[#191919]"
            }`}
          />
        </Link>
        <Link to="/settings" className="flex flex-col items-center justify-center">
                  <Settings
                    size={28}
                    className={`transition-colors duration-300 ease-in-out ${
                      currentPath === "/settings" ? "text-blue-600" : "text-[#191919]"
                    }`}
                  />
                </Link>
      </div>
    </nav>
  );
};

export default TapBar;