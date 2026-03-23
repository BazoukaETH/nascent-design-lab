const Finance = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
      <p className="text-sm text-muted-foreground mt-1">Consolidated financials from Google Sheets</p>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-2">Consolidated P&L</h2>
          <p className="text-sm text-muted-foreground">Connect Google Sheets to display revenue, costs, and margins.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-2">Cash Position</h2>
          <p className="text-sm text-muted-foreground">Cash on hand, burn rate, and runway will appear here.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-2">Venture Breakdown</h2>
          <p className="text-sm text-muted-foreground">Per-venture revenue and contribution margin.</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-sm font-medium text-foreground mb-2">Client Payments</h2>
          <p className="text-sm text-muted-foreground">Payment milestones and status tracking.</p>
        </div>
      </div>
    </div>
  );
};

export default Finance;
