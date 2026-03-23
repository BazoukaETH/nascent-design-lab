import { useState } from "react";
import { Bot, Play, Pause, Clock, Zap, Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  description: string;
  type: string;
  trigger: "manual" | "scheduled" | "event";
  triggerDetail: string;
  status: "active" | "paused" | "draft";
  connectedTools: string[];
  lastRun: string;
  logs: { time: string; action: string; result: string }[];
}

const agents: Agent[] = [
  {
    id: "1",
    name: "Weekly Status Digest",
    description: "Compiles a weekly status report across all active client projects by reading ClickUp tasks and Drive updates.",
    type: "Reporting",
    trigger: "scheduled",
    triggerDetail: "Every Sunday 8pm",
    status: "active",
    connectedTools: ["ClickUp", "Google Drive", "Gmail"],
    lastRun: "Mar 16, 2026 8:00 PM",
    logs: [
      { time: "Mar 16 8:00 PM", action: "Fetched 34 tasks from ClickUp across 3 projects", result: "Success" },
      { time: "Mar 16 8:01 PM", action: "Scanned 12 Drive docs for updates", result: "Success" },
      { time: "Mar 16 8:02 PM", action: "Generated digest and sent to Bassel via Gmail", result: "Delivered" },
    ],
  },
  {
    id: "2",
    name: "Pipeline Follow-up Reminder",
    description: "Checks pipeline entries with overdue next-action dates and sends reminders to the assigned owner.",
    type: "Automation",
    trigger: "scheduled",
    triggerDetail: "Daily 9am",
    status: "active",
    connectedTools: ["Internal DB", "Gmail"],
    lastRun: "Mar 23, 2026 9:00 AM",
    logs: [
      { time: "Mar 23 9:00 AM", action: "Checked 8 pipeline entries", result: "2 overdue found" },
      { time: "Mar 23 9:01 AM", action: "Sent reminder to Hussein for Green Valley Farms", result: "Delivered" },
      { time: "Mar 23 9:01 AM", action: "Sent reminder to Bassel for Nile Logistics follow-up", result: "Delivered" },
    ],
  },
  {
    id: "3",
    name: "Invoice Generator",
    description: "Generates client invoices from payment milestone data and sends them for review before dispatch.",
    type: "Finance",
    trigger: "manual",
    triggerDetail: "Triggered by button press",
    status: "active",
    connectedTools: ["Google Sheets", "Google Drive", "Gmail"],
    lastRun: "Mar 20, 2026 2:15 PM",
    logs: [
      { time: "Mar 20 2:15 PM", action: "Generated invoice for EJB Month 2 (25,000 EGP)", result: "Draft created" },
      { time: "Mar 20 2:16 PM", action: "Saved PDF to EJB Drive folder", result: "Success" },
      { time: "Mar 20 2:16 PM", action: "Sent draft to Bassel for approval", result: "Awaiting approval" },
    ],
  },
  {
    id: "4",
    name: "New Lead Enrichment",
    description: "When a new pipeline entry is created, enriches it with company info, LinkedIn data, and suggests a first-touch template.",
    type: "Sales",
    trigger: "event",
    triggerDetail: "On new pipeline entry",
    status: "paused",
    connectedTools: ["Internal DB", "Web Search"],
    lastRun: "Mar 14, 2026 11:30 AM",
    logs: [
      { time: "Mar 14 11:30 AM", action: "New lead detected: Green Valley Farms", result: "Triggered" },
      { time: "Mar 14 11:31 AM", action: "Searched web for company info", result: "Found LinkedIn, website" },
      { time: "Mar 14 11:32 AM", action: "Generated first-touch email template", result: "Saved to pipeline entry" },
    ],
  },
  {
    id: "5",
    name: "Monthly Financial Summary",
    description: "Reads the latest Google Sheets financial data and generates a monthly summary with highlights and alerts.",
    type: "Finance",
    trigger: "scheduled",
    triggerDetail: "1st of each month",
    status: "draft",
    connectedTools: ["Google Sheets", "Internal DB"],
    lastRun: "Never",
    logs: [],
  },
];

const statusConfig = {
  active: { bg: "bg-green-100", text: "text-green-800", label: "Active" },
  paused: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Paused" },
  draft: { bg: "bg-gray-100", text: "text-gray-600", label: "Draft" },
};

const triggerIcon = {
  manual: Zap,
  scheduled: Calendar,
  event: Play,
};

const AIAgents = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">AI Agents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {agents.filter(a => a.status === "active").length} active · {agents.length} total agents
        </p>
      </div>

      {/* Agent summary strip */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Active Agents</p>
          <p className="text-lg font-semibold text-foreground mt-1">{agents.filter(a => a.status === "active").length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Total Runs (This Week)</p>
          <p className="text-lg font-semibold text-foreground mt-1">12</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground">Success Rate</p>
          <p className="text-lg font-semibold text-foreground mt-1">100%</p>
        </div>
      </div>

      {/* Agent cards */}
      <div className="space-y-3">
        {agents.map((agent) => {
          const status = statusConfig[agent.status];
          const TriggerIcon = triggerIcon[agent.trigger];
          const isExpanded = expanded === agent.id;

          return (
            <div key={agent.id} className="bg-card border border-border rounded-lg">
              <button
                onClick={() => setExpanded(isExpanded ? null : agent.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">{agent.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${status.bg} ${status.text}`}>{status.label}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{agent.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <TriggerIcon className="w-3 h-3" />
                          {agent.triggerDetail}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Last: {agent.lastRun}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {agent.status === "active" && (
                      <button className="p-1.5 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Pause className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                    {agent.status === "paused" && (
                      <button className="p-1.5 rounded hover:bg-muted transition-colors" onClick={(e) => e.stopPropagation()}>
                        <Play className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-border pt-4 space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Type</p>
                      <p className="text-sm text-foreground">{agent.type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Trigger</p>
                      <p className="text-sm text-foreground capitalize">{agent.trigger} — {agent.triggerDetail}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Connected Tools</p>
                      <div className="flex flex-wrap gap-1">
                        {agent.connectedTools.map((t) => (
                          <span key={t} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {agent.logs.length > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Recent Logs</p>
                      <div className="bg-muted/30 rounded-lg divide-y divide-border">
                        {agent.logs.map((log, i) => (
                          <div key={i} className="p-2.5 flex items-start justify-between gap-4 text-xs">
                            <div>
                              <span className="text-muted-foreground">{log.time}</span>
                              <p className="text-foreground mt-0.5">{log.action}</p>
                            </div>
                            <span className="text-muted-foreground shrink-0">{log.result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AIAgents;
