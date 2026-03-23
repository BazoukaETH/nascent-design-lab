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

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Integrations, users, and permissions</p>
      </div>

      {/* Integrations */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
          <Link className="w-4 h-4" /> Integrations
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {integrations.map((int) => (
            <div key={int.name} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-foreground text-sm">{int.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{int.status}</span>
              </div>
              <p className="text-xs text-muted-foreground">{int.description}</p>
              <button className="mt-3 text-xs text-primary hover:underline">Connect →</button>
            </div>
          ))}
        </div>
      </div>

      {/* User Management */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
          <Users className="w-4 h-4" /> Users ({users.length})
        </h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left p-3 font-medium text-muted-foreground text-xs">Name</th>
                <th className="text-left p-3 font-medium text-muted-foreground text-xs">Role</th>
                <th className="text-left p-3 font-medium text-muted-foreground text-xs">Last Active</th>
                <th className="text-left p-3 font-medium text-muted-foreground text-xs"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.name} className="border-b border-border last:border-0">
                  <td className="p-3 font-medium text-foreground">{u.name}</td>
                  <td className="p-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${u.role === "Admin" ? "bg-blue-100 text-blue-800" : "bg-muted text-muted-foreground"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-muted-foreground">{u.lastActive}</td>
                  <td className="p-3">
                    <button className="text-xs text-muted-foreground hover:text-foreground">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
          <Shield className="w-4 h-4" /> Permissions
        </h2>
        <div className="bg-card border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-foreground">Admin</p>
              <p className="text-xs text-muted-foreground">Full access to all ventures, finance, AI agents, and settings</p>
            </div>
            <span className="text-xs text-muted-foreground">2 users</span>
          </div>
          <div className="border-t border-border pt-3 flex items-center justify-between text-sm">
            <div>
              <p className="text-foreground">Member</p>
              <p className="text-xs text-muted-foreground">Access to assigned projects, own tasks, and shared documents</p>
            </div>
            <span className="text-xs text-muted-foreground">6 users</span>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div>
        <h2 className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">
          <Key className="w-4 h-4" /> API Keys
        </h2>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">No API keys configured yet. Keys will be needed for ClickUp, Google, and AI agent integrations.</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
