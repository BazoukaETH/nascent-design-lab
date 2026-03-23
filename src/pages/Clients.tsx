import { useState } from "react";
import { GripVertical, ExternalLink } from "lucide-react";

interface PipelineEntry {
  id: string;
  company: string;
  contact: string;
  stage: string;
  value: string;
  probability: number;
  nextAction: string;
  owner: string;
}

const pipelineData: PipelineEntry[] = [
  { id: "1", company: "TechNova Solutions", contact: "Khaled Ibrahim", stage: "Lead", value: "350,000", probability: 10, nextAction: "Initial call Mar 28", owner: "Hussein" },
  { id: "2", company: "Green Valley Farms", contact: "Sara Mahmoud", stage: "Lead", value: "450,000", probability: 10, nextAction: "Send intro deck", owner: "Hussein" },
  { id: "3", company: "Cairo Capital Group", contact: "Ahmed Fawzy", stage: "Discovery", value: "400,000/mo", probability: 30, nextAction: "Requirements session", owner: "Bassel" },
  { id: "4", company: "SMG Engineering", contact: "Tarek Hassan", stage: "Proposal", value: "2-3M", probability: 50, nextAction: "Final proposal Apr 1", owner: "Bassel" },
  { id: "5", company: "Nile Logistics", contact: "Mona Adel", stage: "Proposal", value: "180,000", probability: 40, nextAction: "Follow up call", owner: "Hussein" },
  { id: "6", company: "Cairo Food Solutions", contact: "Omar Sherif", stage: "Won", value: "500,000", probability: 100, nextAction: "Phase 1 in progress", owner: "Moaz" },
  { id: "7", company: "Baraka Pharm", contact: "Layla Hassan", stage: "Won", value: "60,000+", probability: 100, nextAction: "Monthly retainer active", owner: "Moaz" },
  { id: "8", company: "EJB", contact: "Amr Nabil", stage: "Won", value: "100,000", probability: 100, nextAction: "SLA retainer ongoing", owner: "Moaz" },
];

const stages = ["Lead", "Discovery", "Proposal", "Negotiation", "Won", "Lost"];

const clients = [
  {
    client: "Cairo Food Solutions",
    project: "Full digital platform",
    value: "500,000 EGP",
    status: "Active",
    phase: "Phase 1 of 3",
    team: ["Moaz", "Mohamed", "Saif"],
    payments: [
      { milestone: "Upfront (30%)", amount: "150,000", status: "Paid" },
      { milestone: "Phase 1 delivery", amount: "175,000", status: "Pending" },
      { milestone: "Final delivery", amount: "175,000", status: "Upcoming" },
    ],
  },
  {
    client: "Baraka Pharm",
    project: "Shopify redesign + retainer",
    value: "60,000+ EGP",
    status: "Active",
    phase: "Redesign complete, retainer active",
    team: ["Moaz", "Mohamed"],
    payments: [
      { milestone: "Redesign", amount: "60,000", status: "Paid" },
      { milestone: "Monthly retainer", amount: "15,000/mo", status: "Recurring" },
    ],
  },
  {
    client: "EJB",
    project: "App SLA retainer",
    value: "100,000 EGP (4 months)",
    status: "Active",
    phase: "Month 2 of 4",
    team: ["Moaz"],
    payments: [
      { milestone: "Month 1", amount: "25,000", status: "Paid" },
      { milestone: "Month 2", amount: "25,000", status: "Pending" },
      { milestone: "Month 3", amount: "25,000", status: "Upcoming" },
      { milestone: "Month 4", amount: "25,000", status: "Upcoming" },
    ],
  },
];

const paymentStatusColor: Record<string, string> = {
  Paid: "text-green-600",
  Pending: "text-yellow-600",
  Upcoming: "text-muted-foreground",
  Recurring: "text-blue-600",
  Overdue: "text-red-600",
};

const Clients = () => {
  const [view, setView] = useState<"pipeline" | "projects">("pipeline");
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Clients</h1>
          <p className="text-sm text-muted-foreground mt-1">Wasla Solutions pipeline & active projects</p>
        </div>
        <div className="flex bg-muted rounded-md p-0.5">
          <button
            onClick={() => setView("pipeline")}
            className={`text-sm px-3 py-1.5 rounded transition-colors ${view === "pipeline" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Pipeline
          </button>
          <button
            onClick={() => setView("projects")}
            className={`text-sm px-3 py-1.5 rounded transition-colors ${view === "projects" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}
          >
            Active Projects
          </button>
        </div>
      </div>

      {view === "pipeline" ? (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {stages.map((stage) => {
            const items = pipelineData.filter((p) => p.stage === stage);
            return (
              <div key={stage} className="min-w-[220px] w-[220px] shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-foreground">{stage}</h3>
                  <span className="text-xs bg-muted text-muted-foreground rounded-full px-1.5 py-0.5">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="bg-card border border-border rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-3.5 h-3.5 text-muted-foreground/40 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{item.company}</p>
                          <p className="text-xs text-muted-foreground">{item.contact}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-foreground tabular-nums">{item.value} EGP</span>
                            <span className="text-xs text-muted-foreground tabular-nums">{item.probability}%</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{item.nextAction}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Owner: {item.owner}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="bg-muted/30 border border-dashed border-border rounded-lg p-4 text-center">
                      <p className="text-xs text-muted-foreground">No entries</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-3">
          {clients.map((c) => (
            <div key={c.client} className="bg-card border border-border rounded-lg">
              <button
                onClick={() => setExpandedClient(expandedClient === c.client ? null : c.client)}
                className="w-full p-4 text-left flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{c.client}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-800">{c.status}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{c.project} · {c.value}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </button>

              {expandedClient === c.client && (
                <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Current Phase</p>
                      <p className="text-sm text-foreground">{c.phase}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Team</p>
                      <p className="text-sm text-foreground">{c.team.join(", ")}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Total Value</p>
                      <p className="text-sm text-foreground">{c.value}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Payment Milestones</p>
                    <div className="space-y-1.5">
                      {c.payments.map((p, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{p.milestone}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground tabular-nums">{p.amount} EGP</span>
                            <span className={`text-xs ${paymentStatusColor[p.status] || "text-muted-foreground"}`}>{p.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Clients;
