import React, { useState } from "react";

interface WeatherFormProps {
  onSearch: (city: string) => void;
}

export default function WeatherForm({ onSearch }: WeatherFormProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim() !== "") {
      onSearch(city);
      localStorage.setItem("lastCity", city);
      setCity("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mb-4">
      <input
        type="text"
        placeholder="نام شهر"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-4 py-2 border rounded-l dark:bg-gray-700 dark:text-white focus:outline-none text-sm sm:text-base"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition-colors text-sm sm:text-base"
      >
        جستجو
      </button>
    </form>
  );
}
