import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { VENTURES_DATA } from "@/data/ventures";

const DIN = [
  { date: "2025-09-01", amount: 300000 }, { date: "2025-10-01", amount: 200000 }, { date: "2025-10-15", amount: 25000 },
  { date: "2025-11-01", amount: 120000 }, { date: "2025-11-25", amount: 150000 }, { date: "2026-01-15", amount: 90000 },
  { date: "2026-01-26", amount: 145000 }, { date: "2026-02-10", amount: 75000 }, { date: "2026-02-14", amount: 20000 },
];
const DOUT = [
  { amount: 60000 }, { amount: 60000 }, { amount: 60000 }, { amount: 30000 }, { amount: 20000 },
  { amount: 60000 }, { amount: 30000 }, { amount: 20000 }, { amount: 8000 }, { amount: 60000 },
  { amount: 30000 }, { amount: 20000 }, { amount: 30000 }, { amount: 60000 }, { amount: 30000 },
  { amount: 20000 }, { amount: 10000 }, { amount: 6000 }, { amount: 60000 }, { amount: 30000 },
  { amount: 20000 }, { amount: 22000 }, { amount: 30000 }, { amount: 6850 }, { amount: 1000 },
];

const tR = DIN.reduce((s, r) => s + r.amount, 0);
const tE = DOUT.reduce((s, r) => s + r.amount, 0);
const net = tR - tE;
const loans = 218850;
const fmtE = (n: number) => { const a = Math.abs(n); if (a >= 1000000) return (n / 1000000).toFixed(2) + "M"; if (a >= 1000) return (n / 1000).toFixed(0) + "K"; return String(n); };

const PIPELINE_DATA = [
  { stage: "Sourcing", deals: 0, value: 0, color: "hsl(220,15%,38%)" },
  { stage: "Proposal Sent", deals: 2, value: 470000, color: "hsl(220,95%,47%)" },
  { stage: "Negotiating", deals: 2, value: 165000, color: "hsl(36,90%,53%)" },
  { stage: "Active", deals: 2, value: 345000, color: "hsl(250,60%,60%)" },
  { stage: "Delivered", deals: 3, value: 475000, color: "hsl(160,80%,40%)" },
];

const monthlyData = [
  { month: "Sep 25", revenue: 300000, expenses: 170000 },
  { month: "Oct 25", revenue: 225000, expenses: 168000 },
  { month: "Nov 25", revenue: 270000, expenses: 140000 },
  { month: "Dec 25", revenue: 0, expenses: 120000 },
  { month: "Jan 26", revenue: 235000, expenses: 218000 },
  { month: "Feb 26", revenue: 95000, expenses: 37850 },
];

const attention = [
  { co: "Sports Alliance", issue: "Invoice Pending", detail: "EGP 25K pending since Oct 2025 — follow up", color: "hsl(36,90%,53%)" },
  { co: "Hiba Abdo", issue: "Payment Pending", detail: "EGP 90K pending — Jan 2026 web project", color: "hsl(350,75%,50%)" },
  { co: "MW Fashion", issue: "Payment Pending", detail: "EGP 75K pending — Feb 2026 web project", color: "hsl(36,90%,53%)" },
];

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-muted p-2 rounded-lg border border-border text-[11px]">
      <div className="font-semibold text-muted-foreground/50 text-[10px] mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-1.5 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground/60">{p.name}:</span>
          <span className="font-semibold text-foreground">EGP {Math.round(p.value).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const KPI = ({ label, value, sub, color, prefix = "" }: { label: string; value: string; sub?: string; color: string; prefix?: string }) => (
  <div className="bg-card rounded-xl p-4 border border-border relative overflow-hidden">
    <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: color }} />
    <div className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-wide mb-1">{label}</div>
    <div className="text-xl font-bold text-foreground tracking-tight">{prefix}{value}</div>
    {sub && <div className="text-[10px] text-muted-foreground/50 mt-0.5">{sub}</div>}
  </div>
);

const StageBadge = ({ stage, color }: { stage: string; color: string }) => (
  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase" style={{ background: `${color}22`, color }}>{stage}</span>
);

const liveVentures = VENTURES_DATA.filter(v => ["Live", "Building"].includes(v.stage)).length;
const activeDeals = PIPELINE_DATA.slice(1, 4).reduce((s, c) => s + c.deals, 0);

