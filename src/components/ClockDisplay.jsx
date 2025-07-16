import React from "react";

export default function ClockDisplay({ city, date, time, onToggle }) {
  return (
      <div className="absolute bottom-4 left-4 z-10 clockDisplayContainer">
            <div className="clockDisplayTop">
              <div className="whitespace-nowrap tracking-tight focus:outline-none">
                  <button
                    onClick={onToggle}
                    className="text-sm font-londrina-black rotate-270"
                  >
                    {city}
                  </button>
              </div>
              <div className="whitespace-nowrap tracking-tight">
                <p className="text-sm rotate-270 font-londrina-outline">{date}</p>
              </div>
            </div>
            <div className="text-2xl font-semibold text-left mt-2 transition-opacity duration-500 clockDisplayBottom">
                <p className="text-2xl font-semibold font-londrina-black">{time}</p>
              </div>
      </div>
  );
}
