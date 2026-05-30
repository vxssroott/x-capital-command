import { useEffect, useRef } from "react";

export function StarshipBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 24;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(18deg)`;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* neural constellation particles */}
      <svg className="absolute inset-0 w-full h-full opacity-40" aria-hidden>
        <defs>
          <radialGradient id="dot">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137) % 1600;
          const y = (i * 211) % 900;
          const r = (i % 3) + 0.6;
          return <circle key={i} cx={x} cy={y} r={r} fill="url(#dot)" />;
        })}
        {Array.from({ length: 24 }).map((_, i) => {
          const x1 = (i * 173) % 1600;
          const y1 = (i * 97) % 900;
          const x2 = (i * 271) % 1600;
          const y2 = (i * 191) % 900;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeOpacity="0.04" strokeWidth="0.5" />;
        })}
      </svg>

      {/* starship watermark */}
      <div
        ref={ref}
        className="absolute top-1/2 left-[58%] -translate-y-1/2 w-[780px] h-[1200px] max-w-[80vw] max-h-[140vh] transition-transform duration-300 ease-out animate-pulse-slow"
        style={{ animationDuration: "12s", opacity: 0.18 }}
      >
        <svg viewBox="0 0 300 600" className="w-full h-full" aria-hidden>
          <defs>
            <linearGradient id="hull" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4D4D4D" />
              <stop offset="50%" stopColor="#A0A0A0" />
              <stop offset="100%" stopColor="#4D4D4D" />
            </linearGradient>
            <linearGradient id="fin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A0A0A0" />
              <stop offset="100%" stopColor="#3a3a3a" />
            </linearGradient>
          </defs>
          {/* nose cone */}
          <path d="M150 5 C 175 60, 195 110, 198 160 L 102 160 C 105 110, 125 60, 150 5 Z"
            fill="none" stroke="url(#hull)" strokeWidth="1.2" />
          {/* main hull */}
          <rect x="102" y="160" width="96" height="320" fill="none" stroke="url(#hull)" strokeWidth="1.2" />
          {/* hull rings */}
          {[200, 240, 280, 320, 360, 400, 440].map((y) => (
            <line key={y} x1="102" y1={y} x2="198" y2={y} stroke="#A0A0A0" strokeOpacity="0.4" strokeWidth="0.6" />
          ))}
          {/* forward flaps */}
          <path d="M102 210 L 70 240 L 70 270 L 102 250 Z" fill="none" stroke="url(#fin)" strokeWidth="1" />
          <path d="M198 210 L 230 240 L 230 270 L 198 250 Z" fill="none" stroke="url(#fin)" strokeWidth="1" />
          {/* aft flaps */}
          <path d="M102 410 L 60 460 L 60 495 L 102 470 Z" fill="none" stroke="url(#fin)" strokeWidth="1.2" />
          <path d="M198 410 L 240 460 L 240 495 L 198 470 Z" fill="none" stroke="url(#fin)" strokeWidth="1.2" />
          {/* engine skirt */}
          <path d="M100 480 L 90 540 L 210 540 L 200 480 Z" fill="none" stroke="url(#hull)" strokeWidth="1.2" />
          {/* raptor cluster */}
          {[110, 130, 150, 170, 190].map((x) => (
            <circle key={x} cx={x} cy={540} r="8" fill="none" stroke="#A0A0A0" strokeOpacity="0.6" strokeWidth="0.7" />
          ))}
          {/* landing legs */}
          <line x1="100" y1="480" x2="70" y2="585" stroke="#A0A0A0" strokeWidth="1" />
          <line x1="200" y1="480" x2="230" y2="585" stroke="#A0A0A0" strokeWidth="1" />
          <line x1="60" y1="585" x2="80" y2="585" stroke="#A0A0A0" strokeWidth="1.4" />
          <line x1="220" y1="585" x2="240" y2="585" stroke="#A0A0A0" strokeWidth="1.4" />
          {/* SPACEX label */}
          <text x="150" y="350" textAnchor="middle" fill="#A0A0A0" fillOpacity="0.5"
            fontFamily="Space Grotesk" fontSize="14" fontWeight="700" letterSpacing="3">SPACEX</text>
          <text x="150" y="370" textAnchor="middle" fill="#A0A0A0" fillOpacity="0.35"
            fontFamily="Space Grotesk" fontSize="9" letterSpacing="4">V3 · STARSHIP</text>
        </svg>
      </div>
    </div>
  );
}
