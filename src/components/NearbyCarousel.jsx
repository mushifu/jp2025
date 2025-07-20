import React from "react";

export default function NearbyCarousel({ markers }) {
  if (!markers || markers.length === 0) return null;

  return (
    <div
      className="absolute bottom-4 left-[120px] right-4 bg-opacity-70 backdrop-blur-sm border border-white rounded-lg p-3 text-white text-sm shadow-lg max-w-full"
      style={{ maxWidth: "calc(100vw - 120px - 1rem)" }}
    >
      <h3 className="font-londrina-black text-white text-base font-semibold mb-2 px-4 select-none">
        Cerca de ti
      </h3>
      <div className="overflow-x-auto px-4 py-2 flex space-x-4 pr-10 scroll-smooth snap-x snap-mandatory">
        {markers.map((m) => {
          const hasImage = !!m.image;
          const backgroundStyle = hasImage
            ? { backgroundImage: `url(${m.image})` }
            : {};

          return (
            <div
              key={m.id}
              className={`relative inline-block w-[150px] h-36 flex-shrink-0 rounded-xl overflow-hidden shadow-md bg-cover bg-center ${
                !hasImage ? "bg-gray-200" : ""
              } snap-start`}
              style={backgroundStyle}
            >
              <div className="absolute bottom-2 left-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-md p-2 text-sm shadow">
                <a
                  href={`https://www.google.com/maps?q=${m.lat},${m.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-gray-800 truncate block hover:underline"
                >
                  {m.title}
                </a>
                <p className="text-gray-600 text-xs">
                  {typeof m.distance === "number"
                    ? `${m.distance.toFixed(2)} km`
                    : "Distància desconeguda"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
