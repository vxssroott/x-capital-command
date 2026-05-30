import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Rocket } from "lucide-react";
import { toast } from "sonner";
import { allocationData, sideTotals } from "./data";

export function Hero({ onExecute }: { onExecute: () => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [executed, setExecuted] = useState(false);

  const handleExecute = () => {
    setExecuted(true);
    onExecute();
    toast.success("ALLOCATION EXECUTED", { description: "Portfolio rebalanced → $512,108 · +5.1% pop" });
    setTimeout(() => setExecuted(false), 2200);
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] aspect-square">
          <div className="absolute inset-[10%] rounded-full border border-crimson/15 animate-orbit" style={{ animationDuration: "60s" }} />
          <div className="absolute inset-[25%] rounded-full border border-silver/10 animate-orbit" style={{ animationDuration: "90s", animationDirection: "reverse" }} />
          <div className="absolute inset-[40%] rounded-full border border-crimson/10 animate-orbit" style={{ animationDuration: "40s" }} />
        </div>
      </div>
      <div className="absolute right-8 top-8 text-[200px] font-black opacity-[0.03] font-display select-none leading-none">𝕏</div>

      <div className="relative max-w-[1600px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-center min-h-[220px]">
        <div>
          <div className="label-caps text-crimson mb-2">v3.0 · Musk Execution Engine</div>
          <h1 className="font-display font-black text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
            Xwallet · <span className="text-glow-crimson text-crimson">MULTIPLANETARY</span><br />
            CAPITAL WEAPON
          </h1>
          <p className="mt-3 text-muted-foreground max-w-2xl text-sm md:text-base">
            70/30 Musk Execution Engine · <span className="text-foreground font-semibold">$28.5T TAM capture</span> · Concentrated TSLA + SPCX exposure with Nigeria-routed broker stack.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleExecute}
              className="btn-crimson px-6 py-3 rounded-md font-display font-bold label-caps text-sm flex items-center gap-2 relative overflow-hidden"
            >
              <Rocket className="w-4 h-4" /> Execute Allocation
              <AnimatePresence>
                {executed && (
                  <motion.span
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 240, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4, ease: "easeOut" }}
                    className="absolute top-1/2 -translate-y-1/2 text-base"
                  >🚀</motion.span>
                )}
              </AnimatePresence>
            </motion.button>
            <button onClick={() => toast("Thesis exported", { description: "thesis_q2_2026.pdf · 14 pages" })}
              className="px-5 py-3 rounded-md border border-border hover:border-foreground/40 label-caps text-xs">
              Export Thesis
            </button>
          </div>
        </div>

        <div className="relative h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={allocationData}
                cx="50%" cy="50%"
                innerRadius={62} outerRadius={95}
                paddingAngle={2}
                dataKey="value"
                onMouseEnter={(_, i) => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {allocationData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.color}
                    stroke="#000"
                    strokeWidth={2}
                    style={{ filter: hovered === i ? "brightness(1.3)" : "none", transition: "filter .2s", cursor: "pointer" }}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }}
                formatter={(_v, _n, p: any) => [`${p.payload.raw}% of ${p.payload.side}`, p.payload.name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="label-caps text-muted-foreground">Split</div>
            <div className="font-display font-black text-2xl">72 / 28</div>
            <div className="text-[10px] text-crimson label-caps">TSLA · SPCX</div>
          </div>
        </div>
      </div>
    </section>
  );
}
