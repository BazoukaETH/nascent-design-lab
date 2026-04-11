import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, CartesianGrid } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { SALARY_DATA_SEED, type SalaryEntry } from "@/data/finance";
// ─── FINANCIAL DATA ───────────────────────────────────────────────────────────
const DIN = [
  { date: "2025-09-01", client: "SMG Automotive", venture: "Wasla Solutions", service: "Framer Website", amount: 300000, status: "Paid" },
  { date: "2025-10-01", client: "PICO Engineering", venture: "Wasla Solutions", service: "Framer Website", amount: 200000, status: "50% Paid" },
  { date: "2025-10-15", client: "Sports Alliance", venture: "Wasla Solutions", service: "Framer Website", amount: 25000, status: "Pending" },
  { date: "2025-11-01", client: "ECMF", venture: "Wasla Solutions", service: "Subscriptions", amount: 120000, status: "Paid" },
  { date: "2025-11-25", client: "Ekhdem", venture: "Wasla Solutions", service: "App Development", amount: 150000, status: "Paid" },
  { date: "2026-01-15", client: "Hiba Abdo", venture: "Wasla Solutions", service: "Web Development", amount: 90000, status: "Pending" },
  { date: "2026-01-26", client: "ECMF", venture: "Wasla Solutions", service: "Subscriptions", amount: 145000, status: "Paid" },
  { date: "2026-02-10", client: "MW Fashion", venture: "Wasla Solutions", service: "Web Development", amount: 75000, status: "Pending" },
  { date: "2026-02-14", client: "Test Client", venture: "Wasla Education", service: "Course", amount: 20000, status: "Paid" },
];

const DOUT = [
  { date: "2025-07-30", cat: "Salaries", venture: "Wasla Solutions", desc: "July Salary", vendor: "Usef Shazly", amount: 60000, bassel: "Yes" },
  { date: "2025-08-30", cat: "Salaries", venture: "Wasla Solutions", desc: "August Salary", vendor: "Usef Shazly", amount: 60000, bassel: "Yes" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-09-30", cat: "Salaries", venture: "Wasla Solutions", desc: "September Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-10-30", cat: "Salaries", venture: "Wasla Solutions", desc: "October Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-10-30", cat: "Freelancers", venture: "Wasla Solutions", desc: "Website Translation", vendor: "Merna Wagih", amount: 8000, bassel: "Yes" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-11-30", cat: "Salaries", venture: "Wasla Solutions", desc: "November Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-11-30", cat: "Hardware", venture: "Wasla Solutions", desc: "MacBook Air M1", vendor: "Tradeline", amount: 30000, bassel: "Yes" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2025-12-30", cat: "Salaries", venture: "Wasla Solutions", desc: "December Salary", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2025-12-30", cat: "Freelancers", venture: "Wasla Solutions", desc: "Website Assistance", vendor: "Mohamed Yazan", amount: 10000, bassel: "Yes" },
  { date: "2026-01-10", cat: "Subscriptions", venture: "Wasla Solutions", desc: "Figma Fees", vendor: "Moaz Sawy", amount: 6000, bassel: "Yes" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Salary", vendor: "Usef Shazly", amount: 60000, bassel: "No" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Fees", vendor: "Moaz Sawy", amount: 30000, bassel: "No" },
  { date: "2026-01-27", cat: "Salaries", venture: "Wasla Solutions", desc: "January Fees", vendor: "Mohamed Hagry", amount: 20000, bassel: "No" },
  { date: "2026-01-28", cat: "Fees", venture: "Wasla Ventures", desc: "Legal Accountant Fees", vendor: "Wael Khalil", amount: 22000, bassel: "Yes" },
  { date: "2026-02-03", cat: "Subscriptions", venture: "Wasla Solutions", desc: "ECMF Emails Dec/Jan", vendor: "Google Domains", amount: 30000, bassel: "Yes" },
  { date: "2026-02-08", cat: "Subscriptions", venture: "Wasla Solutions", desc: "Figma / Framer", vendor: "Moaz Sawy", amount: 6850, bassel: "Yes" },
  { date: "2026-02-10", cat: "Subscriptions", venture: "Wasla Ventures", desc: "Wasla Ventures Domain", vendor: "Moaz Sawy", amount: 1000, bassel: "No" },
];

