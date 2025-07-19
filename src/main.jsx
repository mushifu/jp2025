import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoadScript } from "@react-google-maps/api";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <App />
    </LoadScript>
  </StrictMode>,
)
