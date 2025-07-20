// Distancia entre dos puntos (Haversine)
export function haversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Cargar markers desde /public/markers/index.json
export async function loadAllMarkers() {
  const indexRes = await fetch("/markers/index.json");
  const markerFiles = await indexRes.json();

  const markers = await Promise.all(
    markerFiles.map(async (file) => {
      const res = await fetch(`/markers/${file}`);
      const data = await res.json();
      return data;
    })
  );

  return markers;
}
