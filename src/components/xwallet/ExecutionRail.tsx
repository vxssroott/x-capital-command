import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, FileText, Dice5, Share2 } from "lucide-react";
import { toast } from "sonner";

function RiskDial({ value = 78 }: { value?: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
        <circle cx="70" cy="70" r={r} stroke="oklch(0.2 0.005 0)" strokeWidth="10" fill="none" />
        <circle
          cx="70" cy="70" r={r}
          stroke="url(#riskGrad)" strokeWidth="10" fill="none"
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="riskGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#7A0E1C" />
            <stop offset="100%" stopColor="#E31937" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-display font-black text-4xl text-crimson text-glow-crimson tabular-nums">{value}</div>
        <div className="label-caps text-[10px] text-muted-foreground">Risk · Med-High</div>
      </div>
    </div>
  );
}

const optimizeOpts = [
  "Increase to 80/20 offense",
  "Layer 2027 LEAPs (TSLA $300C)",
  "Apply Nigeria tax wrapper",
  "Simulate 3 macro scenarios",
];

const calendar = Array.from({ length: 28 }, (_, i) => i + 1);
const hot = new Set([3, 12, 17, 22, 27]);

export function ExecutionRail() {
  const [openOpt, setOpenOpt] = useState(false);
  return (
    <aside className="space-y-4">
      <div className="glass rounded-xl p-5">
        <div className="label-caps text-muted-foreground text-center mb-3">Execution Risk</div>
        <RiskDial />
      </div>

      <div className="glass rounded-lg relative">
        <button onClick={() => setOpenOpt((o) => !o)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02]">
          <span className="label-caps text-xs">Optimize Now</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${openOpt ? "rotate-180" : ""}`} />
        </button>
        {openOpt && (
          <motion.ul initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="border-t border-border divide-y divide-border">
            {optimizeOpts.map((o) => (
              <li key={o}>
                <button
                  onClick={() => { toast.success("Optimizer queued", { description: o }); setOpenOpt(false); }}
                  className="w-full text-left px-4 py-2.5 text-xs hover:bg-crimson/10 hover:text-crimson transition-colors"
                >{o}</button>
              </li>
            ))}
          </motion.ul>
        )}
      </div>

      <div className="glass rounded-lg p-4">
        <div className="label-caps text-muted-foreground mb-3 flex items-center justify-between">
          <span>June 2026</span>
          <span className="text-crimson">5 events</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {calendar.map((d) => (
            <div
              key={d}
              className={`relative aspect-square flex items-center justify-center text-[11px] rounded ${
                hot.has(d) ? "bg-crimson/20 text-crimson font-semibold" : "text-muted-foreground hover:bg-white/5"
              }`}
            >
              {d}
              {hot.has(d) && <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-crimson" />}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {[
          { icon: FileText, label: "Generate Full Thesis", msg: "Compiling 38 sources · ~20s" },
          { icon: Dice5, label: "Run Monte Carlo", msg: "10,000 paths · P5/P50/P95 ready" },
          { icon: Share2, label: "Share Encrypted Link", msg: "x.wal/9F2A · expires 24h" },
        ].map((b) => (
          <motion.button
            key={b.label}
            whileHover={{ x: 2 }}
            onClick={() => toast.success(b.label, { description: b.msg })}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-md glass hover:border-crimson/50 text-sm label-caps"
          >
            <b.icon className="w-4 h-4 text-crimson" /> {b.label}
          </motion.button>
        ))}
      </div>
    </aside>
  );
}
