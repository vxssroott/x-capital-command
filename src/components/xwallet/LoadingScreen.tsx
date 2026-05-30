import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const phases = [
  "Synchronizing Starlink constellation…",
  "Pinging Boca Chica telemetry…",
  "Verifying Nigeria broker routes…",
  "Loading Musk execution engine…",
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [p, setP] = useState(0);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setPct((x) => Math.min(100, x + 4)), 60);
    return () => clearInterval(i);
  }, []);
  useEffect(() => {
    if (pct >= 100) setTimeout(onDone, 200);
    setP(Math.min(phases.length - 1, Math.floor(pct / 26)));
  }, [pct, onDone]);
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center grid-bg">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="text-6xl font-black text-crimson text-glow-crimson font-display">𝕏</motion.div>
      <div className="mt-6 label-caps text-xs text-muted-foreground">{phases[p]}</div>
      <div className="mt-4 w-64 h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div animate={{ width: `${pct}%` }} className="h-full bg-gradient-to-r from-crimson to-crimson-glow" />
      </div>
      <div className="mt-2 text-[10px] tabular-nums text-muted-foreground">{pct}%</div>
    </div>
  );
}
