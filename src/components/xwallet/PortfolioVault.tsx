import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Check, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { equityCurve } from "./data";

function Holding({ ticker, shares, value, pnl, action, onAction }: { ticker: string; shares: string; value: string; pnl: string; action: string; onAction: () => void }) {
  return (
    <div className="glass rounded-lg p-4 hover:border-crimson/40 transition-colors group">
      <div className="flex items-baseline justify-between">
        <span className="font-display font-black text-xl">{ticker}</span>
        <span className="text-[color:var(--success)] text-sm font-semibold tabular-nums">{pnl}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{shares}</div>
      <div className="mt-2 font-display font-bold text-2xl tabular-nums">{value}</div>
      <button onClick={onAction} className="mt-3 w-full label-caps text-xs py-2 rounded-md border border-border group-hover:border-crimson/60 group-hover:text-crimson transition-colors">
        {action}
      </button>
    </div>
  );
}

export function PortfolioVault() {
  return (
    <aside className="space-y-4">
      <div className="label-caps text-muted-foreground flex items-center gap-2">
        <TrendingUp className="w-3 h-3" /> Portfolio Vault
      </div>
      <Holding ticker="TSLA" shares="1,050 shares" value="$328,072" pnl="+182%" action="Buy More"
        onAction={() => toast.success("TSLA buy ticket drafted", { description: "+25 shares @ $312.45 → IBKR" })} />
      <Holding ticker="SPCX" shares="412 shares" value="$159,219" pnl="+64%" action="Request IPO"
        onAction={() => toast("SPCX IPO allocation requested", { description: "Fidelity queue position #1,247" })} />

      <div className="glass rounded-lg p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="label-caps text-muted-foreground">30D Equity</span>
          <span className="text-xs text-[color:var(--success)] tabular-nums">+$49,872</span>
        </div>
        <div className="h-24 -mx-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={equityCurve}>
              <defs>
                <linearGradient id="eq" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E31937" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#E31937" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" hide />
              <YAxis hide domain={["dataMin - 5000", "dataMax + 5000"]} />
              <Tooltip
                contentStyle={{ background: "#0a0a0a", border: "1px solid #2a2a2a", borderRadius: 6, fontSize: 11 }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Equity"]}
                labelFormatter={(l) => `Day ${l}`}
              />
              <Area type="monotone" dataKey="value" stroke="#E31937" strokeWidth={2} fill="url(#eq)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[color:var(--success)] animate-pulse" />
          <span className="label-caps text-[color:var(--success)] text-xs">Nigeria Routing Active</span>
        </div>
        <ul className="space-y-2 text-xs">
          {[
            ["IBKR verified", true],
            ["Fidelity IPO queued", true],
            ["Robinhood secondary ready", true],
          ].map(([label, ok]) => (
            <li key={label as string} className="flex items-center gap-2">
              <Check className={`w-3.5 h-3.5 ${ok ? "text-[color:var(--success)]" : "text-muted-foreground"}`} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
