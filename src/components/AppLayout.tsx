import { useState, createContext, useContext } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

export const SidebarContext = createContext({ collapsed: false, toggle: () => {} });
export const useSidebar = () => useContext(SidebarContext);

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => setCollapsed(c => !c);

  return (
    <SidebarContext.Provider value={{ collapsed, toggle }}>
      <div className="flex min-h-screen bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="h-12 flex items-center justify-between px-6 border-b border-border shrink-0 bg-background/80 backdrop-blur">
            <div className="text-[11px] text-muted-foreground font-medium">
              Wasla Ventures OS
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground/50">Last synced: Just now</span>
              <div className="w-[5px] h-[5px] rounded-full bg-green-500 shadow-[0_0_6px_hsl(160,80%,40%)]" />
            </div>
          </header>
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarContext.Provider>
  );
};

export default AppLayout;
