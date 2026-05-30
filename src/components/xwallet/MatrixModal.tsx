import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { matrix, starlinkSubs } from "./data";

type Card = (typeof matrix)[number];

function MiniChart({ kind }: { kind: Card["chartKind"] }) {
  if (kind === "subs") {
    return (
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={starlinkSubs}>
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F5F5F5" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#F5F5F5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="q" stroke="#666" fontSize={10} />
          <YAxis stroke="#666" fontSize={10} unit="M" />
          <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }}
            formatter={(v: number) => [`${v}M subs`, "Starlink"]} />
          <Area type="monotone" dataKey="subs" stroke="#F5F5F5" strokeWidth={2} fill="url(#sg)" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
  if (kind === "tam") {
    const data = [
      { name: "Optimus", v: 17.5 }, { name: "Robotaxi", v: 7.0 }, { name: "Starship", v: 4.0 },
    ];
    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#666" fontSize={11} />
          <YAxis stroke="#666" fontSize={10} unit="T" />
          <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }}
            formatter={(v: number) => [`$${v}T TAM`, ""]} />
          <Bar dataKey="v" fill="#E31937" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  if (kind === "risk") {
    const data = [
      { name: "Concentration", v: 88 }, { name: "Regulatory", v: 72 },
      { name: "Burn", v: 64 }, { name: "Key-Man", v: 81 }, { name: "Lockup", v: 58 },
    ];
    return (
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#666" fontSize={10} />
          <YAxis stroke="#666" fontSize={10} domain={[0, 100]} />
          <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }} />
          <Bar dataKey="v" fill="#E31937" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
  const data = [
    { name: "2024", v: 32 }, { name: "2025", v: 58 }, { name: "2026", v: 91 }, { name: "2027E", v: 142 },
  ];
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#666" fontSize={11} />
        <YAxis stroke="#666" fontSize={10} />
        <Tooltip contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 12 }} />
        <Bar dataKey="v" fill="#E31937" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MatrixModal({ card, onClose }: { card: Card | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {card && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-crimson rounded-xl w-full max-w-3xl p-6 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-md border border-border hover:bg-white/5 flex items-center justify-center">
              <X className="w-4 h-4" />
            </button>
            <div className="label-caps text-crimson text-xs">Command Module</div>
            <h2 className="font-display font-black text-3xl md:text-4xl mt-1">{card.title}</h2>
            <div className="mt-2 flex flex-wrap gap-3 items-baseline">
              <span className="text-2xl font-display font-bold text-[color:var(--success)]">{card.metric}</span>
              <span className="text-sm text-muted-foreground">{card.secondary}</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{card.body}</p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_280px] gap-5">
              <div className="rounded-lg border border-border bg-black/40 p-3">
                <div className="label-caps text-[10px] text-muted-foreground mb-2">Live Telemetry</div>
                <MiniChart kind={card.chartKind} />
              </div>
              <ul className="space-y-2 text-sm">
                {card.detail.map((d) => (
                  <li key={d} className="flex gap-2 p-2 rounded border border-border bg-black/30">
                    <span className="text-crimson">›</span>{d}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