const PC = ["hsl(220,95%,47%)", "hsl(168,100%,42%)", "hsl(36,90%,53%)", "hsl(250,60%,60%)", "hsl(350,75%,50%)", "hsl(160,80%,40%)"];

const fmtE = (n: number) => { if (!n) return "0"; const a = Math.abs(n); if (a >= 1000000) return (n / 1000000).toFixed(2) + "M"; if (a >= 1000) return (n / 1000).toFixed(0) + "K"; return String(n); };
const fmtF = (n: number) => "EGP " + Math.round(n).toLocaleString();
const pMonth = (d: string) => { const p = d.split("-"); return p.length >= 2 && p[0].length === 4 ? p[0] + "-" + p[1].padStart(2, "0") : null; };
const mLabel = (k: string) => { const [y, m] = k.split("-"); return new Date(+y, +m - 1).toLocaleDateString("en", { month: "short", year: "2-digit" }); };

const ChartTip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-muted p-2 rounded-lg border border-border text-[11px]">
      <div className="font-semibold text-muted-foreground/50 text-[10px] mb-1">{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-1.5 mt-0.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground/60">{p.name}:</span>
          <span className="font-semibold text-foreground">{fmtF(p.value)}</span>
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

const StatusBadge = ({ status }: { status: string }) => {
  const ok = status.toLowerCase() === "paid";
  const partial = status.toLowerCase() === "50% paid";
  const color = ok ? "hsl(160,80%,40%)" : partial ? "hsl(250,60%,60%)" : "hsl(36,90%,53%)";
  return <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}22`, color }}>{status}</span>;
};

const allVentures = ["All Ventures", ...Array.from(new Set([...DIN.map(r => r.venture), ...DOUT.map(r => r.venture)]))];

const Finance = () => {
  const [tab, setTab] = useState("overview");
  const [ventureFilter, setVentureFilter] = useState("All Ventures");
  const [salaries, setSalaries] = useState<SalaryEntry[]>(SALARY_DATA_SEED);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [addSalaryModal, setAddSalaryModal] = useState(false);
  const [salaryForm, setSalaryForm] = useState({ name: "", role: "", dept: "Engineering", monthlySalary: "", equity: "—" });
  const [pendingDelete, setPendingDelete] = useState<{ idx: number; name: string } | null>(null);

  const tabs = [
    { id: "overview", l: "Overview" },
    { id: "revenue", l: "Revenue" },
    { id: "expenses", l: "Expenses" },
    { id: "salaries", l: "Salaries" },
    { id: "loans", l: "Loans" },
  ];

  const filteredIn = ventureFilter === "All Ventures" ? DIN : DIN.filter(r => r.venture === ventureFilter);
  const filteredOut = ventureFilter === "All Ventures" ? DOUT : DOUT.filter(r => r.venture === ventureFilter);

  const m = useMemo(() => {
    let tR = 0, tE = 0, paid = 0, loans = 0;
    for (const r of filteredIn) { tR += r.amount; if (r.status.toLowerCase() === "paid") paid += r.amount; }
    for (const r of filteredOut) { tE += r.amount; if (r.bassel === "Yes") loans += r.amount; }
    const pend = tR - paid, net = tR - tE;
    const mm: Record<string, { r: number; e: number }> = {};
    for (const r of filteredIn) { const k = pMonth(r.date); if (k) { if (!mm[k]) mm[k] = { r: 0, e: 0 }; mm[k].r += r.amount; } }
    for (const r of filteredOut) { const k = pMonth(r.date); if (k) { if (!mm[k]) mm[k] = { r: 0, e: 0 }; mm[k].e += r.amount; } }
    const monthly = Object.entries(mm).sort((a, b) => a[0].localeCompare(b[0])).map(([k, v]) => ({ month: mLabel(k), revenue: v.r, expenses: v.e, net: v.r - v.e }));
    const ec: Record<string, number> = {};
    for (const r of filteredOut) ec[r.cat] = (ec[r.cat] || 0) + r.amount;
    const eb = Object.entries(ec).filter(e => e[1] > 0).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value, pct: tE > 0 ? ((value / tE) * 100).toFixed(1) : "0" }));
    const vm: Record<string, number> = {};
    for (const r of filteredIn) vm[r.venture] = (vm[r.venture] || 0) + r.amount;
    const vent = Object.entries(vm).filter(e => e[1] > 0).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
    const cm: Record<string, number> = {};
    for (const r of filteredIn) cm[r.client] = (cm[r.client] || 0) + r.amount;
    const cli = Object.entries(cm).sort((a, b) => b[1] - a[1]).map(([name, value]) => ({ name, value }));
    const sMonths: Record<string, boolean> = {};
    const sT = filteredOut.filter(r => r.cat === "Salaries").reduce((s, r) => { const k = pMonth(r.date); if (k) sMonths[k] = true; return s + r.amount; }, 0);
    const avgS = Object.keys(sMonths).length > 0 ? sT / Object.keys(sMonths).length : 0;
    return { tR, tE, paid, pend, loans, net, monthly, eb, vent, cli, avgS };
  }, [filteredIn, filteredOut]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Finance Engine</h1>
          <p className="text-xs text-muted-foreground mt-1">Consolidated P&L · Synced from Google Sheets</p>
        </div>
        <Select value={ventureFilter} onValueChange={setVentureFilter}>
          <SelectTrigger className="w-[200px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {allVentures.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-border">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 text-[11px] font-medium transition-colors border-b-2 ${tab === t.id ? "text-secondary border-secondary" : "text-muted-foreground border-transparent hover:text-foreground"}`}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            <KPI label="Total Revenue" value={fmtE(m.tR)} sub={`${filteredIn.length} txns`} color="hsl(220,95%,47%)" prefix="EGP " />
            <KPI label="Total Expenses" value={fmtE(m.tE)} sub={`${filteredOut.length} items`} color="hsl(350,75%,50%)" prefix="EGP " />
            <KPI label="Net Position" value={fmtE(m.net)} color={m.net >= 0 ? "hsl(160,80%,40%)" : "hsl(350,75%,50%)"} prefix="EGP " />
            <KPI label="Collected" value={fmtE(m.paid)} sub={`${fmtE(m.pend)} pending`} color="hsl(168,100%,42%)" prefix="EGP " />
            <KPI label="Loans Owed" value={fmtE(m.loans)} sub="To Bassel" color="hsl(36,90%,53%)" prefix="EGP " />
            <KPI label="Monthly Salary" value={fmtE(m.avgS)} sub="Avg burn" color="hsl(250,60%,60%)" prefix="EGP " />
          </div>
          <div className="grid lg:grid-cols-[5fr_3fr] gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-0.5">Revenue vs Expenses</div>
              <div className="text-[10px] text-muted-foreground/50 mb-3">Monthly</div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={m.monthly} barGap={2} barSize={14}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="revenue" name="Revenue" fill="hsl(220,95%,47%)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="expenses" name="Expenses" fill="rgba(240,64,96,.45)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-0.5">Expense Split</div>
              <div className="text-[10px] text-muted-foreground/50 mb-3">By category</div>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={m.eb} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={62} paddingAngle={3} strokeWidth={0}>
                    {m.eb.map((_, i) => <Cell key={i} fill={PC[i % PC.length]} />)}
                  </Pie>
                  <Tooltip content={<ChartTip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-x-2 gap-y-1 justify-center mt-1">
                {m.eb.map((e, i) => (
                  <div key={i} className="flex items-center gap-1 text-[9px] text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-sm" style={{ background: PC[i % PC.length] }} />
                    {e.name} {e.pct}%
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-xs font-semibold text-foreground mb-0.5">Net Income Trend</div>
            <div className="text-[10px] text-muted-foreground/50 mb-3">Monthly P&L movement</div>
            <ResponsiveContainer width="100%" height={170}>
              <AreaChart data={m.monthly}>
                <defs>
                  <linearGradient id="ng2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(168,100%,42%)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="hsl(168,100%,42%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="net" name="Net" stroke="hsl(168,100%,42%)" fill="url(#ng2)" strokeWidth={2} dot={{ r: 3, fill: "hsl(168,100%,42%)", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {tab === "revenue" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            <KPI label="Total Invoiced" value={fmtE(m.tR)} color="hsl(220,95%,47%)" prefix="EGP " />
            <KPI label="Collected" value={fmtE(m.paid)} color="hsl(160,80%,40%)" prefix="EGP " />
            <KPI label="Pending" value={fmtE(m.pend)} color="hsl(36,90%,53%)" prefix="EGP " />
          </div>
          <div className="grid lg:grid-cols-2 gap-3">
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-3">By Venture</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={m.vent} layout="vertical" barSize={13}>
                  <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Revenue" fill="hsl(220,95%,47%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-3">By Client</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={m.cli} layout="vertical" barSize={13}>
                  <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(215,20%,55%)" }} axisLine={false} tickLine={false} width={120} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="value" name="Revenue" fill="hsl(168,100%,42%)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-xs font-semibold text-foreground mb-3">All Transactions</div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border">
                    {["Date", "Client", "Venture", "Service", "Amount", "Status"].map(h => (
                      <th key={h} className="text-left p-2 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredIn.map((r, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-2 text-muted-foreground/50">{r.date}</td>
                      <td className="p-2 font-semibold text-foreground">{r.client}</td>
                      <td className="p-2 text-muted-foreground">{r.venture}</td>
                      <td className="p-2 text-muted-foreground">{r.service}</td>
                      <td className="p-2 font-semibold text-foreground">{fmtF(r.amount)}</td>
                      <td className="p-2"><StatusBadge status={r.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "expenses" && (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2.5">
            <KPI label="Total Expenses" value={fmtE(m.tE)} color="hsl(350,75%,50%)" prefix="EGP " />
            <KPI label="Monthly Avg Burn" value={fmtE(m.avgS)} sub="Salary component" color="hsl(36,90%,53%)" prefix="EGP " />
            <KPI label="Expense Items" value={String(filteredOut.length)} sub="All categories" color="hsl(250,60%,60%)" />
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-xs font-semibold text-foreground mb-3">All Expenses</div>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-border">
                    {["Date", "Category", "Description", "Vendor", "Amount", "Venture", "By Bassel"].map(h => (
                      <th key={h} className="text-left p-2 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredOut.map((r, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-2 text-muted-foreground/50">{r.date}</td>
                      <td className="p-2 font-semibold text-foreground">{r.cat}</td>
                      <td className="p-2 text-muted-foreground">{r.desc}</td>
                      <td className="p-2 text-muted-foreground">{r.vendor}</td>
                      <td className="p-2 font-semibold text-foreground">{fmtF(r.amount)}</td>
                      <td className="p-2 text-muted-foreground">{r.venture}</td>
                      <td className="p-2">{r.bassel === "Yes" && <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "hsl(36,90%,53%,0.12)", color: "hsl(36,90%,53%)" }}>Yes</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === "loans" && (() => {
        const entries = filteredOut.filter(r => r.bassel === "Yes");
        const total = entries.reduce((s, r) => s + r.amount, 0);
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              <KPI label="Total Loaned" value={fmtE(total)} sub={`${entries.length} entries`} color="hsl(36,90%,53%)" prefix="EGP " />
              <KPI label="Repayments" value="0" sub="None recorded yet" color="hsl(160,80%,40%)" prefix="EGP " />
              <KPI label="Outstanding" value={fmtE(total)} sub="Owed to Bassel" color="hsl(350,75%,50%)" prefix="EGP " />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="text-xs font-semibold text-foreground mb-3">Loan Ledger</div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      {["Date", "Category", "Description", "Vendor", "Amount", "Venture"].map(h => (
                        <th key={h} className="text-left p-2 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((r, i) => (
                      <tr key={i} className="border-b border-border/30">
                        <td className="p-2 text-muted-foreground/50">{r.date}</td>
                        <td className="p-2 font-semibold text-foreground">{r.cat}</td>
                        <td className="p-2 text-muted-foreground">{r.desc}</td>
                        <td className="p-2 text-muted-foreground">{r.vendor}</td>
                        <td className="p-2 font-semibold" style={{ color: "hsl(36,90%,53%)" }}>{fmtF(r.amount)}</td>
                        <td className="p-2 text-muted-foreground">{r.venture}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border">
                      <td colSpan={4} className="p-2 text-right font-bold text-muted-foreground text-[11px]">TOTAL OUTSTANDING</td>
                      <td className="p-2 font-bold text-[13px]" style={{ color: "hsl(350,75%,50%)" }}>{fmtF(total)}</td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        );
      })()}

      {tab === "salaries" && (() => {
        const totalMonthly = salaries.reduce((s, r) => s + r.monthlySalary, 0);
        const totalAnnual = totalMonthly * 12;
        const paid = salaries.filter(s => s.monthlySalary > 0).length;

        function startEdit(idx: number) { setEditingIdx(idx); setEditValue(String(salaries[idx].monthlySalary)); }
        function saveEdit() {
          if (editingIdx === null) return;
          const v = parseInt(editValue) || 0;
          setSalaries(salaries.map((s, i) => i === editingIdx ? { ...s, monthlySalary: v } : s));
          setEditingIdx(null);
        }
        function addSalary() {
          if (!salaryForm.name.trim()) return;
          const initials = salaryForm.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
          const colors = ["hsl(220,95%,47%)", "hsl(168,100%,42%)", "hsl(160,80%,40%)", "hsl(250,60%,60%)", "hsl(36,90%,53%)", "hsl(330,80%,60%)"];
          setSalaries([...salaries, {
            name: salaryForm.name, role: salaryForm.role, dept: salaryForm.dept,
            monthlySalary: parseInt(salaryForm.monthlySalary) || 0,
            equity: salaryForm.equity, initials, color: colors[salaries.length % colors.length],
          }]);
          setSalaryForm({ name: "", role: "", dept: "Engineering", monthlySalary: "", equity: "—" });
          setAddSalaryModal(false);
        }
        function confirmRemove() {
          if (!pendingDelete) return;
          setSalaries(salaries.filter((_, i) => i !== pendingDelete.idx));
          setPendingDelete(null);
        }

        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5">
              <KPI label="Monthly Payroll" value={fmtE(totalMonthly)} sub={`${paid} salaried members`} color="hsl(220,95%,47%)" prefix="EGP " />
              <KPI label="Annual Payroll" value={fmtE(totalAnnual)} sub="Projected" color="hsl(168,100%,42%)" prefix="EGP " />
              <KPI label="Team Size" value={String(salaries.length)} sub={`${salaries.filter(s => s.equity !== "—").length} with equity`} color="hsl(250,60%,60%)" />
            </div>
            <div className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">Salary Register</div>
                  <div className="text-[10px] text-muted-foreground/50">Click the pencil icon to edit salaries inline</div>
                </div>
                <Button size="sm" className="h-7 text-xs gap-1.5" onClick={() => setAddSalaryModal(true)}>
                  <Plus className="w-3 h-3" /> Add Member
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="border-b border-border">
                      {["", "Name", "Role", "Department", "Monthly Salary", "Annual", "Equity", ""].map(h => (
                        <th key={h} className="text-left p-2 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {salaries.map((s, i) => (
                      <tr key={i} className="border-b border-border/30">
                        <td className="p-2">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold" style={{ background: `${s.color}22`, border: `1.5px solid ${s.color}55`, color: s.color }}>
                            {s.initials}
                          </div>
                        </td>
                        <td className="p-2 font-semibold text-foreground">{s.name}</td>
                        <td className="p-2 text-muted-foreground">{s.role}</td>
                        <td className="p-2 text-muted-foreground">{s.dept}</td>
                        <td className="p-2">
                          {editingIdx === i ? (
                            <div className="flex items-center gap-1">
                              <Input value={editValue} onChange={e => setEditValue(e.target.value)} className="h-7 w-24 text-xs" type="number" autoFocus onKeyDown={e => e.key === "Enter" && saveEdit()} />
                              <button onClick={saveEdit} className="p-1 rounded hover:bg-muted"><Check className="w-3 h-3" style={{ color: "hsl(160,80%,40%)" }} /></button>
                              <button onClick={() => setEditingIdx(null)} className="p-1 rounded hover:bg-muted"><X className="w-3 h-3 text-muted-foreground" /></button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-foreground">{s.monthlySalary > 0 ? fmtF(s.monthlySalary) : "—"}</span>
                              <button onClick={() => startEdit(i)} className="p-1 rounded hover:bg-muted opacity-50 hover:opacity-100"><Pencil className="w-3 h-3 text-muted-foreground" /></button>
                            </div>
                          )}
                        </td>
                        <td className="p-2 text-muted-foreground">{s.monthlySalary > 0 ? fmtF(s.monthlySalary * 12) : "—"}</td>
                        <td className="p-2">
                          {s.equity !== "—" ? (
                            <span className="text-[9px] font-semibold px-2 py-0.5 rounded" style={{ background: "hsl(220,95%,47%,0.12)", color: "hsl(220,95%,47%)" }}>{s.equity}</span>
                          ) : <span className="text-muted-foreground">—</span>}
                        </td>
                        <td className="p-2">
                          <button onClick={() => setPendingDelete({ idx: i, name: s.name })} className="p-1 rounded hover:bg-muted opacity-40 hover:opacity-100">
                            <Trash2 className="w-3 h-3 text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-border">
                      <td colSpan={4} className="p-2 text-right font-bold text-muted-foreground text-[11px]">TOTAL</td>
                      <td className="p-2 font-bold text-[13px]" style={{ color: "hsl(220,95%,47%)" }}>{fmtF(totalMonthly)}</td>
                      <td className="p-2 font-bold text-[13px]" style={{ color: "hsl(168,100%,42%)" }}>{fmtF(totalAnnual)}</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Add Salary Modal */}
            <Dialog open={addSalaryModal} onOpenChange={setAddSalaryModal}>
              <DialogContent className="sm:max-w-[420px] bg-card border-border">
                <DialogHeader><DialogTitle>Add Team Member Salary</DialogTitle></DialogHeader>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Full Name *</label>
                    <Input value={salaryForm.name} onChange={e => setSalaryForm({ ...salaryForm, name: e.target.value })} placeholder="e.g. John Doe" className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Role</label>
                    <Input value={salaryForm.role} onChange={e => setSalaryForm({ ...salaryForm, role: e.target.value })} placeholder="e.g. Developer" className="h-8 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Monthly Salary</label>
                    <Input value={salaryForm.monthlySalary} onChange={e => setSalaryForm({ ...salaryForm, monthlySalary: e.target.value })} placeholder="e.g. 30000" className="h-8 text-xs" type="number" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground font-medium">Equity</label>
                    <Input value={salaryForm.equity} onChange={e => setSalaryForm({ ...salaryForm, equity: e.target.value })} placeholder="e.g. 2% (WV)" className="h-8 text-xs" />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setAddSalaryModal(false)} className="text-xs h-8">Cancel</Button>
                  <Button onClick={addSalary} disabled={!salaryForm.name.trim()} className="text-xs h-8">Add</Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation */}
            <Dialog open={!!pendingDelete} onOpenChange={() => setPendingDelete(null)}>
              <DialogContent className="sm:max-w-[380px] bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Remove Team Member</DialogTitle>
                  <DialogDescription>Are you sure you want to remove <strong>{pendingDelete?.name}</strong> from the salary register?</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setPendingDelete(null)} className="text-xs h-8">Cancel</Button>
                  <Button variant="destructive" onClick={confirmRemove} className="text-xs h-8">Remove</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      })()}
    </div>
  );
};

export default Finance;
