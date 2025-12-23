import React from "react";

interface WeatherProps {
  city: string;
  temp: number;
  description: string;
  humidity: number;
  wind: number;
  icon: string;
  weatherType: "sun" | "rain" | "snow";
}

export default function WeatherCard({
  city,
  temp,
  description,
  humidity,
  wind,
  icon,
  weatherType,
}: WeatherProps) {
  const gradient =
    weatherType === "sun"
      ? "from-yellow-400 to-orange-500"
      : weatherType === "rain"
      ? "from-blue-500 to-indigo-700"
      : "from-gray-400 to-gray-700";

  return (
    <div
      className={`p-6 sm:p-4 md:p-6 rounded-xl shadow-lg text-center transform hover:scale-105 transition-transform duration-300 text-white relative w-full sm:w-80  ${gradient}`}
    >
      <h2 className="text-2xl font-bold mb-2">{city}</h2>
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto mb-2"
      />
      <p className="text-lg mb-2">{description}</p>
      <p className="mb-1">🌡️ {temp}°C</p>
      <p className="mb-1">💧 رطوبت: {humidity}%</p>
      <p>🌬️ باد: {wind} m/s</p>
    </div>
  );
}
