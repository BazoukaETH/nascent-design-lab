const team = [
  {
    name: "Bassel El Aroussy",
    role: "Managing Principal",
    entities: ["All Ventures"],
    projects: ["SMG Proposal", "Cairo Capital Partnership"],
    capacity: "loaded" as const,
    skills: ["Strategy", "Business Development", "Finance"],
    email: "bassel@wasla.ventures",
  },
  {
    name: "Moaz El Sawy",
    role: "Senior Developer",
    entities: ["Wasla Solutions"],
    projects: ["Cairo Food Solutions", "Baraka Pharm", "EJB"],
    capacity: "overloaded" as const,
    skills: ["React", "Node.js", "TypeScript", "System Architecture"],
    email: "moaz@wasla.ventures",
  },
  {
    name: "Mohamed El Hagry",
    role: "UI/UX Designer",
    entities: ["Wasla Solutions"],
    projects: ["Cairo Food Solutions", "Baraka Pharm"],
    capacity: "loaded" as const,
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    email: "mohamed@wasla.ventures",
  },
  {
    name: "Youssef El Shazly",
    role: "Design & Strategy",
    entities: ["Wasla Solutions", "Wasla Labs"],
    projects: ["Wasla Education content", "Strategy docs"],
    capacity: "available" as const,
    skills: ["Brand Strategy", "Visual Design", "Content Strategy"],
    email: "youssef@wasla.ventures",
  },
  {
    name: "Hussein Shahbender",
    role: "Marketing Lead",
    entities: ["Wasla Solutions"],
    projects: ["Pipeline management", "Content calendar"],
    capacity: "loaded" as const,
    skills: ["Digital Marketing", "SEO", "Analytics", "Lead Gen"],
    email: "hussein@wasla.ventures",
  },
  {
    name: "Ahmed Nehad",
    role: "Tech Advisor",
    entities: ["All Ventures"],
    projects: ["Wasla OS architecture", "Security review"],
    capacity: "available" as const,
    skills: ["Architecture", "DevOps", "Security", "Infrastructure"],
    email: "ahmed@wasla.ventures",
  },
  {
    name: "Ali Amir",
    role: "Creative Lead",
    entities: ["Paperwork Studio"],
    projects: ["Paperwork client work", "Cross-sell projects"],
    capacity: "loaded" as const,
    skills: ["Branding", "Creative Direction", "Illustration"],
    email: "ali@wasla.ventures",
  },
  {
    name: "Saif Nosair",
    role: "Visual/Motion",
    entities: ["Wasla Solutions"],
    projects: ["Cairo Food Solutions assets", "Motion deliverables"],
    capacity: "available" as const,
    skills: ["Motion Design", "Video", "After Effects", "3D"],
    email: "saif@wasla.ventures",
  },
];

const capacityColor = {
  available: { bg: "bg-green-100", text: "text-green-800", label: "Available" },
  loaded: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Loaded" },
  overloaded: { bg: "bg-red-100", text: "text-red-800", label: "Overloaded" },
};

const People = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">People</h1>
        <p className="text-sm text-muted-foreground mt-1">{team.length} team members across Wasla Ventures</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {team.map((t) => {
          const cap = capacityColor[t.capacity];
          return (
            <div key={t.name} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium shrink-0">
                  {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-foreground text-sm">{t.name}</h3>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${cap.bg} ${cap.text}`}>
                  {cap.label}
                </span>
              </div>

              <div className="space-y-2.5 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned to</p>
                  <p className="text-foreground">{t.entities.join(", ")}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Active projects</p>
                  <ul className="space-y-0.5">
                    {t.projects.map((p) => (
                      <li key={p} className="text-foreground text-xs">• {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {t.skills.map((s) => (
                      <span key={s} className="text-xs bg-muted text-muted-foreground px-1.5 py-0.5 rounded">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default People;
