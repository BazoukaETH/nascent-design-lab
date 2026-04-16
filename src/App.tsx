import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SalaryProvider } from "@/contexts/SalaryContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Ventures from "./pages/Ventures";
import Pipeline from "./pages/Pipeline";
import Finance from "./pages/Finance";
import Team from "./pages/Team";
import Network from "./pages/Network";
import MarketIntel from "./pages/MarketIntel";
import Initiatives from "./pages/Initiatives";
import AIAgents from "./pages/AIAgents";
import Documents from "./pages/Documents";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SalaryProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ventures" element={<Ventures />} />
              <Route path="/pipeline" element={<Pipeline />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/team" element={<Team />} />
              <Route path="/network" element={<Network />} />
              <Route path="/market-intel" element={<MarketIntel />} />
              <Route path="/initiatives" element={<Initiatives />} />
              <Route path="/ai-agents" element={<AIAgents />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </SalaryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
