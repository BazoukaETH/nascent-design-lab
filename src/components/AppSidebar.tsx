import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Rocket,
  Users,
  UserCircle,
  DollarSign,
  Bot,
  Settings,
} from "lucide-react";

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

  return (
    <aside className="w-[200px] shrink-0 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen border-r border-sidebar-border">
      <div className="p-4 pb-3 border-b border-sidebar-border">
        <div className="text-base font-extrabold tracking-[0.08em] text-white">WASLA</div>
        <div className="text-[9px] font-semibold tracking-[0.12em] text-secondary mt-0.5">VENTURES OS</div>
      </div>
      <nav className="flex-1 py-2 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive =
            item.to === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.to);
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-all ${
                isActive
                  ? "bg-primary/15 border border-primary/25 text-white font-semibold"
                  : "border border-transparent text-sidebar-foreground hover:bg-accent/50"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3 border-t border-sidebar-border">
        <div className="text-[9px] text-muted-foreground/50 tracking-[0.06em] uppercase">Founder View</div>
        <div className="text-[11px] text-muted-foreground mt-1 font-medium">Bassel El Aroussy</div>
        <div className="flex items-center gap-1.5 mt-1">
          <div className="w-[5px] h-[5px] rounded-full bg-green-500 shadow-[0_0_6px_hsl(160,80%,40%)]" />
          <span className="text-[9px] text-green-500">Live</span>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
