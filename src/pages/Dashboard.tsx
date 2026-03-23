import { ArrowUp, ArrowDown, Clock } from "lucide-react";

const kpis = [
  { label: "Cash on Hand", value: "1,240,000 EGP", change: "+8%", up: true },
  { label: "Monthly Revenue", value: "862,000 EGP", change: "+12%", up: true },
  { label: "Active Projects", value: "3", change: null, up: false },
  { label: "Pipeline Value", value: "3.9M EGP", change: "+1 new", up: true },
  { label: "Burn Rate", value: "310,000/mo", change: "-3%", up: false },
  { label: "Headcount", value: "8", change: null, up: false },
];

const ventureStatus = [
  { name: "Solutions", stage: "Live", revenue: "620K", color: "bg-green-500" },
  { name: "Education", stage: "Live", revenue: "85K", color: "bg-green-500" },
  { name: "Paperwork", stage: "Live", revenue: "112K", color: "bg-green-500" },
  { name: "Tourism", stage: "Early", revenue: "—", color: "bg-yellow-500" },
  { name: "Labs", stage: "Early", revenue: "—", color: "bg-yellow-500" },
  { name: "Space", stage: "Discovery", revenue: "—", color: "bg-blue-500" },
  { name: "Firewood", stage: "Live", revenue: "45K", color: "bg-green-500" },
];

const engagements = [
  { client: "Cairo Food Solutions", project: "Full digital platform", status: "Active", value: "500,000", lead: "Moaz", deadline: "Apr 12" },
  { client: "Baraka Pharm", project: "Shopify redesign + retainer", status: "Active", value: "60,000+", lead: "Moaz", deadline: "Apr 5" },
  { client: "EJB", project: "App SLA retainer", status: "Active", value: "100,000", lead: "Moaz", deadline: "Ongoing" },
  { client: "SMG Engineering", project: "Porsche Drive+ loyalty app", status: "Proposal", value: "2-3M", lead: "Bassel", deadline: "Apr 1" },
  { client: "Cairo Capital Group", project: "Mint app partnership", status: "Proposal", value: "400K/mo", lead: "Bassel", deadline: "Mar 30" },
];

const pipelineStages = [
  { stage: "Lead", count: 2, value: "800K" },
  { stage: "Discovery", count: 1, value: "400K" },
  { stage: "Proposal", count: 2, value: "3.4M" },
  { stage: "Negotiation", count: 0, value: "—" },
  { stage: "Won", count: 3, value: "660K" },
];

const deadlines = [
  { task: "Cairo Food: Phase 1 delivery", project: "Cairo Food Solutions", due: "Mar 25", overdue: false },
  { task: "Baraka: Shopify store launch", project: "Baraka Pharm", due: "Mar 27", overdue: false },
  { task: "SMG: Proposal final draft", project: "SMG Engineering", due: "Apr 1", overdue: false },
  { task: "EJB: Monthly SLA report", project: "EJB", due: "Apr 3", overdue: false },
  { task: "Cairo Capital: Partnership deck", project: "Cairo Capital Group", due: "Mar 30", overdue: false },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Holding company overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="text-lg font-semibold mt-1 text-foreground tabular-nums">{kpi.value}</p>
            {kpi.change && (
              <div className={`flex items-center gap-1 mt-1 text-xs ${kpi.up ? "text-green-600" : "text-red-500"}`}>
                {kpi.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {kpi.change}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Venture Status Strip */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3">Venture Status</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {ventureStatus.map((v) => (
            <div key={v.name} className="bg-card border border-border rounded-lg p-3 min-w-[140px] shrink-0">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${v.color}`} />
                <span className="text-sm font-medium text-foreground">{v.name}</span>
              </div>
              <p className="text-xs text-muted-foreground">{v.stage}</p>
              <p className="text-sm font-medium text-foreground mt-1 tabular-nums">{v.revenue}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Engagements */}
        <div className="lg:col-span-2">
          <h2 className="text-sm font-medium text-foreground mb-3">Active Engagements</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Client</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Project</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Status</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Value</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Lead</th>
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {engagements.map((e) => (
                  <tr key={e.client} className="border-b border-border last:border-0">
                    <td className="p-3 font-medium text-foreground">{e.client}</td>
                    <td className="p-3 text-muted-foreground">{e.project}</td>
                    <td className="p-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${e.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {e.status}
                      </span>
                    </td>
                    <td className="p-3 text-muted-foreground tabular-nums">{e.value}</td>
                    <td className="p-3 text-muted-foreground">{e.lead}</td>
                    <td className="p-3 text-muted-foreground">{e.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pipeline Snapshot */}
        <div>
          <h2 className="text-sm font-medium text-foreground mb-3">Pipeline Snapshot</h2>
          <div className="bg-card border border-border rounded-lg p-4 space-y-3">
            {pipelineStages.map((s) => (
              <div key={s.stage} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{s.stage}</span>
                  <span className="text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5 tabular-nums">{s.count}</span>
                </div>
                <span className="text-sm text-muted-foreground tabular-nums">{s.value}</span>
              </div>
            ))}
            <div className="pt-2 border-t border-border flex justify-between">
              <span className="text-sm font-medium text-foreground">Total Weighted</span>
              <span className="text-sm font-medium text-foreground tabular-nums">3.9M EGP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3">Upcoming Deadlines (7 days)</h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {deadlines.map((d) => (
            <div key={d.task} className="flex items-center gap-3 p-3">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{d.task}</p>
                <p className="text-xs text-muted-foreground">{d.project}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">{d.due}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
