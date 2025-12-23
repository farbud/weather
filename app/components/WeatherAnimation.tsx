interface WeatherAnimationProps {
  type: "sun" | "rain" | "snow";
}

export default function WeatherAnimation({ type }: WeatherAnimationProps) {
  switch (type) {
    case "sun":
      return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
          <div className="w-40 h-40 rounded-full animate-pulse"></div>
        </div>
      );

    case "rain":
      return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <line
              key={i}
              x1={Math.random() * 100 + "%"}
              y1={Math.random() * -100 + "%"}
              x2={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
              stroke="rgba(59, 130, 246,0.6)"
              strokeWidth="2"
              className="animate-fall-slow"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
        </svg>
      );

    case "snow":
      return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.random() * 100 + "%"}
              cy={Math.random() * -100 + "%"}
              r="3"
              fill="white"
              className="animate-fall-slow"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            />
          ))}
        </svg>
      );

    default:
      return null;
  }
}
