import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import WalletPage from "./pages/WalletPage";
import SettingsPage from "./pages/SettingsPage";
import TapBar from "./components/TapBar";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './components/AuthContext';


export default function App() {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <Router>
          <div className="relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
            <TapBar />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
