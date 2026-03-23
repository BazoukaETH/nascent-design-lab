import { useState } from "react";
import { ChevronRight, Users, FileText, CheckSquare } from "lucide-react";

interface Venture {
  name: string;
  stage: string;
  category: string;
  owner: string;
  thesis: string;
  northStar: { metric: string; value: string; trend: string };
  team: string[];
  milestones: { label: string; date: string; done: boolean }[];
  revenue: string;
  costs: string;
  margin: string;
  notes: string[];
}

const ventures: Venture[] = [
  {
    name: "Wasla Solutions",
    stage: "Live",
    category: "Services",
    owner: "Bassel El Aroussy",
    thesis: "Full-service digital agency serving mid-market Egyptian businesses",
    northStar: { metric: "Monthly Recurring Revenue", value: "620,000 EGP", trend: "+12%" },
    team: ["Moaz El Sawy", "Mohamed El Hagry", "Youssef El Shazly", "Hussein Shahbender", "Saif Nosair"],
    milestones: [
      { label: "First client signed", date: "2024-06", done: true },
      { label: "5 active clients", date: "2025-01", done: true },
      { label: "10 active retainers", date: "2026-06", done: false },
    ],
    revenue: "620,000 EGP/mo",
    costs: "380,000 EGP/mo",
    margin: "38.7%",
    notes: ["Focus on retainer model over project-based", "Exploring partnerships with SMG"],
  },
  {
    name: "Wasla Education",
    stage: "Live",
    category: "Education",
    owner: "Bassel El Aroussy",
    thesis: "Tech-enabled education and training programs",
    northStar: { metric: "Active Students", value: "240", trend: "+18%" },
    team: ["Youssef El Shazly"],
    milestones: [
      { label: "Platform launch", date: "2025-03", done: true },
      { label: "500 students", date: "2026-09", done: false },
    ],
    revenue: "85,000 EGP/mo",
    costs: "42,000 EGP/mo",
    margin: "50.6%",
    notes: ["Strong organic growth from social media"],
  },
  {
    name: "Paperwork Studio",
    stage: "Live",
    category: "Creative Agency",
    owner: "Ali Amir",
    thesis: "Premium creative and branding studio (25% owned by Wasla)",
    northStar: { metric: "Monthly Revenue", value: "112,000 EGP", trend: "+5%" },
    team: ["Ali Amir", "Saif Nosair"],
    milestones: [
      { label: "Studio established", date: "2024-09", done: true },
      { label: "Standalone profitability", date: "2025-12", done: true },
    ],
    revenue: "112,000 EGP/mo",
    costs: "78,000 EGP/mo",
    margin: "30.4%",
    notes: ["Cross-selling with Wasla Solutions clients"],
  },
  {
    name: "Wasla Tourism",
    stage: "Early Stage",
    category: "Marketplace",
    owner: "Bassel El Aroussy",
    thesis: "Digital marketplace connecting tourists with local Egyptian experiences",
    northStar: { metric: "Bookings", value: "0", trend: "—" },
    team: [],
    milestones: [
      { label: "Market research complete", date: "2026-02", done: true },
      { label: "MVP launch", date: "2026-08", done: false },
    ],
    revenue: "—",
    costs: "15,000 EGP/mo",
    margin: "—",
    notes: ["Exploring partnerships with hotels in Hurghada"],
  },
  {
    name: "Wasla Labs",
    stage: "Early Stage",
    category: "R&D",
    owner: "Ahmed Nehad",
    thesis: "Internal R&D arm for experimental products and technology",
    northStar: { metric: "Experiments Running", value: "2", trend: "—" },
    team: ["Ahmed Nehad", "Moaz El Sawy"],
    milestones: [
      { label: "Wasla OS v1 spec", date: "2026-03", done: true },
      { label: "First internal tool shipped", date: "2026-06", done: false },
    ],
    revenue: "—",
    costs: "25,000 EGP/mo",
    margin: "—",
    notes: ["Wasla OS is the first Labs project"],
  },
  {
    name: "Wasla Space",
    stage: "Discovery",
    category: "Membership/Co-working",
    owner: "Bassel El Aroussy",
    thesis: "Co-working and community space for creative professionals in Cairo",
    northStar: { metric: "Members", value: "0", trend: "—" },
    team: [],
    milestones: [
      { label: "Location scouting", date: "2026-04", done: false },
    ],
    revenue: "—",
    costs: "—",
    margin: "—",
    notes: ["Evaluating Maadi and Zamalek locations"],
  },
  {
    name: "Wasla Bank",
    stage: "Long-term Vision",
    category: "Fintech",
    owner: "Bassel El Aroussy",
    thesis: "Super app / neobank for Egyptian SMEs",
    northStar: { metric: "—", value: "—", trend: "—" },
    team: [],
    milestones: [],
    revenue: "—",
    costs: "—",
    margin: "—",
    notes: ["Long-term play, monitoring regulatory landscape"],
  },
  {
    name: "Data Egypt",
    stage: "Concept",
    category: "Media/Data",
    owner: "Bassel El Aroussy",
    thesis: "Data-driven media platform for Egyptian market intelligence",
    northStar: { metric: "—", value: "—", trend: "—" },
    team: ["Hussein Shahbender"],
    milestones: [
      { label: "Concept validation", date: "2026-06", done: false },
    ],
    revenue: "—",
    costs: "—",
    margin: "—",
    notes: ["Exploring data partnerships"],
  },
  {
    name: "AgriWasla",
    stage: "Prototype",
    category: "Agri Marketplace",
    owner: "Bassel El Aroussy",
    thesis: "B2B marketplace connecting farmers with restaurants and retailers",
    northStar: { metric: "GMV", value: "0", trend: "—" },
    team: [],
    milestones: [
      { label: "Prototype built", date: "2026-05", done: false },
    ],
    revenue: "—",
    costs: "10,000 EGP/mo",
    margin: "—",
    notes: ["Testing with 3 farms in Fayoum"],
  },
  {
    name: "Firewood Egypt",
    stage: "Live",
    category: "E-commerce",
    owner: "Bassel El Aroussy",
    thesis: "Premium firewood and charcoal e-commerce brand",
    northStar: { metric: "Monthly Orders", value: "87", trend: "+22%" },
    team: [],
    milestones: [
      { label: "Shopify store launch", date: "2025-10", done: true },
      { label: "100 orders/month", date: "2026-05", done: false },
    ],
    revenue: "45,000 EGP/mo",
    costs: "28,000 EGP/mo",
    margin: "37.8%",
    notes: ["Strong winter season performance"],
  },
];