const Dashboard = () => {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Good morning, Bassel</h1>
        <p className="text-xs text-muted-foreground mt-1">Wasla Ventures · Portfolio Command Center · Last updated: 19 Feb 2026</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
        <KPI label="Total Revenue" value={fmtE(tR)} sub={`${DIN.length} transactions`} color="hsl(220,95%,47%)" prefix="EGP " />
        <KPI label="Total Expenses" value={fmtE(tE)} sub={`${DOUT.length} items`} color="hsl(350,75%,50%)" prefix="EGP " />
        <KPI label="Net Position" value={fmtE(net)} sub={net >= 0 ? "Positive cash" : "Cash negative"} color={net >= 0 ? "hsl(160,80%,40%)" : "hsl(350,75%,50%)"} prefix="EGP " />
        <KPI label="Loans to Wasla" value={fmtE(loans)} sub="Owed to Bassel" color="hsl(36,90%,53%)" prefix="EGP " />
        <KPI label="Active Ventures" value={String(liveVentures)} sub="Live or building" color="hsl(168,100%,42%)" />
      </div>

      <div className="grid lg:grid-cols-[5fr_3fr] gap-3">
        {/* EBITDA Chart */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">EBITDA Overview</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">Revenue vs Expenses — Monthly</div>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={monthlyData} barGap={3} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.03)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="revenue" name="Revenue" fill="hsl(220,95%,47%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="rgba(240,64,96,.45)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attention Required */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">Attention Required</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">{attention.length} items need action</div>
          <div className="space-y-2">
            {attention.map((a, i) => (
              <div key={i} className="bg-muted rounded-lg p-2.5" style={{ border: `1px solid ${a.color}33` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color }} />
                  <span className="text-[11px] font-semibold text-foreground">{a.co}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded ml-auto" style={{ background: `${a.color}22`, color: a.color }}>{a.issue}</span>
                </div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">{a.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-3">
        {/* Venture Health */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">Venture Health</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">All arms at a glance</div>
          {VENTURES_DATA.map((v, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: i < VENTURES_DATA.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}>
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: v.color }} />
              <div className="flex-1">
                <div className="text-[11px] font-semibold text-foreground">{v.name}</div>
                <div className="text-[9px] text-muted-foreground">{v.category}</div>
              </div>
              <StageBadge stage={v.stage} color={v.stageColor} />
            </div>
          ))}
        </div>

        {/* Pipeline Summary */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">Pipeline Summary</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">Active client opportunities</div>
          {PIPELINE_DATA.map((col, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: i < PIPELINE_DATA.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}>
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: col.color }} />
              <span className="text-[11px] text-foreground flex-1">{col.stage}</span>
              <span className="text-[11px] font-bold" style={{ color: col.color }}>{col.deals}</span>
              <span className="text-[10px] text-muted-foreground">{col.deals > 0 ? "EGP " + fmtE(col.value) : "—"}</span>
            </div>
          ))}
        </div>

        {/* Team Snapshot */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">Team Snapshot</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">8 people across 3 departments</div>
          {["Leadership", "Product & Design", "Engineering", "Growth", "Design"].map((dept) => {
            const people = [
              { name: "Bassel", dept: "Leadership", color: "hsl(220,95%,47%)", initials: "BA" },
              { name: "Usef", dept: "Product & Design", color: "hsl(168,100%,42%)", initials: "UE" },
              { name: "Moaz", dept: "Engineering", color: "hsl(160,80%,40%)", initials: "ME" },
              { name: "Mohab", dept: "Engineering", color: "hsl(330,80%,60%)", initials: "MM" },
              { name: "Hussein", dept: "Growth", color: "hsl(250,60%,60%)", initials: "HS" },
              { name: "Ali", dept: "Design", color: "hsl(36,90%,53%)", initials: "AE" },
              { name: "Mohamed", dept: "Design", color: "hsl(174,72%,46%)", initials: "MH" },
              { name: "Saif", dept: "Design", color: "hsl(24,94%,53%)", initials: "SN" },
            ].filter(p => p.dept === dept);
            if (!people.length) return null;
            return (
              <div key={dept} className="mb-2">
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">{dept}</div>
                <div className="flex flex-wrap gap-1">
                  {people.map((p) => (
                    <div key={p.name} className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-full">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: `${p.color}33`, border: `1px solid ${p.color}66`, color: p.color }}>{p.initials}</div>
                      <span className="text-[10px] text-foreground">{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
