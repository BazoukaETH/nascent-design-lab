import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Rocket,
  Users,
  UserCircle,
  DollarSign,
  Bot,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useSidebar } from "./AppLayout";

const navItems = [
  { to: "/", label: "Command Center", icon: LayoutDashboard },
  { to: "/ventures", label: "Ventures", icon: Rocket },
  { to: "/clients", label: "Pipeline", icon: Users },
  { to: "/people", label: "Team", icon: UserCircle },
  { to: "/finance", label: "Finance", icon: DollarSign },
  { to: "/ai-agents", label: "AI Agents", icon: Bot },
  { to: "/settings", label: "Settings", icon: Settings },
];

const AppSidebar = () => {
  const location = useLocation();
  const { collapsed, toggle } = useSidebar();

  return (
    <aside
      className={`shrink-0 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen border-r border-sidebar-border transition-all duration-200 ${
        collapsed ? "w-[56px]" : "w-[200px]"
      }`}
    >
      {/* Logo */}
      <div className={`border-b border-sidebar-border ${collapsed ? "p-2 flex items-center justify-center h-[52px]" : "p-4 pb-3"}`}>
        {collapsed ? (
          <div className="text-sm font-extrabold tracking-wider text-white">W</div>
        ) : (
          <>
            <div className="text-base font-extrabold tracking-[0.08em] text-white">WASLA</div>
            <div className="text-[9px] font-semibold tracking-[0.12em] text-secondary mt-0.5">VENTURES OS</div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className={`flex-1 py-2 space-y-0.5 ${collapsed ? "px-1.5" : "px-2"}`}>
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
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
        })}
      </nav>

      {/* Footer */}
      <div className={`border-t border-sidebar-border ${collapsed ? "p-2" : "p-3"}`}>
        {!collapsed && (
          <>
            <div className="text-[9px] text-muted-foreground/50 tracking-[0.06em] uppercase">Founder View</div>
            <div className="text-[11px] text-muted-foreground mt-1 font-medium">Bassel El Aroussy</div>
            <div className="flex items-center gap-1.5 mt-1 mb-2">
              <div className="w-[5px] h-[5px] rounded-full bg-green-500 shadow-[0_0_6px_hsl(160,80%,40%)]" />
              <span className="text-[9px] text-green-500">Live</span>
            </div>
          </>
        )}
        <button
          onClick={toggle}
          className={`flex items-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors ${
            collapsed ? "justify-center p-2 w-full" : "gap-2 px-2 py-1.5 text-[10px] w-full"
          }`}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-3.5 h-3.5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
