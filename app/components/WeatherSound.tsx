import { useEffect, useRef } from "react";

interface WeatherSoundProps {
  type: "sun" | "rain" | "snow";
}

export default function WeatherSound({ type }: WeatherSoundProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!type) return;
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, [type]);

  return null;
}
