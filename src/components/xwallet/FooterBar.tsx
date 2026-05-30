import { toast } from "sonner";

const pills = [
  { label: "Simulate 12-Mo Exit", msg: "Exit model · $1.04M projected at P50" },
  { label: "AR View Dashboard", msg: "Vision Pro handoff initiated" },
  { label: "Add to Homescreen", msg: "PWA install prompt fired" },
  { label: "Connect Broker API", msg: "OAuth → IBKR · awaiting consent" },
];

export function FooterBar() {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-border/60 backdrop-blur-xl bg-black/80">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-3 flex flex-wrap items-center gap-3 text-xs">
        <div className="label-caps text-muted-foreground">v3.0 · Built for execution · Data mocked May 30 2026</div>
        <div className="flex flex-wrap gap-2 mx-auto">
          {pills.map((p) => (
            <button
              key={p.label}
              onClick={() => toast.success(p.label, { description: p.msg })}
              className="label-caps text-[10px] px-3 py-1.5 rounded-full border border-border hover:border-crimson/60 hover:text-crimson hover:bg-crimson/5 transition-colors"
            >{p.label}</button>
          ))}
        </div>
        <div className="flex gap-3 ml-auto label-caps text-[10px] text-muted-foreground">
          <button onClick={() => toast("Exported", { description: "Figma file URL copied" })} className="hover:text-foreground">Export Figma</button>
          <button onClick={() => toast("Copied", { description: "React source on clipboard" })} className="hover:text-foreground">Copy React</button>
          <button onClick={() => toast("Deploying", { description: "Vercel build queued" })} className="hover:text-foreground">Deploy Vercel</button>
        </div>
      </div>
    </footer>
  );
}
