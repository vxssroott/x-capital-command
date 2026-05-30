import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/xwallet/Navbar";
import { Hero } from "@/components/xwallet/Hero";
import { PortfolioVault } from "@/components/xwallet/PortfolioVault";
import { CommandCore } from "@/components/xwallet/CommandCore";
import { ExecutionRail } from "@/components/xwallet/ExecutionRail";
import { FooterBar } from "@/components/xwallet/FooterBar";
import { LoadingScreen } from "@/components/xwallet/LoadingScreen";
import { StarshipBackdrop } from "@/components/xwallet/StarshipBackdrop";
import { LethalityModal } from "@/components/xwallet/LethalityModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Xwallet · Multiplanetary Capital Weapon" },
      { name: "description", content: "TSLA + SPCX concentrated investment command dashboard. 70/30 Musk execution engine targeting $28.5T TAM capture." },
      { property: "og:title", content: "Xwallet · Multiplanetary Capital Weapon" },
      { property: "og:description", content: "Premium Tesla + SpaceX command dashboard with live allocation, risk dial, and Nigeria-routed broker stack." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: XwalletDashboard,
});

function XwalletDashboard() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(487291.42);
  const [lethality, setLethality] = useState(false);

  return (
    <div className="dark min-h-screen text-foreground relative scanline">
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <StarshipBackdrop />
      <div className="relative z-10">
        <Navbar />
        <Hero onExecute={() => setBalance(512108.07)} />

        <main className="max-w-[1600px] mx-auto px-4 lg:px-6 py-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_300px] gap-6">
          <PortfolioVault />
          <CommandCore balance={balance} />
          <ExecutionRail onLethality={() => setLethality(true)} />
        </main>

        <FooterBar />
      </div>
      <LethalityModal open={lethality} onClose={() => setLethality(false)} />
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
