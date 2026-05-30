import { toast } from "sonner";

const pills = [
  { label: "Simulate 12-Mo Exit", msg: "Exit model · $1.04M projected at P50" },
  { label: "AR View Dashboard", msg: "Vision Pro handoff initiated" },
  { label: "Add to Homescreen", msg: "PWA install prompt fired" },
  { label: "Connect Broker API", msg: "OAuth → IBKR · awaiting consent" },
];

export function FooterBar() {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-border/60 backdrop-blur-xl bg-black/85">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-3 flex flex-wrap items-center gap-3 text-xs">
        <div className="label-caps text-muted-foreground">v3.0 · Built for execution · Data mocked May 30 2026 · 21:23 WAT</div>
        <div className="flex flex-wrap gap-2 mx-auto">
          {pills.map((p) => (
            <button
              key={p.label}
              onClick={() => toast.success(p.label, { description: p.msg })}
              className="label-caps text-[10px] px-3 py-1.5 rounded-full border border-border hover:border-crimson/60 hover:text-crimson hover:bg-crimson/5 hover:scale-[1.02] transition-all"
            >{p.label}</button>
          ))}
        </div>
        <div className="flex gap-2 ml-auto">
          <button
            onClick={() => toast.success("Deploying to Vercel", { description: "Build hash 9f2a · ETA 47s" })}
            className="btn-crimson label-caps text-[10px] px-3 py-1.5 rounded-md font-bold"
          >Deploy → Vercel</button>
          <button
            onClick={() => toast.success("Bundle exported", { description: "figma_v3.fig + react.zip + tailwind.config.ts" })}
            className="label-caps text-[10px] px-3 py-1.5 rounded-md border border-border hover:border-foreground/40"
          >Export Figma + Code + Tailwind</button>
        </div>
      </div>
    </footer>
  );
}
