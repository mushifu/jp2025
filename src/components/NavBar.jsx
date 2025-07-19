import { useLocation, Link } from "react-router-dom";
import { MapIcon, HomeIcon } from "lucide-react";

function NavBar() {
  const location = useLocation();
  const isMapPage = location.pathname === "/map";

  const target = isMapPage ? "/" : "/map";
  const Icon = isMapPage ? HomeIcon : MapIcon;
  const label = isMapPage ? "Volver al inicio" : "Ir al mapa";

  return (
    <Link
      to={target}
      aria-label={label}
      title={label}
      className="fixed top-1/2 right-4 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-black shadow-xl hover:scale-105 hover:bg-white transition-transform z-50"
    >
      <Icon className="w-6 h-6" />
    </Link>
  );
}

export default NavBar;
