import React from "react";

export default function Clock({ label, time }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl">{label}</h2>
      <p className="text-3xl font-semibold">{time}</p>
    </div>
  );
}
