import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Rocket, X } from "lucide-react";
import { monteCarloPath } from "./data";

export function LethalityModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!open) { setStep(0); return; }
    const i = setInterval(() => setStep((s) => Math.min(monteCarloPath.length, s + 1)), 120);
    return () => clearInterval(i);
  }, [open]);

  const data = monteCarloPath.slice(0, step);
  const current = data[data.length - 1]?.value ?? 487291;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[85] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-crimson rounded-xl w-full max-w-3xl p-6 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-md border border-border hover:bg-white/5 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="label-caps text-crimson text-xs flex items-center gap-2">
              <Rocket className="w-3.5 h-3.5" /> Lethality Sim · 18-Month P50 Path
            </div>
            <h2 className="font-display font-black text-3xl md:text-4xl mt-1">$1.20M Trajectory</h2>
            <div className="mt-2 flex items-baseline gap-4">
              <div>
                <div className="label-caps text-[10px] text-muted-foreground">Current</div>
                <div className="font-display font-bold text-2xl tabular-nums text-[color:var(--success)]">${current.toLocaleString()}</div>
              </div>
              <div>
                <div className="label-caps text-[10px] text-muted-foreground">Month</div>
                <div className="font-display font-bold text-2xl tabular-nums">{step}/18</div>
              </div>
              <div>
                <div className="label-caps text-[10px] text-muted-foreground">IRR</div>
                <div className="font-display font-bold text-2xl tabular-nums text-crimson">+146%</div>
              </div>
            </div>
            <div className="mt-4 h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="leth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#E31937" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#E31937" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#666" fontSize={10} unit="m" />
                  <YAxis stroke="#666" fontSize={10} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} domain={[400000, 1300000]} />
                  <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #E31937", borderRadius: 6, fontSize: 12 }}
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Equity"]} />
                  <Area type="monotone" dataKey="value" stroke="#E31937" strokeWidth={2.5} fill="url(#leth)" isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
              {step > 0 && step < monteCarloPath.length && (
                <motion.div
                  initial={{ left: "0%", bottom: "10%", opacity: 0 }}
                  animate={{ left: `${(step / 18) * 100}%`, bottom: `${20 + step * 3}%`, opacity: 1 }}
                  className="absolute text-xl pointer-events-none"
                >🚀</motion.div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded border border-border bg-black/40"><div className="label-caps text-[9px] text-muted-foreground">P5</div><div className="tabular-nums">$612,400</div></div>
              <div className="p-2 rounded border border-crimson/40 bg-crimson/10"><div className="label-caps text-[9px] text-crimson">P50</div><div className="tabular-nums font-bold">$1,042,800</div></div>
              <div className="p-2 rounded border border-border bg-black/40"><div className="label-caps text-[9px] text-muted-foreground">P95</div><div className="tabular-nums">$1,840,200</div></div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
