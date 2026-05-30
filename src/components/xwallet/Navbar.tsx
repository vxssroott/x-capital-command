import { motion } from "framer-motion";
import { Wallet, LogOut, Moon } from "lucide-react";
import { toast } from "sonner";
import { StarshipSync, ThreatBadge } from "./StatusBadges";

function Ticker({ symbol, price, change, positive = true }: { symbol: string; price: string; change: string; positive?: boolean }) {
  return (
    <button
      onClick={() => toast(`${symbol} chart`, { description: `Opening live ${symbol} chart · ${price} ${change}` })}
      className="group flex items-baseline gap-2 px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
    >
      <span className="label-caps text-muted-foreground group-hover:text-foreground">{symbol}</span>
      <span className="font-display font-semibold tabular-nums">{price}</span>
      <span className={`text-xs tabular-nums ${positive ? "text-[color:var(--success)]" : "text-crimson"}`}>
        {positive ? "▲" : "▼"} {change}
      </span>
    </button>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-border/60 backdrop-blur-xl bg-black/70">
      <div className="h-full flex items-center px-4 lg:px-6 gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-md glass-crimson">
            <span className="font-display font-black text-lg">𝕏</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="font-display font-bold tracking-tight">Xwallet</span>
            <span className="text-[10px] label-caps text-crimson">TSLA • SPCX | 72/28 OFFENSE</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-1 mx-auto">
          <Ticker symbol="TSLA" price="$312.45" change="4.81%" />
          <span className="text-border">|</span>
          <Ticker symbol="SPCX" price="$148.70" change="8.22%" />
          <span className="text-border">|</span>
          <Ticker symbol="PORTFOLIO" price="$487,291" change="11.37% 24h" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <StarshipSync />
          <ThreatBadge />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toast.success("Wallet handshake initiated", { description: "Awaiting signature · Ledger Nano X" })}
            className="hidden md:inline-flex items-center gap-2 btn-crimson px-4 py-2 rounded-md text-sm font-semibold label-caps"
          >
            <Wallet className="w-4 h-4" /> Connect Wallet
          </motion.button>
          <div className="hidden md:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-md glass">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-crimson to-crimson-glow flex items-center justify-center text-xs font-bold">D</div>
            <div className="leading-tight">
              <div className="text-xs font-semibold">Divine</div>
              <div className="text-[10px] text-muted-foreground">Abuja, NG</div>
            </div>
          </div>
          <button
            onClick={() => toast("Simulated exit", { description: "12-month exit model queued" })}
            className="label-caps text-xs px-3 py-2 rounded-md border border-border hover:border-crimson/60 hover:text-crimson transition-colors flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" /> Sim Exit
          </button>
          <button className="w-9 h-9 rounded-md border border-border hover:bg-white/5 flex items-center justify-center" aria-label="Theme">
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
