import React from 'react';
import "../WalletPage.css";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useAuth } from '../components/AuthContext';
import TopBar from '../components/TopBar';
import { Star } from 'lucide-react';

import background from "../assets/police-lights.jpg";
import unauthorized from "../assets/acceso_no_autorizado.png";
const reservas = [
    {
      id: 1,
      title: '✈️ Vuelo de Barcelona a Tokio (Iberia)',
      description: 'Salida: 25 Jul 2025 - 13:45h\nLlegada: 26 Jul 2025 - 09:10h',
      link: 'https://www.iberia.com/es/vuelos/barcelona-tokio/',
    },
    {
      id: 2,
      title: '🏠 Airbnb en Tokio - Shibuya',
      description: '26 Jul - 30 Jul\nDirección: 1 Chome-2-3 Dogenzaka, Shibuya City, Tokyo',
      link: 'https://www.google.com/maps?q=1+Chome-2-3+Dogenzaka,+Shibuya+City,+Tokyo',
    },
    {
      id: 3,
      title: '🏨 Hotel Granvia Kyoto',
      description: '30 Jul - 3 Ago\nDirección: JR Kyoto Station, Karasuma Chuo-guchi, Kyoto',
      link: 'https://www.google.com/maps?q=Hotel+Granvia+Kyoto',
    },
    {
      id: 4,
      title: '🚅 JR Pass Activación',
      description: 'Canjear el 27 Jul en estación de Tokio',
      link: 'https://www.japanrailpass.net/es/',
    },
  ];
const WalletPage = () => {
    const { user, login, logout } = useAuth();

        if (!user) {
          return (
            <div
              className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
            >
              <TopBar />
              <div className="flex flex-col items-center space-y-4 mt-16">

                <img src={unauthorized} alt="Logo 2" className="w-[90%] max-w-md object-contain" />
                <div className="flex space-x-1 mt-4">
                          {Array.from({ length: 5 }).map((_, idx) => (
                            <Star key={idx} size={28} stroke="black" strokeWidth={2.5} fill="white" />
                          ))}
                        </div>
                <p className="text-black text-lg text-center mt-4 px-4">
                  Acceso privado – Inicia sesión para ver los documentos
                </p>
              </div>
            </div>
          );
        }


{{
    return (
          <BackgroundWrapper>

        <div className="wallet-container">
          <h1 className="wallet-title">🎒 Mi viaje a Japón</h1>
          <div className="wallet-cards">
            {reservas.map((item, index) => (
              <div
                key={item.id}
                className={`wallet-card card-${index % 3}`}
              >
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.link.includes('maps') ? '📍 Ver en Google Maps' : '🔗 Abrir Enlace'}
                </a>
              </div>
            ))}
          </div>
        </div>
        </BackgroundWrapper>
      );

    }}
};

export default WalletPage;
