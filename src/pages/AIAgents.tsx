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
    id: "1", name: "Weekly Status Digest",
    description: "Compiles a weekly status report across all active client projects by reading ClickUp tasks and Drive updates.",
    type: "Reporting", trigger: "scheduled", triggerDetail: "Every Sunday 8pm", status: "active",
    connectedTools: ["ClickUp", "Google Drive", "Gmail"], lastRun: "Mar 16, 2026 8:00 PM",
    logs: [
      { time: "Mar 16 8:00 PM", action: "Fetched 34 tasks from ClickUp across 3 projects", result: "Success" },
      { time: "Mar 16 8:01 PM", action: "Scanned 12 Drive docs for updates", result: "Success" },
      { time: "Mar 16 8:02 PM", action: "Generated digest and sent to Bassel via Gmail", result: "Delivered" },
    ],
  },
  {
    id: "2", name: "Pipeline Follow-up Reminder",
    description: "Checks pipeline entries with overdue next-action dates and sends reminders to the assigned owner.",
    type: "Automation", trigger: "scheduled", triggerDetail: "Daily 9am", status: "active",
    connectedTools: ["Internal DB", "Gmail"], lastRun: "Mar 23, 2026 9:00 AM",
    logs: [
      { time: "Mar 23 9:00 AM", action: "Checked 8 pipeline entries", result: "2 overdue found" },
      { time: "Mar 23 9:01 AM", action: "Sent reminder to Hussein for Green Valley Farms", result: "Delivered" },
      { time: "Mar 23 9:01 AM", action: "Sent reminder to Bassel for Nile Logistics follow-up", result: "Delivered" },
    ],
  },
  {
    id: "3", name: "Invoice Generator",
    description: "Generates client invoices from payment milestone data and sends them for review before dispatch.",
    type: "Finance", trigger: "manual", triggerDetail: "Triggered by button press", status: "active",
    connectedTools: ["Google Sheets", "Google Drive", "Gmail"], lastRun: "Mar 20, 2026 2:15 PM",
    logs: [
      { time: "Mar 20 2:15 PM", action: "Generated invoice for EJB Month 2 (25,000 EGP)", result: "Draft created" },
      { time: "Mar 20 2:16 PM", action: "Saved PDF to EJB Drive folder", result: "Success" },
      { time: "Mar 20 2:16 PM", action: "Sent draft to Bassel for approval", result: "Awaiting approval" },
    ],
  },
  {
    id: "4", name: "New Lead Enrichment",
    description: "When a new pipeline entry is created, enriches it with company info, LinkedIn data, and suggests a first-touch template.",
    type: "Sales", trigger: "event", triggerDetail: "On new pipeline entry", status: "paused",
    connectedTools: ["Internal DB", "Web Search"], lastRun: "Mar 14, 2026 11:30 AM",
    logs: [
      { time: "Mar 14 11:30 AM", action: "New lead detected: Green Valley Farms", result: "Triggered" },
      { time: "Mar 14 11:31 AM", action: "Searched web for company info", result: "Found LinkedIn, website" },
      { time: "Mar 14 11:32 AM", action: "Generated first-touch email template", result: "Saved to pipeline entry" },
    ],
  },
  {
    id: "5", name: "Monthly Financial Summary",
    description: "Reads the latest Google Sheets financial data and generates a monthly summary with highlights and alerts.",
    type: "Finance", trigger: "scheduled", triggerDetail: "1st of each month", status: "draft",
    connectedTools: ["Google Sheets", "Internal DB"], lastRun: "Never", logs: [],
  },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  active: { bg: "hsl(160,80%,40%,0.12)", color: "hsl(160,80%,40%)" },
  paused: { bg: "hsl(36,90%,53%,0.12)", color: "hsl(36,90%,53%)" },
  draft: { bg: "hsl(220,15%,38%,0.15)", color: "hsl(220,15%,38%)" },
};

const triggerIcon = { manual: Zap, scheduled: Calendar, event: Play };

const AIAgents = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">AI Agents</h1>
        <p className="text-xs text-muted-foreground mt-1">{agents.filter(a => a.status === "active").length} active · {agents.length} total agents</p>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { label: "Active Agents", value: agents.filter(a => a.status === "active").length, color: "hsl(160,80%,40%)" },
          { label: "Total Runs (This Week)", value: 12, color: "hsl(220,95%,47%)" },
          { label: "Success Rate", value: "100%", color: "hsl(168,100%,42%)" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card rounded-xl p-4 border border-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[3px] h-full" style={{ background: kpi.color }} />
            <div className="text-[9px] text-muted-foreground/50 font-bold uppercase tracking-wide mb-1">{kpi.label}</div>
            <div className="text-xl font-bold text-foreground tracking-tight">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {agents.map((agent) => {
          const ss = statusStyles[agent.status];
          const TriggerIcon = triggerIcon[agent.trigger];
          const isExpanded = expanded === agent.id;

          return (
            <div key={agent.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button onClick={() => setExpanded(isExpanded ? null : agent.id)} className="w-full p-4 text-left">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "hsl(220,95%,47%,0.12)", border: "1px solid hsl(220,95%,47%,0.2)" }}>
                      <Bot className="w-4 h-4" style={{ color: "hsl(220,95%,47%)" }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-[13px] font-bold text-foreground">{agent.name}</h3>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full capitalize" style={{ background: ss.bg, color: ss.color }}>{agent.status}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">{agent.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-[9px] text-muted-foreground/60">
                        <span className="flex items-center gap-1"><TriggerIcon className="w-3 h-3" />{agent.triggerDetail}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Last: {agent.lastRun}</span>
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
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { label: "Type", value: agent.type },
                      { label: "Trigger", value: `${agent.trigger} — ${agent.triggerDetail}` },
                      { label: "Connected Tools", value: agent.connectedTools.join(", ") },
                    ].map((d) => (
                      <div key={d.label} className="bg-muted rounded-lg p-2.5">
                        <div className="text-[8px] text-muted-foreground/50 uppercase tracking-wide">{d.label}</div>
                        <div className="text-[10px] text-foreground font-medium mt-0.5">{d.value}</div>
                      </div>
                    ))}
                  </div>

                  {agent.logs.length > 0 && (
                    <div>
                      <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-2">Recent Logs</div>
                      <div className="bg-muted rounded-lg divide-y divide-border">
                        {agent.logs.map((log, i) => (
                          <div key={i} className="p-2.5 flex items-start justify-between gap-4 text-[10px]">
                            <div>
                              <span className="text-muted-foreground/50">{log.time}</span>
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
