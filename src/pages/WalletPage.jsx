import React from 'react';

const WalletPage = () => {
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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>🎒 Mi viaje a Japón</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {reservas.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              width: '300px',
              background: '#f9f9f9',
            }}
          >
            <h2>{item.title}</h2>
            <p style={{ whiteSpace: 'pre-line' }}>{item.description}</p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                marginTop: '1rem',
                background: '#007bff',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                textDecoration: 'none',
              }}
            >
              {item.link.includes('maps') ? '📍 Ver en Google Maps' : '🔗 Abrir Enlace'}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletPage;
