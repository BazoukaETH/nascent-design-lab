const ventures = [
  { name: "Wasla Solutions", stage: "Live", category: "Services" },
  { name: "Wasla Education", stage: "Live", category: "Education" },
  { name: "Paperwork Studio", stage: "Live", category: "Creative Agency" },
  { name: "Wasla Tourism", stage: "Early Stage", category: "Marketplace" },
  { name: "Wasla Labs", stage: "Early Stage", category: "R&D" },
  { name: "Wasla Space", stage: "Discovery", category: "Membership" },
  { name: "Wasla Bank", stage: "Long-term Vision", category: "Fintech" },
  { name: "Data Egypt", stage: "Concept", category: "Media/Data" },
  { name: "AgriWasla", stage: "Prototype", category: "Agri Marketplace" },
  { name: "Firewood Egypt", stage: "Live", category: "E-commerce" },
];

const stageColor: Record<string, string> = {
  Live: "bg-green-100 text-green-800",
  "Early Stage": "bg-yellow-100 text-yellow-800",
  Discovery: "bg-blue-100 text-blue-800",
  "Long-term Vision": "bg-gray-100 text-gray-600",
  Concept: "bg-gray-100 text-gray-600",
  Prototype: "bg-orange-100 text-orange-800",
};

const Ventures = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Ventures</h1>
      <p className="text-sm text-muted-foreground mt-1">Subsidiaries & initiatives under Wasla Ventures</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {ventures.map((v) => (
          <div key={v.name} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-foreground">{v.name}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full ${stageColor[v.stage] || "bg-muted text-muted-foreground"}`}>
                {v.stage}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{v.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ventures;