const stageColor: Record<string, string> = {
  Live: "bg-green-100 text-green-800",
  "Early Stage": "bg-yellow-100 text-yellow-800",
  Discovery: "bg-blue-100 text-blue-800",
  "Long-term Vision": "bg-gray-100 text-gray-600",
  Concept: "bg-gray-100 text-gray-600",
  Prototype: "bg-orange-100 text-orange-800",
};

const Ventures = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedVenture = ventures.find((v) => v.name === selected);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Ventures</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {ventures.length} subsidiaries & initiatives under Wasla Ventures
        </p>
      </div>

      {!selectedVenture ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ventures.map((v) => (
            <button
              key={v.name}
              onClick={() => setSelected(v.name)}
              className="bg-card border border-border rounded-lg p-4 text-left hover:border-primary/30 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-foreground">{v.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${stageColor[v.stage] || "bg-muted text-muted-foreground"}`}>
                  {v.stage}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{v.category} · {v.owner}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground tabular-nums">{v.revenue !== "—" ? v.revenue : "Pre-revenue"}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <button onClick={() => setSelected(null)} className="text-sm text-primary hover:underline">
            ← Back to all ventures
          </button>

          {/* Header */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-xl font-semibold text-foreground">{selectedVenture.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{selectedVenture.thesis}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${stageColor[selectedVenture.stage] || "bg-muted text-muted-foreground"}`}>
                {selectedVenture.stage}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{selectedVenture.category} · Owner: {selectedVenture.owner}</p>
          </div>

          {/* North Star */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">North Star Metric</h3>
            <p className="text-sm text-muted-foreground">{selectedVenture.northStar.metric}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-semibold text-foreground tabular-nums">{selectedVenture.northStar.value}</span>
              {selectedVenture.northStar.trend !== "—" && (
                <span className="text-sm text-green-600">{selectedVenture.northStar.trend}</span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Financial Summary */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Financial Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="text-foreground tabular-nums">{selectedVenture.revenue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Costs</span>
                  <span className="text-foreground tabular-nums">{selectedVenture.costs}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="text-foreground font-medium">Margin</span>
                  <span className="text-foreground font-medium tabular-nums">{selectedVenture.margin}</span>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Team ({selectedVenture.team.length})
              </h3>
              {selectedVenture.team.length > 0 ? (
                <div className="space-y-2">
                  {selectedVenture.team.map((t) => (
                    <div key={t} className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">
                        {t.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <span className="text-sm text-foreground">{t}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No team assigned yet</p>
              )}
            </div>
          </div>

          {/* Milestones */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <CheckSquare className="w-3.5 h-3.5" /> Milestones
            </h3>
            {selectedVenture.milestones.length > 0 ? (
              <div className="space-y-2">
                {selectedVenture.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${m.done ? "bg-green-500" : "bg-muted-foreground/30"}`} />
                    <span className={m.done ? "text-muted-foreground line-through" : "text-foreground"}>{m.label}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{m.date}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No milestones defined yet</p>
            )}
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-lg p-5">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Notes & Decisions
            </h3>
            {selectedVenture.notes.length > 0 ? (
              <ul className="space-y-1.5">
                {selectedVenture.notes.map((n, i) => (
                  <li key={i} className="text-sm text-foreground flex gap-2">
                    <span className="text-muted-foreground">•</span> {n}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No notes yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ventures;
