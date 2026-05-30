import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowDownToLine, FileDown, Scale, Shield, Sparkles, ChevronRight, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { feedItems, matrix, triggers } from "./data";
import { MatrixModal } from "./MatrixModal";

const tabs = ["24h", "7d", "30d"] as const;

export function CommandCore({ balance }: { balance: number }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("24h");
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [feedOpen, setFeedOpen] = useState(false);

  const deltas = { "24h": "+$49,872 (11.4%)", "7d": "+$72,108 (17.4%)", "30d": "+$118,440 (32.0%)" };

  const actions = [
    { icon: ArrowDownToLine, label: "Deposit Shares", msg: "DRS transfer link generated" },
    { icon: FileDown, label: "Request IPO", msg: "Allocation request sent · Fidelity" },
    { icon: Scale, label: "Rebalance 75/25", msg: "Rebalance preview · +3% TSLA" },
    { icon: Shield, label: "Add Protective Put", msg: "Jan-27 $250P · ~$8.40 ask" },
    { icon: Sparkles, label: "Export Thesis PDF", msg: "thesis_q2_2026.pdf ready" },
  ];

  return (
    <section className="space-y-5">
      <div className="glass rounded-xl p-5 relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="label-caps text-muted-foreground">Total Equity · Live</div>
            <motion.div
              key={balance}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display font-black text-4xl md:text-5xl tabular-nums"
            >
              ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </motion.div>
            <div className="mt-1 text-[color:var(--success)] font-semibold tabular-nums">{deltas[tab]}</div>
          </div>
          <div className="flex gap-1 p-1 rounded-md border border-border bg-black/40">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-3 py-1.5 rounded text-xs label-caps transition-all ${
                  tab === t ? "bg-crimson text-primary-foreground shadow-[0_0_15px_-2px_var(--crimson-glow)]" : "text-muted-foreground hover:text-foreground"
                }`}
              >{t}</button>
            ))}
          </div>
        </div>

        <div className="relative mt-5 grid grid-cols-2 md:grid-cols-5 gap-2">
          {actions.map((a) => (
            <motion.button
              key={a.label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toast.success(a.label, { description: a.msg })}
              className="flex items-center gap-2 px-3 py-2.5 rounded-md border border-border hover:border-crimson/60 hover:bg-crimson/5 transition-colors text-xs label-caps"
            >
              <a.icon className="w-3.5 h-3.5 text-crimson" /> {a.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="glass rounded-lg overflow-hidden">
        <button onClick={() => setFeedOpen((o) => !o)} className="w-full flex items-center px-4 py-2 gap-3 hover:bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
          <span className="label-caps text-xs text-crimson">LIVE FEED</span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-marquee whitespace-nowrap text-xs">
              {[...feedItems, ...feedItems].map((f, i) => (
                <span key={i} className="text-muted-foreground"><span className="text-foreground">{f.t}</span> · {f.text}</span>
              ))}
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${feedOpen ? "rotate-90" : ""}`} />
        </button>
        <AnimatePresence>
          {feedOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden border-t border-border">
              <ul className="divide-y divide-border">
                {feedItems.map((f) => (
                  <li key={f.t} className="px-4 py-2.5 flex items-center gap-3 text-sm">
                    <span className="font-mono text-xs text-muted-foreground w-12">{f.t}</span>
                    <span className="label-caps text-[10px] px-2 py-0.5 rounded border border-border text-crimson">{f.tag}</span>
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <div className="label-caps text-muted-foreground mb-3">Feature Matrix · Click to Expand</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {matrix.map((m, i) => {
            const isOpen = expanded === i;
            const isRisk = m.title === "Risk Gauge";
            return (
              <motion.button
                key={m.title}
                layout
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`text-left glass rounded-lg p-4 transition-all ${isOpen ? "ring-1 ring-crimson/60 shadow-[0_0_30px_-10px_var(--crimson-glow)]" : "hover:border-crimson/40"}`}
              >
                <motion.div layout="position">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold">{m.title}</span>
                    <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </div>
                  <div className={`mt-1 text-sm font-semibold ${isRisk ? "text-crimson" : "text-[color:var(--success)]"}`}>{m.metric}</div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.body}</p>
                </motion.div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <ul className="mt-3 pt-3 border-t border-border space-y-1.5 text-xs">
                        {m.detail.map((d) => (
                          <li key={d} className="flex gap-2"><span className="text-crimson">›</span>{d}</li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="glass rounded-lg p-4">
        <div className="label-caps text-muted-foreground mb-3">Watch Triggers</div>
        <div className="relative">
          <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative">
            {triggers.map((t) => (
              <button
                key={t.date}
                onClick={() => toast(t.label, { description: `T-${t.days} days · ${t.date} 2026` })}
                className="flex flex-col items-center gap-2 group"
              >
                <div className="w-3 h-3 rounded-full bg-crimson shadow-[0_0_12px_2px_var(--crimson-glow)] group-hover:scale-150 transition-transform" />
                <div className="text-center">
                  <div className="label-caps text-[10px] text-crimson">{t.date}</div>
                  <div className="text-xs mt-0.5">{t.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 tabular-nums">T-{t.days}d</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
