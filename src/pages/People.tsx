import { useState } from "react";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSalaries } from "@/contexts/SalaryContext";

interface TeamMember {
  name: string;
  role: string;
  dept: string;
  initials: string;
  color: string;
  equity: string;
  skills: string[];
  bio: string;
  focus: string;
}

const TEAM_SEED: TeamMember[] = [
  { name: "Bassel El Aroussy", role: "Principal", dept: "Leadership", initials: "BA", color: "hsl(220,95%,47%)", equity: "55% (WV)", skills: ["Strategy", "Business Dev", "Capital Markets", "Partnerships"], bio: "Managing Principal & founder. Former securities broker managing trading platforms serving thousands. Leads all strategic decisions, partnerships, and business development.", focus: "Investor relations, business development, strategy, operations oversight" },
  { name: "Usef El Shazly", role: "Digital Lead", dept: "Product & Design", initials: "UE", color: "hsl(168,100%,42%)", equity: "10% (WV) / 35% (Edu)", skills: ["UI/UX", "Digital Strategy", "Design Systems", "Product"], bio: "Managing Partner & Head of Design. Digital wizard with deep command of design, development, and modern tools.", focus: "Product design, Wasla Education lead, client UX delivery" },
  { name: "Hussein Shahbender", role: "Marketing Lead", dept: "Growth", initials: "HS", color: "hsl(250,60%,60%)", equity: "15% (WV)", skills: ["Branding", "Performance Marketing", "Content", "Growth"], bio: "Co-founder & Marketing Lead. Young entrepreneur with proven track record building consumer ventures.", focus: "Brand, marketing strategy, content, client growth campaigns" },
  { name: "Moaz El Sawy", role: "Development Lead", dept: "Engineering", initials: "ME", color: "hsl(160,80%,40%)", equity: "2% (WV) / 2.5% (Sol+Edu)", skills: ["iOS", "Android", "Full-Stack", "React Native"], bio: "Senior Software Developer. Highly skilled in iOS and Android. Emerging senior full-stack developer.", focus: "Mobile development, full-stack delivery, architecture decisions" },
  { name: "Ali El Amir", role: "Creative Lead", dept: "Design", initials: "AE", color: "hsl(36,90%,53%)", equity: "2% (WV)", skills: ["Graphic Design", "Creative Direction", "Branding", "Motion"], bio: "Creative Lead & Creative Director at Paperwork Studio. Exceptional designer with world-class creative direction.", focus: "Visual identity, creative direction, brand assets, Paperwork collaboration" },
  { name: "Mohab Metwali", role: "Engineering & AI Lead", dept: "Engineering", initials: "MM", color: "hsl(330,80%,60%)", equity: "1% (direct)", skills: ["AI/ML", "Blockchain", "Data Science", "C++", "System Architecture"], bio: "Senior engineer with deep expertise in AI, machine learning, data science, and blockchain.", focus: "AI integrations, advanced engineering, Wasla Labs lead, R&D" },
  { name: "Mohamed Hagry", role: "Product Designer", dept: "Design", initials: "MH", color: "hsl(174,72%,46%)", equity: "—", skills: ["Product Design", "Figma", "User Research", "Prototyping"], bio: "Digital product designer focused on intuitive, user-centered interfaces.", focus: "Product UI design, design system maintenance, user flows" },
  { name: "Saif Nosair", role: "Visual & Motion Designer", dept: "Design", initials: "SN", color: "hsl(24,94%,53%)", equity: "—", skills: ["Motion Design", "After Effects", "Brand Identity", "Video"], bio: "Talented visual and motion designer bringing brands to life through compelling graphics.", focus: "Motion graphics, brand videos, social content, visual campaigns" },
];

const DEPTS = ["Leadership", "Product & Design", "Engineering", "Growth", "Design"];
const DEPT_COLORS = ["hsl(220,95%,47%)", "hsl(168,100%,42%)", "hsl(160,80%,40%)", "hsl(250,60%,60%)", "hsl(36,90%,53%)", "hsl(330,80%,60%)", "hsl(174,72%,46%)", "hsl(24,94%,53%)"];

