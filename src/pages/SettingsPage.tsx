import { Key, Users, Shield, Link } from "lucide-react";

const integrations = [
  { name: "Google Sheets", status: "Not connected", description: "Financial data source for P&L, revenue, and cash tracking" },
  { name: "Google Drive", status: "Not connected", description: "Document storage for proposals, SOWs, invoices, and strategy docs" },
  { name: "ClickUp", status: "Not connected", description: "Project management — tasks, deadlines, and workload data" },
  { name: "Gmail", status: "Not connected", description: "Email sending for agent outputs, digests, and notifications" },
];

const users = [
  { name: "Bassel El Aroussy", role: "Admin", lastActive: "Today" },
  { name: "Moaz El Sawy", role: "Member", lastActive: "Today" },
  { name: "Mohamed El Hagry", role: "Member", lastActive: "Yesterday" },
  { name: "Youssef El Shazly", role: "Member", lastActive: "Mar 21" },
  { name: "Hussein Shahbender", role: "Member", lastActive: "Today" },
  { name: "Ahmed Nehad", role: "Admin", lastActive: "Mar 20" },
  { name: "Ali Amir", role: "Member", lastActive: "Mar 22" },
  { name: "Saif Nosair", role: "Member", lastActive: "Mar 19" },
];

const SectionHeader = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(220,95%,47%,0.12)", border: "1px solid hsl(220,95%,47%,0.2)" }}>
      <Icon className="w-3.5 h-3.5" style={{ color: "hsl(220,95%,47%)" }} />
    </div>
    <h2 className="text-sm font-bold text-foreground">{title}</h2>
  </div>
);

const roleColors: Record<string, { bg: string; color: string }> = {
  Admin: { bg: "hsl(220,95%,47%,0.12)", color: "hsl(220,95%,47%)" },
  Member: { bg: "hsl(220,15%,38%,0.15)", color: "hsl(215,20%,55%)" },
};

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[22px] font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-xs text-muted-foreground mt-1">Integrations, users, and permissions</p>
      </div>

      {/* Integrations */}
      <div>
        <SectionHeader icon={Link} title="Integrations" />
        <div className="grid sm:grid-cols-2 gap-2.5">
          {integrations.map((int) => (
            <div key={int.name} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[12px] font-bold text-foreground">{int.name}</h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "hsl(220,15%,38%,0.15)", color: "hsl(215,20%,55%)" }}>
                  {int.status}
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{int.description}</p>
              <button className="mt-3 text-[10px] font-semibold transition-colors" style={{ color: "hsl(220,95%,47%)" }}>Connect →</button>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div>
        <SectionHeader icon={Users} title={`Users (${users.length})`} />
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border">
                {["Name", "Role", "Last Active", ""].map(h => (
                  <th key={h} className="text-left p-3 font-semibold text-muted-foreground/50 text-[9px] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const rc = roleColors[u.role] || roleColors.Member;
                return (
                  <tr key={u.name} className="border-b border-border/30 last:border-0">
                    <td className="p-3 font-semibold text-foreground">{u.name}</td>
                    <td className="p-3">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: rc.bg, color: rc.color }}>{u.role}</span>
                    </td>
                    <td className="p-3 text-muted-foreground">{u.lastActive}</td>
                    <td className="p-3">
                      <button className="text-[10px] text-muted-foreground hover:text-foreground transition-colors">Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <SectionHeader icon={Shield} title="Permissions" />
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          {[
            { role: "Admin", desc: "Full access to all ventures, finance, AI agents, and settings", count: 2 },
            { role: "Member", desc: "Access to assigned projects, own tasks, and shared documents", count: 6 },
          ].map((p, i) => (
            <div key={p.role} className={`flex items-center justify-between text-[11px] ${i > 0 ? "border-t border-border pt-3" : ""}`}>
              <div>
                <p className="font-semibold text-foreground">{p.role}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{p.desc}</p>
              </div>
              <span className="text-[10px] text-muted-foreground">{p.count} users</span>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div>
        <SectionHeader icon={Key} title="API Keys" />
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-[11px] text-muted-foreground">No API keys configured yet. Keys will be needed for ClickUp, Google, and AI agent integrations.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
