import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Rocket,
  Briefcase,
  Contact2,
  DollarSign,
  Users,
  UserCircle,
  Globe,
  Target,
  Bot,
  FileText,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSidebar } from "./AppLayout";

const mainNav = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/ventures", label: "Ventures", icon: Rocket },
  { to: "/pipeline", label: "Pipeline", icon: Briefcase },
  { to: "/clients", label: "Clients", icon: Contact2 },
  { to: "/finance", label: "Finance", icon: DollarSign },
  { to: "/team", label: "Team", icon: Users },
  { to: "/network", label: "Network", icon: UserCircle },
  { to: "/market-intel", label: "Market Intel", icon: Globe },
  { to: "/initiatives", label: "Initiatives", icon: Target },
];

const systemNav = [
  { to: "/ai-agents", label: "AI Agents", icon: Bot },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();
  const { collapsed, toggle } = useSidebar();

  const renderLink = (item: typeof mainNav[0]) => {
    const isActive = item.to === "/" ? location.pathname === "/" : location.pathname.startsWith(item.to);
    return (
      <NavLink
        key={item.to}
        to={item.to}
        title={collapsed ? item.label : undefined}
        className={`flex items-center rounded-lg text-xs transition-all ${
          collapsed ? "justify-center p-2" : "gap-3 px-3 py-2"
        } ${
          isActive
            ? "bg-primary/15 border border-primary/25 text-white font-semibold"
            : "border border-transparent text-sidebar-foreground hover:bg-accent/50"
        }`}
      >
        <item.icon className="w-4 h-4 shrink-0" />
        {!collapsed && item.label}
      </NavLink>
    );
  };

  return (
    <aside
      className={`shrink-0 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen border-r border-sidebar-border transition-all duration-200 ${
        collapsed ? "w-[56px]" : "w-[200px]"
      }`}
    >
      {/* Logo + Collapse */}
      <div className={`border-b border-sidebar-border ${collapsed ? "p-2 flex flex-col items-center justify-center gap-2" : "p-4 pb-3"}`}>
        {collapsed ? (
          <>
            <div className="text-sm font-extrabold tracking-wider text-white">W</div>
            <button onClick={toggle} className="flex items-center justify-center p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors" title="Expand sidebar">
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <div className="text-base font-extrabold tracking-[0.08em] text-white">WASLA</div>
              <div className="text-[9px] font-semibold tracking-[0.12em] text-secondary mt-0.5">VENTURES OS</div>
            </div>
            <button onClick={toggle} className="flex items-center p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors" title="Collapse sidebar">
              <PanelLeftClose className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Nav */}
      <nav className={`flex-1 py-2 space-y-0.5 ${collapsed ? "px-1.5" : "px-2"}`}>
        {mainNav.map(renderLink)}

        {/* Divider */}
        <div className={`pt-2 pb-1 ${collapsed ? "px-1" : "px-2"}`}>
          <div className="border-t border-sidebar-border" />
          {!collapsed && <div className="text-[8px] text-muted-foreground/40 uppercase tracking-[0.15em] font-semibold mt-2 mb-1 px-1">System</div>}
        </div>

        {systemNav.map(renderLink)}
      </nav>

      {/* Footer */}
      <div className={`border-t border-sidebar-border ${collapsed ? "p-2" : "p-3"}`}>
        {!collapsed && (
          <>
            <div className="text-[9px] text-muted-foreground/50 tracking-[0.06em] uppercase">Founder View</div>
            <div className="text-[11px] text-muted-foreground mt-1 font-medium">Bassel El Aroussy</div>
            <div className="flex items-center gap-1.5 mt-1">
              <div className="w-[5px] h-[5px] rounded-full bg-green-500 shadow-[0_0_6px_hsl(160,80%,40%)]" />
              <span className="text-[9px] text-green-500">Live</span>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;
