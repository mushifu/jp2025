import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import { MapIcon } from "lucide-react";

function NavButton() {
  const location = useLocation();

  if (location.pathname === "/map") return null;

  return (
    <Link to="/map" className="absolute bottom-4 right-4 bg-white text-black p-2 rounded-full shadow-lg">
      <MapIcon className="w-6 h-6" />
    </Link>
  );
}

export default function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
        </Routes>
        <NavButton />
      </div>
    </Router>
  );
}
