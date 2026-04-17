import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area } from "recharts";
import { VENTURES_DATA, PORTFOLIO_DATA, VENTURE_PIPELINE_SEED } from "@/data/ventures";
import { INCOME_DATA, EXPENSE_DATA, CLIENT_PIPELINE, TEAM_DATA, fmtCurrency, MONEY_IN_SEED, MONEY_OUT_SEED, CASH_ACCOUNTS_SEED, EXCHANGE_RATES_SEED } from "@/data/finance";
import { calculateMonthlyBurn, calculateCashOnHand, calculateRunway, calculateMRR, calculateInvoiceAging, calculateClientConcentration } from "@/lib/finance-calculations";
import { TrendingUp, TrendingDown, AlertTriangle, Clock, Rocket, Briefcase, Users, DollarSign, Target, ArrowUpRight, ArrowDownRight, Activity, Wallet, Flame, Repeat, CheckCircle2 } from "lucide-react";

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

const StageBadge = ({ stage, color }: { stage: string; color: string }) => (
  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase" style={{ background: `${color}22`, color }}>{stage}</span>
);

const Dashboard = () => {
  const metrics = useMemo(() => {
    const totalRevenue = INCOME_DATA.reduce((s, r) => s + r.amount, 0);
    const totalExpenses = EXPENSE_DATA.reduce((s, r) => s + r.amount, 0);
    const net = totalRevenue - totalExpenses;
    const pendingRevenue = INCOME_DATA.filter(r => r.status === "Pending").reduce((s, r) => s + r.amount, 0);
    const paidRevenue = INCOME_DATA.filter(r => r.status === "Paid").reduce((s, r) => s + r.amount, 0);
    const liveVentures = VENTURES_DATA.filter(v => ["Live", "Building"].includes(v.stage)).length;
    const totalVentures = VENTURES_DATA.length;
    const portfolioCount = PORTFOLIO_DATA.length;
    const pipelineDeals = VENTURE_PIPELINE_SEED.length;
    const activePipelineDeals = CLIENT_PIPELINE.reduce((s, c) => s + c.deals, 0);
    const pipelineValue = CLIENT_PIPELINE.reduce((s, c) => s + c.value, 0);
    const burnRate = totalExpenses / 7; // ~7 months of data
    const runway = net > 0 ? Math.round(net / burnRate) : 0;

    // Monthly data
    const monthMap = new Map<string, { revenue: number; expenses: number }>();
    INCOME_DATA.forEach(r => {
      const m = r.date.slice(0, 7);
      const e = monthMap.get(m) || { revenue: 0, expenses: 0 };
      e.revenue += r.amount;
      monthMap.set(m, e);
    });
    EXPENSE_DATA.forEach(r => {
      const m = r.date.slice(0, 7);
      const e = monthMap.get(m) || { revenue: 0, expenses: 0 };
      e.expenses += r.amount;
      monthMap.set(m, e);
    });
    const monthlyData = Array.from(monthMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => ({
        month: new Date(+k.slice(0, 4), +k.slice(5, 7) - 1).toLocaleDateString("en", { month: "short", year: "2-digit" }),
        revenue: v.revenue,
        expenses: v.expenses,
        profit: v.revenue - v.expenses,
      }));

    // Expense breakdown by category
    const catMap = new Map<string, number>();
    EXPENSE_DATA.forEach(r => catMap.set(r.category, (catMap.get(r.category) || 0) + r.amount));
    const expenseBreakdown = Array.from(catMap.entries())
      .sort(([, a], [, b]) => b - a)
      .map(([name, value], i) => ({
        name,
        value,
        color: ["hsl(220,95%,47%)", "hsl(168,100%,42%)", "hsl(36,90%,53%)", "hsl(250,60%,60%)", "hsl(350,75%,50%)", "hsl(160,80%,40%)"][i % 6],
      }));

    // Revenue by venture
    const ventureRevMap = new Map<string, number>();
    INCOME_DATA.forEach(r => ventureRevMap.set(r.venture, (ventureRevMap.get(r.venture) || 0) + r.amount));
    const revenueByVenture = Array.from(ventureRevMap.entries()).map(([name, value]) => ({ name, value }));

    // Attention items
    const attentionItems = INCOME_DATA
      .filter(r => r.status === "Pending")
      .map(r => ({ client: r.client, amount: r.amount, service: r.service, date: r.date }));

    return {
      totalRevenue, totalExpenses, net, pendingRevenue, paidRevenue,
      liveVentures, totalVentures, portfolioCount, pipelineDeals,
      activePipelineDeals, pipelineValue, burnRate, runway,
      monthlyData, expenseBreakdown, revenueByVenture, attentionItems,
    };
  }, []);

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">{greeting}, Bassel</h1>
        <p className="text-xs text-muted-foreground mt-1">Wasla Ventures · Portfolio Command Center</p>
      </div>

      {/* ═══ TOP KPIs ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {[
          { icon: DollarSign, label: "Total Revenue", value: `EGP ${fmtCurrency(metrics.totalRevenue)}`, sub: `${INCOME_DATA.length} transactions`, color: "hsl(220,95%,47%)", trend: "+12%" },
          { icon: TrendingDown, label: "Total Expenses", value: `EGP ${fmtCurrency(metrics.totalExpenses)}`, sub: `${EXPENSE_DATA.length} items`, color: "hsl(350,75%,50%)", trend: null },
          { icon: TrendingUp, label: "Net Position", value: `EGP ${fmtCurrency(metrics.net)}`, sub: metrics.net >= 0 ? "Cash positive" : "Cash negative", color: metrics.net >= 0 ? "hsl(160,80%,40%)" : "hsl(350,75%,50%)", trend: null },
          { icon: AlertTriangle, label: "Pending Revenue", value: `EGP ${fmtCurrency(metrics.pendingRevenue)}`, sub: `${metrics.attentionItems.length} invoices`, color: "hsl(36,90%,53%)", trend: null },
          { icon: Rocket, label: "Active Ventures", value: `${metrics.liveVentures} / ${metrics.totalVentures}`, sub: "Live or building", color: "hsl(168,100%,42%)", trend: null },
          { icon: Target, label: "Pipeline Value", value: `EGP ${fmtCurrency(metrics.pipelineValue)}`, sub: `${metrics.activePipelineDeals} active deals`, color: "hsl(250,60%,60%)", trend: null },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-xl p-3.5 border border-border relative overflow-hidden group hover:border-secondary/30 transition-colors">
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: kpi.color }} />
            <div className="flex items-center gap-1.5 mb-2">
              <kpi.icon className="w-3.5 h-3.5 text-muted-foreground" />
              <div className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-wide">{kpi.label}</div>
            </div>
            <div className="text-lg font-bold text-foreground tracking-tight leading-tight">{kpi.value}</div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="text-[10px] text-muted-foreground/50">{kpi.sub}</span>
              {kpi.trend && (
                <span className="text-[9px] font-semibold flex items-center gap-0.5" style={{ color: "hsl(160,80%,40%)" }}>
                  <ArrowUpRight className="w-3 h-3" />{kpi.trend}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ ROW 2: Revenue chart + Attention ═══ */}
      <div className="grid lg:grid-cols-[5fr_3fr] gap-3">
        {/* Monthly P&L */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-0.5">
            <div className="text-xs font-semibold text-foreground">Revenue vs Expenses</div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[9px] text-muted-foreground"><span className="w-2 h-2 rounded-sm" style={{ background: "hsl(220,95%,47%)" }} />Revenue</span>
              <span className="flex items-center gap-1 text-[9px] text-muted-foreground"><span className="w-2 h-2 rounded-sm" style={{ background: "rgba(240,64,96,.45)" }} />Expenses</span>
            </div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">Monthly consolidated — all ventures</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={metrics.monthlyData} barGap={3} barSize={14}>
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
          <div className="flex items-center gap-2 mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5" style={{ color: "hsl(36,90%,53%)" }} />
            <div className="text-xs font-semibold text-foreground">Attention Required</div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">{metrics.attentionItems.length} pending invoices · EGP {fmtCurrency(metrics.pendingRevenue)} outstanding</div>
          <div className="space-y-2">
            {metrics.attentionItems.map((item, i) => (
              <div key={i} className="bg-muted rounded-lg p-2.5" style={{ border: "1px solid hsl(36,90%,53%,0.2)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <Clock className="w-3 h-3" style={{ color: "hsl(36,90%,53%)" }} />
                  <span className="text-[11px] font-semibold text-foreground">{item.client}</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded ml-auto" style={{ background: "hsl(36,90%,53%,0.13)", color: "hsl(36,90%,53%)" }}>Pending</span>
                </div>
                <div className="text-[10px] text-muted-foreground">EGP {item.amount.toLocaleString()} · {item.service}</div>
              </div>
            ))}
          </div>

          {/* Capital from Bassel Personal */}
          {(() => {
            const basselPaid = EXPENSE_DATA.filter(r => r.paidBy === "Bassel Personal").reduce((s, r) => s + r.amount, 0);
            return (
              <div className="mt-3 bg-muted rounded-lg p-2.5" style={{ border: "1px solid hsl(250,60%,60%,0.2)" }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <DollarSign className="w-3 h-3" style={{ color: "hsl(250,60%,60%)" }} />
                  <span className="text-[11px] font-semibold text-foreground">Capital Contributed</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded ml-auto" style={{ background: "hsl(250,60%,60%,0.13)", color: "hsl(250,60%,60%)" }}>Bassel</span>
                </div>
                <div className="text-[10px] text-muted-foreground">EGP {basselPaid.toLocaleString()} paid by Bassel Personal</div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ═══ ROW 3: Venture Health + Pipeline Funnel + Expense Breakdown ═══ */}
      <div className="grid lg:grid-cols-3 gap-3">
        {/* Venture Health */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <Rocket className="w-3.5 h-3.5" style={{ color: "hsl(168,100%,42%)" }} />
            <div className="text-xs font-semibold text-foreground">Venture Health</div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">{VENTURES_DATA.length} ventures · {metrics.liveVentures} active</div>
          {VENTURES_DATA.map((v, i) => (
            <div key={i} className="flex items-center gap-2.5 py-1.5" style={{ borderBottom: i < VENTURES_DATA.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}>
              <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: v.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-foreground truncate">{v.name}</div>
                <div className="text-[9px] text-muted-foreground">{v.metric}</div>
              </div>
              <StageBadge stage={v.stage} color={v.stageColor} />
            </div>
          ))}
        </div>

        {/* Client Pipeline Funnel */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <Activity className="w-3.5 h-3.5" style={{ color: "hsl(220,95%,47%)" }} />
            <div className="text-xs font-semibold text-foreground">Client Pipeline</div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">{metrics.activePipelineDeals} deals · EGP {fmtCurrency(metrics.pipelineValue)} total value</div>
          <div className="space-y-1.5">
            {CLIENT_PIPELINE.map((stage, i) => {
              const maxDeals = Math.max(...CLIENT_PIPELINE.map(s => s.deals));
              const pct = maxDeals > 0 ? (stage.deals / maxDeals) * 100 : 0;
              return (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-medium text-foreground">{stage.stage}</span>
                    <span className="text-[10px] text-muted-foreground">{stage.deals} · EGP {fmtCurrency(stage.value)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: stage.color }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Venture Pipeline mini */}
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid hsl(220,25%,16%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-3 h-3" style={{ color: "hsl(250,60%,60%)" }} />
              <span className="text-[10px] font-semibold text-foreground">Venture Pipeline</span>
            </div>
            {VENTURE_PIPELINE_SEED.map((deal, i) => (
              <div key={i} className="flex items-center gap-2 py-1" style={{ borderBottom: i < VENTURE_PIPELINE_SEED.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: deal.color }} />
                <span className="text-[10px] text-foreground flex-1 truncate">{deal.name}</span>
                <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: `hsl(36,90%,53%,0.13)`, color: "hsl(36,90%,53%)" }}>{deal.stage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Breakdown + Portfolio */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <DollarSign className="w-3.5 h-3.5" style={{ color: "hsl(350,75%,50%)" }} />
            <div className="text-xs font-semibold text-foreground">Expense Breakdown</div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-2">By category</div>
          <div className="flex items-center gap-4">
            <ResponsiveContainer width={100} height={100}>
              <PieChart>
                <Pie data={metrics.expenseBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={44} strokeWidth={0}>
                  {metrics.expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-1">
              {metrics.expenseBreakdown.map((cat, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: cat.color }} />
                  <span className="text-[10px] text-foreground flex-1">{cat.name}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground">{fmtCurrency(cat.value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolio snapshot */}
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid hsl(220,25%,16%)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="w-3 h-3" style={{ color: "hsl(168,100%,42%)" }} />
              <span className="text-[10px] font-semibold text-foreground">Portfolio & Holdings</span>
              <span className="text-[9px] text-muted-foreground ml-auto">{PORTFOLIO_DATA.length} positions</span>
            </div>
            {PORTFOLIO_DATA.map((p, i) => (
              <div key={i} className="flex items-center gap-2 py-1" style={{ borderBottom: i < PORTFOLIO_DATA.length - 1 ? '1px solid hsl(220,25%,16%)' : 'none' }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="text-[10px] text-foreground flex-1 truncate">{p.name}</span>
                <span className="text-[10px] font-semibold" style={{ color: p.color }}>{p.stake}</span>
                <StageBadge stage={p.status} color={p.status === "Active" || p.status === "Confirmed" ? "hsl(160,80%,40%)" : "hsl(36,90%,53%)"} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ ROW 4: Profit Trend + Team + Quick Stats ═══ */}
      <div className="grid lg:grid-cols-[4fr_3fr_3fr] gap-3">
        {/* Cumulative Profit Trend */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-0.5">Profit Trend</div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">Monthly net position (Revenue − Expenses)</div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={metrics.monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.03)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 9, fill: "hsl(220,15%,38%)" }} axisLine={false} tickLine={false} tickFormatter={v => (v / 1000).toFixed(0) + "K"} />
              <Tooltip content={<ChartTip />} />
              <defs>
                <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160,80%,40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(160,80%,40%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="profit" name="Net Profit" fill="url(#profitGrad)" stroke="hsl(160,80%,40%)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Team Snapshot */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-0.5">
            <Users className="w-3.5 h-3.5" style={{ color: "hsl(220,95%,47%)" }} />
            <div className="text-xs font-semibold text-foreground">Team</div>
          </div>
          <div className="text-[10px] text-muted-foreground/50 mb-3">{TEAM_DATA.length} people across {new Set(TEAM_DATA.map(t => t.dept)).size} departments</div>
          {Array.from(new Set(TEAM_DATA.map(t => t.dept))).map(dept => {
            const members = TEAM_DATA.filter(t => t.dept === dept);
            return (
              <div key={dept} className="mb-2.5">
                <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">{dept}</div>
                <div className="flex flex-wrap gap-1">
                  {members.map(p => (
                    <div key={p.name} className="flex items-center gap-1.5 bg-muted px-2 py-1 rounded-full">
                      <div className="w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-bold" style={{ background: `${p.color}33`, border: `1px solid ${p.color}66`, color: p.color }}>{p.initials}</div>
                      <span className="text-[10px] text-foreground">{p.name.split(" ")[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs font-semibold text-foreground mb-3">Key Metrics</div>
          <div className="space-y-2.5">
            {[
              { label: "Monthly Burn Rate", value: `EGP ${fmtCurrency(Math.round(metrics.burnRate))}`, sub: "Average across 7 months", color: "hsl(350,75%,50%)" },
              { label: "Revenue Collected", value: `EGP ${fmtCurrency(metrics.paidRevenue)}`, sub: `${Math.round((metrics.paidRevenue / metrics.totalRevenue) * 100)}% of total`, color: "hsl(160,80%,40%)" },
              { label: "Portfolio Positions", value: String(metrics.portfolioCount), sub: `${VENTURE_PIPELINE_SEED.length} in pipeline`, color: "hsl(168,100%,42%)" },
              { label: "Client Win Rate", value: `${Math.round((CLIENT_PIPELINE.find(s => s.stage === "Won")?.deals || 0) / metrics.activePipelineDeals * 100)}%`, sub: `${CLIENT_PIPELINE.find(s => s.stage === "Won")?.deals || 0} of ${metrics.activePipelineDeals} deals`, color: "hsl(220,95%,47%)" },
            ].map((stat, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="w-1 h-8 rounded-full mt-0.5" style={{ background: stat.color }} />
                <div>
                  <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold">{stat.label}</div>
                  <div className="text-sm font-bold text-foreground">{stat.value}</div>
                  <div className="text-[9px] text-muted-foreground/50">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
