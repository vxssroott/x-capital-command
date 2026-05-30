export const allocationData = [
  { name: "Robotaxi", value: 42 * 0.72, side: "TSLA", color: "#E31937", raw: 42, dollars: 147300 },
  { name: "Optimus", value: 31 * 0.72, side: "TSLA", color: "#B8142B", raw: 31, dollars: 108700 },
  { name: "Energy", value: 27 * 0.72, side: "TSLA", color: "#7A0E1C", raw: 27, dollars: 95000 },
  { name: "Starlink", value: 58 * 0.28, side: "SPCX", color: "#F5F5F5", raw: 58, dollars: 78900 },
  { name: "Starship", value: 29 * 0.28, side: "SPCX", color: "#A0A0A0", raw: 29, dollars: 39500 },
  { name: "Terafab", value: 13 * 0.28, side: "SPCX", color: "#6B6B6B", raw: 13, dollars: 17700 },
];

export const sideTotals = { TSLA: 351000, SPCX: 136100 };

export const equityCurve = Array.from({ length: 30 }, (_, i) => {
  const base = 420000;
  const drift = Math.sin(i / 4) * 14000 + i * 2200;
  const noise = (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * 6000;
  return { day: i + 1, value: Math.round(base + drift + noise) };
});

// Live Feed — May 30 2026 21:23 WAT
export const feedItems = [
  { t: "21:23", text: "Starship V3 stack mated · Booster 17 on OLM-2", tag: "SPCX" },
  { t: "21:19", text: "Robotaxi Austin: 412 vehicles unsupervised live · 0 interventions/24h", tag: "TSLA" },
  { t: "21:14", text: "Terafab groundbreak in 9 days · xAI compute demand locked at 1.4TW", tag: "JV" },
  { t: "21:08", text: "Optimus Gen-3 yield up 38% QoQ at Giga Texas · 1,840 units/wk", tag: "TSLA" },
  { t: "21:02", text: "Starlink crosses 10.3M subs · $11.4B ARR · maritime tier +27% MoM", tag: "SPCX" },
];

export const starlinkSubs = [
  { q: "Q1·24", subs: 4.2 }, { q: "Q2·24", subs: 5.1 }, { q: "Q3·24", subs: 6.0 },
  { q: "Q4·24", subs: 7.1 }, { q: "Q1·25", subs: 7.9 }, { q: "Q2·25", subs: 8.6 },
  { q: "Q3·25", subs: 9.4 }, { q: "Q4·25", subs: 10.0 }, { q: "Q1·26", subs: 10.3 },
];

export const matrix = [
  {
    title: "Synergy Lock",
    metric: "82% merger probability",
    secondary: "JV capex $14B · close target Q1 2027",
    body: "Terafab 1TW compute JV. Tesla funds, SpaceX demand. 2027 merger probability 82%.",
    detail: ["$14B JV capex committed", "xAI is anchor compute tenant", "Lockstep cap-table since 2024", "Joint board seats: 6 of 9", "Cross-licensing of FSD + Starlink mesh"],
    chartKind: "bars" as const,
  },
  {
    title: "Recurring Cash Engine",
    metric: "$11.4B Starlink ARR",
    secondary: "10.3M subs · $4.4B op profit · 38% YoY",
    body: "Starlink $11.4B (61% of SPCX rev). 10.3M subs. $4.4B op profit. Powers Tesla fleets.",
    detail: ["38% YoY ARR growth", "Maritime + aviation tier launching", "FCF positive since Q3 2024", "ARPU $93/mo blended", "Churn 0.9% — lowest in telco"],
    chartKind: "subs" as const,
  },
  {
    title: "Multi-Domain Optionality",
    metric: "$28.5T TAM",
    secondary: "3 trillion-dollar markets · Q3 2026 gates",
    body: "Robotaxi + Starship + Optimus. $28.5T TAM claim. Q3 2026 milestone gates.",
    detail: ["Robotaxi: $7T mobility", "Starship: $4T launch+colony", "Optimus: $17.5T labor", "First-mover in all three", "Vertical integration end-to-end"],
    chartKind: "tam" as const,
  },
  {
    title: "Moat & Control",
    metric: "85% Musk SPCX voting",
    secondary: "DoD active · ITAR moat · dual-listed control",
    body: "Musk 85% voting SpaceX, dual public control. DoD contracts active and renewing.",
    detail: ["TSLA 13% Musk economic", "DoD $1.8B Starshield 2026", "ITAR moat on Starship", "FCC spectrum locked 2042", "Texas chartered HQ"],
    chartKind: "bars" as const,
  },
  {
    title: "Leverage Multiplier",
    metric: "Marginal $ → exponential",
    secondary: "Reuse 14x · op leverage cliff Q4 2026",
    body: "Fixed costs sunk. Marginal dollar drives exponential output. 2027 merger edge.",
    detail: ["Gigapress depreciation peaks 2026", "Reuse rate Starship V3: 14x", "Op leverage cliff Q4 2026", "Marginal cost/kg orbit: -78%", "Software margin >88%"],
    chartKind: "bars" as const,
  },
  {
    title: "Risk Gauge",
    metric: "Medium-High · 78",
    secondary: "Cash runway 19mo · key-man insured $4B",
    body: "Burn velocity, IPO lockups, regulatory drag, key-man concentration.",
    detail: ["SPCX cash runway 19mo", "Robotaxi reg in 6 states pending", "Key-man insurance $4B", "Concentration > 90% in 2 names", "Volatility 30d realized: 64%"],
    chartKind: "risk" as const,
  },
];

export const triggers = [
  { date: "Jun 12", label: "SPCX IPO Window", days: 13 },
  { date: "Jul 02", label: "Q2 Deliveries", days: 33 },
  { date: "Aug 19", label: "Robotaxi Reg Wins", days: 81 },
  { date: "Sep 30", label: "Starship V3 Orbital", days: 123 },
  { date: "Nov 11", label: "Terafab Phase-1 Live", days: 165 },
];

export const monteCarloPath = Array.from({ length: 19 }, (_, i) => {
  const base = 487291;
  const target = 1_200_000;
  const t = i / 18;
  const eased = base + (target - base) * (1 - Math.pow(1 - t, 2));
  const noise = Math.sin(i * 1.3) * 22000;
  return { month: i, value: Math.round(eased + noise) };
});
