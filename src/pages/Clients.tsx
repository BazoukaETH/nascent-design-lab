const clients = [
  { client: "Cairo Food Solutions", project: "Full digital platform", value: "500,000 EGP", status: "Active" },
  { client: "Baraka Pharm", project: "Shopify redesign + retainer", value: "60,000+ EGP", status: "Active" },
  { client: "EJB", project: "App SLA retainer", value: "100,000 EGP", status: "Active" },
  { client: "SMG Engineering", project: "Porsche Drive+ loyalty app", value: "2-3M EGP", status: "Proposal" },
  { client: "Cairo Capital Group", project: "Mint app partnership", value: "400,000/mo EGP", status: "Proposal" },
];

const Clients = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
      <p className="text-sm text-muted-foreground mt-1">Wasla Solutions pipeline & active projects</p>

      <div className="mt-6 bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground">Client</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Project</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Value</th>
              <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.client} className="border-b border-border last:border-0">
                <td className="p-3 font-medium text-foreground">{c.client}</td>
                <td className="p-3 text-muted-foreground">{c.project}</td>
                <td className="p-3 text-muted-foreground">{c.value}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${c.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
