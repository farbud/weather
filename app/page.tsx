"use client";

import { useState, useEffect } from "react";
import WeatherForm from "@/app/components/WeatherForm";
import WeatherCard from "@/app/components/WeatherCard";
import ForecastCard from "@/app/components/ForecastCard";
import WeatherSound from "@/app/components/WeatherSound";

interface WeatherData {
  name: string;
  main: { temp: number; humidity: number };
  weather: { description: string; icon: string; main: string }[];
  wind: { speed: number };
}

interface ForecastData {
  dt_txt: string;
  main: { temp: number };
  weather: { description: string; icon: string }[];
}

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const API_KEY = "762ffc5800f54c2b60291205ecce6b91";

  const getWeatherType = (main: string) => {
    const m = main.toLowerCase();
    if (m.includes("rain")) return "rain";
    if (m.includes("snow")) return "snow";
    return "sun";
  };

  const fetchWeather = async (city: string) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      if (!res.ok) throw new Error("شهر پیدا نشد");
      const data: WeatherData = await res.json();
      setWeather(data);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=fa`
      );
      if (!forecastRes.ok) throw new Error("پیش‌بینی پیدا نشد");
      const forecastData = await forecastRes.json();
      const dailyForecast = forecastData.list.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_: any, idx: number) => idx % 8 === 0
      );
      setForecast(dailyForecast);
    } catch (err) {
      alert((err as Error).message);
    }
  };

  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) fetchWeather(lastCity);
  }, []);

  const weatherType = weather ? getWeatherType(weather.weather[0].main) : "sun";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100 dark:bg-gray-900 text-black dark:text-white relative">
      <h1 className="text-3xl font-bold mb-4">🌤️ آب و هوا</h1>
      <WeatherForm onSearch={fetchWeather} />
      {weather && (
        <>
          <WeatherCard
            city={weather.name}
            temp={weather.main.temp}
            description={weather.weather[0].description}
            humidity={weather.main.humidity}
            wind={weather.wind.speed}
            icon={weather.weather[0].icon}
            weatherType={weatherType}
          />
          <WeatherSound type={weatherType} />
        </>
      )}
      {forecast.length > 0 && (
        <div className="flex gap-4 overflow-x-auto mt-4 pb-2 px-2 sm:flex sm:flex-wrap sm:text-base">
          {forecast.map((f, idx) => (
            <ForecastCard
              key={idx}
              day={new Date(f.dt_txt).toLocaleDateString("fa-IR", {
                weekday: "short",
              })}
              temp={f.main.temp}
              description={f.weather[0].description}
              icon={f.weather[0].icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}
