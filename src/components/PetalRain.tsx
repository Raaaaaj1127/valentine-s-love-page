import { useMemo } from "react";

const PetalRain = () => {
  const petals = useMemo(() => {
    const emojis = ["🌹", "🌷", "🌻", "🌸", "💐", "🪻"];
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      left: Math.random() * 100,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 12,
      size: 16 + Math.random() * 20,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <span
          key={p.id}
          className="absolute animate-petal-fall"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};

export default PetalRain;
