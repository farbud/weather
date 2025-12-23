import React from "react";

interface ForecastProps {
  day: string;
  temp: number;
  description: string;
  icon: string;
}

export default function ForecastCard({
  day,
  temp,
  description,
  icon,
}: ForecastProps) {
  return (
    <div className="p-4 sm:p-2 bg-white dark:bg-gray-800 rounded-xl sm:flex shadow text-center w-28 sm:flex-wrap md:w-32 transform hover:scale-105 transition-transform duration-300">
      <p className="font-bold mb-1">{day}</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
        className="mx-auto mb-1"
      />
      <p className="text-sm mb-1">{description}</p>
      <p>🌡️ {temp}°C</p>
    </div>
  );
}
