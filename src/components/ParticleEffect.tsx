import React, { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number; // percentage
  y: number; // percentage
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
  opacity: number;
}

interface ParticleEffectProps {
  type: "lotus" | "lamp" | "lantern" | "stars";
}

export default function ParticleEffect({ type }: ParticleEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate active particles
    const particleCount = type === "stars" ? 25 : 12;
    const items: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      items.push({
        id: i,
        x: Math.random() * 100,
        y: type === "lamp" || type === "lantern" ? 100 + Math.random() * 20 : -10 - Math.random() * 20,
        size: type === "stars" ? Math.random() * 4 + 2 : Math.random() * 15 + 10,
        delay: Math.random() * 10,
        duration: Math.random() * 12 + 10,
        rotation: Math.random() * 360,
        drift: Math.random() * 40 - 20,
        opacity: Math.random() * 0.4 + 0.3
      });
    }
    setParticles(items);
  }, [type]);

  const renderParticleSymbol = (pType: string) => {
    switch (pType) {
      case "lotus":
        // A stylized lotus petal SVG path
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-pink-300">
            <path d="M12,21C12,21 16,16 17.5,13.5C19,11 19,8.5 17.5,7C16,5.5 14,7 12,9.5C10,7 8,5.5 6.5,7C5,8.5 5,11 6.5,13.5C8,16 12,21 12,21Z" />
          </svg>
        );
      case "lamp":
        // Small glowing flame or clay lamp star
        return (
          <div className="w-full h-full rounded-full bg-amber-400 blur-[2px] animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
        );
      case "lantern":
        // Stylized classic diamond polygon representing a lantern
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-orange-300/80">
            <polygon points="12,2 19,9 19,15 12,22 5,15 5,9" />
            <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(251,146,60,0.5)" strokeWidth="1" />
            <line x1="5" y1="9" x2="19" y2="15" stroke="rgba(251,146,60,0.5)" strokeWidth="1" />
            <line x1="5" y1="15" x2="19" y2="9" stroke="rgba(251,146,60,0.5)" strokeWidth="1" />
          </svg>
        );
      case "stars":
      default:
        // Luminous glowing star
        return (
          <svg viewBox="0 0 24 24" fill="currentColor" className="text-yellow-200">
            <path d="M12,1.5L14.7,8.7L22,9.2L16.5,14L18.2,21.2L12,17.4L5.8,21.2L7.5,14L2,9.2L9.3,8.7L12,1.5Z" />
          </svg>
        );
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-10">
      {particles.map((p) => {
        const isRising = type === "lamp" || type === "lantern";
        // Combine styles based on rising vs falling direction
        const animationName = isRising ? "floatUp" : "floatDown";

        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationName: animationName,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
              transform: `rotate(${p.rotation}deg)`,
              // Custom falling properties directly
              "--drift": `${p.drift}px`,
              "--start-y": isRising ? "110%" : "-10%",
              "--end-y": isRising ? "-10%" : "110%",
            } as React.CSSProperties}
          >
            {renderParticleSymbol(type)}
          </div>
        );
      })}

      {/* Inject custom CSS keyframes dynamically so we don't mess up main CSS files */}
      <style>{`
        @keyframes floatDown {
          0% {
            transform: translateY(var(--start-y, -20px)) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity, 0.7);
          }
          90% {
            opacity: var(--opacity, 0.7);
          }
          100% {
            transform: translateY(var(--end-y, 800px)) translateX(var(--drift, 30px)) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(var(--start-y, 800px)) translateX(0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: var(--opacity, 0.8);
            transform: translateY(calc(var(--start-y, 800px) * 0.85)) translateX(calc(var(--drift, 30px) * 0.15)) scale(1);
          }
          85% {
            opacity: var(--opacity, 0.8);
          }
          100% {
            transform: translateY(var(--end-y, -20px)) translateX(var(--drift, 30px)) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
