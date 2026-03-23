const months = ["Oct 2025", "Nov 2025", "Dec 2025", "Jan 2026", "Feb 2026", "Mar 2026"];

const consolidatedPL = [
  { line: "Revenue", values: ["680K", "720K", "810K", "790K", "830K", "862K"], bold: true },
  { line: "  Solutions", values: ["520K", "540K", "590K", "580K", "600K", "620K"], bold: false },
  { line: "  Education", values: ["55K", "62K", "70K", "72K", "78K", "85K"], bold: false },
  { line: "  Paperwork (25%)", values: ["22K", "25K", "28K", "26K", "27K", "28K"], bold: false },
  { line: "  Firewood", values: ["28K", "35K", "52K", "48K", "40K", "45K"], bold: false },
  { line: "  Other", values: ["55K", "58K", "70K", "64K", "85K", "84K"], bold: false },
  { line: "COGS", values: ["-290K", "-310K", "-340K", "-330K", "-350K", "-362K"], bold: false },
  { line: "Gross Profit", values: ["390K", "410K", "470K", "460K", "480K", "500K"], bold: true },
  { line: "Operating Expenses", values: ["-280K", "-285K", "-295K", "-290K", "-300K", "-310K"], bold: false },
  { line: "Net Profit", values: ["110K", "125K", "175K", "170K", "180K", "190K"], bold: true },
];

const ventureBreakdown = [
  { venture: "Wasla Solutions", revenue: "620K", costs: "380K", margin: "38.7%" },
  { venture: "Wasla Education", revenue: "85K", costs: "42K", margin: "50.6%" },
  { venture: "Paperwork Studio", revenue: "112K (25%: 28K)", costs: "78K", margin: "30.4%" },
  { venture: "Firewood Egypt", revenue: "45K", costs: "28K", margin: "37.8%" },
  { venture: "Wasla Tourism", revenue: "—", costs: "15K", margin: "—" },
  { venture: "Wasla Labs", revenue: "—", costs: "25K", margin: "—" },
];

const clientPayments = [
  { client: "Cairo Food Solutions", milestone: "Phase 1 delivery", amount: "175,000", due: "Apr 12", status: "Pending" },
  { client: "EJB", milestone: "Month 2 retainer", amount: "25,000", due: "Apr 3", status: "Pending" },
  { client: "Baraka Pharm", milestone: "April retainer", amount: "15,000", due: "Apr 1", status: "Upcoming" },
  { client: "Cairo Food Solutions", milestone: "Final delivery", amount: "175,000", due: "Jun 15", status: "Upcoming" },
];

const paymentStatusColor: Record<string, string> = {
  Paid: "text-green-600",
  Pending: "text-yellow-600",
  Upcoming: "text-muted-foreground",
  Overdue: "text-red-600",
};

const Finance = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
        <p className="text-sm text-muted-foreground mt-1">Consolidated financials · Source: Google Sheets</p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Cash on Hand</p>
          <p className="text-lg font-semibold text-foreground tabular-nums mt-1">1,240,000 EGP</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Burn Rate</p>
          <p className="text-lg font-semibold text-foreground tabular-nums mt-1">310,000/mo</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Runway</p>
          <p className="text-lg font-semibold text-foreground tabular-nums mt-1">4.0 months</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Net Margin (Mar)</p>
          <p className="text-lg font-semibold text-foreground tabular-nums mt-1">22.0%</p>
        </div>
      </div>

      {/* Consolidated P&L */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3">Consolidated P&L</h2>
        <div className="bg-card border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground text-xs min-w-[160px]">Line Item</th>
                {months.map((m) => (
                  <th key={m} className="text-right p-3 font-medium text-muted-foreground text-xs min-w-[80px]">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {consolidatedPL.map((row) => (
                <tr key={row.line} className="border-b border-border last:border-0">
                  <td className={`p-3 ${row.bold ? "font-medium text-foreground" : "text-muted-foreground"}`}>{row.line}</td>
                  {row.values.map((v, i) => (
                    <td key={i} className={`p-3 text-right tabular-nums ${row.bold ? "font-medium text-foreground" : "text-muted-foreground"}`}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Venture Breakdown */}
        <div>
          <h2 className="text-sm font-medium text-foreground mb-3">Venture Breakdown (March)</h2>
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-medium text-muted-foreground text-xs">Venture</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Revenue</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Costs</th>
                  <th className="text-right p-3 font-medium text-muted-foreground text-xs">Margin</th>
                </tr>
              </thead>
              <tbody>
                {ventureBreakdown.map((v) => (
                  <tr key={v.venture} className="border-b border-border last:border-0">
                    <td className="p-3 text-foreground">{v.venture}</td>
                    <td className="p-3 text-right text-muted-foreground tabular-nums">{v.revenue}</td>
                    <td className="p-3 text-right text-muted-foreground tabular-nums">{v.costs}</td>
                    <td className="p-3 text-right text-muted-foreground tabular-nums">{v.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Client Payments */}
        <div>
          <h2 className="text-sm font-medium text-foreground mb-3">Upcoming Client Payments</h2>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {clientPayments.map((p, i) => (
              <div key={i} className="p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground">{p.client}</p>
                  <p className="text-xs text-muted-foreground">{p.milestone} · Due {p.due}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground tabular-nums">{p.amount} EGP</p>
                  <p className={`text-xs ${paymentStatusColor[p.status]}`}>{p.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;
