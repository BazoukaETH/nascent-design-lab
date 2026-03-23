const team = [
  { name: "Bassel El Aroussy", role: "Managing Principal", entity: "All Ventures" },
  { name: "Moaz El Sawy", role: "Senior Developer", entity: "Wasla Solutions" },
  { name: "Mohamed El Hagry", role: "UI/UX Designer", entity: "Wasla Solutions" },
  { name: "Youssef El Shazly", role: "Design & Strategy", entity: "Wasla Solutions, Labs" },
  { name: "Hussein Shahbender", role: "Marketing Lead", entity: "Wasla Solutions" },
  { name: "Ahmed Nehad", role: "Tech Advisor", entity: "All Ventures" },
  { name: "Ali Amir", role: "Creative Lead", entity: "Paperwork Studio" },
  { name: "Saif Nosair", role: "Visual/Motion", entity: "Wasla Solutions" },
];

const People = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">People</h1>
      <p className="text-sm text-muted-foreground mt-1">Team directory & capacity</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {team.map((t) => (
          <div key={t.name} className="bg-card border border-border rounded-lg p-4">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium mb-3">
              {t.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <h3 className="font-medium text-foreground text-sm">{t.name}</h3>
            <p className="text-xs text-muted-foreground">{t.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{t.entity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default People;
