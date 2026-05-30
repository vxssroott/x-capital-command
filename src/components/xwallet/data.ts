export const allocationData = [
  { name: "Robotaxi", value: 42 * 0.72, side: "TSLA", color: "#E31937", raw: 42 },
  { name: "Optimus", value: 31 * 0.72, side: "TSLA", color: "#B8142B", raw: 31 },
  { name: "Energy", value: 27 * 0.72, side: "TSLA", color: "#7A0E1C", raw: 27 },
  { name: "Starlink", value: 58 * 0.28, side: "SPCX", color: "#F5F5F5", raw: 58 },
  { name: "Starship", value: 29 * 0.28, side: "SPCX", color: "#A0A0A0", raw: 29 },
  { name: "Terafab", value: 13 * 0.28, side: "SPCX", color: "#6B6B6B", raw: 13 },
];

export const equityCurve = Array.from({ length: 30 }, (_, i) => {
  const base = 420000;
  const drift = Math.sin(i / 4) * 14000 + i * 2200;
  const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * 6000;
  return { day: i + 1, value: Math.round(base + drift + noise) };
});

export const feedItems = [
  { t: "09:18", text: "Starship V3 catch confirmed — Boca Chica", tag: "SPCX" },
  { t: "09:17", text: "Robotaxi Austin: 412 vehicles unsupervised live", tag: "TSLA" },
  { t: "09:15", text: "Terafab groundbreak in 9 days · xAI demand locked", tag: "JV" },
  { t: "09:11", text: "Optimus Gen-3 yield up 38% QoQ at Giga Texas", tag: "TSLA" },
  { t: "09:04", text: "Starlink crosses 10.3M subs · $11.4B ARR", tag: "SPCX" },
];

export const matrix = [
  {
    title: "Synergy Lock",
    metric: "82% merger probability",
    body: "Terafab 1TW compute JV. Tesla funds, SpaceX demand. 2027 merger probability 82%.",
    detail: ["$14B JV capex committed", "xAI is anchor compute tenant", "Lockstep cap-table since 2024"],
  },
  {
    title: "Recurring Cash Engine",
    metric: "$11.4B Starlink ARR",
    body: "Starlink $11.4B (61% of SPCX rev). 10.3M subs. $4.4B op profit. Powers Tesla fleets.",
    detail: ["38% YoY ARR growth", "Maritime + aviation tier launching", "FCF positive since Q3 2024"],
  },
  {
    title: "Multi-Domain Optionality",
    metric: "$28.5T TAM",
    body: "Robotaxi + Starship + Optimus. $28.5T TAM claim. Q3 2026 milestone gates.",
    detail: ["Robotaxi: $7T mobility", "Starship: $4T launch+colony", "Optimus: $17.5T labor"],
  },
  {
    title: "Moat & Control",
    metric: "85% Musk SPCX voting",
    body: "Musk 85% voting SpaceX, dual public control. DoD contracts active and renewing.",
    detail: ["TSLA 13% Musk economic", "DoD $1.8B Starshield 2026", "ITAR moat on Starship"],
  },
  {
    title: "Leverage Multiplier",
    metric: "Marginal $ → exponential",
    body: "Fixed costs sunk. Marginal dollar drives exponential output. 2027 merger edge.",
    detail: ["Gigapress depreciation peaks 2026", "Reuse rate Starship V3: 14x", "Op leverage cliff Q4 2026"],
  },
  {
    title: "Risk Gauge",
    metric: "Medium-High · 78",
    body: "Burn velocity, IPO lockups, regulatory drag, key-man concentration.",
    detail: ["SPCX cash runway 19mo", "Robotaxi reg in 6 states pending", "Key-man insurance $4B"],
  },
];

export const triggers = [
  { date: "Jun 12", label: "SPCX IPO Window", days: 13 },
  { date: "Jul 02", label: "Q2 Deliveries", days: 33 },
  { date: "Aug 19", label: "Robotaxi Reg Wins", days: 81 },
  { date: "Sep 30", label: "Starship V3 Orbital", days: 123 },
  { date: "Nov 11", label: "Terafab Phase-1 Live", days: 165 },
];
