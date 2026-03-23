const Dashboard = () => {
  const kpis = [
    { label: "Cash on Hand", value: "—" },
    { label: "Monthly Revenue", value: "—" },
    { label: "Active Projects", value: "—" },
    { label: "Pipeline Value", value: "—" },
    { label: "Burn Rate", value: "—" },
    { label: "Headcount", value: "8" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Holding company overview</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-lg p-4">
            <p className="text-xs text-muted-foreground">{kpi.label}</p>
            <p className="text-xl font-semibold mt-1 text-foreground">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Venture Status</h2>
          <p className="text-sm text-muted-foreground">Connect data sources to populate venture cards.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-3">Active Engagements</h2>
          <p className="text-sm text-muted-foreground">Client project data will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