const People = () => {
  const [team, setTeam] = useState<TeamMember[]>(TEAM_SEED);
  const [selected, setSelected] = useState<number | null>(null);
  const [addModal, setAddModal] = useState(false);
  const [form, setForm] = useState({ name: "", role: "", dept: "Engineering", skills: "", bio: "", focus: "", equity: "—" });
  const { addSalaryEntry } = useSalaries();

  function addMember() {
    if (!form.name.trim()) return;
    const initials = form.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
    const color = DEPT_COLORS[team.length % DEPT_COLORS.length];
    setTeam([...team, {
      name: form.name, role: form.role, dept: form.dept, initials, color, equity: form.equity,
      skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
      bio: form.bio, focus: form.focus,
    }]);
    // Auto-add to salary register as pending (0 salary)
    addSalaryEntry({
      name: form.name, role: form.role, dept: form.dept,
      monthlySalary: 0, equity: "—", venture: "Pending",
    });
    setForm({ name: "", role: "", dept: "Engineering", skills: "", bio: "", focus: "", equity: "—" });
    setAddModal(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">Team</h1>
          <p className="text-xs text-muted-foreground mt-1">{team.length} people across Leadership, Engineering, Design & Growth · Click to expand</p>
        </div>
        <Button size="sm" className="h-8 text-xs gap-1.5" onClick={() => setAddModal(true)}>
          <Plus className="w-3.5 h-3.5" /> Add Member
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {team.map((p, i) => (
          <div
            key={i}
            onClick={() => setSelected(selected === i ? null : i)}
            className="bg-card rounded-xl p-4 cursor-pointer transition-all duration-200"
            style={{ border: `1px solid ${selected === i ? p.color : 'hsl(220,25%,16%)'}` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                style={{ background: `${p.color}22`, border: `2px solid ${p.color}66`, color: p.color }}
              >
                {p.initials}
              </div>
              <div>
                <div className="text-xs font-bold text-foreground">{p.name}</div>
                <div className="text-[10px] font-semibold" style={{ color: p.color }}>{p.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] bg-muted px-2 py-0.5 rounded text-muted-foreground">{p.dept}</span>
              {p.equity !== "—" && (
                <span className="text-[9px] px-2 py-0.5 rounded" style={{ background: "hsl(220,95%,47%,0.12)", color: "hsl(220,95%,47%)" }}>
                  Equity: {p.equity}
                </span>
              )}
            </div>

            {selected === i && (
              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                <p className="text-[11px] text-muted-foreground leading-relaxed">{p.bio}</p>
                <div>
                  <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {p.skills.map((s, si) => (
                      <span key={si} className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{ background: `${p.color}18`, color: p.color }}>{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[9px] text-muted-foreground/50 uppercase tracking-wide font-semibold mb-1">Current Focus</div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">{p.focus}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Advisory Section */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="text-xs font-semibold text-foreground mb-0.5">Advisory & Board Support</div>
        <div className="text-[10px] text-muted-foreground/50 mb-3">Key relationships backing Wasla Ventures</div>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {[
            { name: "Mr. Yasser Hashem", role: "Legal Advisor", note: "Top tech lawyer in Egypt. 2% equity for 3 years of legal services." },
            { name: "Board-level Tech Advisors", role: "Technical Board", note: "Two senior developers acting at board level with strong external credibility." },
            { name: "Strategic Business Board", role: "Business Board", note: "Three high-profile businessmen/investors providing strategic direction and network access." },
          ].map((a, i) => (
            <div key={i} className="bg-muted rounded-lg p-3">
              <div className="text-[11px] font-semibold text-foreground mb-0.5">{a.name}</div>
              <div className="text-[9px] font-semibold mb-1.5" style={{ color: "hsl(220,95%,47%)" }}>{a.role}</div>
              <div className="text-[10px] text-muted-foreground leading-relaxed">{a.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={addModal} onOpenChange={setAddModal}>
        <DialogContent className="sm:max-w-[480px] bg-card border-border">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Full Name *</label>
              <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="e.g. John Doe" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Role</label>
              <Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Frontend Developer" className="h-8 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Department</label>
              <Select value={form.dept} onValueChange={v => setForm({ ...form, dept: v })}>
                <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{DEPTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-muted-foreground font-medium">Equity</label>
              <Input value={form.equity} onChange={e => setForm({ ...form, equity: e.target.value })} placeholder="e.g. 2% (WV)" className="h-8 text-xs" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground font-medium">Skills (comma-separated)</label>
            <Input value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} placeholder="e.g. React, TypeScript, Node.js" className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground font-medium">Bio</label>
            <Input value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} placeholder="Short bio..." className="h-8 text-xs" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] text-muted-foreground font-medium">Current Focus</label>
            <Input value={form.focus} onChange={e => setForm({ ...form, focus: e.target.value })} placeholder="What they're working on..." className="h-8 text-xs" />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setAddModal(false)} className="text-xs h-8">Cancel</Button>
            <Button onClick={addMember} disabled={!form.name.trim()} className="text-xs h-8">Add Member</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default People;
