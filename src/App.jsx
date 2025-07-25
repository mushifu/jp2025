import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import WalletPage from "./pages/WalletPage";
import NavBar from "./components/NavBar";
import { MapIcon } from "lucide-react";

export default function App() {
  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/wallet" element={<WalletPage />} />
        </Routes>
        <NavBar />
      </div>
    </Router>
  );
}
