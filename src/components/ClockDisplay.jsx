import React from "react";

export default function ClockDisplay({ city, date, time, onToggle }) {
  return (
      <div className="absolute bottom-4 left-4 z-10 clockDisplayContainer">
            <div className="clockDisplayTop">
              <div className="whitespace-nowrap tracking-tight focus:outline-none">
                  <button
                    onClick={onToggle}
                    className="font-londrina-black clockHome_city"
                  >
                    {city}
                  </button>
              </div>
              <div className="whitespace-nowrap tracking-tight">
                <p className="clockHome_date font-londrina-outline">{date}</p>
              </div>
            </div>
            <div className="transition-opacity duration-500 clockDisplayBottom">
                <p className="clockHome_hour font-londrina-black">{time}</p>
              </div>
      </div>
  );
}
