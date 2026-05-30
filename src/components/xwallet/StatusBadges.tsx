import { useEffect, useState } from "react";

export function ThreatBadge() {
  const [pct, setPct] = useState(87);
  useEffect(() => {
    const i = setInterval(() => setPct((p) => 82 + ((p - 82 + 1) % 8)), 1500);
    return () => clearInterval(i);
  }, []);
  const r = 14;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md glass-crimson">
      <svg width="36" height="36" viewBox="0 0 36 36" className="-rotate-90">
        <circle cx="18" cy="18" r={r} stroke="oklch(0.2 0.005 0)" strokeWidth="3" fill="none" />
        <circle cx="18" cy="18" r={r} stroke="#E31937" strokeWidth="3" fill="none"
          strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease", filter: "drop-shadow(0 0 4px #E31937)" }} />
      </svg>
      <div className="leading-tight">
        <div className="label-caps text-[9px] text-crimson">Threat Level</div>
        <div className="text-xs font-bold tabular-nums">HIGH · {pct}%</div>
      </div>
    </div>
  );
}

export function StarshipSync() {
  const [h, setH] = useState(41);
  useEffect(() => {
    const i = setInterval(() => setH((x) => Math.max(1, x - 0.01)), 4000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-black/40">
      <span className="relative flex w-2 h-2">
        <span className="absolute inset-0 rounded-full bg-[color:var(--success)] animate-ping opacity-60" />
        <span className="relative w-2 h-2 rounded-full bg-[color:var(--success)]" />
      </span>
      <div className="leading-tight">
        <div className="label-caps text-[9px] text-[color:var(--success)]">Starship Sync</div>
        <div className="text-[11px] tabular-nums">V3 catch in {h.toFixed(0)}h</div>
      </div>
    </div>
  );
}
